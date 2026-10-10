/* brain viz client. Vanilla JS; note-derived strings are only ever set with textContent. */
(function () {
  "use strict";

  const TOKEN = new URLSearchParams(window.location.search).get("t") || "";
  const EMBEDDED = document.getElementById("graph-data");
  const INBOX_ID = "__inbox";
  const EPISODE_LIMIT = 500;
  const FOCUS_MAX = 15;
  const DAY_MS = 86400000;

  const FAMILIES = {
    part_of: { label: "part of", color: "rgba(150,156,170,0.45)", width: 0, particles: 0, strength: 0.5, distance: 40 },
    depends_on: { label: "depends on", color: "#4c8dff", width: 0.8, particles: 2, strength: 0.3, distance: 70 },
    conflicts_with: { label: "conflicts with", color: "#ff4d4f", width: 1.6, particles: 0, strength: 0.2, distance: 90 },
    supersedes: { label: "supersedes", color: "#ffb020", width: 1.1, particles: 3, strength: 0.3, distance: 70 },
    related_to: { label: "related to", color: "rgba(190,196,220,0.25)", width: 0, particles: 0, strength: 0.1, distance: 80, dash: [3, 3] },
    links_to: { label: "body link", color: "rgba(140,146,170,0.22)", width: 0, particles: 0, strength: 0.03, distance: 90 },
  };
  const FAMILY_ORDER = ["conflicts_with", "supersedes", "depends_on", "part_of", "related_to"];
  const FLOW_REVERSED = new Set(["depends_on", "supersedes"]);
  const FLAGS = {
    conflict: { label: "conflict", color: "#ff4d4f" },
    stale: { label: "stale dependency", color: "#c77dff" },
    orphan: { label: "orphan", color: "#9aa5b8" },
    unverified: { label: "unverified claims", color: "#ffd166" },
    over_budget: { label: "hub over budget", color: "#06d6a0" },
    lint_error: { label: "lint error", color: "#ef476f" },
  };
  const STATUSES = ["active", "superseded", "archived"];

  const els = {
    graph: document.getElementById("graph"),
    labels: document.getElementById("labels"),
    filters: document.getElementById("filters"),
    panel: document.getElementById("panel"),
    panelBody: document.getElementById("panel-body"),
    status: document.getElementById("status"),
    legend: document.getElementById("legend"),
    search: document.getElementById("search"),
    results: document.getElementById("search-results"),
    brand: document.getElementById("brain-name"),
    dim: document.getElementById("btn-dim"),
    health: document.getElementById("btn-health"),
    body: document.getElementById("btn-body"),
    replay: document.getElementById("btn-replay"),
    motion: document.getElementById("btn-motion"),
    filtersBtn: document.getElementById("btn-filters"),
  };

  const motionQuery = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;

  const state = {
    data: null,
    nodes: [],
    byId: new Map(),
    topics: new Map(),
    hubs: new Map(),
    links: [],
    is3d: true,
    health: false,
    reduced: Boolean(motionQuery && motionQuery.matches),
    filters: { topics: new Set(), families: new Set(), statuses: new Set(STATUSES), privacy: new Set(), flags: new Set(), episodes: true, noTopic: true },
    focus: null,
    query: "",
    matches: null,
    selected: null,
    replay: null,
    replayHits: new Map(),
    graph: null,
    three: null,
    labelEls: new Map(),
    shown: { nodes: [], links: [] },
  };

  // ---------------------------------------------------------------- helpers

  function el(tag, props, children) {
    const node = document.createElement(tag);
    if (props) {
      for (const [key, value] of Object.entries(props)) {
        if (key === "text") node.textContent = value;
        else if (key === "class") node.className = value;
        else if (key === "on") for (const [ev, fn] of Object.entries(value)) node.addEventListener(ev, fn);
        else node[key] = value;
      }
    }
    for (const child of children || []) if (child) node.appendChild(child);
    return node;
  }

  function apiUrl(path) {
    return path + (path.includes("?") ? "&" : "?") + "t=" + encodeURIComponent(TOKEN);
  }

  function setStatus(text) {
    els.status.textContent = text;
  }

  function hexToRgb(hex) {
    const m = /^#?([0-9a-f]{6})$/i.exec(hex || "");
    const v = m ? parseInt(m[1], 16) : 0x8899aa;
    return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
  }

  function rgbToHsl([r, g, b]) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const l = (max + min) / 2;
    if (max === min) return [0, 0, l];
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    let h;
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    return [h / 6, s, l];
  }

  function hsla(h, s, l, a) {
    return "hsla(" + Math.round(h * 360) + "," + Math.round(s * 100) + "%," + Math.round(l * 100) + "%," + a.toFixed(2) + ")";
  }

  function ageDays(node) {
    if (!node.updated) return 365;
    const now = Date.parse(state.data.generated) || Date.now();
    const then = Date.parse(node.updated);
    return Number.isFinite(then) ? Math.max(0, (now - then) / DAY_MS) : 365;
  }

  function transitionMs(ms) {
    return state.reduced ? 0 : ms;
  }

  function isGhost(node) {
    return node.status === "superseded" || node.status === "archived";
  }

  function visibleFlags(node) {
    return (node.flags || []).filter((f) => FLAGS[f]);
  }

  // ---------------------------------------------------------------- data

  function prepare(data) {
    state.data = data;
    els.brand.textContent = data.brain + (data.profile && data.profile !== "owner" ? " · as " + data.profile : "");
    document.title = "brain viz · " + data.brain;
    for (const topic of data.topics) {
      state.topics.set(topic.slug, topic);
      state.filters.topics.add(topic.slug);
    }
    for (const level of data.privacy || []) state.filters.privacy.add(level);
    for (const fam of Object.keys(FAMILIES)) if (fam !== "links_to") state.filters.families.add(fam);
    let episodes = 0;
    for (const raw of data.nodes) {
      const node = Object.assign({}, raw);
      if (node.kind === "episode") episodes += 1;
      state.nodes.push(node);
      state.byId.set(node.id, node);
      if (node.kind === "hub" && node.topic && !state.hubs.has(node.topic)) state.hubs.set(node.topic, node);
      if (!state.filters.privacy.has(node.privacy)) state.filters.privacy.add(node.privacy);
    }
    state.filters.episodes = episodes <= EPISODE_LIMIT;
    state.episodeCount = episodes;
    if (episodes || (data.runs || []).length) {
      const inbox = { id: INBOX_ID, title: "Inbox", kind: "inbox", topic: null, status: "active", flags: [], degree: 0, fx: 0, fy: 0, fz: 0 };
      state.nodes.push(inbox);
      state.byId.set(INBOX_ID, inbox);
    }
    for (const link of data.links) {
      if (!state.byId.has(link.source) || !state.byId.has(link.target)) continue;
      state.links.push(makeLink(link, link.source, link.target, link.rel));
    }
  }

  function makeLink(orig, src, dst, rel) {
    const reversed = FLOW_REVERSED.has(rel);
    return {
      source: reversed ? dst : src,
      target: reversed ? src : dst,
      src: src,
      dst: dst,
      rel: rel,
      orig: orig,
    };
  }

  // ---------------------------------------------------------------- filtering

  function nodePasses(node) {
    const f = state.filters;
    if (node.kind === "inbox") return f.episodes || Boolean(state.replay);
    if (node.kind === "episode") return f.episodes;
    if (node.topic ? !f.topics.has(node.topic) : !f.noTopic) return false;
    if (!f.statuses.has(node.status)) return false;
    if (node.privacy && !f.privacy.has(node.privacy)) return false;
    if (f.flags.size && !visibleFlags(node).some((flag) => f.flags.has(flag))) return false;
    return true;
  }

  function linkPasses(link) {
    if (link.rel === "replay") return true;
    if (link.rel === "links_to") return els.body.getAttribute("aria-pressed") === "true";
    return link.rel === "conflicts_with" || state.filters.families.has(link.rel);
  }

  function computeShown() {
    if (state.focus) return focusData(state.focus);
    const nodes = state.nodes.filter(nodePasses);
    const ids = new Set(nodes.map((n) => n.id));
    const links = state.links.filter((l) => linkPasses(l) && ids.has(l.src) && ids.has(l.dst));
    if (state.replay) for (const l of state.replay.links) if (ids.has(l.dst)) links.push(l);
    return { nodes: nodes, links: links };
  }

  function refreshData() {
    state.shown = computeShown();
    state.graph.graphData(state.shown);
    rebuildLabels();
    updateStatusLine();
  }

  // ---------------------------------------------------------------- encoding

  function radius(node) {
    if (node.kind === "inbox") return 5;
    if (node.kind === "episode") return 1.4;
    const r = Math.min(12, 3 + 2.2 * Math.sqrt(node.degree || 0));
    return node.kind === "hub" ? Math.max(r, 9) : r;
  }

  function nodeVal(node) {
    const r = radius(node);
    return state.is3d ? r * r * r : r * r;
  }

  function nodeColor(node) {
    if (node.kind === "inbox") return state.health ? "rgba(180,190,205,0.08)" : "rgba(200,210,225,0.55)";
    if (node.kind === "episode") return state.health ? "rgba(180,190,205,0.08)" : "rgba(200,210,225,0.55)";
    const topic = state.topics.get(node.topic);
    const [h, s] = rgbToHsl(hexToRgb(topic ? topic.color : "#8899aa"));
    const recency = Math.max(0, 1 - ageDays(node) / 180);
    let light = 0.34 + 0.3 * recency;
    let alpha = isGhost(node) ? 0.22 : 0.95;
    if (state.health && !visibleFlags(node).length) {
      alpha = 0.07;
      light = 0.45;
    }
    if (state.matches && !state.matches.has(node.id)) alpha = Math.min(alpha, 0.1);
    if (state.replayHits.has(node.id)) {
      light = 0.8;
      alpha = 1;
    }
    return hsla(h, node.topic ? s : 0, light, alpha);
  }

  function linkColor(link) {
    if (link.rel === "replay") return "rgba(220,230,255,0.35)";
    const fam = FAMILIES[link.rel] || FAMILIES.links_to;
    if (state.health && link.rel !== "conflicts_with" && link.rel !== "depends_on") return "rgba(120,126,140,0.08)";
    return fam.color;
  }

  function linkWidth(link) {
    if (link.rel === "replay") return 0;
    return (FAMILIES[link.rel] || FAMILIES.links_to).width;
  }

  function linkParticles(link) {
    if (state.reduced || link.rel === "replay") return 0;
    if (state.health && link.rel !== "depends_on") return 0;
    return (FAMILIES[link.rel] || FAMILIES.links_to).particles;
  }

  function nodeTooltip(node) {
    if (node.kind === "inbox") {
      return el("div", null, [
        el("div", { class: "tip-title", text: "Inbox" }),
        el("div", { class: "tip-meta", text: state.episodeCount + " pending episodes (not yet consolidated)" }),
      ]);
    }
    const topic = state.topics.get(node.topic);
    const meta = [node.kind === "episode" ? "pending episode" : node.type, topic ? topic.title : null, node.status, node.updated]
      .filter(Boolean)
      .join(" · ");
    const flags = visibleFlags(node).map((f) => FLAGS[f].label);
    return el("div", null, [
      el("div", { class: "tip-title", text: node.title }),
      el("div", { class: "tip-meta", text: meta }),
      flags.length ? el("div", { class: "tip-flags", text: "⚠ " + flags.join(", ") }) : null,
    ]);
  }

  function linkTooltip(link) {
    if (link.rel === "replay") return null;
    const a = state.byId.get(link.src), b = state.byId.get(link.dst);
    const verb = link.orig.verb || link.rel;
    const text = (a ? a.title : link.src) + " — " + verb.replace(/_/g, " ") + " → " + (b ? b.title : link.dst);
    return el("div", null, [
      el("div", { text: text }),
      link.orig.qualifier ? el("div", { class: "tip-meta", text: "(" + link.orig.qualifier + ")" }) : null,
    ]);
  }

  // ---------------------------------------------------------------- 3D halos

  function captureThree() {
    if (state.three || !state.is3d) return;
    const scene = state.graph.scene();
    let found = null;
    scene.traverse((obj) => {
      if (!found && obj.__graphObjType === "node" && obj.geometry && obj.geometry.type === "SphereGeometry" && obj.material && obj.material.type === "MeshLambertMaterial") found = obj;
    });
    if (!found) return;
    state.three = { Mesh: found.constructor, Sphere: found.geometry.constructor, Material: found.material.constructor };
    applyHalos();
  }

  function haloObject(node) {
    const flags = visibleFlags(node);
    if (!flags.length || !state.three) return null;
    const T = state.three;
    const r = Math.cbrt(nodeVal(node));
    let root = null;
    flags.forEach((flag, index) => {
      const color = FLAGS[flag].color;
      const mesh = new T.Mesh(
        new T.Sphere(r * (1.55 + 0.35 * index), 16, 12),
        new T.Material({ color: color, emissive: color, transparent: true, opacity: state.health ? 0.32 : 0.18, depthWrite: false })
      );
      if (root) root.add(mesh);
      else root = mesh;
    });
    return root;
  }

  function applyHalos() {
    if (!state.is3d || !state.three) return;
    state.graph.nodeThreeObjectExtend(true).nodeThreeObject((node) => haloObject(node));
  }

  function drawHalos2d(node, ctx, scale) {
    const flags = visibleFlags(node);
    if (!flags.length || node.x === undefined) return;
    const r = Math.sqrt(nodeVal(node));
    flags.forEach((flag, index) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, r + (2.5 + 2 * index), 0, 2 * Math.PI);
      ctx.strokeStyle = FLAGS[flag].color;
      ctx.globalAlpha = state.health ? 0.9 : 0.6;
      ctx.lineWidth = Math.max(1, 1.5 / scale);
      ctx.stroke();
      ctx.globalAlpha = 1;
    });
  }

  // ---------------------------------------------------------------- forces

  function clusterForce() {
    let nodes = [];
    let members = new Set();
    function force(alpha) {
      const centers = new Map();
      for (const n of nodes) {
        if (!n.topic || n.x === undefined) continue;
        const c = centers.get(n.topic) || { x: 0, y: 0, z: 0, k: 0 };
        c.x += n.x; c.y += n.y; c.z += n.z || 0; c.k += 1;
        centers.set(n.topic, c);
      }
      for (const n of nodes) {
        if (n.fx !== undefined && n.fx !== null) continue;
        let target = null, k = 0.06;
        if (n.kind === "episode") {
          target = { x: 0, y: 0, z: 0 };
          k = 0.12;
        } else if (n.topic) {
          const hub = state.hubs.get(n.topic);
          if (hub && hub !== n && hub.x !== undefined && members.has(hub)) target = hub;
          else if (centers.has(n.topic)) {
            const c = centers.get(n.topic);
            target = { x: c.x / c.k, y: c.y / c.k, z: c.z / c.k };
          }
        }
        if (!target) continue;
        n.vx += (target.x - n.x) * k * alpha;
        n.vy += (target.y - n.y) * k * alpha;
        if (n.z !== undefined) n.vz = (n.vz || 0) + ((target.z || 0) - n.z) * k * alpha;
      }
    }
    force.initialize = function (list) {
      nodes = list;
      members = new Set(list);
    };
    return force;
  }

  function configureForces(graph) {
    const charge = graph.d3Force("charge");
    if (charge) charge.strength((n) => (n.kind === "hub" ? -260 : n.kind === "episode" ? -4 : -45));
    const link = graph.d3Force("link");
    if (link) {
      link.strength((l) => (l.rel === "replay" ? 0 : (FAMILIES[l.rel] || FAMILIES.links_to).strength));
      link.distance((l) => (l.rel === "replay" ? 100 : (FAMILIES[l.rel] || FAMILIES.links_to).distance));
    }
    graph.d3Force("cluster", clusterForce());
  }

  // ---------------------------------------------------------------- graph instance

  function createGraph() {
    if (state.graph && state.graph._destructor) state.graph._destructor();
    els.graph.textContent = "";
    state.three = null;
    let graph;
    if (state.is3d) {
      graph = new window.ForceGraph3D(els.graph, { controlType: "trackball" });
      graph
        .showNavInfo(false)
        .nodeOpacity(1)
        .nodeResolution(12)
        .linkOpacity(1)
        .linkDirectionalParticleWidth(1.6)
        .onEngineTick(captureThree);
    } else {
      graph = new window.ForceGraph(els.graph);
      graph
        .nodeCanvasObjectMode(() => "before")
        .nodeCanvasObject(drawHalos2d)
        .linkLineDash((l) => (FAMILIES[l.rel] && FAMILIES[l.rel].dash) || null)
        .linkDirectionalParticleWidth(2.5);
    }
    graph
      .backgroundColor("#0b0e14")
      .nodeId("id")
      .nodeRelSize(1)
      .nodeVal(nodeVal)
      .nodeColor(nodeColor)
      .nodeLabel(nodeTooltip)
      .linkColor(linkColor)
      .linkWidth(linkWidth)
      .linkLabel(linkTooltip)
      .linkDirectionalParticles(linkParticles)
      .linkDirectionalParticleSpeed(0.006)
      .linkDirectionalParticleColor(linkColor)
      .onNodeClick((node) => selectNode(node, true))
      .onBackgroundClick(() => closePanel())
      .width(els.graph.clientWidth)
      .height(els.graph.clientHeight);
    if (state.reduced) graph.warmupTicks(120).cooldownTicks(0);
    let fitted = false;
    graph.onEngineStop(() => {
      if (fitted || state.focus) return;
      fitted = true;
      graph.zoomToFit(transitionMs(500), 60);
    });
    configureForces(graph);
    state.graph = graph;
    refreshData();
  }

  function restyle() {
    const g = state.graph;
    g.nodeColor((n) => nodeColor(n))
      .linkColor((l) => linkColor(l))
      .linkDirectionalParticles((l) => linkParticles(l))
      .linkDirectionalParticleColor((l) => linkColor(l));
    if (state.is3d) applyHalos();
  }

  // ---------------------------------------------------------------- hub labels

  function rebuildLabels() {
    els.labels.textContent = "";
    state.labelEls.clear();
    for (const node of state.shown.nodes) {
      if (node.kind !== "hub" && node.kind !== "inbox" && !(state.focus && node.id === state.focus)) continue;
      const label = el("div", { class: "hub-label", text: node.kind === "inbox" ? "Inbox · " + state.episodeCount + " pending" : node.title });
      els.labels.appendChild(label);
      state.labelEls.set(node.id, label);
    }
  }

  function behindCamera(node) {
    const cam = state.graph.camera();
    const e = cam.matrixWorld.elements;
    const dx = node.x - cam.position.x, dy = node.y - cam.position.y, dz = (node.z || 0) - cam.position.z;
    return dx * -e[8] + dy * -e[9] + dz * -e[10] < 0;
  }

  function placeLabels() {
    if (state.graph && state.labelEls.size) {
      for (const [id, label] of state.labelEls) {
        const node = state.byId.get(id);
        if (!node || node.x === undefined || (state.is3d && behindCamera(node))) {
          label.style.display = "none";
          continue;
        }
        const p = state.is3d ? state.graph.graph2ScreenCoords(node.x, node.y, node.z || 0) : state.graph.graph2ScreenCoords(node.x, node.y);
        label.style.display = "";
        label.style.transform = "translate(" + Math.round(p.x) + "px," + Math.round(p.y) + "px) translate(-50%, -160%)";
      }
    }
    window.requestAnimationFrame(placeLabels);
  }

  // ---------------------------------------------------------------- camera

  function flyTo(node) {
    if (!node || node.x === undefined) return;
    if (state.is3d) {
      const dist = 200;
      const len = Math.hypot(node.x, node.y, node.z || 0) || 1;
      const ratio = 1 + dist / len;
      state.graph.cameraPosition({ x: node.x * ratio, y: node.y * ratio, z: (node.z || 0) * ratio + (len < 1 ? dist : 0) }, node, transitionMs(900));
    } else {
      state.graph.centerAt(node.x, node.y, transitionMs(700));
      state.graph.zoom(3, transitionMs(700));
    }
  }

  // ---------------------------------------------------------------- side panel

  function closePanel() {
    state.selected = null;
    els.panel.hidden = true;
  }

  function section(title, items) {
    if (!items.length) return null;
    return el("div", null, [el("h3", { text: title }), el("ul", null, items)]);
  }

  function neighborItems(node) {
    const items = [];
    for (const link of state.links) {
      if (link.rel === "links_to") continue;
      let other = null, verb = link.orig.verb || link.rel;
      if (link.src === node.id) other = state.byId.get(link.dst);
      else if (link.dst === node.id) {
        other = state.byId.get(link.src);
        verb = "← " + verb;
      }
      if (!other) continue;
      const target = other;
      items.push(
        el("li", null, [
          document.createTextNode(verb.replace(/_/g, " ") + " "),
          el("button", { class: "linkish", type: "button", text: target.title, on: { click: () => selectNode(target, true) } }),
        ])
      );
    }
    return items;
  }

  function renderPanel(node, detail) {
    const body = els.panelBody;
    body.textContent = "";
    const topic = state.topics.get(node.topic);
    const d = detail || {};
    body.appendChild(el("h2", { text: d.title || node.title }));
    body.appendChild(
      el("div", {
        class: "meta",
        text: [node.kind === "episode" ? "pending episode" : d.type || node.type, topic ? topic.title : null, d.status || node.status, node.privacy, node.updated]
          .filter(Boolean)
          .join(" · "),
      })
    );
    const path = d.path || node.path;
    if (path) body.appendChild(el("div", null, [el("code", { text: path })]));
    const flags = visibleFlags(node);
    if (flags.length) {
      const row = el("div");
      for (const flag of flags) {
        const chip = el("span", { class: "flag", text: FLAGS[flag].label });
        chip.style.background = FLAGS[flag].color;
        row.appendChild(chip);
      }
      body.appendChild(row);
    }
    const actions = el("div", { class: "actions" });
    if (path && navigator.clipboard) {
      actions.appendChild(
        el("button", {
          type: "button",
          text: "Copy path",
          on: { click: () => navigator.clipboard.writeText(path).then(() => setStatus("Copied " + path)) },
        })
      );
    }
    if (d.abs_path) {
      actions.appendChild(el("a", { href: "obsidian://open?path=" + encodeURIComponent(d.abs_path), text: "Open in Obsidian" }));
    }
    if (node.kind === "note" || node.kind === "hub") {
      actions.appendChild(
        el("button", {
          type: "button",
          text: state.focus === node.id ? "Exit focus" : "Focus",
          on: { click: () => (state.focus === node.id ? exitFocus() : enterFocus(node.id)) },
        })
      );
    }
    body.appendChild(actions);
    if (d.banners && d.banners.length) body.appendChild(el("ul", null, d.banners.map((b) => el("li", { class: "banner", text: b }))));
    if (d.summary) body.appendChild(el("p", { text: d.summary }));
    if (d.claims) body.appendChild(section("Active claims", d.claims.map((c) => el("li", { text: c.text }))));
    if (d.relations) {
      body.appendChild(
        section(
          "Relations",
          d.relations.map((r) => el("li", { text: r.verb.replace(/_/g, " ") + " " + (r.title || r.target) + (r.resolved ? "" : " (unresolved)") + (r.qualifier ? " (" + r.qualifier + ")" : "") }))
        )
      );
    } else {
      const items = neighborItems(node);
      if (items.length) body.appendChild(section("Relations", items));
    }
    if (d.backlinks) body.appendChild(section("Backlinks", d.backlinks.map((b) => el("li", { text: b.title + " (" + b.relation.replace(/_/g, " ") + ")" }))));
    if (!detail && EMBEDDED) body.appendChild(el("p", { class: "meta", text: "Exported files do not include note bodies or claims." }));
    if (d.error) body.appendChild(el("p", { class: "meta", text: d.error }));
  }

  function selectNode(node, fly) {
    if (!node || node.kind === "inbox") return;
    state.selected = node.id;
    els.panel.hidden = false;
    renderPanel(node, null);
    if (fly) flyTo(node);
    if (EMBEDDED || node.kind === "episode") return;
    fetch(apiUrl("/api/note/" + encodeURIComponent(node.id)), { credentials: "same-origin" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("HTTP " + r.status))))
      .then((detail) => {
        if (state.selected === node.id) renderPanel(node, detail);
      })
      .catch((err) => {
        if (state.selected === node.id) renderPanel(node, { error: "Could not load note: " + err.message });
      });
  }

  // ---------------------------------------------------------------- search

  function runSearch(query) {
    state.query = query.trim().toLowerCase();
    els.results.textContent = "";
    if (!state.query) {
      state.matches = null;
      els.results.hidden = true;
      restyle();
      return;
    }
    const hits = [];
    for (const node of state.nodes) {
      if (node.kind === "inbox") continue;
      const names = [node.title].concat(node.aliases || []);
      if (names.some((n) => String(n).toLowerCase().includes(state.query))) hits.push(node);
    }
    state.matches = new Set(hits.map((n) => n.id));
    restyle();
    for (const node of hits.slice(0, 12)) {
      els.results.appendChild(
        el("li", null, [el("button", { type: "button", text: node.title, on: { click: () => chooseResult(node) } })])
      );
    }
    els.results.hidden = hits.length === 0;
    setStatus(hits.length + " match" + (hits.length === 1 ? "" : "es"));
  }

  function chooseResult(node) {
    els.results.hidden = true;
    if (!state.shown.nodes.includes(node)) {
      if (node.topic) state.filters.topics.add(node.topic);
      state.filters.statuses.add(node.status);
      if (node.kind === "episode") state.filters.episodes = true;
      state.filters.flags.clear();
      buildFilters();
      refreshData();
    }
    window.setTimeout(() => selectNode(node, true), state.shown.nodes.includes(node) ? 0 : 400);
  }

  // ---------------------------------------------------------------- focus mode

  function focusDirections() {
    const up = state.is3d ? 1 : -1;
    return {
      part_of: [0, up, 0],
      depends_on: [0, -up, 0],
      conflicts_with: [-1, 0, 0],
      related_to: [1, 0, 0],
      supersedes: state.is3d ? [0, 0, -1] : [0.7, -0.7 * up, 0],
    };
  }

  function focusData(id) {
    const center = state.byId.get(id);
    const groups = new Map(FAMILY_ORDER.map((f) => [f, []]));
    const seen = new Set([id]);
    const links = [];
    for (const fam of FAMILY_ORDER) {
      for (const link of state.links) {
        if (link.rel !== fam || (link.src !== id && link.dst !== id)) continue;
        const otherId = link.src === id ? link.dst : link.src;
        const other = state.byId.get(otherId);
        if (!other || other.kind === "inbox" || !nodePasses(other)) continue;
        links.push(link);
        if (seen.has(otherId) || seen.size >= FOCUS_MAX) continue;
        seen.add(otherId);
        groups.get(fam).push(other);
      }
    }
    const dirs = focusDirections();
    const spacing = 45, dist = 140;
    center.fx = 0; center.fy = 0;
    if (state.is3d) center.fz = 0;
    for (const [fam, members] of groups) {
      const [dx, dy, dz] = dirs[fam];
      const px = dy !== 0 || dz !== 0 ? 1 : 0;
      const py = dx !== 0 ? 1 : 0;
      members.forEach((node, i) => {
        const offset = (i - (members.length - 1) / 2) * spacing;
        node.fx = dx * dist + px * offset;
        node.fy = dy * dist + py * offset;
        if (state.is3d) node.fz = dz * dist;
      });
    }
    const nodes = [center];
    for (const members of groups.values()) nodes.push(...members);
    const ids = new Set(nodes.map((n) => n.id));
    return { nodes: nodes, links: links.filter((l) => ids.has(l.src) && ids.has(l.dst)) };
  }

  function releasePins(nodes) {
    for (const node of nodes) {
      if (node.kind === "inbox") continue;
      if (node._saved) {
        node.x = node._saved[0]; node.y = node._saved[1]; node.z = node._saved[2];
        delete node._saved;
      }
      node.fx = undefined; node.fy = undefined; node.fz = undefined;
    }
  }

  function enterFocus(id) {
    if (state.focus) releasePins(state.shown.nodes);
    for (const node of state.nodes) if (node.x !== undefined) node._saved = [node.x, node.y, node.z];
    state.focus = id;
    refreshData();
    const g = state.graph;
    if (state.is3d) g.cameraPosition({ x: 170, y: 90, z: 470 }, { x: 0, y: 0, z: -40 }, transitionMs(800));
    else {
      g.centerAt(0, 0, transitionMs(600));
      g.zoom(2.2, transitionMs(600));
    }
    const node = state.byId.get(id);
    if (state.selected === id) selectNode(node, false);
    setStatus("Focus: " + node.title + " · up: part of · down: depends on · left: conflicts · right: related" + (state.is3d ? " · behind: history" : " · diagonal: history") + " · Esc to exit");
  }

  function exitFocus() {
    if (!state.focus) return;
    releasePins(state.nodes);
    const id = state.focus;
    state.focus = null;
    refreshData();
    if (state.selected === id) selectNode(state.byId.get(id), false);
  }

  // ---------------------------------------------------------------- replay

  function startReplay() {
    const runs = (state.data.runs || []).slice().reverse();
    if (!runs.length) {
      setStatus("No run records found for this brain yet.");
      return;
    }
    if (state.replay) return;
    if (state.focus) exitFocus();
    const inbox = state.byId.get(INBOX_ID);
    const links = [];
    for (const run of runs) {
      for (const id of run.touched || []) {
        if (state.byId.has(id)) links.push({ source: INBOX_ID, target: id, src: INBOX_ID, dst: id, rel: "replay", run: run.id, orig: {} });
      }
    }
    state.replay = { runs: runs, links: links, index: 0 };
    els.replay.disabled = true;
    if (inbox) refreshData();
    window.setTimeout(stepReplay, transitionMs(600));
  }

  function stepReplay() {
    const replay = state.replay;
    if (!replay) return;
    if (replay.index >= replay.runs.length) {
      state.replay = null;
      state.replayHits.clear();
      els.replay.disabled = false;
      refreshData();
      restyle();
      setStatus("Replay finished.");
      return;
    }
    const run = replay.runs[replay.index];
    replay.index += 1;
    state.replayHits.clear();
    for (const id of run.touched || []) state.replayHits.set(id, true);
    restyle();
    if (!state.reduced) {
      for (const link of replay.links) {
        if (link.run === run.id && state.shown.links.includes(link)) state.graph.emitParticle(link);
      }
    }
    setStatus(
      "Run " + replay.index + "/" + replay.runs.length + " · " + (run.kind || "run") + " · " + (run.at || "") + " · " +
        (run.episodes || 0) + " episodes · " + (run.touched || []).length + " notes touched"
    );
    window.setTimeout(stepReplay, state.reduced ? 1600 : 1800);
  }

  // ---------------------------------------------------------------- filters UI

  function checkbox(label, checked, onChange, swatchColor, count, lineSwatch, disabled) {
    const input = el("input", { type: "checkbox", checked: checked, disabled: Boolean(disabled) });
    input.addEventListener("change", () => onChange(input.checked));
    const children = [input];
    if (swatchColor) {
      const sw = el("span", { class: "swatch" + (lineSwatch ? " line" : "") });
      sw.style.background = swatchColor;
      children.push(sw);
    }
    children.push(el("span", { text: label }));
    if (count !== undefined && count !== null) children.push(el("span", { class: "count", text: String(count) }));
    return el("label", null, children);
  }

  function toggleIn(set, key) {
    return (on) => {
      if (on) set.add(key);
      else set.delete(key);
      onFilterChange();
    };
  }

  function onFilterChange() {
    if (state.focus) exitFocus();
    else refreshData();
  }

  function buildFilters() {
    const f = state.filters;
    const box = els.filters;
    box.textContent = "";
    const topics = el("fieldset", null, [el("legend", { text: "Topics" })]);
    for (const topic of state.topics.values()) {
      topics.appendChild(checkbox(topic.title, f.topics.has(topic.slug), toggleIn(f.topics, topic.slug), topic.color, topic.notes));
    }
    if (state.nodes.some((n) => (n.kind === "note" || n.kind === "hub") && !n.topic)) {
      topics.appendChild(checkbox("(no topic)", f.noTopic, (on) => { f.noTopic = on; onFilterChange(); }, "#8899aa"));
    }
    if (state.episodeCount) {
      topics.appendChild(checkbox("Pending episodes", f.episodes, (on) => { f.episodes = on; onFilterChange(); }, "#c8d2e1", state.episodeCount));
    }
    box.appendChild(topics);

    const fams = el("fieldset", null, [el("legend", { text: "Relations" })]);
    for (const [key, fam] of Object.entries(FAMILIES)) {
      if (key === "links_to") continue;
      const always = key === "conflicts_with";
      fams.appendChild(checkbox(fam.label + (always ? " (always)" : ""), always || f.families.has(key), toggleIn(f.families, key), fam.color, null, true, always));
    }
    box.appendChild(fams);

    const statuses = el("fieldset", null, [el("legend", { text: "Status" })]);
    for (const s of STATUSES) statuses.appendChild(checkbox(s, f.statuses.has(s), toggleIn(f.statuses, s)));
    box.appendChild(statuses);

    if (f.privacy.size > 1) {
      const privacy = el("fieldset", null, [el("legend", { text: "Privacy" })]);
      for (const level of f.privacy) privacy.appendChild(checkbox(level, true, toggleIn(f.privacy, level)));
      box.appendChild(privacy);
    }

    const counts = {};
    for (const n of state.nodes) for (const flag of visibleFlags(n)) counts[flag] = (counts[flag] || 0) + 1;
    const flags = el("fieldset", null, [el("legend", { text: "Only notes flagged" })]);
    for (const [key, flag] of Object.entries(FLAGS)) {
      flags.appendChild(checkbox(flag.label, f.flags.has(key), toggleIn(f.flags, key), flag.color, counts[key] || 0));
    }
    box.appendChild(flags);
  }

  function buildLegend() {
    els.legend.textContent = "";
    for (const key of ["part_of", "depends_on", "conflicts_with", "supersedes", "related_to"]) {
      const sw = el("span", { class: "swatch line" });
      sw.style.background = FAMILIES[key].color;
      els.legend.appendChild(el("div", null, [sw, el("span", { text: FAMILIES[key].label })]));
    }
    const ghost = el("span", { class: "swatch" });
    ghost.style.background = "rgba(150,160,180,0.3)";
    els.legend.appendChild(el("div", null, [ghost, el("span", { text: "superseded / archived" })]));
  }

  function updateStatusLine() {
    if (state.replay) return;
    const flagged = state.shown.nodes.filter((n) => visibleFlags(n).length).length;
    const data = state.data;
    setStatus(
      state.shown.nodes.filter((n) => n.kind !== "inbox").length + " nodes · " + state.shown.links.length + " links · " + flagged +
        " flagged · profile " + data.profile + " · generated " + data.generated + (EMBEDDED ? " · exported snapshot" : "")
    );
  }

  // ---------------------------------------------------------------- toolbar

  function pressed(button, on) {
    button.setAttribute("aria-pressed", on ? "true" : "false");
  }

  function wireToolbar() {
    els.dim.addEventListener("click", () => {
      if (state.focus) releasePins(state.nodes);
      state.focus = null;
      state.is3d = !state.is3d;
      els.dim.textContent = state.is3d ? "2D" : "3D";
      pressed(els.dim, !state.is3d);
      createGraph();
    });
    els.health.addEventListener("click", () => {
      state.health = !state.health;
      pressed(els.health, state.health);
      restyle();
    });
    els.body.addEventListener("click", () => {
      pressed(els.body, els.body.getAttribute("aria-pressed") !== "true");
      onFilterChange();
    });
    els.replay.addEventListener("click", startReplay);
    if (!(state.data.runs || []).length) els.replay.title = "No run records yet";
    els.motion.addEventListener("click", () => {
      state.reduced = !state.reduced;
      pressed(els.motion, state.reduced);
      restyle();
    });
    pressed(els.motion, state.reduced);
    els.filtersBtn.addEventListener("click", () => {
      els.filters.hidden = !els.filters.hidden;
      pressed(els.filtersBtn, !els.filters.hidden);
    });
    document.getElementById("panel-close").addEventListener("click", closePanel);
    els.search.addEventListener("input", () => runSearch(els.search.value));
    els.search.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter" && state.matches && state.matches.size) {
        const first = state.nodes.find((n) => state.matches.has(n.id));
        if (first) chooseResult(first);
      } else if (ev.key === "Escape") {
        els.search.value = "";
        runSearch("");
      }
    });
    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape" && document.activeElement !== els.search) {
        if (state.focus) exitFocus();
        else closePanel();
      }
    });
    window.addEventListener("resize", () => {
      if (state.graph) state.graph.width(els.graph.clientWidth).height(els.graph.clientHeight);
    });
    if (motionQuery && motionQuery.addEventListener) {
      motionQuery.addEventListener("change", (ev) => {
        state.reduced = ev.matches;
        pressed(els.motion, state.reduced);
        restyle();
      });
    }
  }

  // ---------------------------------------------------------------- boot

  function hasWebGL() {
    try {
      const canvas = document.createElement("canvas");
      return Boolean(window.WebGLRenderingContext && (canvas.getContext("webgl2") || canvas.getContext("webgl")));
    } catch (err) {
      return false;
    }
  }

  function start(data) {
    prepare(data);
    if (!hasWebGL() || typeof window.ForceGraph3D !== "function") {
      state.is3d = false;
      els.dim.disabled = true;
      els.dim.textContent = "3D";
    }
    buildFilters();
    buildLegend();
    wireToolbar();
    createGraph();
    window.requestAnimationFrame(placeLabels);
  }

  function load() {
    if (EMBEDDED) return Promise.resolve(JSON.parse(EMBEDDED.textContent));
    return fetch(apiUrl("/api/graph"), { credentials: "same-origin" }).then((r) => {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    });
  }

  load()
    .then(start)
    .catch((err) => setStatus("Could not load the graph: " + err.message));
})();
