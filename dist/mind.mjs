function oe(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}
const Re = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
), ve = (e) => e.replace(
  /\brgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g,
  function(t, n, i, o) {
    return "#" + ("0" + Number(n).toString(16)).substr(-2) + ("0" + Number(i).toString(16)).substr(-2) + ("0" + Number(o).toString(16)).substr(-2);
  }
), Ee = function(e, t) {
  if (t = t || this.nodeData, t.id === e)
    return t;
  if (t.children && t.children.length)
    for (let n = 0; n < t.children.length; n++) {
      const i = Ee(e, t.children[n]);
      if (i)
        return i;
    }
  else
    return null;
}, P = (e, t) => {
  if (e.parent = t, e.children)
    for (let n = 0; n < e.children.length; n++)
      P(e.children[n], e);
};
function we(e) {
  if (e.id = ee(), e.children)
    for (let t = 0; t < e.children.length; t++)
      we(e.children[t]);
}
const Ie = (e, t) => {
  var n = Date.now();
  return function() {
    var i = this, o = arguments, s = Date.now();
    s - n >= t && (e.apply(i, o), n = Date.now());
  };
};
function Se(e, t, n, i) {
  const o = i - t, s = e - n;
  let l = Math.atan(Math.abs(o) / Math.abs(s)) / 3.14 * 180;
  s < 0 && o > 0 && (l = 180 - l), s < 0 && o < 0 && (l = 180 + l), s > 0 && o < 0 && (l = 360 - l);
  const r = 20, a = 30;
  var h = l + a;
  const d = l - a;
  return {
    x1: n + Math.cos(Math.PI * h / 180) * r,
    y1: i - Math.sin(Math.PI * h / 180) * r,
    x2: n + Math.cos(Math.PI * d / 180) * r,
    y2: i - Math.sin(Math.PI * d / 180) * r
  };
}
function ce(e, t, n) {
  let i, o;
  const s = (e.cy - n) / (t - e.cx);
  return s > e.h / e.w || s < -e.h / e.w ? e.cy - n < 0 ? (i = e.cx - e.h / 2 / s, o = e.cy + e.h / 2) : (i = e.cx + e.h / 2 / s, o = e.cy - e.h / 2) : e.cx - t < 0 ? (i = e.cx + e.w / 2, o = e.cy - e.w * s / 2) : (i = e.cx - e.w / 2, o = e.cy + e.w * s / 2), {
    x: i,
    y: o
  };
}
function ae(e, t, n) {
  let i, o;
  const s = (e.cy - n) / (t - e.cx);
  return s > e.h / e.w || s < -e.h / e.w ? e.cy - n < 0 ? (i = e.cx - e.h / 2 / s, o = e.cy + e.h / 2) : (i = e.cx + e.h / 2 / s, o = e.cy - e.h / 2) : e.cx - t < 0 ? (i = e.cx + e.w / 2, o = e.cy - e.w * s / 2) : (i = e.cx - e.w / 2, o = e.cy + e.w * s / 2), {
    x: i,
    y: o
  };
}
function ee() {
  return (new Date().getTime().toString(16) + Math.random().toString(16).substr(2)).substr(2, 16);
}
function qe() {
  const e = ee();
  return {
    topic: this.newTopicName || "new node",
    id: e
  };
}
function je() {
  const e = ee();
  return {
    topic: this.newTopicName || "new node",
    id: e,
    type: "summary",
    summary: {
      topicId: e,
      range: this.currentSummaryNodeArr.map((t) => t.nodeObj.id)
    }
  };
}
function Ve(e, t) {
  let n = !0;
  for (; t.parent; ) {
    if (t.parent === e) {
      n = !1;
      break;
    }
    t = t.parent;
  }
  return n;
}
function We(e) {
  const t = e.parent.children, n = t.indexOf(e), i = t[n];
  n === 0 ? (t[n] = t[t.length - 1], t[t.length - 1] = i) : (t[n] = t[n - 1], t[n - 1] = i);
}
function _e(e) {
  const t = e.parent.children, n = t.indexOf(e), i = t[n];
  n === t.length - 1 ? (t[n] = t[0], t[0] = i) : (t[n] = t[n + 1], t[n + 1] = i);
}
function se(e) {
  const t = e.parent.children, n = t.indexOf(e);
  return t.splice(n, 1), t.length;
}
function Ye(e, t) {
  const n = e.parent.children, i = n.indexOf(e);
  n.splice(i + 1, 0, t);
}
function Ge(e, t) {
  const n = e.parent.children, i = n.indexOf(e);
  n.splice(i, 0, t);
}
function Xe(e, t) {
  const n = e.parent.children, i = n.indexOf(e);
  n[i] = t, t.children = [e];
}
function Ue(e, t) {
  se(e), t.children ? t.children.push(e) : t.children = [e];
}
function Je(e, t) {
  se(e);
  const n = t.parent.children;
  let i = 0;
  for (let o = 0; o < n.length; o++)
    if (n[o] === t) {
      i = o;
      break;
    }
  n.splice(i, 0, e);
}
function Ke(e, t) {
  se(e);
  const n = t.parent.children;
  let i = 0;
  for (let o = 0; o < n.length; o++)
    if (n[o] === t) {
      i = o;
      break;
    }
  n.splice(i + 1, 0, e);
}
const W = {
  afterMoving: !1,
  mousedown: !1,
  lastX: null,
  lastY: null,
  onMove(e, t) {
    if (this.mousedown) {
      if (this.afterMoving = !0, !this.lastX) {
        this.lastX = e.pageX, this.lastY = e.pageY;
        return;
      }
      const n = this.lastX - e.pageX, i = this.lastY - e.pageY;
      t.scrollTo(
        t.scrollLeft + n,
        t.scrollTop + i
      ), this.lastX = e.pageX, this.lastY = e.pageY;
    }
  },
  clear() {
    this.afterMoving = !1, this.mousedown = !1, this.lastX = null, this.lastY = null;
  }
};
function Z(e) {
  this.dom = e, this.mousedown = !1, this.lastX = null, this.lastY = null;
}
Z.prototype.init = function(e, t) {
  this.handleMouseMove = (n) => {
    if (n.stopPropagation(), this.mousedown) {
      if (!this.lastX) {
        this.lastX = n.pageX, this.lastY = n.pageY;
        return;
      }
      const i = this.lastX - n.pageX, o = this.lastY - n.pageY;
      t(i, o), this.lastX = n.pageX, this.lastY = n.pageY;
    }
  }, this.handleMouseDown = (n) => {
    n.stopPropagation(), this.mousedown = !0;
  }, this.handleClear = (n) => {
    n.stopPropagation(), this.clear();
  }, e.addEventListener("mousemove", this.handleMouseMove), e.addEventListener("mouseleave", this.handleClear), e.addEventListener("mouseup", this.handleClear), this.dom.addEventListener("mousedown", this.handleMouseDown);
};
Z.prototype.destory = function(e) {
  e.removeEventListener("mousemove", this.handleMouseMove), e.removeEventListener("mouseleave", this.handleClear), e.removeEventListener("mouseup", this.handleClear), this.dom.removeEventListener("mousedown", this.handleMouseDown);
};
Z.prototype.clear = function() {
  this.mousedown = !1, this.lastX = null, this.lastY = null;
};
const H = document, B = "http://www.w3.org/2000/svg", Ze = function(e) {
  const t = H.createElementNS(B, "path");
  return t.setAttribute("d", e), t.setAttribute("stroke", "#555"), t.setAttribute("fill", "none"), t.setAttribute("stroke-width", "1"), t.setAttribute("stroke-linecap", "square"), t.setAttribute("transform", "translate(0.5,-0.5)"), t;
}, K = function(e) {
  const t = H.createElementNS(B, "svg");
  return t.setAttribute("class", e), t;
}, Qe = function(e) {
  const t = H.createElementNS(B, "path");
  return t.setAttribute("d", e), t.setAttribute("fill", "none"), t.setAttribute("stroke-linecap", "square"), t.setAttribute("stroke", "#F6A04D"), t.setAttribute("stroke-width", "3"), t.setAttribute("transform", "translate(0.5,-0.5)"), t;
}, be = function(e, t, n, i) {
  const o = H.createElementNS(B, "line");
  return o.setAttribute("x1", e.toString()), o.setAttribute("y1", t.toString()), o.setAttribute("x2", n.toString()), o.setAttribute("y2", i.toString()), o.setAttribute("stroke", "#bbb"), o.setAttribute("fill", "none"), o.setAttribute("stroke-width", "2"), o;
}, et = function(e) {
  const t = H.createElementNS(B, "path");
  return t.setAttribute("d", e), t.setAttribute("stroke", "#555"), t.setAttribute("fill", "none"), t.setAttribute("stroke-linecap", "square"), t.setAttribute("stroke-width", "1"), t.setAttribute("transform", "translate(0.5,-0.5)"), t;
}, tt = function(e, t) {
  const n = H.createElementNS(B, "g"), i = H.createElementNS(B, "path"), o = H.createElementNS(B, "path");
  return o.setAttribute("d", t), o.setAttribute("stroke", "rgb(235, 95, 82)"), o.setAttribute("fill", "none"), o.setAttribute("stroke-linecap", "cap"), o.setAttribute("stroke-width", "2"), i.setAttribute("d", e), i.setAttribute("stroke", "rgb(235, 95, 82)"), i.setAttribute("fill", "none"), i.setAttribute("stroke-linecap", "cap"), i.setAttribute("stroke-width", "2"), n.appendChild(i), n.appendChild(o), n;
}, nt = function(e = 10, t = 10, n) {
  const i = H.createElementNS(B, "svg"), o = H.createElementNS(B, "g"), s = H.createElementNS(B, "rect");
  s.setAttribute("width", e.toString()), s.setAttribute("height", t.toString()), s.setAttribute("stroke", "#2ebdff"), s.setAttribute("stroke-width", "2"), s.setAttribute("fill", "none"), i.setAttribute("class", "line"), s.setAttribute("x", "1"), s.setAttribute("y", "1"), o.appendChild(s);
  const l = H.createElementNS(B, "rect");
  return l.setAttribute("width", "6"), l.setAttribute("height", "6"), l.setAttribute("stroke", "#2ebdff"), l.setAttribute("stroke-width", "2"), l.setAttribute("fill", "white"), l.setAttribute("x", (e - 3).toString()), l.setAttribute("y", (t - 3).toString()), l.setAttribute("class", "resize"), o.appendChild(l), i.appendChild(o), i.style.width = n.clientWidth + 5 + "px", i.style.height = n.clientHeight + 5 + "px", l.onpointerdown = function(r) {
    const a = Number(s.getAttribute("width")), h = Number(s.getAttribute("height"));
    let d = r.clientX, y = r.clientY;
    u(r.pageX, r.pageY);
    function u(N, E) {
      const b = a + N - d, x = h + E - y;
      s.setAttribute("width", b.toString()), s.setAttribute("height", x.toString()), l.setAttribute("x", (b - 3).toString()), l.setAttribute("y", (x - 3).toString()), i.style.width = b + 5 + "px", i.style.height = x + 5 + "px", n.style.width = b + "px", n.style.height = x + "px";
    }
    function p(N) {
      u(N.pageX, N.pageY);
    }
    l.onpointermove = p, l.onpointerup = function(N) {
      l.onpointermove = null, l.onpointerup = null, l.releasePointerCapture(N.pointerId);
    }, r.stopPropagation(), r.preventDefault(), l.setPointerCapture(r.pointerId);
  }, l.ondragstart = function() {
    return !1;
  }, i;
}, L = document, $ = (e, t) => (t ? t.mindElixirBox : L).querySelector(`[data-nodeid=me${e}]`);
function Ne(e, t, n) {
  e.onpointerdown = (i) => {
    if (!t.classList.contains("selected"))
      return;
    const o = i.clientX, s = t.clientWidth - Number(getComputedStyle(t).paddingLeft.replace("px", "")) - Number(getComputedStyle(t).paddingRight.replace("px", ""));
    e.onpointermove = (l) => {
      const r = l.clientX;
      t.style.width = (s + r - o).toString() + "px", e.style.height = n.style.height = t.clientHeight.toString() + "px", t.nodeObj.style || (t.nodeObj.style = {}), t.nodeObj.style.width = t.style.width, t.nodeObj.style.controllWidth = e.style.height, l.preventDefault();
    }, e.setPointerCapture(i.pointerId), i.preventDefault();
  }, e.onpointerup = (i) => {
    var o;
    e.onpointermove = null, e.releasePointerCapture(i.pointerId), (o = this == null ? void 0 : this.linkDiv) == null || o.call(this);
  };
}
const _ = function(e, t) {
  var o;
  const n = L.createElement("widthControllRight"), i = L.createElement("widthControllLeft");
  if (e.textContent = t.topic, this != null && this.widthControll && (Ne.call(this, i, e, n), Ne.call(this, n, e, i), e.appendChild(n), e.appendChild(i)), t.style && (e.style.color = t.style.color || "#2c3e50", e.style.background = t.style.background ? t.style.background : (o = t == null ? void 0 : t.parent) != null && o.root ? "#ffffff" : "inherit", /[a-z]/i.test(t.style.fontSize) ? e.style.fontSize = t.style.fontSize : e.style.fontSize = t.style.fontSize + "px", e.style.fontWeight = t.style.fontWeight || "normal", e.style.width = t.style.width || "fit-content", i.style.height = n.style.height = t.style.controllWidth || "29px"), t.hyperLink) {
    const s = L.createElement("a");
    s.className = "hyper-link", s.target = "_blank", s.innerHTML = '<svg t="1662346495524" style="font-size:20px;margin-left: 3px" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2372" width="22" height="22"><path d="M573.44 640a187.68 187.68 0 0 1-132.8-55.36L416 560l45.28-45.28 24.64 24.64a124.32 124.32 0 0 0 170.08 5.76l1.44-1.28a49.44 49.44 0 0 0 4-3.84l101.28-101.28a124.16 124.16 0 0 0 0-176l-1.92-1.92a124.16 124.16 0 0 0-176 0l-51.68 51.68a49.44 49.44 0 0 0-3.84 4l-20 24.96-49.92-40L480 276.32a108.16 108.16 0 0 1 8.64-9.28l51.68-51.68a188.16 188.16 0 0 1 266.72 0l1.92 1.92a188.16 188.16 0 0 1 0 266.72l-101.28 101.28a112 112 0 0 1-8.48 7.84 190.24 190.24 0 0 1-125.28 48z" fill="#002fa7" p-id="2373"></path><path d="M350.72 864a187.36 187.36 0 0 1-133.28-55.36l-1.92-1.92a188.16 188.16 0 0 1 0-266.72l101.28-101.28a112 112 0 0 1 8.48-7.84 188.32 188.32 0 0 1 258.08 7.84L608 464l-45.28 45.28-24.64-24.64A124.32 124.32 0 0 0 368 478.88l-1.44 1.28a49.44 49.44 0 0 0-4 3.84l-101.28 101.28a124.16 124.16 0 0 0 0 176l1.92 1.92a124.16 124.16 0 0 0 176 0l51.68-51.68a49.44 49.44 0 0 0 3.84-4l20-24.96 50.08 40-20.8 25.12a108.16 108.16 0 0 1-8.64 9.28l-51.68 51.68A187.36 187.36 0 0 1 350.72 864z" fill="#002fa7" p-id="2374"></path></svg>', s.href = t.hyperLink, e.appendChild(s);
  }
  if (t.remark) {
    const s = L.createElement("div");
    s.className = "content hidden", s.textContent = t.remark;
    const l = L.createElement("div");
    l.className = "remark", l.innerHTML = '<svg t="1659682144612" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2580" width="200" height="200"><path d="M625.728 57.472c19.264 0 34.688 6.848 48.128 20.16l208.96 207.04c14.272 13.12 21.568 29.568 21.568 49.28v504.576c0 71.808-56.256 127.744-128.576 127.744H252.16c-72.128 0-128.576-55.68-128.576-127.744V184.704c0-71.68 56.256-127.232 128.576-127.232z m-34.304 76.8H252.16c-30.144 0-51.776 21.376-51.776 50.432v653.824c0 29.44 21.888 50.944 51.776 50.944h523.648c30.016 0 51.84-21.632 51.84-50.944l-0.128-464.512H687.488A96 96 0 0 1 591.936 287.36l-0.448-9.216V134.208zM665.6 704a38.4 38.4 0 0 1 0 76.8H294.4a38.4 38.4 0 0 1 0-76.8h371.2z m0-192a38.4 38.4 0 0 1 0 76.8H294.4a38.4 38.4 0 0 1 0-76.8h371.2z m-192-192a38.4 38.4 0 1 1 0 76.8H294.4a38.4 38.4 0 1 1 0-76.8h179.2z m181.824-152.512v110.592a32 32 0 0 0 26.24 31.488l5.76 0.512h111.872L655.424 167.424z" p-id="2581"></path></svg>';
    let r;
    s.onmouseover = () => {
      clearTimeout(r);
    }, l.onmouseover = () => {
      s.classList.remove("hidden");
    }, s.onmouseleave = () => {
      r = setTimeout(() => {
        s.classList.contains("hidden") || s.classList.add("hidden");
      }, 300);
    }, l.onmouseleave = () => {
      r = setTimeout(() => {
        s.classList.contains("hidden") || s.classList.add("hidden");
      }, 300);
    }, l.appendChild(s), e.appendChild(l);
  }
  if (t.icons) {
    const s = L.createElement("span");
    s.className = "icons", s.innerHTML = t.icons.filter((l) => l !== "").map((l) => `<span>${oe(l)}</span>`).join(""), e.appendChild(s);
  }
  if (t.linkJump && t.linkJump.forEach((s) => {
    const l = document.createElement("a");
    l.className = "linkJump", l.title = s.title, l.innerHTML = '<svg t="1661493526135" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2220" width="16" height="16"><path d="M1001.175714 593.762001L700.806246 293.324796a76.091491 76.091491 0 0 0-107.566725 0 76.023754 76.023754 0 0 0 0 107.544146l171.713884 171.826779H152.653982v-115.288769a76.046333 76.046333 0 0 0-152.115245 0v152.092666c0 6.931777 2.145012 13.253918 3.951338 19.621218-1.806326 6.389879-3.951339 12.644283-3.951338 19.621218a76.068912 76.068912 0 0 0 76.046333 76.068912h686.020111L593.239521 894.131468a76.046333 76.046333 0 1 0 107.566725 107.566726L1001.175714 701.328726a76.091491 76.091491 0 0 0 0-107.566725z" fill="#1296db" p-id="2221"></path></svg>', l.onclick = () => {
      Le.call(this, s.toId);
    }, e.appendChild(l);
  }), t.image && t.image.forEach((l) => {
    const r = L.createElement("img");
    r.className = "image", r.src = l.url, r.style.width = l.width + "px", r.style.height = l.height + "px", r.style.display = "block", e.appendChild(r);
  }), t.tags) {
    const s = L.createElement("div");
    s.className = "tags", s.innerHTML = t.tags.filter((l) => l !== "").map((l) => `<span>${oe(l)}</span>`).join(""), e.appendChild(s);
  }
};
function Le(e) {
  let t = this.container.querySelector(`tpc[data-nodeid=me${e}]`);
  t || ($e(this.nodeData, e), this.layout(), this.linkDiv(), t = this.container.querySelector(`tpc[data-nodeid=me${e}]`)), t.scrollIntoView({ block: "center", behavior: "smooth" }), t.className = "blink", setTimeout(() => {
    t.classList.remove("blink");
  }, 3e3);
}
function $e(e, t) {
  if (e.id === t)
    return !0;
  let n = !1;
  for (const i of e.children || [])
    $e(i, t) && (n = !0);
  return n && (e.expanded = !0), n;
}
const it = function(e, t) {
  const n = L.createElement("GRP"), i = this.createTop(e);
  if (n.appendChild(i), !t && e.children && e.children.length > 0 && (i.appendChild(U(e.expanded)), e.expanded !== !1)) {
    const [o, s] = this.createChildren(e.children);
    n.appendChild(o);
  }
  return { grp: n, top: i };
}, ot = function(e, t) {
  const n = L.createElement("SMY"), i = this.createTop(e);
  return n.appendChild(i), !t && e.children && e.children.length > 0 && (i.appendChild(U(e.expanded)), e.expanded !== !1 && this.createChildren(e.children)), { smy: n, top: i };
}, st = function(e) {
  const t = L.createElement("t"), n = this.createTopic(e);
  return _.call(this, n, e), t.appendChild(n), t;
}, lt = function(e) {
  const t = L.createElement("tpc");
  return t.nodeObj = e, t.dataset.nodeid = "me" + e.id, t.draggable = this.draggable, t;
};
function rt(e) {
  const t = L.createRange();
  t.selectNodeContents(e);
  const n = window.getSelection();
  n && (n.removeAllRanges(), n.addRange(t));
}
function ct(e) {
  var i, o, s, l, r, a, h;
  if (console.time("createInputDiv"), !e)
    return;
  let t = L.createElement("div");
  const n = e.childNodes[0].textContent;
  e.appendChild(t), t.id = "input-box", t.contentEditable = "true", t.spellcheck = !1, t.textContent = n, t.draggable = !1, e.nodeObj.image && e.nodeObj.image.forEach((y) => {
    const u = L.createElement("img");
    u.src = y.url, u.style.width = y.width + "px", u.style.display = "block", t.appendChild(u);
    const p = nt(u.clientWidth, u.clientHeight, u);
    t.insertBefore(p, u);
  }), t.style.cssText = `min-width:${e.offsetWidth - 22}px;min-height:${e.clientHeight - 16}px`, (o = (i = e.nodeObj) == null ? void 0 : i.style) != null && o.width && (t.style.width = "auto"), (((l = (s = e.nodeObj) == null ? void 0 : s.style) == null ? void 0 : l.color) === "#ffffff" || ((r = e.nodeObj) == null ? void 0 : r.id) === "root" && !((h = (a = e.nodeObj) == null ? void 0 : a.style) != null && h.color)) && (t.style.color = "#2c3e50"), this.direction === 0 && (t.style.right = "0"), t.focus(), rt(t), this.inputDiv = t, this.bus.fire("operation", {
    name: "beginEdit",
    obj: e.nodeObj
  }), t.addEventListener("keydown", (d) => {
    d.stopPropagation();
    const y = d.key;
    if (y === "Enter" || y === "Tab") {
      if (d.shiftKey)
        return;
      d.preventDefault(), this.inputDiv.blur(), this.map.focus();
    }
  }), t.addEventListener("blur", () => {
    var E, b;
    if (!t)
      return;
    const d = e.nodeObj, y = t.textContent.trim(), u = (b = (E = d.image) == null ? void 0 : E.length) != null ? b : 0;
    if (d.image = [], t.childNodes.forEach((x) => {
      x.nodeName === "IMG" && d.image.push({
        url: x.src,
        width: x.width,
        height: x.height
      });
    }), y === "" && d.image.length === 0 ? d.topic = n : d.topic = y, t.remove(), this.inputDiv = t = null, y === n && u === d.image.length && u === 0)
      return;
    d.image.length === 0 && delete d.image, e.childNodes[0].textContent = d.topic;
    const p = e.querySelector("widthControllRight"), N = e.querySelector("widthControllRight");
    d.style || (d.style = {}), d.style.controllWidth = p.style.height = N.style.height = e.clientHeight.toString() + "px", delete d.style.width, this.shapeTpc(e, d), this.linkDiv(), Ae.call(this, this.nodeData, d.id, d.topic), this.bus.fire("operation", {
      name: "finishEdit",
      obj: d,
      origin: n
    });
  }), console.timeEnd("createInputDiv");
}
function Ae(e, t, n) {
  var i;
  (i = e == null ? void 0 : e.linkJump) == null || i.forEach(({ toId: o }, s) => {
    if (o === t) {
      e.linkJump[s].title = n;
      const l = this.container.querySelector(`tpc[data-nodeid=me${e.id}] .linkJump`);
      l.title = n;
    }
  });
  for (const o of e.children || [])
    Ae.call(this, o, t, n);
}
const U = function(e) {
  const t = L.createElement("epd");
  return t.innerText = e !== !1 ? "-" : "+", t.expanded = e !== !1, t.className = e !== !1 ? "minus" : "", t;
};
function at(e, t, n) {
  let i;
  t ? i = t : i = L.createElement("children");
  let o = [];
  for (let s = 0; s < e.length; s++) {
    const l = e[s];
    if ((l == null ? void 0 : l.type) === "summary") {
      const { smy: h } = this.createSummary(l);
      if (l.children && l.children.length > 0 && l.expanded !== !1) {
        const [d, y] = this.createChildren(l.children);
        h.appendChild(d), y && y.forEach((u) => {
          h.appendChild(u);
        });
      }
      o.push(h);
      continue;
    }
    const r = L.createElement("GRP");
    n === 0 ? r.className = "lhs" : n === 1 ? r.className = "rhs" : n === 2 && (l.direction === 0 ? r.className = "lhs" : l.direction === 1 && (r.className = "rhs"));
    const a = this.createTop(l);
    if (l.children && l.children.length > 0) {
      if (a.appendChild(U(l.expanded)), r.appendChild(a), l.expanded !== !1) {
        const [h, d] = this.createChildren(l.children);
        r.appendChild(h), d && d.forEach((y) => {
          var u;
          (u = r.children) != null && u[2] || r.appendChild(L.createElement("smychildren")), r.children[2].appendChild(y);
        });
      }
    } else
      r.appendChild(a);
    i.appendChild(r);
  }
  return [i, o];
}
function dt() {
  console.time("layout"), this.root.innerHTML = "", this.box.innerHTML = "";
  const e = this.createTopic(this.nodeData);
  _.call(this, e, this.nodeData), e.draggable = !1, this.root.appendChild(e);
  const t = this.nodeData.children;
  if (!(!t || t.length === 0)) {
    if (this.direction === 2) {
      let n = 0, i = 0;
      t.map((o) => {
        o.direction === void 0 ? n <= i ? (o.direction = 0, n += 1) : (o.direction = 1, i += 1) : o.direction === 0 ? n += 1 : i += 1;
      });
    }
    this.createChildren(this.nodeData.children, this.box, this.direction), console.timeEnd("layout");
  }
}
let Q = document, M = 1e4, F = 1e4, D = 1e4, R = 1e4, O = 40, ht = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
function Te() {
  M = 1e4, F = 1e4, D = 1e4, R = 1e4, O = 40;
}
function Me() {
  Te();
  let e = Q.querySelectorAll(".mindbox > grp, root"), t = "";
  for (let s = 0; s < e.length; s++) {
    let l = e[s], r = l.getBoundingClientRect(), a = l.offsetTop, h = a + r.height, d = l.offsetLeft, y = d + r.width;
    a < M && (M = a), h > F && (F = h), d < D && (D = d), y > R && (R = y), t += De(l);
  }
  console.log(M, F, D, R), t += pt();
  let n = F - M + O * 2, i = R - D + O * 2, o = ft(n, i);
  return t = `<rect x="0" y="0" width="${i}" height="${n}" fill="#f6f6f6"></rect>` + t, o.innerHTML = t, o;
}
function ut() {
  Q = this.container, Te();
  let e = Q.querySelectorAll(".mindbox > grp, root"), t = "";
  for (let o = 0; o < e.length; o++) {
    let s = e[o], l = s.getBoundingClientRect(), r = s.offsetTop, a = r + l.height, h = s.offsetLeft, d = h + l.width;
    r < M && (M = r), a > F && (F = a), h < D && (D = h), d > R && (R = d), t += De(s);
  }
  console.log(M, F, D, R);
  let n = F - M, i = R - D;
  return console.log("svgHeight", n), [n + 5, i + 5];
}
function ft(e, t) {
  let n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  return n.setAttribute("height", e), n.setAttribute("width", t), n.setAttribute("xmlns", "http://www.w3.org/2000/svg"), n.setAttribute("version", "1.2"), n.setAttribute("xlink", "http://www.w3.org/1999/xlink"), n;
}
function pt() {
  let e = document.querySelector("root"), t = document.querySelector("root > tpc"), n = t.getBoundingClientRect(), i = getComputedStyle(t), o = t.parentNode, s = 0, l = 0, r = document.querySelector("root > tpc").nodeObj, a = getComputedStyle(o), h = e.offsetTop - M, d = e.offsetLeft - D, y = l + parseInt(a.paddingLeft) + parseInt(n.paddingLeft), u = s + parseInt(a.paddingTop) + parseInt(n.paddingTop) + parseInt(n.fontSize);
  s + parseInt(a.paddingTop) + parseInt(n.paddingTop);
  let p = document.querySelector(".svg2nd"), N = "";
  if (r.tags && r.tags.length) {
    let g = t.querySelectorAll(".tags > span");
    for (let c = 0; c < g.length; c++) {
      let m = g[c], f = m.getBoundingClientRect();
      N += `<rect x="${y}" y="${u + 4}" rx="5px" ry="5px" width="${f.width}" height="${f.height}" style="fill: #d6f0f8;"></rect>
        <foreignObject x="${y}" y="${u + 4}" rx="5px" ry="5px" width="${f.width}" height="${f.height}" > 
          <div sytle="font-size:12px">${m.innerHTML}</div>
        </foreignObject>
      `;
    }
  }
  let E = "";
  if (r.icons && r.icons.length) {
    let g = t.querySelectorAll(".icons > span");
    for (let c = 0; c < g.length; c++) {
      let m = g[c];
      m.getBoundingClientRect(), E += `
      <tspan>${m.innerHTML}</tspan>`;
    }
  }
  let b = "";
  if (r.image && r.image.length) {
    let g = tpc.querySelectorAll(".image");
    for (let c = 0; c < g.length; c++) {
      let m = g[c];
      m.getBoundingClientRect(), b += `${m.outerHTML}`;
    }
  }
  let x = `<g transform="translate(${O - D}, ${O - M})">${p.innerHTML}</g>`;
  x += `<g id="root" transform="translate(${d + O}, ${h + O})">
      <rect x="${l}" y="${s}" rx="5px" ry="5px" width="${n.width}" height="${n.height}" style="fill: #00aaff;"></rect>
      <foreignObject x="${l + 15}" y="${s + 10}" width="${i.width}" height="${i.height}" ">
        <div xmlns="http://www.w3.org/1999/xhtml" style="padding:0;margin:0;font-family:\u5FAE\u8F6F\u96C5\u9ED1;font-size:${i.fontSize};font-weight:${i.fontWeight};color:${i.color};word-break: break-all;line-height: 1">
        ${r.topic}
        ${E}
        ${b}
      </div>
      </foreignObject>
      ${N}
  </g>`;
  let k = Q.querySelector(".topiclinks");
  return k && (x += `<g transform="translate(${O - D}, ${O - M})">${k.innerHTML}</g>`), x;
}
function De(e) {
  let t = e.querySelectorAll("tpc"), n = e.offsetTop - M, i = e.offsetLeft - D, o = "", s = e.querySelector(".svg3rd");
  o += `<g transform="translate(${i + O}, ${n + O})">`, o += s ? s.innerHTML : "";
  for (let l = 0; l < t.length; l++) {
    let r = t[l], a = r.parentNode, h = r.nodeObj;
    if (h.root)
      continue;
    let d = r.getBoundingClientRect(), y = a.offsetTop, u = a.offsetLeft, p = getComputedStyle(r), N = getComputedStyle(a), E = u + parseInt(N.paddingLeft) + parseInt(p.paddingLeft), b = y + parseInt(N.paddingTop) + parseInt(p.paddingTop) + parseInt(p.fontSize), x = y + parseInt(N.paddingTop) + parseInt(p.paddingTop), k = "";
    p.borderWidth != "0px" && (k = `<rect x="${u + 15}" y="${y}" rx="5px" ry="5px" width="${d.width}" height="${d.height}" style="fill: rgba(0,0,0,0); stroke:#444;stroke-width:1px;"></rect>`);
    let g = "";
    p.backgroundColor != "rgba(0, 0, 0, 0)" && (g = `<rect x="${u + 15}" y="${y}" rx="5px" ry="5px" width="${d.width}" height="${d.height}" style="fill: ${p.backgroundColor};"></rect>`);
    let c = "";
    if (h.tags && h.tags.length) {
      let C = r.querySelectorAll(".tags > span");
      for (let w = 0; w < C.length; w++) {
        let v = C[w], A = v.getBoundingClientRect();
        c += `<rect x="${E}" y="${b + 4}" rx="5px" ry="5px" width="${A.width}" height="${A.height}" style="fill: #d6f0f8;"></rect>
          <foreignObject x="${E}" y="${b + 4}" rx="5px" ry="5px" width="${A.width}" height="${A.height}" > 
            <div sytle="font-size:12px">${v.innerHTML}</div>
          </foreignObject>`;
      }
    }
    let m = "";
    if (h.icons && h.icons.length) {
      let C = r.querySelectorAll(".icons > span");
      for (let w = 0; w < C.length; w++) {
        let v = C[w];
        v.getBoundingClientRect(), m += `
        <tspan>${v.innerHTML}</tspan>`;
      }
    }
    let f = "";
    if (h.image && h.image.length) {
      let C = r.querySelectorAll(".image");
      for (let w = 0; w < C.length; w++) {
        let v = C[w];
        v.getBoundingClientRect(), f += `${v.outerHTML}`;
      }
    }
    o += `<g id="${h.id}">
      ${k}
      ${g}
      <foreignObject  x="${E}" y="${x}" width="${p.width}" height="${p.height}">
      <div xmlns="http://www.w3.org/1999/xhtml" style="padding:0;margin:0;font-family:\u5FAE\u8F6F\u96C5\u9ED1;font-size:${p.fontSize};font-weight:${p.fontWeight};color:${p.color};word-break: break-all;line-height: 1">
        ${h.topic}
        ${m}
        ${f}
      </div>
      </foreignObject>
      ${c}
  </g>`;
  }
  return o += "</g>", o;
}
let gt = function() {
  let e = Me(), t = URL.createObjectURL(
    new Blob([ht + e.outerHTML.replace(/&nbsp;/g, " ")])
  ), n = document.createElement("a");
  n.href = t, n.download = "me-mindmap.svg", n.click();
}, mt = function(e = this, t = "default") {
  return Q = e.container, Me();
};
function le(e) {
  return e.isFocusMode ? e.nodeDataBackup : e.nodeData;
}
const yt = function(e, t, n) {
  if (!!e) {
    if (console.time("selectNode"), typeof e == "string")
      return this.selectNode($(e));
    if (this.ctrlRepeat ? (e.className === "selected" ? e.className = "" : e.className = "selected", console.log(this.currentSummaryNodeArr)) : (this.currentNode && (this.currentNode.className = ""), e.className = "selected"), this != null && this.widthControll) {
      const i = e.querySelector("widthControllRight");
      i.className = "width-controll-right";
      const o = e.querySelector("widthControllLeft");
      o.className = "width-controll-left";
    }
    this.currentNode = e, t ? this.bus.fire("selectNewNode", e.nodeObj, n) : this.bus.fire("selectNode", e.nodeObj, n), console.timeEnd("selectNode");
  }
}, vt = function() {
  if (this.currentNode && (this.currentNode.className = "", this.widthControll)) {
    const e = this.currentNode.querySelector("widthControllRight");
    e.className = "";
    const t = this.currentNode.querySelector("widthControllLeft");
    t.className = "";
  }
  this.currentNode = null, this.bus.fire("unselectNode");
}, bt = function() {
  if (!this.currentNode || this.currentNode.dataset.nodeid === "meroot")
    return;
  const e = this.currentNode.parentElement.parentElement.nextSibling;
  let t;
  const n = this.currentNode.parentElement.parentElement;
  if (n.className === "rhs" || n.className === "lhs") {
    const i = this.mindElixirBox.querySelectorAll("." + n.className), o = Array.from(i).indexOf(n);
    if (o + 1 < i.length)
      t = i[o + 1].firstChild.firstChild;
    else
      return !1;
  } else if (e)
    t = e.firstChild.firstChild;
  else
    return !1;
  return this.selectNode(t), !0;
}, Nt = function() {
  if (!this.currentNode || this.currentNode.dataset.nodeid === "meroot")
    return;
  const e = this.currentNode.parentElement.parentElement.previousSibling;
  let t;
  const n = this.currentNode.parentElement.parentElement;
  if (n.className === "rhs" || n.className === "lhs") {
    const i = this.mindElixirBox.querySelectorAll("." + n.className), o = Array.from(i).indexOf(n);
    if (o - 1 >= 0)
      t = i[o - 1].firstChild.firstChild;
    else
      return !1;
  } else if (e)
    t = e.firstChild.firstChild;
  else
    return !1;
  return this.selectNode(t), !0;
}, xt = function() {
  if (!this.currentNode)
    return;
  const e = this.currentNode.parentElement.nextSibling;
  if (e && e.firstChild) {
    const t = e.firstChild.firstChild.firstChild;
    this.selectNode(t);
  }
}, Ct = function() {
  if (!this.currentNode || this.currentNode.dataset.nodeid === "meroot")
    return;
  const e = this.currentNode.parentElement.parentElement.parentElement.previousSibling;
  if (e) {
    const t = e.firstChild;
    this.selectNode(t);
  }
}, kt = function() {
  const e = {
    direction: this.direction,
    nodeData: le(this),
    linkData: this.linkData
  };
  return JSON.stringify(e, (t, n) => {
    if (t !== "parent")
      return t === "from" || t === "to" ? n.nodeObj.id : n;
  });
}, Et = function() {
  const e = {
    direction: this.direction,
    nodeData: le(this),
    linkData: this.linkData
  };
  return JSON.parse(
    JSON.stringify(e, (t, n) => {
      if (t !== "parent")
        return t === "from" || t === "to" ? n.nodeObj.id : n;
    })
  );
};
function ue(e, t, n) {
  t < n ? e.expanded = !0 : e.expanded = !1;
  for (const i of e.children || [])
    ue(i, t + 1, n);
}
const wt = function() {
  const e = Number(this.container.querySelector(".numberSelection").value) || 2, t = {
    direction: this.direction,
    nodeData: le(this),
    linkData: this.linkData,
    height: ut.call(this),
    expandDeep: e
  };
  return ue(t.nodeData, 0, e), JSON.parse(
    JSON.stringify(t, (n, i) => {
      if (n !== "parent")
        return n === "from" || n === "to" ? i.nodeObj.id : i;
    })
  );
}, St = function() {
  const e = le(this);
  let t = "# " + e.topic + `

`;
  function n(i, o) {
    for (let s = 0; s < i.length; s++)
      o <= 6 ? t += "".padStart(o, "#") + " " + i[s].topic + `

` : t += "".padStart(o - 7, "	") + "- " + i[s].topic + `
`, i[s].children && n(i[s].children, o + 1);
  }
  return n(e.children, 2), t;
}, Lt = function() {
  this.editable = !0;
}, $t = function() {
  this.editable = !1;
}, At = function(e) {
  this.scaleVal = e, this.map.style.transform = "scale(" + e + ")";
};
function Tt(e) {
  return e.querySelector("root").offsetWidth || 150;
}
function Mt(e) {
  return e.querySelector("root").offsetHeight || 150;
}
function Dt(e, t) {
  var o, s;
  const n = ((o = e == null ? void 0 : e.getBoundingClientRect()) == null ? void 0 : o.top) || 0, i = ((s = t == null ? void 0 : t.getBoundingClientRect()) == null ? void 0 : s.top) || n;
  return Math.abs(n - i);
}
function Ht(e) {
  const t = e.querySelector("root"), n = e.querySelector(".map-canvas children grp");
  return Dt(t, n);
}
const Bt = function() {
  this.container.scrollTo(
    1e4 - this.container.offsetWidth / 2,
    1e4 - this.container.offsetHeight / 2
  );
}, Ot = function() {
  var e;
  ((e = this.nodeData) == null ? void 0 : e.children.length) > 0 ? this.container.scrollTo(
    1e4 - Tt(this.container) / 2 - 10,
    1e4 - Mt(this.container) / 2 - Ht(this.container) - 5
  ) : this.container.scrollTo(
    1e4 - this.container.offsetWidth / 2,
    1e4 - this.container.offsetHeight / 2
  );
}, Pt = function(e) {
  e.nodeObj.root || (this.tempDirection === null && (this.tempDirection = this.direction), this.isFocusMode || (this.nodeDataBackup = this.nodeData, this.isFocusMode = !0), this.nodeData = e.nodeObj, this.nodeData.root = !0, this.initRight());
}, zt = function() {
  this.isFocusMode = !1, this.tempDirection !== null && (delete this.nodeData.root, this.nodeData = this.nodeDataBackup, this.direction = this.tempDirection, this.tempDirection = null, this.init());
}, Ft = function() {
  this.direction = 0, this.init();
}, Rt = function() {
  this.direction = 1, this.init();
}, It = function() {
  this.direction = 2, this.init();
}, qt = function(e) {
  this.locale = e, this.init();
}, jt = function(e, t) {
  const n = e.nodeObj;
  typeof t == "boolean" ? n.expanded = t : n.expanded !== !1 ? n.expanded = !1 : (n.expanded = !0, fe(n)), this.layout(), this.linkDiv(), this.bus.fire("expandNode", n);
}, Vt = function() {
  this.addParentLink(this.nodeData), this.layout(), this.linkDiv();
};
function fe(e) {
  e.expanded = !0;
  for (const t of e.children || [])
    fe(t);
}
const X = document, Wt = function(e) {
  if (!e.style)
    return;
  const t = $(e.id, this), n = {
    color: t.style.color && ve(t.style.color),
    background: t.style.background && ve(t.style.background),
    fontSize: t.style.fontSize && t.style.fontSize + "px",
    fontWeight: t.style.fontWeight
  };
  t.style.color = e.style.color, t.style.background = e.style.background, t.style.fontSize = e.style.fontSize + "px", t.style.fontWeight = e.style.fontWeight || "normal", this.linkDiv(), this.bus.fire("operation", {
    name: "editStyle",
    obj: e,
    origin: n
  });
}, _t = function(e, t) {
  if (!t)
    return;
  const n = e.tags;
  t.length === 0 ? delete e.tags : e.tags = t;
  const i = $(e.id);
  _.call(this, i, e), this.linkDiv(), this.bus.fire("operation", {
    name: "editTags",
    obj: e,
    origin: n
  });
}, Yt = function(e, t) {
  if (!t)
    return;
  const n = e.icons;
  e.icons = t;
  const i = $(e.id);
  _.call(this, i, e), this.linkDiv(), this.bus.fire("operation", {
    name: "editIcons",
    obj: e,
    origin: n
  });
}, Gt = function(e, t) {
  var s, l, r;
  if (t == null || t == null)
    return;
  const n = e.hyperLink, i = t.split(",");
  e.linkJump = (s = e.linkJump) == null ? void 0 : s.filter((a) => !!i.find((h) => h === a.title)), ((l = e.linkJump) == null ? void 0 : l.length) === 0 && delete e.linkJump, e.hyperLink = i.filter((a) => {
    var h;
    return a !== "" && !((h = e.linkJump) != null && h.find((d) => d.title === a));
  }), ((r = e.hyperLink) == null ? void 0 : r.length) === 0 && delete e.hyperLink;
  const o = $(e.id);
  _.call(this, o, e), this.linkDiv(), this.bus.fire("operation", {
    name: "editHyperLink",
    obj: e,
    origin: n
  });
}, Xt = function(e, t) {
  if (t == null || t == null)
    return;
  const n = e.remark;
  e.remark = t;
  const i = $(e.id);
  _.call(this, i, e), this.linkDiv(), this.bus.fire("operation", {
    name: "editRemark",
    obj: e,
    origin: n
  });
}, Ut = function(e, t) {
  const n = e || this.currentNode;
  if (!n)
    return;
  const i = n.nodeObj;
  if (i.root === !0) {
    this.addChild();
    return;
  }
  const o = t || this.generateNewObj();
  Ye(i, o), P(this.nodeData);
  const s = n.parentElement;
  console.time("insertSibling_DOM");
  const { grp: l, top: r } = this.createGroup(o), a = s.parentNode.parentNode;
  a.insertBefore(l, s.parentNode.nextSibling), a.className === "mindbox" ? (this.processPrimaryNode(l, o), this.linkDiv()) : this.linkDiv(l.offsetParent), t || this.createInputDiv(r.children[0]), this.selectNode(r.children[0], !0), console.timeEnd("insertSibling_DOM"), this.bus.fire("operation", {
    name: "insertSibling",
    obj: o
  });
}, Jt = function(e, t) {
  const n = e || this.currentNode;
  if (!n)
    return;
  const i = n.nodeObj;
  if (i.root === !0) {
    this.addChild();
    return;
  }
  const o = t || this.generateNewObj();
  Ge(i, o), P(this.nodeData);
  const s = n.parentElement;
  console.time("insertSibling_DOM");
  const { grp: l, top: r } = this.createGroup(o), a = s.parentNode.parentNode;
  a.insertBefore(l, s.parentNode), a.className === "mindbox" ? (this.processPrimaryNode(l, o), this.linkDiv()) : this.linkDiv(l.offsetParent), t || this.createInputDiv(r.children[0]), this.selectNode(r.children[0], !0), console.timeEnd("insertSibling_DOM"), this.bus.fire("operation", {
    name: "insertSibling",
    obj: o
  });
}, Kt = function(e, t) {
  const n = e || this.currentNode;
  if (!n)
    return;
  const i = n.nodeObj;
  if (i.root === !0)
    return;
  const o = t || this.generateNewObj();
  Xe(i, o), P(this.nodeData);
  const s = n.parentElement.parentElement;
  console.time("insertParent_DOM");
  const { grp: l, top: r } = this.createGroup(o, !0);
  r.appendChild(U(!0));
  const a = s.parentNode;
  s.insertAdjacentElement("afterend", l);
  const h = X.createElement("children");
  h.appendChild(s), r.insertAdjacentElement("afterend", h), a.className === "mindbox" ? (l.className = s.className, s.className = "", s.querySelector(".svg3rd").remove(), this.linkDiv()) : this.linkDiv(l.offsetParent), t || this.createInputDiv(r.children[0]), this.selectNode(r.children[0], !0), console.timeEnd("insertParent_DOM"), this.bus.fire("operation", {
    name: "insertParent",
    obj: o
  });
}, Zt = function(e, t) {
  var r;
  if (!e)
    return;
  const n = e.nodeObj, i = t || this.generateNewSummaryObj();
  n.parent.children.push(i), P(this.nodeData);
  const o = e.parentNode.parentNode.parentNode.parentNode, { smy: s, top: l } = this.createSummary(i);
  if (!((r = o.children) != null && r.smychildren)) {
    const a = X.createElement("smychildren");
    a.setAttribute("name", "smychildren"), o.appendChild(a);
  }
  return o.children.smychildren.appendChild(s), this.layout(), this.linkDiv(), { newTop: l, newNodeObj: i };
}, He = function(e, t) {
  if (!e)
    return;
  const n = e.nodeObj;
  n.expanded === !1 && (this.expandNode(e, !0), e = $(n.id));
  const i = t || this.generateNewObj();
  n.children ? n.children.push(i) : n.children = [i], P(this.nodeData);
  const o = e.parentElement, { grp: s, top: l } = this.createGroup(i);
  if (o.tagName === "T") {
    if (o.children[1])
      o.nextSibling.appendChild(s);
    else {
      const r = X.createElement("children");
      r.appendChild(s), o.appendChild(U(!0)), o.insertAdjacentElement("afterend", r);
    }
    this.layout(), this.linkDiv(s.offsetParent);
  } else
    o.tagName === "ROOT" && (this.processPrimaryNode(s, i), o.nextSibling.appendChild(s), this.linkDiv());
  return { newTop: l, newNodeObj: i };
}, Qt = function(e, t) {
  console.time("addSummary");
  const n = {}, i = [];
  this.container.querySelectorAll("tpc.selected").forEach((o) => {
    var s, l;
    (s = n[o.nodeObj.parent.id]) != null || (n[o.nodeObj.parent.id] = i.length), i[n[o.nodeObj.parent.id]] = (l = i[n[o.nodeObj.parent.id]]) != null ? l : [], i[n[o.nodeObj.parent.id]].push(o);
  }), console.log(i), i.forEach((o) => {
    var a, h, d;
    const s = o[0] || this.currentNode;
    if (this.currentSummaryNodeArr = o, !s || ((d = (h = (a = s == null ? void 0 : s.parentElement) == null ? void 0 : a.parentElement) == null ? void 0 : h.parentElement) == null ? void 0 : d.className) == "mindbox")
      return;
    const { newTop: l, newNodeObj: r } = Zt.call(this, s, t);
    console.timeEnd("addSummary"), t || this.createInputDiv(l.children[0]), this.selectNode(l.children[0], !0), this.bus.fire("operation", {
      name: "addSummary",
      obj: r
    });
  });
}, en = function(e, t) {
  console.time("addChild");
  const n = e || this.currentNode;
  if (!n)
    return;
  const { newTop: i, newNodeObj: o } = He.call(this, n, t);
  console.timeEnd("addChild"), t || this.createInputDiv(i.children[0]), this.selectNode(i.children[0], !0), this.bus.fire("operation", {
    name: "addChild",
    obj: o
  });
}, tn = function(e, t) {
  console.time("copyNode");
  const n = JSON.parse(
    JSON.stringify(e.nodeObj, (o, s) => {
      if (o !== "parent")
        return s;
    })
  );
  we(n);
  const { newNodeObj: i } = He.call(this, t, n);
  console.timeEnd("copyNode"), this.bus.fire("operation", {
    name: "copyNode",
    obj: i
  });
}, nn = function(e) {
  const t = e || this.currentNode;
  if (!t)
    return;
  const n = t.parentNode.parentNode, i = t.nodeObj;
  We(i), n.parentNode.insertBefore(n, n.previousSibling), this.linkDiv(), this.bus.fire("operation", {
    name: "moveUpNode",
    obj: i
  });
}, on = function(e) {
  const t = e || this.currentNode;
  if (!t)
    return;
  const n = t.parentNode.parentNode, i = t.nodeObj;
  _e(i), n.nextSibling ? n.insertAdjacentElement("beforebegin", n.nextSibling) : n.parentNode.prepend(n), this.linkDiv(), this.bus.fire("operation", {
    name: "moveDownNode",
    obj: i
  });
}, sn = function(e) {
  const t = e || this.currentNode;
  if (!t)
    return;
  const n = t.nodeObj;
  if (n.root === !0)
    throw new Error("Can not remove root node");
  const i = n.parent.children.findIndex((a) => a === n), o = n.parent.children[i + 1], s = o && o.id, l = se(n), r = t.parentNode;
  if (r.tagName !== "ROOT") {
    if (l === 0) {
      const a = r.parentNode.parentNode.previousSibling;
      a.tagName !== "ROOT" && a.children[1].remove(), this.selectParent();
    } else
      this.selectPrevSibling() || this.selectNextSibling();
    for (const a in this.linkData) {
      const h = this.linkData[a];
      (h.from === r.firstChild || h.to === r.firstChild) && this.removeLink(
        this.mindElixirBox.querySelector(
          `[data-linkid=${this.linkData[a].id}]`
        )
      );
    }
    r.parentNode.remove(), this.linkDiv(), this.bus.fire("operation", {
      name: "removeNode",
      obj: n,
      originSiblingId: s,
      originParentId: n.parent.id
    });
  }
}, ln = function(e, t) {
  const n = e.nodeObj, i = t.nodeObj, o = n.parent.id;
  if (i.expanded === !1 && (this.expandNode(t, !0), e = $(n.id), t = $(i.id)), !Ve(n, i)) {
    console.warn("Invalid move");
    return;
  }
  console.time("moveNode"), Ue(n, i), P(this.nodeData);
  const s = e.parentElement, l = s.parentNode.parentNode, r = t.parentElement;
  if (l.className === "mindbox" ? s.parentNode.lastChild.remove() : s.parentNode.className === "mindbox" && (s.style.cssText = ""), r.tagName === "T")
    if (l.className === "mindbox" && (s.parentNode.className = ""), r.children[1])
      r.nextSibling.appendChild(s.parentNode);
    else {
      const a = X.createElement("children");
      a.appendChild(s.parentNode), r.appendChild(U(!0)), r.parentElement.insertBefore(a, r.nextSibling);
    }
  else
    r.tagName === "ROOT" && (this.processPrimaryNode(s.parentNode, n), r.nextSibling.appendChild(s.parentNode));
  this.linkDiv(), this.bus.fire("operation", {
    name: "moveNode",
    obj: { fromObj: n, toObj: i, originParentId: o }
  }), console.timeEnd("moveNode");
}, rn = function(e, t) {
  const n = e.nodeObj, i = t.nodeObj, o = n.parent.id;
  Je(n, i), P(this.nodeData);
  const s = e.parentElement, l = s.parentNode, r = t.parentElement, a = r.parentNode;
  r.parentNode.parentNode.insertBefore(l, a), this.processPrimaryNode(s.parentElement, n), this.linkDiv(), this.bus.fire("operation", {
    name: "moveNodeBefore",
    obj: { fromObj: n, toObj: i, originParentId: o }
  });
}, cn = function(e, t) {
  const n = e.nodeObj, i = t.nodeObj, o = n.parent.id;
  Ke(n, i), P(this.nodeData);
  const s = e.parentElement, l = s.parentNode, r = t.parentElement, a = r.parentNode;
  r.parentNode.parentNode.insertBefore(l, a.nextSibling), this.processPrimaryNode(s.parentElement, n), this.linkDiv(), this.bus.fire("operation", {
    name: "moveNodeAfter",
    obj: { fromObj: n, toObj: i, originParentId: o }
  });
}, an = function(e) {
  const t = e || this.currentNode;
  !t || this.createInputDiv(t);
}, dn = function(e, t) {
  e.childNodes[0].textContent = t, e.nodeObj.topic = t, this.linkDiv();
};
function hn(e, t) {
  if (this.direction === 0)
    e.className = "lhs";
  else if (this.direction === 1)
    e.className = "rhs";
  else if (this.direction === 2) {
    const n = X.querySelectorAll(".lhs").length, i = X.querySelectorAll(".rhs").length;
    n <= i ? (e.className = "lhs", t.direction = 0) : (e.className = "rhs", t.direction = 1);
  }
}
const un = function(e, t, n, i) {
  const o = this.map.getBoundingClientRect();
  if (!e || !t)
    return;
  const s = e.getBoundingClientRect(), l = t.getBoundingClientRect(), r = (s.x + s.width / 2 - o.x) / this.scaleVal, a = (s.y + s.height / 2 - o.y) / this.scaleVal, h = (l.x + l.width / 2 - o.x) / this.scaleVal, d = (l.y + l.height / 2 - o.y) / this.scaleVal;
  let y, u, p, N;
  n ? (y = r + i.delta1.x, u = a + i.delta1.y, p = h + i.delta2.x, N = d + i.delta2.y) : (a + d) / 2 - a <= s.height / 2 ? (y = (s.x + s.width - o.x) / this.scaleVal + 100, u = a, p = (l.x + l.width - o.x) / this.scaleVal + 100, N = d) : (y = (r + h) / 2, u = (a + d) / 2, p = (r + h) / 2, N = (a + d) / 2);
  const E = {
    cx: r,
    cy: a,
    w: s.width,
    h: s.height
  }, b = {
    cx: h,
    cy: d,
    w: l.width,
    h: l.height
  }, x = ce(E, y, u), k = x.x, g = x.y, c = ae(b, p, N), m = c.x, f = c.y, C = Se(p, N, m, f), w = tt(
    `M ${k} ${g} C ${y} ${u} ${p} ${N} ${m} ${f}`,
    `M ${C.x1} ${C.y1} L ${m} ${f} L ${C.x2} ${C.y2}`
  );
  let v;
  n ? (v = {
    id: i.id,
    label: "",
    from: e,
    to: t,
    delta1: {
      x: y - r,
      y: u - a
    },
    delta2: {
      x: p - h,
      y: N - d
    }
  }, this.linkData[i.id] = v, w.linkObj = v, w.dataset.linkid = i.id) : (v = {
    id: ee(),
    label: "",
    from: e,
    to: t,
    delta1: {
      x: y - r,
      y: u - a
    },
    delta2: {
      x: p - h,
      y: N - d
    }
  }, this.linkData[v.id] = v, w.linkObj = v, w.dataset.linkid = v.id, this.currentLink = w), this.linkSvgGroup.appendChild(w), n || this.showLinkController(y, u, p, N, v, E, b);
}, fn = function(e) {
  let t;
  if (e ? t = e : t = this.currentLink, !t)
    return;
  this.hideLinkController();
  const n = t.linkObj.id;
  delete this.linkData[n], t.remove(), t = null;
}, pn = function(e) {
  this.currentLink = e;
  const t = e.linkObj, n = t.from, i = t.to, o = this.map.getBoundingClientRect(), s = n.getBoundingClientRect(), l = i.getBoundingClientRect(), r = (s.x + s.width / 2 - o.x) / this.scaleVal, a = (s.y + s.height / 2 - o.y) / this.scaleVal, h = (l.x + l.width / 2 - o.x) / this.scaleVal, d = (l.y + l.height / 2 - o.y) / this.scaleVal, y = {
    cx: r,
    cy: a,
    w: s.width,
    h: s.height
  }, u = {
    cx: h,
    cy: d,
    w: l.width,
    h: l.height
  }, p = r + t.delta1.x, N = a + t.delta1.y, E = h + t.delta2.x, b = d + t.delta2.y;
  this.showLinkController(p, N, E, b, t, y, u);
}, gn = function() {
  this.linkController.style.display = "none", this.P2.style.display = "none", this.P3.style.display = "none";
}, mn = function(e, t, n, i, o, s, l) {
  this.linkController.style.display = "initial", this.P2.style.display = "initial", this.P3.style.display = "initial";
  const r = ce(s, e, t);
  let a = r.x, h = r.y;
  const d = ae(l, n, i);
  let y = d.x, u = d.y;
  this.P2.style.cssText = `top:${t}px;left:${e}px;`, this.P3.style.cssText = `top:${i}px;left:${n}px;`, this.line1.setAttribute("x1", a), this.line1.setAttribute("y1", h), this.line1.setAttribute("x2", e), this.line1.setAttribute("y2", t), this.line2.setAttribute("x1", n), this.line2.setAttribute("y1", i), this.line2.setAttribute("x2", y), this.line2.setAttribute("y2", u), this.helper1 && (this.helper1.destory(this.map), this.helper2.destory(this.map)), this.helper1 = new Z(this.P2), this.helper2 = new Z(this.P3), this.helper1.init(this.map, (p, N) => {
    e = e - p / this.scaleVal, t = t - N / this.scaleVal;
    const E = ce(s, e, t);
    a = E.x, h = E.y, this.P2.style.top = t + "px", this.P2.style.left = e + "px", this.currentLink.children[0].setAttribute(
      "d",
      `M ${a} ${h} C ${e} ${t} ${n} ${i} ${y} ${u}`
    ), this.line1.setAttribute("x1", a), this.line1.setAttribute("y1", h), this.line1.setAttribute("x2", e), this.line1.setAttribute("y2", t), o.delta1.x = e - s.cx, o.delta1.y = t - s.cy;
  }), this.helper2.init(this.map, (p, N) => {
    n = n - p / this.scaleVal, i = i - N / this.scaleVal;
    const E = ae(l, n, i);
    y = E.x, u = E.y;
    const b = Se(n, i, y, u);
    this.P3.style.top = i + "px", this.P3.style.left = n + "px", this.currentLink.children[0].setAttribute(
      "d",
      `M ${a} ${h} C ${e} ${t} ${n} ${i} ${y} ${u}`
    ), this.currentLink.children[1].setAttribute(
      "d",
      `M ${b.x1} ${b.y1} L ${y} ${u} L ${b.x2} ${b.y2}`
    ), this.line2.setAttribute("x1", n), this.line2.setAttribute("y1", i), this.line2.setAttribute("x2", y), this.line2.setAttribute("y2", u), o.delta2.x = n - l.cx, o.delta2.y = i - l.cy;
  });
};
function yn(e) {
  var b, x;
  var t = this.primaryNodeHorizontalGap || 65, n = this.primaryNodeVerticalGap || 25;
  console.time("linkDiv");
  const i = this.root;
  i.style.cssText = `top:${1e4 - i.offsetHeight / 2}px;left:${1e4 - i.offsetWidth / 2}px;`;
  const o = this.box.children;
  this.svg2nd.innerHTML = "";
  let s = 0, l, r = 0, a = 0, h = 0, d = 0, y = 0, u;
  if (this.direction === 2) {
    let k = 0, g = 0, c = 0, m = 0;
    for (let f = 0; f < o.length; f++) {
      const C = o[f];
      C.className === "lhs" ? (d += C.offsetHeight + n, c += C.offsetHeight, k += 1) : (y += C.offsetHeight + n, m += C.offsetHeight, g += 1);
    }
    d > y ? (u = 1e4 - Math.max(d) / 2, l = "r", r = (d - m) / (g - 1)) : (u = 1e4 - Math.max(y) / 2, l = "l", r = (y - c) / (k - 1));
  } else {
    for (let k = 0; k < o.length; k++)
      s += o[k].offsetHeight + n;
    u = 1e4 - s / 2;
  }
  let p = "";
  const N = 1e4 - i.offsetWidth / 2 - t + 60, E = 1e4 + i.offsetWidth / 2 + t - 60;
  for (let k = 0; k < o.length; k++) {
    let g, c;
    const m = o[k], f = m.offsetHeight;
    let C = i.offsetLeft - 10;
    if (m.className === "lhs") {
      m.style.top = u + a + "px", m.style.left = N - m.offsetWidth + "px", g = N - 15, c = u + a + f / 2;
      let v = 1e4;
      this.primaryLinkStyle === 2 ? (this.direction === 2 && (v = 1e4 - i.offsetWidth / 6), c < 1e4 ? p += `M ${v} 10000 V ${c + 20} C ${v} ${c} ${v} ${c} ${v - 20} ${c} H ${g}` : p += `M ${v} 10000 V ${c - 20} C ${v} ${c} ${v} ${c} ${v - 20} ${c} H ${g}`) : p += `M 10000 10000 H ${C} V ${c} H ${g}`, l === "l" ? a += f + r : a += f + n;
    } else {
      C = i.offsetLeft + i.offsetWidth + 10, m.style.top = u + h + "px", m.style.left = E + "px", g = E + 15, c = u + h + f / 2;
      let v = 1e4;
      this.primaryLinkStyle === 2 ? (this.direction === 2 && (v = 1e4 + i.offsetWidth / 6), c < 1e4 ? p += `M ${v} 10000 V ${c + 20} C ${v} ${c} ${v} ${c} ${v + 20} ${c} H ${g}` : p += `M ${v} 10000 V ${c - 20} C ${v} ${c} ${v} ${c} ${v + 20} ${c} H ${g}`) : p += `M 10000 10000 H ${C} V ${c} H ${g}`, l === "r" ? h += f + r : h += f + n;
    }
    const w = m.children[0].children[1];
    w && (w.style.top = (w.parentNode.offsetHeight - w.offsetHeight) / 2 + "px", m.className === "lhs" ? w.style.left = -10 + "px" : w.style.left = w.parentNode.offsetWidth - 10 + "px");
  }
  this.svg2nd.appendChild(Ze(p));
  for (let k = 0; k < o.length; k++) {
    const g = o[k];
    if (!(e && e !== o[k]) && g.childElementCount) {
      const c = K("svg3rd"), m = K("svg3rd");
      g.querySelectorAll(".svg3rd").forEach((w) => {
        w.remove();
      }), g.appendChild(c);
      const f = g.children[0];
      let C;
      ((x = (b = g.children) == null ? void 0 : b[2]) == null ? void 0 : x.tagName) === "SMYCHILDREN" ? C = [...g.children[1].children, ...g.children[2].children] : C = g.children[1].children, q = "", ie = "", Be(C, f, this.nodeData.children[k], !0), c.appendChild(et(q)), ie.length > 0 && (g.appendChild(m), m.appendChild(Qe(ie)));
    }
  }
  this.linkSvgGroup.innerHTML = "";
  for (const k in this.linkData) {
    const g = this.linkData[k];
    typeof g.from == "string" ? this.createLink($(g.from), $(g.to), !0, g) : this.createLink(
      $(g.from.nodeObj.id),
      $(g.to.nodeObj.id),
      !0,
      g
    );
  }
  console.timeEnd("linkDiv");
}
let q = "", ie = "";
function Be(e, t, n, i) {
  var h, d, y;
  let o = t.offsetTop, s = t.offsetLeft, l = t.offsetWidth, r = t.offsetHeight, a = !1;
  t.offsetParent.tagName === "SMY" && (a = !0, o += t.offsetParent.offsetTop, s += t.offsetParent.offsetLeft);
  for (let u = 0; u < e.length; u++) {
    const p = e[u];
    if ((p == null ? void 0 : p.tagName) === "SMY") {
      let v = e[0], A = e[u - 1];
      const z = {};
      n.children[u].summary.range.forEach((V) => {
        z[V] = !0;
      });
      let te = !0;
      for (let V = 0; V < u; V++) {
        const Fe = e[V].children[0].children[0].getAttribute("data-nodeid").slice(2);
        z[Fe] && (te && (te = !1, v = e[V]), A = e[V]);
      }
      const ge = v.offsetLeft + v.offsetWidth + 8, me = v.offsetTop + 15, ye = A.offsetTop + A.offsetHeight - 5, Pe = A.offsetLeft + A.offsetWidth + 8, ze = p.offsetTop + p.children[0].offsetTop + p.children[0].offsetHeight;
      let ne = (h = p.style.top) != null ? h : 0;
      typeof ne == "string" && (ne = Number(ne.replace("px", ""))), p.style.top = ne + (ye + me + 20) / 2 - ze + "px", ie += `M ${ge} ${me} H ${ge + 10} V ${ye} H${Pe}`;
    }
    const N = p.children[0];
    let E = N.offsetTop, b = N.offsetHeight;
    a && (E += N.offsetParent.offsetTop);
    let x;
    i || a ? x = o + r / 2 : x = o + r;
    const k = E + b;
    let g, c, m;
    const f = p.offsetParent.className || p.offsetParent.offsetParent.className;
    f === "lhs" && (p == null ? void 0 : p.tagName) !== "SMY" ? (g = s + 15, m = s, c = s - N.offsetWidth, E + b < o + r / 2 + 50 && E + b > o + r / 2 - 50 ? q += `M ${g} ${x} H ${m} V ${k} H ${c}` : E + b >= o + r / 2 ? q += `M ${g} ${x} H ${m} V ${k} H ${c}` : q += `M ${g} ${x} H ${m} V ${k} H ${c}`) : f === "rhs" && (p == null ? void 0 : p.tagName) !== "SMY" && (g = s + l - 15, a && (g += 15), m = s + l, c = s + l + N.offsetWidth, E + b < o + r / 2 + 50 && E + b > o + r / 2 - 50 ? q += `M ${g} ${x} H ${m} V ${k} H ${c}` : E + b >= o + r / 2 ? q += `M ${g} ${x} H ${m} V ${k} H ${c}` : q += `M ${g} ${x} H ${m} V ${k} H ${c}`);
    const C = N.children[1];
    if (C) {
      if (C.style.top = (N.offsetHeight - C.offsetHeight) / 2 + "px", f === "lhs" ? C.style.left = -10 + "px" : f === "rhs" && (C.style.left = N.offsetWidth - 10 + "px"), !C.expanded)
        continue;
    } else
      continue;
    let w;
    ((y = (d = p.children) == null ? void 0 : d[2]) == null ? void 0 : y.tagName) === "SMYCHILDREN" ? w = [...p.children[1].children, ...p.children[2].children] : w = [...p.children[1].children], w.length > 0 && Be(w, N, n.children[u]);
  }
}
function vn(e) {
  e.map.addEventListener("click", (t) => {
    t.target.nodeName === "EPD" ? e.expandNode(t.target.previousSibling) : t.target.parentElement.nodeName === "T" || t.target.parentElement.nodeName === "ROOT" ? e.selectNode(t.target, !1, t) : t.target.nodeName === "path" ? t.target.parentElement.nodeName === "g" && e.selectLink(t.target.parentElement) : t.target.className === "circle" || (e.unselectNode(), e.container.querySelectorAll("tpc.selected").forEach((n) => {
      n.className = "";
    }), e.hideLinkController());
  }), e.map.addEventListener("dblclick", (t) => {
    if (t.preventDefault(), !!e.editable) {
      if (t.target.parentElement.nodeName === "T" || t.target.parentElement.nodeName === "ROOT")
        e.beginEdit(t.target);
      else if (t.target.className !== "content") {
        let n = t.target;
        for (; n.parentElement; )
          if (n = n.parentElement, n.nodeName === "TPC") {
            e.beginEdit(n);
            break;
          }
      }
    }
  }), e.map.addEventListener("mousemove", (t) => {
    if (!e.nodeDraggable && t && t.target.className === "selected") {
      W.clear(), t.target.draggable = !1;
      return;
    }
    t.target.contentEditable !== "true" && W.onMove(t, e.container);
  }), e.map.addEventListener("mousedown", (t) => {
    t.target.contentEditable !== "true" && (W.afterMoving = !1, W.mousedown = !0);
  }), e.map.addEventListener("mouseleave", (t) => {
    W.clear();
  }), e.map.addEventListener("mouseup", (t) => {
    W.clear();
  }), e.map.addEventListener("wheel", (t) => {
  });
}
const xe = {
  addChild: "\u63D2\u5165\u5B50\u8282\u70B9",
  addParent: "\u63D2\u5165\u7236\u8282\u70B9",
  addSibling: "\u63D2\u5165\u540C\u7EA7\u8282\u70B9",
  removeNode: "\u5220\u9664\u8282\u70B9",
  focus: "\u4E13\u6CE8",
  cancelFocus: "\u53D6\u6D88\u4E13\u6CE8",
  moveUp: "\u4E0A\u79FB",
  moveDown: "\u4E0B\u79FB",
  clickTips: "\u8BF7\u70B9\u51FB\u76EE\u6807\u8282\u70B9",
  font: "\u6587\u5B57",
  background: "\u80CC\u666F",
  tag: "\u6807\u7B7E",
  icon: "\u56FE\u6807",
  tagsSeparate: "\u591A\u4E2A\u6807\u7B7E\u534A\u89D2\u9017\u53F7\u5206\u9694",
  iconsSeparate: "\u591A\u4E2A\u56FE\u6807\u534A\u89D2\u9017\u53F7\u5206\u9694",
  link: "\u8FDE\u7EBF",
  nodeLink: "\u4E3B\u9898\u5185\u8D85\u94FE\u63A5",
  hyperlink: "\u8D85\u94FE\u63A5",
  linkSeparate: "\u94FE\u63A5\u5730\u5740,\u591A\u4E2A\u94FE\u63A5\u534A\u89D2\u9017\u53F7\u5206\u9694",
  remark: "\u5907\u6CE8",
  reamrkSeparate: "\u5185\u5BB9",
  summary: "\u6982\u8981"
}, S = {
  cn: xe,
  zh_CN: xe,
  zh_TW: {
    addChild: "\u63D2\u5165\u5B50\u7BC0\u9EDE",
    addParent: "\u63D2\u5165\u7236\u7BC0\u9EDE",
    addSibling: "\u63D2\u5165\u540C\u7D1A\u7BC0\u9EDE",
    removeNode: "\u522A\u9664\u7BC0\u9EDE",
    focus: "\u5C08\u6CE8",
    cancelFocus: "\u53D6\u6D88\u5C08\u6CE8",
    moveUp: "\u4E0A\u79FB",
    moveDown: "\u4E0B\u79FB",
    link: "\u9023\u63A5",
    clickTips: "\u8ACB\u9EDE\u64CA\u76EE\u6A19\u7BC0\u9EDE",
    font: "\u6587\u5B57",
    background: "\u80CC\u666F",
    tag: "\u6A19\u7C3D",
    icon: "\u5716\u6A19",
    tagsSeparate: "\u591A\u500B\u6A19\u7C3D\u534A\u89D2\u9017\u865F\u5206\u9694",
    iconsSeparate: "\u591A\u500B\u5716\u6A19\u534A\u89D2\u9017\u865F\u5206\u9694"
  },
  en: {
    addChild: "Add child",
    addParent: "Add parent",
    addSibling: "Add sibling",
    removeNode: "Remove node",
    focus: "Focus Mode",
    cancelFocus: "Cancel Focus Mode",
    moveUp: "Move up",
    moveDown: "Move down",
    link: "Link",
    clickTips: "Please click the target node",
    font: "Font",
    background: "Background",
    tag: "Tag",
    icon: "Icon",
    tagsSeparate: "Separate tags by comma",
    iconsSeparate: "Separate icons by comma",
    hyperlink: "hyperlink",
    linkSeparate: "link address",
    remark: "remark",
    reamrkSeparate: "content",
    summary: "summary",
    nodeLink: "inner link"
  },
  ja: {
    addChild: "\u5B50\u30CE\u30FC\u30C9\u3092\u8FFD\u52A0\u3059\u308B",
    addParent: "\u89AA\u30CE\u30FC\u30C9\u3092\u8FFD\u52A0\u3057\u307E\u3059",
    addSibling: "\u5144\u5F1F\u30CE\u30FC\u30C9\u3092\u8FFD\u52A0\u3059\u308B",
    removeNode: "\u30CE\u30FC\u30C9\u3092\u524A\u9664",
    focus: "\u96C6\u4E2D",
    cancelFocus: "\u96C6\u4E2D\u89E3\u9664",
    moveUp: "\u4E0A\u3078\u79FB\u52D5",
    moveDown: "\u4E0B\u3078\u79FB\u52D5",
    link: "\u30B3\u30CD\u30AF\u30C8",
    clickTips: "\u30BF\u30FC\u30B2\u30C3\u30C8\u30CE\u30FC\u30C9\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u304F\u3060\u3055\u3044",
    font: "\u30D5\u30A9\u30F3\u30C8",
    background: "\u30D0\u30C3\u30AF\u30B0\u30E9\u30A6\u30F3\u30C9",
    tag: "\u30BF\u30B0",
    icon: "\u30A2\u30A4\u30B3\u30F3",
    tagsSeparate: "\u8907\u6570\u30BF\u30B0\u306F\u30AB\u30F3\u30DE\u533A\u5207\u308A",
    iconsSeparate: "\u8907\u6570\u30A2\u30A4\u30B3\u30F3\u306F\u30AB\u30F3\u30DE\u533A\u5207\u308A"
  },
  pt: {
    addChild: "Adicionar item filho",
    addParent: "Adicionar item pai",
    addSibling: "Adicionar item irmao",
    removeNode: "Remover item",
    focus: "Modo Foco",
    cancelFocus: "Cancelar Modo Foco",
    moveUp: "Mover para cima",
    moveDown: "Mover para baixo",
    link: "Link",
    clickTips: "Favor clicar no item alvo",
    font: "Fonte",
    background: "Cor de fundo",
    tag: "Tag",
    icon: "Icone",
    tagsSeparate: "Separe tags por virgula",
    iconsSeparate: "Separe icones por virgula"
  }
};
function bn(e, t) {
  const n = (g) => {
    const c = document.createElement("div");
    return c.innerText = g, c.style.cssText = "position:absolute;bottom:20px;left:50%;transform:translateX(-50%);", c;
  }, i = (g, c, m) => {
    const f = document.createElement("li");
    return f.id = g, f.innerHTML = `<span>${oe(c)}</span><span>${oe(m)}</span>`, f;
  }, o = S[e.locale] ? e.locale : "en", s = i("cm-add_child", S[o].addChild, "tab"), l = i("cm-add_parent", S[o].addParent, ""), r = i("cm-add_sibling", S[o].addSibling, "enter"), a = i(
    "cm-remove_child",
    S[o].removeNode,
    "delete"
  ), h = i("cm-fucus", S[o].focus, ""), d = i("cm-unfucus", S[o].cancelFocus, ""), y = i("cm-up", S[o].moveUp, "PgUp"), u = i("cm-down", S[o].moveDown, "Pgdn"), p = i("cm-link", S[o].link, ""), N = i("cm-nodelink", S[o].nodeLink, ""), E = i("cm-summary", S[o].summary, ""), b = document.createElement("ul");
  if (b.className = "menu-list", b.appendChild(s), b.appendChild(l), b.appendChild(r), b.appendChild(a), (!t || t.focus) && (b.appendChild(h), b.appendChild(d)), b.appendChild(y), b.appendChild(u), (!t || t.link) && (b.appendChild(p), b.appendChild(N)), b.appendChild(E), t && t.extend)
    for (let g = 0; g < t.extend.length; g++) {
      const c = t.extend[g], m = i(c.name, c.name, c.key || "");
      b.appendChild(m), m.onclick = (f) => {
        c.onclick(f);
      };
    }
  const x = document.createElement("cmenu");
  x.appendChild(b), x.hidden = !0, e.container.append(x);
  let k = !0;
  e.container.oncontextmenu = function(g) {
    if (g.preventDefault(), !e.editable)
      return;
    const c = g.target;
    if (c.tagName === "TPC") {
      c.parentElement.tagName === "ROOT" ? k = !0 : k = !1, k ? (h.className = "disabled", y.className = "disabled", u.className = "disabled", r.className = "disabled", a.className = "disabled") : (h.className = "", y.className = "", u.className = "", r.className = "", a.className = ""), e.selectNode(c), x.hidden = !1;
      const m = b.offsetHeight, f = b.offsetWidth;
      m + g.clientY > window.innerHeight ? (b.style.top = "", b.style.bottom = "0px") : (b.style.bottom = "", b.style.top = g.clientY + 15 + "px"), f + g.clientX > window.innerWidth ? (b.style.left = "", b.style.right = "0px") : (b.style.right = "", b.style.left = g.clientX + 10 + "px");
    }
  }, x.onclick = (g) => {
    g.target === x && (x.hidden = !0);
  }, s.onclick = (g) => {
    e.addChild(), x.hidden = !0;
  }, E.onclick = (g) => {
    e.addSummary(), x.hidden = !0;
  }, l.onclick = (g) => {
    e.insertParent(), x.hidden = !0;
  }, r.onclick = (g) => {
    k || (e.insertSibling(), x.hidden = !0);
  }, a.onclick = (g) => {
    k || (e.removeNode(), x.hidden = !0);
  }, h.onclick = (g) => {
    k || (e.focusNode(e.currentNode), x.hidden = !0);
  }, d.onclick = (g) => {
    e.cancelFocus(), x.hidden = !0;
  }, y.onclick = (g) => {
    k || (e.moveUpNode(), x.hidden = !0);
  }, u.onclick = (g) => {
    k || (e.moveDownNode(), x.hidden = !0);
  }, p.onclick = (g) => {
    x.hidden = !0;
    const c = e.currentNode, m = n(S[o].clickTips);
    e.container.appendChild(m), e.map.addEventListener(
      "click",
      (f) => {
        if (f.preventDefault(), m.remove(), f.target.parentElement.nodeName === "T" || f.target.parentElement.nodeName === "ROOT") {
          const C = e.currentNode;
          e.createLink(c, C);
        } else
          console.log("\u53D6\u6D88\u8FDE\u63A5");
      },
      {
        once: !0
      }
    );
  }, N.onclick = (g) => {
    x.hidden = !0;
    const c = e.currentNode, m = n(S[o].clickTips);
    e.container.appendChild(m), e.map.addEventListener(
      "click",
      (f) => {
        if (f.preventDefault(), m.remove(), f.target.parentElement.nodeName === "T" || f.target.parentElement.nodeName === "ROOT") {
          const C = e.currentNode;
          c.nodeObj.linkJump || (c.nodeObj.linkJump = []), c.nodeObj.linkJump.push(
            {
              toId: C.nodeObj.id,
              title: C.nodeObj.topic
            }
          ), e.shapeTpc(c, c.nodeObj), e.linkDiv();
        } else
          console.log("\u53D6\u6D88\u8FDE\u63A5");
      },
      {
        once: !0
      }
    );
  };
}
const Ce = '<svg style="width: 1.3em;height: 1.3em;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3464"><path d="M909.061224 684.930612c-5.22449 0-10.44898-2.089796-14.628571-6.269388l-291.526531-291.52653c-4.179592-4.179592-10.971429-4.179592-14.628571 0l-143.673469 143.673469c-9.926531 9.926531-22.987755 15.15102-37.093878 15.151021s-27.167347-5.22449-37.093877-15.151021l-39.183674-39.183673c-4.179592-4.179592-10.971429-4.179592-14.628571 0l-187.036735 187.036734c-8.359184 8.359184-21.420408 8.359184-29.779592 0-8.359184-8.359184-8.359184-21.420408 0-29.779591l187.036735-187.036735c20.37551-20.37551 53.289796-20.37551 73.665306 0l39.183673 39.183673c2.612245 2.612245 5.746939 3.134694 7.314286 3.134694s4.702041-0.522449 7.314286-3.134694l143.673469-143.673469c20.37551-20.37551 53.289796-20.37551 73.665306 0l291.526531 291.526531c8.359184 8.359184 8.359184 21.420408 0 29.779591-3.657143 4.179592-8.881633 6.269388-14.106123 6.269388zM846.367347 867.265306H177.632653c-45.97551 0-83.591837-37.616327-83.591837-83.591837V240.326531c0-45.97551 37.616327-83.591837 83.591837-83.591837h668.734694c45.97551 0 83.591837 37.616327 83.591837 83.591837v543.346938c0 45.97551-37.616327 83.591837-83.591837 83.591837zM177.632653 198.530612c-22.987755 0-41.795918 18.808163-41.795918 41.795919v543.346938c0 22.987755 18.808163 41.795918 41.795918 41.795919h668.734694c22.987755 0 41.795918-18.808163 41.795918-41.795919V240.326531c0-22.987755-18.808163-41.795918-41.795918-41.795919H177.632653zM261.22449 303.020408m-52.244898 0a52.244898 52.244898 0 1 0 104.489796 0 52.244898 52.244898 0 1 0-104.489796 0ZM644.179592 768h-365.714286c-11.493878 0-20.897959-9.404082-20.897959-20.897959s9.404082-20.897959 20.897959-20.897959h365.714286c11.493878 0 20.897959 9.404082 20.897959 20.897959s-9.404082 20.897959-20.897959 20.897959zM461.322449 670.82449h-182.857143c-11.493878 0-20.897959-9.404082-20.897959-20.897959s9.404082-20.897959 20.897959-20.89796h182.857143c11.493878 0 20.897959 9.404082 20.897959 20.89796s-9.404082 20.897959-20.897959 20.897959z" p-id="3465"></path></svg>';
function pe(e, t) {
  var i;
  let n = "";
  for (let o = 0; o < ((i = e.children) == null ? void 0 : i.length); o++)
    n += `<li class="sidebar-links">${pe(e.children[o], t + 1)}</li>`;
  return !(e != null && e.children) || !e.children.length ? `<p class="sidebar-title" id="sidebar${e.id}"><span class="arrow" ${e.topic ? "" : 'style="margin-bottom:5px;"'}"></span><span>${e.topic ? e.topic : Ce}</span></p>` : `<p class="sidebar-title" id="sidebar${e.id}"><span class="arrow ${t < 2 ? "down" : "right"}" ${e.topic ? "" : 'style="margin-bottom:5px;"'}></span><span>${e.topic ? e.topic : Ce}</span></p><ul class="sidebar-heading open ${t < 2 ? "" : "hidden"}">${n}</ul>`;
}
function Nn(e, t) {
  const n = e.nodeData;
  t.innerHTML = `${pe(n, 0)}`, t.querySelectorAll(".sidebar-title").forEach((i) => {
    i.onclick = () => {
      const o = i.querySelector(".down"), s = i.querySelector(".right"), l = e.container.querySelector(".sidebar-title.active");
      l == null || l.classList.remove("active"), o ? (i.parentElement.querySelector("ul").classList.add("hidden"), o.classList.replace("down", "right")) : s && (i.parentElement.querySelector("ul").classList.remove("hidden"), s.classList.replace("right", "down")), i.classList.add("active"), Le.call(e, i.id.replace("sidebar", ""));
    };
  });
}
function xn(e) {
  const t = document.createElement("sidebar"), n = e.nodeData;
  t.innerHTML = `${pe(n, 0)}`, e.container.append(t);
}
const I = (e, t) => {
  const n = document.createElement("span");
  return n.id = e, n.innerHTML = `<svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-${t}"></use>
  </svg>`, n;
};
let re = null;
function Cn(e, t) {
  return function() {
    const n = arguments;
    re && clearTimeout(re), re = setTimeout(function() {
      e.apply(this, n);
    }, t);
  };
}
function kn(e) {
  var h;
  const t = document.createElement("toolbar"), n = I("fullscreen", "full"), i = I("toCenter", "living"), o = I("zoomout", "move"), s = I("zoomin", "add"), l = document.createElement("input");
  l.className = "numberSelection", l.type = "number", l.min = "2", l.max = "100", l.step = "1", l.value = ((h = e == null ? void 0 : e.expandDeep) == null ? void 0 : h.toString()) || "2", l.oninput = Cn(() => {
    const d = e.getAllDataWithAutoHide();
    fe(d == null ? void 0 : d.nodeData), e.layout(), e.linkDiv();
  }, 300);
  const r = document.createElement("span");
  if (r.innerText = "100%", t.appendChild(l), t.appendChild(n), t.appendChild(i), t.appendChild(o), t.appendChild(s), e.uploadButton) {
    const d = Sn(e);
    t.appendChild(d);
  }
  t.className = "rb", n.onclick = () => {
    e.container.requestFullscreen();
  }, i.onclick = () => {
    e.toTopLeft();
  }, o.onclick = () => {
    e.scaleVal < 0.6 || e.scale(e.scaleVal -= 0.2);
  }, s.onclick = () => {
    e.scaleVal > 1.6 || e.scale(e.scaleVal += 0.2);
  };
  const a = e.scrollContainer;
  return a == null || a.addEventListener("scroll", (d) => {
    const u = a.scrollTop + document.body.clientHeight, p = e.mindElixirBox.offsetTop, N = e.mindElixirBox.offsetTop + e.mindElixirBox.clientHeight, E = e.mindElixirBox.clientHeight;
    u < p + t.clientHeight + 40 ? (t.style.position = "absolute", t.style.bottom = E - 20 - t.clientHeight + "px") : u <= N ? (t.style.position = "fixed", t.style.bottom = "20px") : u > N && (t.style.position = "absolute", t.style.bottom = "20px");
  }), t;
}
function En(e) {
  const t = document.createElement("toolbar"), n = I("sidebar", "menu"), i = I("tbltl", "left"), o = I("tbltr", "right"), s = I("tblts", "side");
  t.appendChild(n), t.appendChild(i), t.appendChild(o), t.appendChild(s), t.className = "lt", n.onclick = () => {
    const r = document.querySelector("sidebar");
    Nn(e, r), r.classList.contains("selected") ? r.removeAttribute("class") : r.setAttribute("class", "selected");
  }, i.onclick = () => {
    e.initLeft();
  }, o.onclick = () => {
    e.initRight();
  }, s.onclick = () => {
    e.initSide();
  };
  const l = e.scrollContainer;
  return l == null || l.addEventListener(
    "scroll",
    (r) => {
      const a = l.scrollTop, h = e.mindElixirBox.offsetTop, d = e.mindElixirBox.clientHeight, y = h + d - t.clientHeight - 40;
      a > y ? (t.style.position = "absolute", t.style.top = y - h + 20 + "px") : a >= h ? (t.style.position = "fixed", t.style.top = "20px") : a < h && (t.style.position = "absolute", t.style.top = "20px");
    }
  ), t;
}
function wn(e) {
  const t = I("close", "close");
  return t.onclick = () => {
    console.log("\u5173\u95ED"), e.bus.fire("close", {});
  }, t;
}
function Sn(e) {
  const t = document.createElement("span");
  t.innerHTML = `
  <form action="" enctype="multipart/form-data" method="post" class="fm">
    <input type="file" name="file" class="selectFile">
  </form>
  <svg t="1662362270319" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2591" width="200" height="200">
  <path d="M324.6592 352.13312c7.1168 0 13.34272-2.66752 18.688-8.00768l141.50656-141.51168v443.2128c0 15.12448 11.5712 26.70592 26.7008 26.70592s26.7008-11.58144 26.7008-26.70592V202.61376l141.50656 141.51168c5.34528 5.34016 12.4672 8.00768 18.688 8.00768 6.23616 0 13.35296-2.66752 18.69312-8.00768 10.68032-10.68032 10.68032-27.59168 0-37.38112l-186.9056-186.89536c-0.88576-0.89088-2.66752-2.66752-4.44416-3.5584-0.88576 0-1.77664-0.89088-1.77664-0.89088-0.896-0.88576-1.78688-0.88576-2.67776-1.77664-0.89088 0-1.77664-0.89088-2.66752-0.89088-0.896 0-1.77664-0.89088-2.66752-0.89088a21.67296 21.67296 0 0 0-10.68032 0c-0.89088 0-1.77664 0.89088-2.66752 0.89088-0.89088 0-1.78176 0.89088-2.67264 0.89088-0.89088 0-1.77664 0.89088-2.66752 1.77664-0.89088 0-1.77664 0.89088-1.77664 0.89088-1.78176 0.89088-2.66752 1.78176-4.4544 3.5584L304.18944 306.74432c-10.68032 10.68032-10.68032 27.59168 0 37.38112 7.1168 5.34016 13.34784 8.00768 20.46976 8.00768z" fill="#333333" p-id="2592"></path><path d="M929.84832 556.83072c-15.1296 0-26.7008 11.5712-26.7008 26.7008v206.47936c0 38.272-31.15008 69.42208-69.41696 69.42208H189.37856c-38.26688 0-69.41696-31.15008-69.41696-69.42208v-206.47936c0-15.1296-11.5712-26.7008-26.7008-26.7008s-26.69568 11.5712-26.69568 26.7008v206.47936c0 67.6352 55.17824 122.81856 122.81856 122.81856h645.23776c67.64544 0 122.82368-55.18336 122.82368-122.81856v-206.47936c-0.896-15.1296-12.4672-26.7008-27.5968-26.7008z" 
  fill="#333333" p-id="2593"></path>
  </svg>
  `;
  const n = t.children[0];
  return n.addEventListener("change", (i) => {
    e.bus.fire("upload", n);
  }), t;
}
function Ln(e) {
  e.mindElixirBox.append(En(e)), e.container.append(kn(e)), e.closeButton && e.container.append(wn(e));
}
const J = (e) => {
  const t = document.createElement("div");
  return t.id = e, t;
}, $n = [
  "#2c3e50",
  "#34495e",
  "#7f8c8d",
  "#94a5a6",
  "#f6f6f6",
  "#ffffff",
  "#8e44ad",
  "#9b59b6",
  "#2980b9",
  "#3298db",
  "#c0392c",
  "#e74c3c",
  "#d35400",
  "#f39c11",
  "#f1c40e",
  "#17a085",
  "#27ae61",
  "#2ecc71"
];
function An(e) {
  const t = S[e.locale] ? e.locale : "en";
  let n;
  const i = J("nm-style"), o = J("nm-tag"), s = J("nm-icon"), l = J("nm-link"), r = J("nm-remark");
  i.innerHTML = `
      <div class="nm-fontsize-container">
        ${["15", "24", "32"].map((c) => `<div class="size"  data-size="${c}">
        <svg class="icon" style="width: ${c}px;height: ${c}px" aria-hidden="true">
          <use xlink:href="#icon-a"></use>
        </svg></div>`).join("")}<div class="bold"><svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-B"></use>
  </svg></div>
      </div>
      <div class="nm-fontcolor-container">
        ${$n.map((c) => {
    let m = c;
    return c === "#f6f6f6" && (m = ""), `<div class="split6"><div class="palette" data-color="${m}" style="background-color: ${c};"></div></div>`;
  }).join("")}
      </div>
      <div class="bof">
      <span class="font">${S[t].font}</span>
      <span class="background">${S[t].background}</span>
      </div>
  `, o.innerHTML = `${S[t].tag}<textarea class="nm-tag" tabindex="-1" placeholder="${S[t].tagsSeparate}" /><br>`, s.innerHTML = `${S[t].icon}<div class="nm-icon" contenteditable="true" spellcheck="false" placeholder="${S[t].iconsSeparate}" ></div>`, l.innerHTML = `${S[t].hyperlink}<textarea class="nm-link" tabindex="-1" placeholder="${S[t].linkSeparate}" /><br>`, r.innerHTML = `${S[t].remark}<textarea class="nm-remark" tabindex="-1" placeholder="${S[t].reamrkSeparate}" /><br>`;
  function a(c) {
    c.ondblclick = (m) => {
      const f = document.createElement("textarea"), C = c.children[0], w = e.container.offsetHeight - c.offsetTop - 60, v = 30, A = (z) => z < v ? v : z > w ? w : z;
      f.value = C.value, f.style.position = "absolute", f.style.left = C.offsetLeft + "px", f.style.top = C.offsetTop - 10 + "px", f.style.height = A(C.scrollHeight) + "px", f.style.width = C.offsetWidth + "px", f.oninput = (z) => {
        let te = z.target.scrollHeight;
        f.style.height = A(te) + "px";
      }, f.onblur = (z) => {
        C.value = f.value, C.dispatchEvent(new CustomEvent("change")), f.remove();
      }, c.appendChild(f), f.focus();
    };
  }
  a(o), a(l), a(r);
  const h = document.createElement("nmenu");
  h.innerHTML = `
  <div class="button-container"><svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-close"></use>
  </svg></div>
  `, h.appendChild(i), h.appendChild(o), h.appendChild(s), h.appendChild(l), h.appendChild(r), h.hidden = !0;
  function d(c, m) {
    var f = e.container.querySelectorAll(c);
    [].forEach.call(f, function(C) {
      C.classList.remove(m);
    });
  }
  e.container.append(h);
  const y = h.querySelectorAll(".size"), u = h.querySelector(".bold"), p = h.querySelector(".button-container"), N = h.querySelector(".font"), E = e.container.querySelector(".nm-tag"), b = e.container.querySelector(".nm-icon"), x = e.container.querySelector(".nm-link"), k = e.container.querySelector(".nm-remark");
  h.onclick = (c) => {
    if (!e.currentNode)
      return;
    const m = e.currentNode.nodeObj, f = c.target;
    f.className === "palette" ? (m.style || (m.style = {}), d(".palette", "nmenu-selected"), f.className = "palette nmenu-selected", n === "font" ? m.style.color = f.dataset.color : n === "background" && (m.style.background = f.dataset.color), e.updateNodeStyle(m)) : f.className === "background" ? (d(".palette", "nmenu-selected"), n = "background", f.className = "background selected", f.previousElementSibling.className = "font", m.style && m.style.background && (h.querySelector(
      '.palette[data-color="' + m.style.background + '"]'
    ).className = "palette nmenu-selected")) : f.className === "font" && (d(".palette", "nmenu-selected"), n = "font", f.className = "font selected", f.nextElementSibling.className = "background", m.style && m.style.color && (h.querySelector(
      '.palette[data-color="' + m.style.color + '"]'
    ).className = "palette nmenu-selected"));
  }, Array.from(y).map(
    (c) => {
      c.onclick = (m) => {
        e.currentNode.nodeObj.style || (e.currentNode.nodeObj.style = {}), d(".size", "size-selected");
        const f = m.currentTarget;
        e.currentNode.nodeObj.style.fontSize = f.dataset.size, f.className = "size size-selected", e.updateNodeStyle(e.currentNode.nodeObj);
      };
    }
  ), u.onclick = (c) => {
    e.currentNode.nodeObj.style || (e.currentNode.nodeObj.style = {}), e.currentNode.nodeObj.style.fontWeight === "bold" ? (delete e.currentNode.nodeObj.style.fontWeight, c.currentTarget.className = "bold", e.updateNodeStyle(e.currentNode.nodeObj)) : (e.currentNode.nodeObj.style.fontWeight = "bold", c.currentTarget.className = "bold size-selected", e.updateNodeStyle(e.currentNode.nodeObj));
  }, E.onchange = (c) => {
    if (!!e.currentNode && (c.target.value !== null || c.target.value !== void 0)) {
      let m;
      c.target.value === "" ? m = [] : m = c.target.value.split(","), e.updateNodeTags(e.currentNode.nodeObj, m);
    }
  }, b.addEventListener("input", (c) => {
    if (!!e.currentNode && (c.target.innerText !== null || c.target.innerText !== void 0)) {
      const m = c.target.innerText.split(",");
      e.updateNodeIcons(e.currentNode.nodeObj, m);
    }
  }), x.onchange = (c) => {
    if (!!e.currentNode && (c.target.value !== null || c.target.value !== void 0)) {
      const m = c.target.value;
      e.updateNodeHyperLink(e.currentNode.nodeObj, m);
    }
  }, k.onchange = (c) => {
    if (!!e.currentNode && (c.target.value !== null || c.target.value !== void 0)) {
      const m = c.target.value;
      e.updateNodeRemark(e.currentNode.nodeObj, m);
    }
  };
  let g = "open";
  p.onclick = (c) => {
    g === "open" ? (g = "close", h.className = "close", p.innerHTML = '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-menu"></use></svg>') : (g = "open", h.className = "", p.innerHTML = '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-close"></use></svg>');
  }, e.bus.addListener("unselectNode", function() {
    h.hidden = !0;
  }), e.bus.addListener("selectNode", function(c, m) {
    if (!!m) {
      if (h.hidden = !1, d(".palette", "nmenu-selected"), d(".size", "size-selected"), d(".bold", "size-selected"), n = "font", N.className = "font selected", N.nextElementSibling.className = "background", c.style) {
        if (c.style.fontSize) {
          const f = h.querySelector(
            '.size[data-size="' + c.style.fontSize + '"]'
          );
          f && (f.className = "size size-selected");
        }
        if (c.style.fontWeight) {
          const f = h.querySelector(".bold");
          f && (f.className = "bold size-selected");
        }
        if (c.style.color) {
          const f = h.querySelector(
            '.palette[data-color="' + c.style.color + '"]'
          );
          f && (f.className = "palette nmenu-selected");
        }
      }
      c.tags ? E.value = c.tags.join(",") : E.value = "", c.icons ? b.innerText = c.icons.join(",") : b.innerText = "", x.value = "", c.hyperLink && (x.value = c.hyperLink), c.linkJump && (x.value.length > 0 && (x.value += ","), x.value += c.linkJump.map((f) => f.title).reduce((f, C, w) => f + (w ? "," : "") + C, "")), c.remark ? k.value = c.remark : k.value = "";
    }
  });
}
const de = document, Tn = function(e, t) {
  if (!t)
    return he(e), e;
  const n = e.getElementsByClassName("insert-preview"), i = `insert-preview ${t} show`;
  if (n.length > 0)
    n[0].className = i;
  else {
    const o = de.createElement("div");
    o.className = i, e.appendChild(o);
  }
  return e;
}, he = function(e) {
  if (!e)
    return;
  const t = e.getElementsByClassName("insert-preview");
  for (const n of t || [])
    n.remove();
}, ke = function(e, t) {
  const n = t.parentNode.parentNode.contains(e);
  return e && e.tagName === "TPC" && e !== t && !n && e.nodeObj.root !== !0;
};
function Mn(e) {
  let t, n, i;
  e.map.addEventListener("dragstart", function(s) {
    t = s.target, t.parentNode.parentNode.style.opacity = "0.5", W.clear();
  }), e.map.addEventListener("dragend", async function(s) {
    s.target.style.opacity = "", he(i);
    const l = t.nodeObj;
    switch (n) {
      case "before":
        e.moveNodeBefore(t, i), e.selectNode($(l.id));
        break;
      case "after":
        e.moveNodeAfter(t, i), e.selectNode($(l.id));
        break;
      case "in":
        e.moveNode(t, i);
        break;
    }
    t.parentNode.parentNode.style.opacity = "1", t = null;
  }), e.map.addEventListener("dragover", Ie(function(s) {
    he(i);
    const l = de.elementFromPoint(
      s.clientX,
      s.clientY - 12
    );
    if (ke(l, t)) {
      i = l;
      const r = l.getBoundingClientRect().y;
      s.clientY > r + l.clientHeight ? n = "after" : s.clientY > r + l.clientHeight / 2 && (n = "in");
    } else {
      const r = de.elementFromPoint(
        s.clientX,
        s.clientY + 12
      );
      if (ke(r, t)) {
        i = r;
        const a = r.getBoundingClientRect().y;
        s.clientY < a ? n = "before" : s.clientY < a + r.clientHeight / 2 && (n = "in");
      } else
        n = i = null;
    }
    i && Tn(i, n);
  }, 200));
}
function Dn(e) {
  const t = {
    13: () => {
      e.insertSibling();
    },
    9: () => {
      e.addChild();
    },
    17: (n) => {
      e.ctrlRepeat = !0, console.log("\u6309\u4E0Bcontroll");
    },
    91: (n) => {
      e.ctrlRepeat = !0, console.log("\u6309\u4E0Bcommand");
    },
    113: () => {
      e.beginEdit();
    },
    38: () => {
      e.selectPrevSibling();
    },
    40: () => {
      e.selectNextSibling();
    },
    37: () => {
      !e.currentNode || (e.currentNode.offsetParent.offsetParent.className === "rhs" ? e.selectParent() : (e.currentNode.offsetParent.offsetParent.className === "lhs" || e.currentNode.nodeObj.root) && e.selectFirstChild());
    },
    39: () => {
      !e.currentNode || (e.currentNode.offsetParent.offsetParent.className === "rhs" || e.currentNode.nodeObj.root ? e.selectFirstChild() : e.currentNode.offsetParent.offsetParent.className === "lhs" && e.selectParent());
    },
    33() {
      e.moveUpNode();
    },
    34() {
      e.moveDownNode();
    },
    67(n) {
      (n.metaKey || n.ctrlKey) && (e.waitCopy = e.currentNode);
    },
    86(n) {
      !e.waitCopy || (n.metaKey || n.ctrlKey) && (e.copyNode(e.waitCopy, e.currentNode), e.waitCopy = null);
    },
    90: (n) => {
      !e.allowUndo || (n.metaKey || n.ctrlKey) && e.undo();
    },
    187: (n) => {
      if (n.metaKey || n.ctrlKey) {
        if (e.scaleVal > 1.6)
          return;
        e.scale(e.scaleVal += 0.2);
      }
    },
    189: (n) => {
      if (n.metaKey || n.ctrlKey) {
        if (e.scaleVal < 0.6)
          return;
        e.scale(e.scaleVal -= 0.2);
      }
    }
  };
  e.map.onkeydown = (n) => {
    !e.editable || n.target === n.currentTarget && (n.keyCode === 8 || n.keyCode === 46 ? e.currentLink ? e.removeLink() : e.removeNode() : t[n.keyCode] && t[n.keyCode](n));
  }, e.map.onkeyup = (n) => {
    (n.keyCode === 17 || n.keyCode === 91) && (e.ctrlRepeat = !1);
  };
}
function Hn(e, t) {
  const n = (u, p) => {
    const N = document.createElement("div");
    return N.id = u, N.innerHTML = `<svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-${p}"></use>
  </svg>`, N;
  }, i = n("cm-add_child", "zijiedian"), o = n("cm-add_sibling", "tongjijiedian-"), s = n("cm-remove_child", "shanchu2"), l = n("cm-up", "rising"), r = n("cm-down", "falling"), a = n("cm-edit", "edit"), h = document.createElement("ul");
  if (h.className = "menu-list", t && t.extend)
    for (let u = 0; u < t.extend.length; u++) {
      const p = t.extend[u], N = n(p.name, p.name);
      h.appendChild(N), N.onclick = (E) => {
        p.onclick(E);
      };
    }
  const d = document.createElement("mmenu");
  d.appendChild(i), d.appendChild(o), d.appendChild(s), d.appendChild(l), d.appendChild(r), d.appendChild(a), d.hidden = !0, e.container.append(d);
  let y = !0;
  e.bus.addListener("unselectNode", function() {
    d.hidden = !0;
  }), e.bus.addListener("selectNode", function(u) {
    d.hidden = !1, u.root ? y = !0 : y = !1;
  }), d.onclick = (u) => {
    u.target === d && (d.hidden = !0);
  }, i.onclick = (u) => {
    e.addChild();
  }, o.onclick = (u) => {
    y || e.insertSibling();
  }, s.onclick = (u) => {
    y || e.removeNode();
  }, l.onclick = (u) => {
    y || e.moveUpNode();
  }, r.onclick = (u) => {
    y || e.moveDownNode();
  }, a.onclick = (u) => {
    e.beginEdit();
  };
}
function Oe() {
  this.handlers = {};
}
Oe.prototype = {
  showHandler: function() {
    console.log(this.handlers);
  },
  addListener: function(e, t) {
    this.handlers[e] === void 0 && (this.handlers[e] = []), this.handlers[e].push(t);
  },
  fire: function(e, ...t) {
    if (this.handlers[e] instanceof Array)
      for (var n = this.handlers[e], i = 0; i < n.length; i++)
        n[i](...t);
  },
  removeListener: function(e, t) {
    if (!!this.handlers[e]) {
      var n = this.handlers[e];
      if (!t)
        n.length = 0;
      else if (n.length)
        for (var i = 0; i < n.length; i++)
          n[i] === t && this.handlers[e].splice(i, 1);
    }
  }
};
(function(e) {
  var t, n, i, o, s, l, r = '<svg><symbol id="icon-edit" viewBox="0 0 1024 1024"><path d="M423.765333 128a42.666667 42.666667 0 0 1 3.2 85.205333L423.765333 213.333333H234.666667a64 64 0 0 0-63.872 60.245334L170.666667 277.333333v512a64 64 0 0 0 60.245333 63.872L234.666667 853.333333h512a64 64 0 0 0 63.872-60.245333L810.666667 789.333333v-189.098666a42.666667 42.666667 0 0 1 85.205333-3.2l0.128 3.2V789.333333a149.333333 149.333333 0 0 1-144.213333 149.248L746.666667 938.666667h-512a149.333333 149.333333 0 0 1-149.248-144.213334L85.333333 789.333333v-512a149.333333 149.333333 0 0 1 144.213334-149.248L234.666667 128h189.098666z m324.949334-53.248a42.666667 42.666667 0 0 1 60.330666 0l150.869334 150.869333a42.666667 42.666667 0 0 1 0 60.330667l-329.386667 329.386667a42.666667 42.666667 0 0 1-29.44 12.458666l-153.386667 2.517334a42.666667 42.666667 0 0 1-43.349333-43.349334l2.56-153.386666a42.666667 42.666667 0 0 1 12.458667-29.44z m30.165333 90.496L491.946667 452.266667l-1.493334 91.989333 92.032-1.493333 286.976-286.976-90.538666-90.538667z"  ></path></symbol><symbol id="icon-rising" viewBox="0 0 1024 1024"><path d="M553.173333 803.84h-64l0.021334-474.581333-224.021334 224-45.269333-45.226667L521.6 206.293333l301.717333 301.696-45.269333 45.269334-224.853333-224.896v475.477333z"  ></path></symbol><symbol id="icon-falling" viewBox="0 0 1024 1024"><path d="M553.173333 238.314667h-64l0.021334 474.602666-224.021334-224-45.269333 45.226667L521.6 835.861333l301.717333-301.717333-45.269333-45.226667-224.853333 224.853334V238.336z"  ></path></symbol><symbol id="icon-shanchu2" viewBox="0 0 1024 1024"><path d="M516.60601807 107.93026734c-82.64382935 0-149.71865844 65.51751709-152.5729065 147.77160644H171.37136841c-21.40603638 0-38.92044068 17.38504028-38.92044068 38.92126465 0 21.40686036 17.38504028 38.92208862 38.92126466 38.92208862h42.94308471v435.40136719c0 81.73498536 55.39828492 148.55026245 123.90106201 148.55026245h348.99444581c68.37341309 0 123.90106201-66.42553711 123.901062-148.55026245V333.80477906h38.92126465c21.40686036 0 38.92126464-17.38586426 38.92126465-38.92208863 0-21.40686036-17.38504028-38.92126464-38.92126465-38.92126465H668.91854859C666.45321656 173.44860839 599.24902344 107.93109131 516.60601807 107.93109131z m-79.65939331 147.77160644c2.85424805-42.16442872 37.2354126-74.85809326 79.78875732-74.85809326s76.93450927 32.82302857 79.39984131 74.85809326H436.94662476z m-98.86047364 589.01165771c-24.2611084 0-50.98754883-31.13717651-50.98754883-75.76693725V333.80477906h450.97036744V769.33551026c0 44.50039673-26.72644043 75.76776123-50.98754884 75.76776122H338.08615112v-0.38973999z m0 0"  ></path><path d="M390.37063599 751.17263794c17.77313232 0 32.43411255-17.7739563 32.43411255-40.08883667V482.35504151c0-22.31488037-14.53079224-40.08966065-32.43411255-40.08966065-17.77478027 0-32.43493653 17.77478027-32.43493653 40.08966065v228.72875976c0 22.18469239 14.27124023 40.08883667 32.43493653 40.08883667z m117.41308594 0c17.7739563 0 32.43411255-17.7739563 32.43411255-40.08883667V482.35504151c0-22.31488037-14.53079224-40.08966065-32.43411255-40.08966065-17.7739563 0-32.43493653 17.77478027-32.43493653 40.08966065v228.72875976c0 22.18469239 14.66098023 40.08883667 32.43493653 40.08883667z m123.51049804 0c17.7739563 0 32.43493653-17.7739563 32.43493652-40.08883667V482.35504151c0-22.31488037-14.53079224-40.08966065-32.43493652-40.08966065-17.7739563 0-32.43411255 17.77478027-32.43411255 40.08966065v228.72875976c0 22.18469239 14.14105224 40.08883667 32.43411255 40.08883667z m0 0"  ></path></symbol><symbol id="icon-zijiedian" viewBox="0 0 1024 1024"><path d="M312.208 472c19.568-157.856 153.432-280 315.656-280 175.68 0 318.112 143.272 318.112 320S803.552 832 627.864 832c-162.224 0-296.08-122.144-315.656-280H120a40 40 0 0 1 0-80h192.208zM632 752c132.552 0 240-107.448 240-240 0-132.552-107.448-240-240-240-132.552 0-240 107.448-240 240 0 132.552 107.448 240 240 240z m-40-280v-80a40 40 0 0 1 80 0v80h80a40 40 0 0 1 0 80h-80v80a40 40 0 0 1-80 0v-80h-80a40 40 0 0 1 0-80h80z"  ></path></symbol><symbol id="icon-tongjijiedian-" viewBox="0 0 1024 1024"><path d="M803.84 131.626667H410.24A59.733333 59.733333 0 0 0 350.506667 192v45.226667H199.68a51.626667 51.626667 0 0 0-51.626667 51.626666v465.92a51.626667 51.626667 0 0 0 51.626667 51.626667h187.52v-55.466667h-162.133333a21.333333 21.333333 0 0 1-21.333334-21.333333V313.386667a21.333333 21.333333 0 0 1 21.333334-21.333334h125.653333v64a59.733333 59.733333 0 0 0 59.733333 59.733334h393.386667a59.733333 59.733333 0 0 0 59.733333-59.733334V192a59.733333 59.733333 0 0 0-59.733333-60.373333z m4.266667 224.64a4.266667 4.266667 0 0 1-4.266667 4.266666H410.24a4.266667 4.266667 0 0 1-4.266667-4.266666V192a4.266667 4.266667 0 0 1 4.266667-4.266667h393.6a4.266667 4.266667 0 0 1 4.266667 4.266667zM716.16 749.44h-81.28v-81.493333a27.733333 27.733333 0 0 0-55.466667 0v81.28h-81.493333a27.733333 27.733333 0 1 0 0 55.466666h81.28v81.28a27.733333 27.733333 0 1 0 55.466667 0v-81.066666h81.28a27.733333 27.733333 0 0 0 0-55.466667z"  ></path></symbol><symbol id="icon-close" viewBox="0 0 1024 1024"><path d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128L512.128 467.904l-263.04-263.84c-12.448-12.48-32.704-12.544-45.248-0.064-12.512 12.48-12.544 32.736-0.064 45.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248a31.937 31.937 0 0 0 22.688 9.44c8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408a31.94 31.94 0 0 0 22.592-9.344c12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z" fill="" ></path></symbol><symbol id="icon-menu" viewBox="0 0 1024 1024"><path d="M109.714 292.571h804.572c21.943 0 36.571-21.942 36.571-43.885 0-14.629-14.628-29.257-36.571-29.257H109.714c-21.943 0-36.571 14.628-36.571 36.571 0 14.629 14.628 36.571 36.571 36.571zM914.286 512H109.714c-21.943 0-36.571 14.629-36.571 36.571 0 14.629 14.628 36.572 36.571 36.572h804.572c21.943 0 36.571-21.943 36.571-43.886 0-14.628-14.628-29.257-36.571-29.257z m0 292.571H109.714c-21.943 0-36.571 14.629-36.571 36.572s14.628 36.571 36.571 36.571h804.572c21.943 0 36.571-21.943 36.571-36.571 0-21.943-14.628-36.572-36.571-36.572z"  ></path></symbol><symbol id="icon-right" viewBox="0 0 1024 1024"><path d="M385 560.69999999L385 738.9c0 36.90000001 26.4 68.5 61.3 68.5l150.2 0c1.5 0 3-0.1 4.5-0.3 10.2 38.7 45.5 67.3 87.5 67.3 50 0 90.5-40.5 90.5-90.5s-40.5-90.5-90.5-90.5c-42 0-77.3 28.6-87.5 67.39999999-1.4-0.3-2.9-0.4-4.5-0.39999999L446.3 760.4c-6.8 0-14.3-8.9-14.3-21.49999999l0-427.00000001c0-12.7 7.40000001-21.5 14.30000001-21.5l150.19999999 0c1.5 0 3-0.2 4.5-0.4 10.2 38.8 45.5 67.3 87.5 67.3 50 0 90.5-40.5 90.5-90.4 0-49.9-40.5-90.6-90.5-90.59999999-42 0-77.3 28.6-87.5 67.39999999-1.4-0.2-2.9-0.4-4.49999999-0.4L446.3 243.3c-34.80000001 0-61.3 31.6-61.3 68.50000001L385 513.7l-79.1 0c-10.4-38.5-45.49999999-67-87.4-67-50 0-90.5 40.5-90.5 90.5s40.5 90.5 90.5 90.5c41.79999999 0 77.00000001-28.4 87.4-67L385 560.69999999z" fill="#333333" ></path></symbol><symbol id="icon-left" viewBox="0 0 1024 1024"><path d="M639 463.30000001L639 285.1c0-36.90000001-26.4-68.5-61.3-68.5l-150.2 0c-1.5 0-3 0.1-4.5 0.3-10.2-38.7-45.5-67.3-87.5-67.3-50 0-90.5 40.5-90.5 90.5s40.5 90.5 90.5 90.5c42 0 77.3-28.6 87.5-67.39999999 1.4 0.3 2.9 0.4 4.5 0.39999999L577.7 263.6c6.8 0 14.3 8.9 14.3 21.49999999l0 427.00000001c0 12.7-7.40000001 21.5-14.30000001 21.5l-150.19999999 0c-1.5 0-3 0.2-4.5 0.4-10.2-38.8-45.5-67.3-87.5-67.3-50 0-90.5 40.5-90.5 90.4 0 49.9 40.5 90.6 90.5 90.59999999 42 0 77.3-28.6 87.5-67.39999999 1.4 0.2 2.9 0.4 4.49999999 0.4L577.7 780.7c34.80000001 0 61.3-31.6 61.3-68.50000001L639 510.3l79.1 0c10.4 38.5 45.49999999 67 87.4 67 50 0 90.5-40.5 90.5-90.5s-40.5-90.5-90.5-90.5c-41.79999999 0-77.00000001 28.4-87.4 67L639 463.30000001z" fill="#333333" ></path></symbol><symbol id="icon-side" viewBox="0 0 1024 1024"><path d="M851.91168 328.45312c-59.97056 0-108.6208 48.47104-108.91264 108.36992l-137.92768 38.4a109.14304 109.14304 0 0 0-63.46752-46.58688l1.39264-137.11872c47.29344-11.86816 82.31936-54.66624 82.31936-105.64096 0-60.15488-48.76288-108.91776-108.91776-108.91776s-108.91776 48.76288-108.91776 108.91776c0 49.18784 32.60928 90.75712 77.38368 104.27392l-1.41312 138.87488a109.19936 109.19936 0 0 0-63.50336 48.55808l-138.93632-39.48544 0.01024-0.72704c0-60.15488-48.76288-108.91776-108.91776-108.91776s-108.91776 48.75776-108.91776 108.91776c0 60.15488 48.76288 108.91264 108.91776 108.91264 39.3984 0 73.91232-20.92032 93.03552-52.2496l139.19232 39.552-0.00512 0.2304c0 25.8304 9.00096 49.5616 24.02816 68.23424l-90.14272 132.63872a108.7488 108.7488 0 0 0-34.2528-5.504c-60.15488 0-108.91776 48.768-108.91776 108.91776 0 60.16 48.76288 108.91776 108.91776 108.91776 60.16 0 108.92288-48.75776 108.92288-108.91776 0-27.14624-9.9328-51.968-26.36288-71.04l89.04704-131.03104a108.544 108.544 0 0 0 37.6832 6.70208 108.672 108.672 0 0 0 36.48512-6.272l93.13792 132.57216a108.48256 108.48256 0 0 0-24.69888 69.0688c0 60.16 48.768 108.92288 108.91776 108.92288 60.16 0 108.91776-48.76288 108.91776-108.92288 0-60.14976-48.75776-108.91776-108.91776-108.91776a108.80512 108.80512 0 0 0-36.69504 6.3488l-93.07136-132.48a108.48768 108.48768 0 0 0 24.79616-72.22784l136.09984-37.888c18.99008 31.93856 53.84192 53.3504 93.69088 53.3504 60.16 0 108.92288-48.75776 108.92288-108.91264-0.00512-60.15488-48.77312-108.92288-108.92288-108.92288z"  ></path></symbol><symbol id="icon-B" viewBox="0 0 1024 1024"><path d="M98.067692 65.457231H481.28c75.854769 0 132.411077 3.150769 169.668923 9.452307 37.336615 6.301538 70.656 19.534769 100.036923 39.620924 29.459692 20.007385 53.956923 46.710154 73.570462 80.029538 19.692308 33.398154 29.459692 70.734769 29.459692 112.167385 0 44.898462-12.130462 86.094769-36.233846 123.588923a224.886154 224.886154 0 0 1-98.461539 84.283077c58.368 17.092923 103.266462 46.08 134.695385 87.04 31.350154 40.96 47.025231 89.088 47.025231 144.462769 0 43.638154-10.082462 86.016-30.404923 127.212308-20.243692 41.196308-47.891692 74.043077-83.02277 98.697846-35.052308 24.654769-78.296615 39.778462-129.732923 45.449846-32.295385 3.465846-110.119385 5.671385-233.472 6.537846H98.067692V65.457231z m193.536 159.507692V446.621538h126.818462c75.460923 0 122.328615-1.024 140.603077-3.229538 33.083077-3.938462 59.155692-15.36 78.139077-34.343385 18.904615-18.904615 28.435692-43.874462 28.435692-74.830769 0-29.696-8.192-53.720615-24.497231-72.310154-16.384-18.510769-40.644923-29.696-72.940307-33.634461-19.140923-2.205538-74.279385-3.308308-165.415385-3.308308h-111.064615z m0 381.243077v256.315077h179.2c69.710769 0 113.979077-1.969231 132.726154-5.907692 28.750769-5.198769 52.145231-17.959385 70.262154-38.281847 18.116923-20.243692 27.096615-47.340308 27.096615-81.368615 0-28.750769-6.931692-53.169231-20.873846-73.255385a118.232615 118.232615 0 0 0-60.494769-43.795692c-26.387692-9.137231-83.574154-13.705846-171.638154-13.705846H291.603692z"  ></path></symbol><symbol id="icon-a" viewBox="0 0 1024 1024"><path d="M757.76 665.6q0 20.48 1.536 34.304t7.68 22.016 18.944 12.288 34.304 4.096q-3.072 25.6-15.36 44.032-11.264 16.384-33.28 29.696t-62.976 13.312q-11.264 0-20.48-0.512t-17.408-2.56l-6.144-2.048-1.024 0q-4.096-1.024-10.24-4.096-2.048-2.048-4.096-2.048-1.024-1.024-2.048-1.024-14.336-8.192-23.552-17.408t-14.336-17.408q-6.144-10.24-9.216-20.48-63.488 75.776-178.176 75.776-48.128 0-88.064-15.36t-69.12-44.032-45.056-68.096-15.872-88.576 16.896-89.088 47.616-67.584 74.24-42.496 96.768-14.848q48.128 0 88.576 17.408t66.048 49.152q0-8.192 0.512-16.384t0.512-15.36q0-71.68-39.936-104.448t-128-32.768q-43.008 0-84.992 6.656t-84.992 17.92q14.336-28.672 25.088-47.616t24.064-29.184q30.72-24.576 158.72-24.576 79.872 0 135.168 13.824t90.624 43.52 51.2 75.264 15.872 108.032l0 200.704zM487.424 743.424q50.176 0 79.872-33.28t29.696-95.744q0-61.44-28.672-93.696t-76.8-32.256q-52.224 0-82.944 33.28t-30.72 94.72q0 58.368 31.744 92.672t77.824 34.304z"  ></path></symbol><symbol id="icon-full" viewBox="0 0 1024 1024"><path d="M639.328 416c8.032 0 16.096-3.008 22.304-9.056l202.624-197.184-0.8 143.808c-0.096 17.696 14.144 32.096 31.808 32.192 0.064 0 0.128 0 0.192 0 17.6 0 31.904-14.208 32-31.808l1.248-222.208c0-0.672-0.352-1.248-0.384-1.92 0.032-0.512 0.288-0.896 0.288-1.408 0.032-17.664-14.272-32-31.968-32.032L671.552 96l-0.032 0c-17.664 0-31.968 14.304-32 31.968C639.488 145.632 653.824 160 671.488 160l151.872 0.224-206.368 200.8c-12.672 12.32-12.928 32.608-0.64 45.248C622.656 412.736 630.976 416 639.328 416z"  ></path><path d="M896.032 639.552 896.032 639.552c-17.696 0-32 14.304-32.032 31.968l-0.224 151.872-200.832-206.4c-12.32-12.64-32.576-12.96-45.248-0.64-12.672 12.352-12.928 32.608-0.64 45.248l197.184 202.624-143.808-0.8c-0.064 0-0.128 0-0.192 0-17.6 0-31.904 14.208-32 31.808-0.096 17.696 14.144 32.096 31.808 32.192l222.24 1.248c0.064 0 0.128 0 0.192 0 0.64 0 1.12-0.32 1.76-0.352 0.512 0.032 0.896 0.288 1.408 0.288l0.032 0c17.664 0 31.968-14.304 32-31.968L928 671.584C928.032 653.952 913.728 639.584 896.032 639.552z"  ></path><path d="M209.76 159.744l143.808 0.8c0.064 0 0.128 0 0.192 0 17.6 0 31.904-14.208 32-31.808 0.096-17.696-14.144-32.096-31.808-32.192L131.68 95.328c-0.064 0-0.128 0-0.192 0-0.672 0-1.248 0.352-1.888 0.384-0.448 0-0.8-0.256-1.248-0.256 0 0-0.032 0-0.032 0-17.664 0-31.968 14.304-32 31.968L96 352.448c-0.032 17.664 14.272 32 31.968 32.032 0 0 0.032 0 0.032 0 17.664 0 31.968-14.304 32-31.968l0.224-151.936 200.832 206.4c6.272 6.464 14.624 9.696 22.944 9.696 8.032 0 16.096-3.008 22.304-9.056 12.672-12.32 12.96-32.608 0.64-45.248L209.76 159.744z"  ></path><path d="M362.368 617.056l-202.624 197.184 0.8-143.808c0.096-17.696-14.144-32.096-31.808-32.192-0.064 0-0.128 0-0.192 0-17.6 0-31.904 14.208-32 31.808l-1.248 222.24c0 0.704 0.352 1.312 0.384 2.016 0 0.448-0.256 0.832-0.256 1.312-0.032 17.664 14.272 32 31.968 32.032L352.448 928c0 0 0.032 0 0.032 0 17.664 0 31.968-14.304 32-31.968s-14.272-32-31.968-32.032l-151.936-0.224 206.4-200.832c12.672-12.352 12.96-32.608 0.64-45.248S375.008 604.704 362.368 617.056z"  ></path></symbol><symbol id="icon-add" viewBox="0 0 1024 1024"><path d="M863.328 482.56l-317.344-1.12L545.984 162.816c0-17.664-14.336-32-32-32s-32 14.336-32 32l0 318.4L159.616 480.064c-0.032 0-0.064 0-0.096 0-17.632 0-31.936 14.24-32 31.904C127.424 529.632 141.728 544 159.392 544.064l322.592 1.152 0 319.168c0 17.696 14.336 32 32 32s32-14.304 32-32l0-318.944 317.088 1.12c0.064 0 0.096 0 0.128 0 17.632 0 31.936-14.24 32-31.904C895.264 496.992 880.96 482.624 863.328 482.56z"  ></path></symbol><symbol id="icon-move" viewBox="0 0 1024 1024"><path d="M863.744 544 163.424 544c-17.664 0-32-14.336-32-32s14.336-32 32-32l700.32 0c17.696 0 32 14.336 32 32S881.44 544 863.744 544z"  ></path></symbol><symbol id="icon-living" viewBox="0 0 1024 1024"><path d="M514.133333 488.533333m-106.666666 0a106.666667 106.666667 0 1 0 213.333333 0 106.666667 106.666667 0 1 0-213.333333 0Z" fill="#666666" ></path><path d="M512 64C264.533333 64 64 264.533333 64 512c0 236.8 183.466667 428.8 416 445.866667v-134.4c-53.333333-59.733333-200.533333-230.4-200.533333-334.933334 0-130.133333 104.533333-234.666667 234.666666-234.666666s234.666667 104.533333 234.666667 234.666666c0 61.866667-49.066667 153.6-145.066667 270.933334l-59.733333 68.266666V960C776.533333 942.933333 960 748.8 960 512c0-247.466667-200.533333-448-448-448z" fill="#666666" ></path></symbol></svg>', a = (a = document.getElementsByTagName("script"))[a.length - 1].getAttribute("data-injectcss");
  if (a && !e.__iconfont__svg__cssinject__) {
    e.__iconfont__svg__cssinject__ = !0;
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (d) {
      console && console.log(d);
    }
  }
  function h() {
    s || (s = !0, i());
  }
  t = function() {
    var d, y, u, p;
    (p = document.createElement("div")).innerHTML = r, r = null, (u = p.getElementsByTagName("svg")[0]) && (u.setAttribute("aria-hidden", "true"), u.style.position = "absolute", u.style.width = 0, u.style.height = 0, u.style.overflow = "hidden", d = u, (y = document.body).firstChild ? (p = d, (u = y.firstChild).parentNode.insertBefore(p, u)) : y.appendChild(d));
  }, document.addEventListener ? ~["complete", "loaded", "interactive"].indexOf(document.readyState) ? setTimeout(t, 0) : (n = function() {
    document.removeEventListener("DOMContentLoaded", n, !1), t();
  }, document.addEventListener("DOMContentLoaded", n, !1)) : document.attachEvent && (i = t, o = e.document, s = !1, (l = function() {
    try {
      o.documentElement.doScroll("left");
    } catch {
      return void setTimeout(l, 50);
    }
    h();
  })(), o.onreadystatechange = function() {
    o.readyState == "complete" && (o.onreadystatechange = null, h());
  });
})(window);
const Y = $, G = document;
function j({
  el: e,
  data: t,
  direction: n,
  locale: i,
  draggable: o,
  editable: s,
  contextMenu: l,
  contextMenuOption: r,
  toolBar: a,
  nodeMenu: h,
  keypress: d,
  before: y,
  newTopicName: u,
  allowUndo: p,
  primaryLinkStyle: N,
  overflowHidden: E,
  primaryNodeHorizontalGap: b,
  primaryNodeVerticalGap: x,
  mobileMenu: k,
  closeButton: g,
  widthControll: c,
  uploadButton: m,
  nodeDraggable: f,
  scrollContainer: C
}) {
  const w = document.getElementById(e);
  !w || (this.mindElixirBox = w, this.before = y || {}, this.nodeData = t.nodeData, this.linkData = t.linkData || {}, this.expandDeep = t == null ? void 0 : t.expandDeep, this.locale = i, this.contextMenuOption = r, this.contextMenu = l === void 0 ? !0 : l, this.toolBar = a === void 0 ? !0 : a, this.nodeMenu = h === void 0 ? !0 : h, this.keypress = d === void 0 ? !0 : d, this.closeButton = g === void 0 ? !1 : g, this.widthControll = c === void 0 ? !0 : c, this.mobileMenu = k, this.direction = t.direction !== void 0 ? t.direction : typeof n == "number" ? n : 1, this.draggable = o === void 0 ? !0 : o, this.newTopicName = u, this.editable = s === void 0 ? !0 : s, this.allowUndo = p === void 0 ? !0 : p, this.currentNode = null, this.currentLink = null, this.inputDiv = null, this.scaleVal = 1, this.tempDirection = null, this.primaryLinkStyle = N || 0, this.overflowHidden = E, this.primaryNodeHorizontalGap = b, this.primaryNodeVerticalGap = x, this.uploadButton = m === void 0 ? !0 : m, this.nodeDraggable = f === void 0 ? !0 : f, this.scrollContainer = C, this.bus = new Oe(), this.bus.addListener("operation", (v) => {
    if (this.isUndo) {
      this.isUndo = !1;
      return;
    }
    ["moveNode", "removeNode", "addChild", "finishEdit", "editStyle", "editTags", "editIcons"].includes(
      v.name
    ) && this.history.push(v);
  }), this.history = [], this.isUndo = !1, this.undo = function() {
    const v = this.history.pop();
    !v || (this.isUndo = !0, v.name === "moveNode" ? this.moveNode(
      Y(v.obj.fromObj.id),
      Y(v.obj.originParentId)
    ) : v.name === "removeNode" ? v.originSiblingId ? this.insertBefore(Y(v.originSiblingId), v.obj) : this.addChild(Y(v.originParentId), v.obj) : v.name === "addChild" || v.name === "copyNode" ? this.removeNode(Y(v.obj.id)) : v.name === "finishEdit" ? this.setNodeTopic(Y(v.obj.id), v.origin) : this.isUndo = !1);
  });
}
function T(e) {
  return async function(...t) {
    (!this.before[e.name] || await this.before[e.name].apply(this, t)) && e.apply(this, t);
  };
}
j.prototype = {
  addParentLink: P,
  getObjById: Ee,
  generateNewObj: qe,
  generateNewSummaryObj: je,
  insertSibling: T(Ut),
  insertBefore: T(Jt),
  insertParent: T(Kt),
  addSummary: T(Qt),
  addChild: T(en),
  copyNode: T(tn),
  moveNode: T(ln),
  removeNode: T(sn),
  moveUpNode: T(nn),
  moveDownNode: T(on),
  beginEdit: T(an),
  moveNodeBefore: T(rn),
  moveNodeAfter: T(cn),
  updateNodeStyle: Wt,
  updateNodeTags: _t,
  updateNodeIcons: Yt,
  updateNodeHyperLink: Gt,
  updateNodeRemark: Xt,
  processPrimaryNode: hn,
  setNodeTopic: dn,
  createLink: un,
  removeLink: fn,
  selectLink: pn,
  hideLinkController: gn,
  showLinkController: mn,
  layout: dt,
  linkDiv: yn,
  createInputDiv: ct,
  shapeTpc: _,
  createChildren: at,
  createGroup: it,
  createTop: st,
  createTopic: lt,
  createSummary: ot,
  selectNode: yt,
  unselectNode: vt,
  selectNextSibling: bt,
  selectPrevSibling: Nt,
  selectFirstChild: xt,
  selectParent: Ct,
  getAllDataString: kt,
  getAllData: Et,
  getAllDataWithAutoHide: wt,
  getAllDataMd: St,
  scale: At,
  toCenter: Bt,
  toTopLeft: Ot,
  focusNode: Pt,
  cancelFocus: zt,
  initLeft: Ft,
  initRight: Rt,
  initSide: It,
  setLocale: qt,
  enableEdit: Lt,
  disableEdit: $t,
  expandNode: jt,
  refresh: Vt,
  exportSvg: gt,
  exportSvgDom: mt,
  init: function(e, t) {
    e && (this.nodeData = e), t && (this.expandDeep = t), P(this.nodeData), console.log("ME_version " + j.version), console.log(this), this.mindElixirBox.className.indexOf("mind-elixir") === -1 && (this.mindElixirBox.className += "mind-elixir"), this.mindElixirBox.innerHTML = "", this.container = G.createElement("div"), this.container.className = "map-container", this.overflowHidden && (this.container.style.overflow = "hidden"), this.map = G.createElement("div"), this.map.className = "map-canvas", this.map.setAttribute("tabindex", "0"), this.container.appendChild(this.map), this.mindElixirBox.appendChild(this.container), this.root = G.createElement("root"), this.box = G.createElement("children"), this.box.className = "mindbox", this.svg2nd = K("svg2nd"), this.linkController = K("linkcontroller"), this.P2 = G.createElement("div"), this.P3 = G.createElement("div"), this.P2.className = this.P3.className = "circle", this.line1 = be(0, 0, 0, 0), this.line2 = be(0, 0, 0, 0), this.linkController.appendChild(this.line1), this.linkController.appendChild(this.line2), this.linkSvgGroup = K("topiclinks"), this.map.appendChild(this.root), this.map.appendChild(this.box), this.map.appendChild(this.svg2nd), this.map.appendChild(this.linkController), this.map.appendChild(this.linkSvgGroup), this.map.appendChild(this.P2), this.map.appendChild(this.P3), this.toolBar && Ln(this), this.nodeMenu && An(this), this.keypress && Dn(this), xn(this), Re() && this.mobileMenu ? Hn(this) : this.contextMenu && bn(this, this.contextMenuOption), this.draggable && Mn(this), ue(this.nodeData, 0, this.expandDeep || 2), this.layout(), this.linkDiv(), this.toTopLeft(), vn(this);
  }
};
j.LEFT = 0;
j.RIGHT = 1;
j.SIDE = 2;
j.version = "0.17.0";
j.E = $;
j.new = (e) => ({
  nodeData: {
    id: ee(),
    topic: e || "new topic",
    root: !0,
    style: {
      color: "#ffffff",
      background: "#00aaff"
    },
    children: []
  },
  linkData: {}
});
export {
  j as default
};
//# sourceMappingURL=mind.mjs.map
