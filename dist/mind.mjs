function Yt(i) {
  return i.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}
const mi = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
), mn = (i) => i.replace(
  /\brgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g,
  function(e, t, n, s) {
    return "#" + ("0" + Number(t).toString(16)).substr(-2) + ("0" + Number(n).toString(16)).substr(-2) + ("0" + Number(s).toString(16)).substr(-2);
  }
), Fn = function(i, e) {
  if (e = e || this.nodeData, e.id === i)
    return e;
  if (e.children && e.children.length)
    for (let t = 0; t < e.children.length; t++) {
      const n = Fn(i, e.children[t]);
      if (n)
        return n;
    }
  else
    return null;
}, ce = (i, e) => {
  if (i.parent = e, i.children)
    for (let t = 0; t < i.children.length; t++)
      ce(i.children[t], i);
};
function qn(i) {
  if (i.id = ot(), i.children)
    for (let e = 0; e < i.children.length; e++)
      qn(i.children[e]);
}
const yi = (i, e) => {
  var t = Date.now();
  return function() {
    var n = this, s = arguments, r = Date.now();
    r - t >= e && (i.apply(n, s), t = Date.now());
  };
};
function In(i, e, t, n) {
  const s = n - e, r = i - t;
  let o = Math.atan(Math.abs(s) / Math.abs(r)) / 3.14 * 180;
  r < 0 && s > 0 && (o = 180 - o), r < 0 && s < 0 && (o = 180 + o), r > 0 && s < 0 && (o = 360 - o);
  const a = 20, l = 30;
  var c = o + l;
  const u = o - l;
  return {
    x1: t + Math.cos(Math.PI * c / 180) * a,
    y1: n - Math.sin(Math.PI * c / 180) * a,
    x2: t + Math.cos(Math.PI * u / 180) * a,
    y2: n - Math.sin(Math.PI * u / 180) * a
  };
}
function Gt(i, e, t) {
  let n, s;
  const r = (i.cy - t) / (e - i.cx);
  return r > i.h / i.w || r < -i.h / i.w ? i.cy - t < 0 ? (n = i.cx - i.h / 2 / r, s = i.cy + i.h / 2) : (n = i.cx + i.h / 2 / r, s = i.cy - i.h / 2) : i.cx - e < 0 ? (n = i.cx + i.w / 2, s = i.cy - i.w * r / 2) : (n = i.cx - i.w / 2, s = i.cy + i.w * r / 2), {
    x: n,
    y: s
  };
}
function Ut(i, e, t) {
  let n, s;
  const r = (i.cy - t) / (e - i.cx);
  return r > i.h / i.w || r < -i.h / i.w ? i.cy - t < 0 ? (n = i.cx - i.h / 2 / r, s = i.cy + i.h / 2) : (n = i.cx + i.h / 2 / r, s = i.cy - i.h / 2) : i.cx - e < 0 ? (n = i.cx + i.w / 2, s = i.cy - i.w * r / 2) : (n = i.cx - i.w / 2, s = i.cy + i.w * r / 2), {
    x: n,
    y: s
  };
}
function ot() {
  return (new Date().getTime().toString(16) + Math.random().toString(16).substr(2)).substr(2, 16);
}
function Pi() {
  const i = ot();
  return {
    topic: this.newTopicName || "new node",
    id: i
  };
}
function wi() {
  const i = ot();
  return {
    topic: this.newTopicName || "new node",
    id: i,
    type: "summary",
    summary: {
      topicId: i,
      range: this.currentSummaryNodeArr.map((e) => e.nodeObj.id)
    }
  };
}
function bi(i, e) {
  let t = !0;
  for (; e.parent; ) {
    if (e.parent === i) {
      t = !1;
      break;
    }
    e = e.parent;
  }
  return t;
}
function xi(i) {
  const e = i.parent.children, t = e.indexOf(i), n = e[t];
  t === 0 ? (e[t] = e[e.length - 1], e[e.length - 1] = n) : (e[t] = e[t - 1], e[t - 1] = n);
}
function Hi(i) {
  const e = i.parent.children, t = e.indexOf(i), n = e[t];
  t === e.length - 1 ? (e[t] = e[0], e[0] = n) : (e[t] = e[t + 1], e[t + 1] = n);
}
function At(i) {
  const e = i.parent.children, t = e.indexOf(i);
  return e.splice(t, 1), e.length;
}
function Ai(i, e) {
  const t = i.parent.children, n = t.indexOf(i);
  t.splice(n + 1, 0, e);
}
function Di(i, e) {
  const t = i.parent.children, n = t.indexOf(i);
  t.splice(n, 0, e);
}
function zi(i, e) {
  const t = i.parent.children, n = t.indexOf(i);
  t[n] = e, e.children = [i];
}
function Li(i, e) {
  At(i), e.children ? e.children.push(i) : e.children = [i];
}
function Oi(i, e) {
  At(i);
  const t = e.parent.children;
  let n = 0;
  for (let s = 0; s < t.length; s++)
    if (t[s] === e) {
      n = s;
      break;
    }
  t.splice(n, 0, i);
}
function Ti(i, e) {
  At(i);
  const t = e.parent.children;
  let n = 0;
  for (let s = 0; s < t.length; s++)
    if (t[s] === e) {
      n = s;
      break;
    }
  t.splice(n + 1, 0, i);
}
const Se = {
  afterMoving: !1,
  mousedown: !1,
  lastX: null,
  lastY: null,
  onMove(i, e) {
    if (this.mousedown) {
      if (this.afterMoving = !0, !this.lastX) {
        this.lastX = i.pageX, this.lastY = i.pageY;
        return;
      }
      const t = this.lastX - i.pageX, n = this.lastY - i.pageY;
      e.scrollTo(
        e.scrollLeft + t,
        e.scrollTop + n
      ), this.lastX = i.pageX, this.lastY = i.pageY;
    }
  },
  clear() {
    this.afterMoving = !1, this.mousedown = !1, this.lastX = null, this.lastY = null;
  }
};
function nt(i) {
  this.dom = i, this.mousedown = !1, this.lastX = null, this.lastY = null;
}
nt.prototype.init = function(i, e) {
  this.handleMouseMove = (t) => {
    if (t.stopPropagation(), this.mousedown) {
      if (!this.lastX) {
        this.lastX = t.pageX, this.lastY = t.pageY;
        return;
      }
      const n = this.lastX - t.pageX, s = this.lastY - t.pageY;
      e(n, s), this.lastX = t.pageX, this.lastY = t.pageY;
    }
  }, this.handleMouseDown = (t) => {
    t.stopPropagation(), this.mousedown = !0;
  }, this.handleClear = (t) => {
    t.stopPropagation(), this.clear();
  }, i.addEventListener("mousemove", this.handleMouseMove), i.addEventListener("mouseleave", this.handleClear), i.addEventListener("mouseup", this.handleClear), this.dom.addEventListener("mousedown", this.handleMouseDown);
};
nt.prototype.destory = function(i) {
  i.removeEventListener("mousemove", this.handleMouseMove), i.removeEventListener("mouseleave", this.handleClear), i.removeEventListener("mouseup", this.handleClear), this.dom.removeEventListener("mousedown", this.handleMouseDown);
};
nt.prototype.clear = function() {
  this.mousedown = !1, this.lastX = null, this.lastY = null;
};
const ee = document, te = "http://www.w3.org/2000/svg", Xi = function(i) {
  const e = ee.createElementNS(te, "path");
  return e.setAttribute("d", i), e.setAttribute("stroke", "#555"), e.setAttribute("fill", "none"), e.setAttribute("stroke-width", "1"), e.setAttribute("stroke-linecap", "square"), e.setAttribute("transform", "translate(0.5,-0.5)"), e;
}, tt = function(i) {
  const e = ee.createElementNS(te, "svg");
  return e.setAttribute("class", i), e;
}, Ni = function(i) {
  const e = ee.createElementNS(te, "path");
  return e.setAttribute("d", i), e.setAttribute("fill", "none"), e.setAttribute("stroke-linecap", "square"), e.setAttribute("stroke", "#F6A04D"), e.setAttribute("stroke-width", "3"), e.setAttribute("transform", "translate(0.5,-0.5)"), e;
}, yn = function(i, e, t, n) {
  const s = ee.createElementNS(te, "line");
  return s.setAttribute("x1", i.toString()), s.setAttribute("y1", e.toString()), s.setAttribute("x2", t.toString()), s.setAttribute("y2", n.toString()), s.setAttribute("stroke", "#bbb"), s.setAttribute("fill", "none"), s.setAttribute("stroke-width", "2"), s;
}, Mi = function(i) {
  const e = ee.createElementNS(te, "path");
  return e.setAttribute("d", i), e.setAttribute("stroke", "#555"), e.setAttribute("fill", "none"), e.setAttribute("stroke-linecap", "square"), e.setAttribute("stroke-width", "1"), e.setAttribute("transform", "translate(0.5,-0.5)"), e;
}, Bi = function(i, e) {
  const t = ee.createElementNS(te, "g"), n = ee.createElementNS(te, "path"), s = ee.createElementNS(te, "path");
  return s.setAttribute("d", e), s.setAttribute("stroke", "rgb(235, 95, 82)"), s.setAttribute("fill", "none"), s.setAttribute("stroke-linecap", "cap"), s.setAttribute("stroke-width", "2"), n.setAttribute("d", i), n.setAttribute("stroke", "rgb(235, 95, 82)"), n.setAttribute("fill", "none"), n.setAttribute("stroke-linecap", "cap"), n.setAttribute("stroke-width", "2"), t.appendChild(n), t.appendChild(s), t;
}, Ci = function(i = 10, e = 10, t) {
  const n = ee.createElementNS(te, "svg"), s = ee.createElementNS(te, "g"), r = ee.createElementNS(te, "rect");
  r.setAttribute("width", i.toString()), r.setAttribute("height", e.toString()), r.setAttribute("stroke", "#2ebdff"), r.setAttribute("stroke-width", "2"), r.setAttribute("fill", "none"), n.setAttribute("class", "line"), r.setAttribute("x", "1"), r.setAttribute("y", "1"), s.appendChild(r);
  const o = ee.createElementNS(te, "rect");
  return o.setAttribute("width", "6"), o.setAttribute("height", "6"), o.setAttribute("stroke", "#2ebdff"), o.setAttribute("stroke-width", "2"), o.setAttribute("fill", "white"), o.setAttribute("x", (i - 3).toString()), o.setAttribute("y", (e - 3).toString()), o.setAttribute("class", "resize"), s.appendChild(o), n.appendChild(s), n.style.width = t.clientWidth + 5 + "px", n.style.height = t.clientHeight + 5 + "px", o.onpointerdown = function(a) {
    const l = Number(r.getAttribute("width")), c = Number(r.getAttribute("height"));
    let u = a.clientX, d = a.clientY;
    f(a.pageX, a.pageY);
    function f(g, p) {
      const v = l + g - u, w = c + p - d;
      r.setAttribute("width", v.toString()), r.setAttribute("height", w.toString()), o.setAttribute("x", (v - 3).toString()), o.setAttribute("y", (w - 3).toString()), n.style.width = v + 5 + "px", n.style.height = w + 5 + "px", t.style.width = v + "px", t.style.height = w + "px";
    }
    function h(g) {
      f(g.pageX, g.pageY);
    }
    o.onpointermove = h, o.onpointerup = function(g) {
      o.onpointermove = null, o.onpointerup = null, o.releasePointerCapture(g.pointerId);
    }, a.stopPropagation(), a.preventDefault(), o.setPointerCapture(a.pointerId);
  }, o.ondragstart = function() {
    return !1;
  }, n;
}, W = document, G = (i, e) => (e ? e.mindElixirBox : W).querySelector(`[data-nodeid=me${i}]`);
function Pn(i, e, t) {
  i.onpointerdown = (n) => {
    if (!e.classList.contains("selected"))
      return;
    const s = n.clientX, r = e.clientWidth - Number(getComputedStyle(e).paddingLeft.replace("px", "")) - Number(getComputedStyle(e).paddingRight.replace("px", ""));
    i.onpointermove = (o) => {
      const a = o.clientX;
      e.style.width = (r + a - s).toString() + "px", i.style.height = t.style.height = e.clientHeight.toString() + "px", e.nodeObj.style || (e.nodeObj.style = {}), e.nodeObj.style.width = e.style.width, e.nodeObj.style.controllWidth = i.style.height, o.preventDefault();
    }, i.setPointerCapture(n.pointerId), n.preventDefault();
  }, i.onpointerup = (n) => {
    var s;
    i.onpointermove = null, i.releasePointerCapture(n.pointerId), (s = this == null ? void 0 : this.linkDiv) == null || s.call(this);
  };
}
const ke = function(i, e) {
  var s;
  const t = W.createElement("widthControllRight"), n = W.createElement("widthControllLeft");
  if (i.textContent = e.topic, this != null && this.widthControll && (Pn.call(this, n, i, t), Pn.call(this, t, i, n), i.appendChild(t), i.appendChild(n)), e.style && (i.style.color = e.style.color || "#2c3e50", i.style.background = e.style.background ? e.style.background : (s = e == null ? void 0 : e.parent) != null && s.root ? "#ffffff" : "inherit", /[a-z]/i.test(e.style.fontSize) ? i.style.fontSize = e.style.fontSize : i.style.fontSize = e.style.fontSize + "px", i.style.fontWeight = e.style.fontWeight || "normal", i.style.width = e.style.width || "fit-content", setTimeout(() => {
    n.style.height = t.style.height = e.style.controllWidth || i.clientHeight + "px";
  }, 0)), e.icons) {
    const r = W.createElement("span");
    r.className = "icons", typeof e.icons == "string" && (r.innerHTML = e.icons), i.insertBefore(r, i.firstChild);
  }
  if (e.hyperLink) {
    const r = W.createElement("a");
    r.className = "hyper-link", r.target = "_blank", r.innerHTML = '<svg t="1662346495524" style="font-size:20px;margin-left: 3px" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2372" width="22" height="22"><path d="M573.44 640a187.68 187.68 0 0 1-132.8-55.36L416 560l45.28-45.28 24.64 24.64a124.32 124.32 0 0 0 170.08 5.76l1.44-1.28a49.44 49.44 0 0 0 4-3.84l101.28-101.28a124.16 124.16 0 0 0 0-176l-1.92-1.92a124.16 124.16 0 0 0-176 0l-51.68 51.68a49.44 49.44 0 0 0-3.84 4l-20 24.96-49.92-40L480 276.32a108.16 108.16 0 0 1 8.64-9.28l51.68-51.68a188.16 188.16 0 0 1 266.72 0l1.92 1.92a188.16 188.16 0 0 1 0 266.72l-101.28 101.28a112 112 0 0 1-8.48 7.84 190.24 190.24 0 0 1-125.28 48z" fill="#002fa7" p-id="2373"></path><path d="M350.72 864a187.36 187.36 0 0 1-133.28-55.36l-1.92-1.92a188.16 188.16 0 0 1 0-266.72l101.28-101.28a112 112 0 0 1 8.48-7.84 188.32 188.32 0 0 1 258.08 7.84L608 464l-45.28 45.28-24.64-24.64A124.32 124.32 0 0 0 368 478.88l-1.44 1.28a49.44 49.44 0 0 0-4 3.84l-101.28 101.28a124.16 124.16 0 0 0 0 176l1.92 1.92a124.16 124.16 0 0 0 176 0l51.68-51.68a49.44 49.44 0 0 0 3.84-4l20-24.96 50.08 40-20.8 25.12a108.16 108.16 0 0 1-8.64 9.28l-51.68 51.68A187.36 187.36 0 0 1 350.72 864z" fill="#002fa7" p-id="2374"></path></svg>', r.href = e.hyperLink, i.appendChild(r);
  }
  if (e.linkJump && e.linkJump.forEach((r) => {
    const o = document.createElement("a");
    o.className = "linkJump", o.title = r.title, o.innerHTML = '<svg t="1661493526135" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2220" width="16" height="16"><path d="M1001.175714 593.762001L700.806246 293.324796a76.091491 76.091491 0 0 0-107.566725 0 76.023754 76.023754 0 0 0 0 107.544146l171.713884 171.826779H152.653982v-115.288769a76.046333 76.046333 0 0 0-152.115245 0v152.092666c0 6.931777 2.145012 13.253918 3.951338 19.621218-1.806326 6.389879-3.951339 12.644283-3.951338 19.621218a76.068912 76.068912 0 0 0 76.046333 76.068912h686.020111L593.239521 894.131468a76.046333 76.046333 0 1 0 107.566725 107.566726L1001.175714 701.328726a76.091491 76.091491 0 0 0 0-107.566725z" fill="#1296db" p-id="2221"></path></svg>', o.onclick = () => {
      Wn.call(this, r.toId);
    }, i.appendChild(o);
  }), e.remark) {
    const r = W.createElement("div");
    r.className = "content hidden", r.textContent = e.remark;
    const o = W.createElement("div");
    o.className = "remark", o.innerHTML = '<svg t="1659682144612" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2580" width="200" height="200"><path d="M625.728 57.472c19.264 0 34.688 6.848 48.128 20.16l208.96 207.04c14.272 13.12 21.568 29.568 21.568 49.28v504.576c0 71.808-56.256 127.744-128.576 127.744H252.16c-72.128 0-128.576-55.68-128.576-127.744V184.704c0-71.68 56.256-127.232 128.576-127.232z m-34.304 76.8H252.16c-30.144 0-51.776 21.376-51.776 50.432v653.824c0 29.44 21.888 50.944 51.776 50.944h523.648c30.016 0 51.84-21.632 51.84-50.944l-0.128-464.512H687.488A96 96 0 0 1 591.936 287.36l-0.448-9.216V134.208zM665.6 704a38.4 38.4 0 0 1 0 76.8H294.4a38.4 38.4 0 0 1 0-76.8h371.2z m0-192a38.4 38.4 0 0 1 0 76.8H294.4a38.4 38.4 0 0 1 0-76.8h371.2z m-192-192a38.4 38.4 0 1 1 0 76.8H294.4a38.4 38.4 0 1 1 0-76.8h179.2z m181.824-152.512v110.592a32 32 0 0 0 26.24 31.488l5.76 0.512h111.872L655.424 167.424z" p-id="2581"></path></svg>';
    let a;
    r.onmouseover = () => {
      clearTimeout(a);
    }, o.onmouseover = () => {
      r.classList.remove("hidden");
    }, r.onmouseleave = () => {
      a = setTimeout(() => {
        r.classList.contains("hidden") || r.classList.add("hidden");
      }, 300);
    }, o.onmouseleave = () => {
      a = setTimeout(() => {
        r.classList.contains("hidden") || r.classList.add("hidden");
      }, 300);
    }, o.appendChild(r), i.appendChild(o);
  }
  if (e.image && e.image.forEach((o) => {
    const a = W.createElement("img");
    a.className = "image", a.src = o.url, a.style.width = o.width + "px", a.style.height = o.height + "px", a.style.display = "block", i.appendChild(a);
  }), e.tags) {
    const r = W.createElement("div");
    r.className = "tags", r.innerHTML = e.tags.filter((o) => o !== "").map((o) => `<span>${Yt(o)}</span>`).join(""), i.appendChild(r);
  }
};
function Wn(i) {
  let e = this.container.querySelector(`tpc[data-nodeid=me${i}]`);
  e || (Yn(this.nodeData, i), this.layout(), this.linkDiv(), e = this.container.querySelector(`tpc[data-nodeid=me${i}]`)), e.scrollIntoView({ block: "center", behavior: "auto" }), e.className = "blink", setTimeout(() => {
    e.classList.remove("blink");
  }, 3e3);
}
function Yn(i, e) {
  if (i.id === e)
    return !0;
  let t = !1;
  for (const n of i.children || [])
    Yn(n, e) && (t = !0);
  return t && (i.expanded = !0), t;
}
const Si = function(i, e) {
  const t = W.createElement("GRP"), n = this.createTop(i);
  if (t.appendChild(n), !e && i.children && i.children.length > 0 && (n.appendChild(Je(i.expanded)), i.expanded !== !1)) {
    const [s, r] = this.createChildren(i.children);
    t.appendChild(s);
  }
  return { grp: t, top: n };
}, ji = function(i, e) {
  const t = W.createElement("SMY"), n = this.createTop(i);
  return t.appendChild(n), !e && i.children && i.children.length > 0 && (n.appendChild(Je(i.expanded)), i.expanded !== !1 && this.createChildren(i.children)), { smy: t, top: n };
}, Ei = function(i) {
  const e = W.createElement("t"), t = this.createTopic(i);
  return ke.call(this, t, i), e.appendChild(t), e;
}, ki = function(i) {
  const e = W.createElement("tpc");
  return e.nodeObj = i, e.dataset.nodeid = "me" + i.id, e.draggable = this.draggable, e;
};
function Vi(i) {
  const e = W.createRange();
  e.selectNodeContents(i);
  const t = window.getSelection();
  t && (t.removeAllRanges(), t.addRange(e));
}
function Ri(i) {
  var n, s, r, o, a, l, c;
  if (console.time("createInputDiv"), !i)
    return;
  let e = W.createElement("div"), t;
  i.nodeObj.icons ? t = i.childNodes[1].textContent : t = i.childNodes[0].textContent, i.appendChild(e), e.id = "input-box", e.contentEditable = "true", e.spellcheck = !1, e.textContent = t, e.draggable = !1, i.nodeObj.image && i.nodeObj.image.forEach((d) => {
    const f = W.createElement("img");
    f.src = d.url, f.style.width = d.width + "px", f.style.display = "block", e.appendChild(f);
    const h = Ci(f.clientWidth, f.clientHeight, f);
    e.insertBefore(h, f);
  }), e.style.cssText = `min-width:${i.offsetWidth - 22}px;min-height:${i.clientHeight - 16}px`, (s = (n = i.nodeObj) == null ? void 0 : n.style) != null && s.width && (e.style.width = "auto"), (((o = (r = i.nodeObj) == null ? void 0 : r.style) == null ? void 0 : o.color) === "#ffffff" || ((a = i.nodeObj) == null ? void 0 : a.id) === "root" && !((c = (l = i.nodeObj) == null ? void 0 : l.style) != null && c.color)) && (e.style.color = "#2c3e50"), this.direction === 0 && (e.style.right = "0"), e.focus(), Vi(e), this.inputDiv = e, this.bus.fire("operation", {
    name: "beginEdit",
    obj: i.nodeObj
  }), e.addEventListener("keydown", (u) => {
    u.stopPropagation();
    const d = u.key;
    if (d === "Enter" || d === "Tab") {
      if (u.shiftKey)
        return;
      u.preventDefault(), this.inputDiv.blur(), this.map.focus();
    }
  }), e.addEventListener("blur", () => {
    var p, v;
    if (!e)
      return;
    const u = i.nodeObj, d = e.textContent.trim(), f = (v = (p = u.image) == null ? void 0 : p.length) != null ? v : 0;
    if (u.image = [], e.childNodes.forEach((w) => {
      w.nodeName === "IMG" && u.image.push({
        url: w.src,
        width: w.width,
        height: w.height
      });
    }), d === "" && u.image.length === 0 ? u.topic = t : u.topic = d, e.remove(), this.inputDiv = e = null, d === t && f === u.image.length && f === 0)
      return;
    u.image.length === 0 && delete u.image, i.childNodes[0].textContent = u.topic;
    const h = i.querySelector("widthControllRight"), g = i.querySelector("widthControllRight");
    u.style || (u.style = {}), u.style.controllWidth = h.style.height = g.style.height = i.clientHeight.toString() + "px", delete u.style.width, this.shapeTpc(i, u), this.linkDiv(), Gn.call(this, this.nodeData, u.id, u.topic), this.bus.fire("operation", {
      name: "finishEdit",
      obj: u,
      origin: t
    });
  }), console.timeEnd("createInputDiv");
}
function Gn(i, e, t) {
  var n;
  (n = i == null ? void 0 : i.linkJump) == null || n.forEach(({ toId: s }, r) => {
    if (s === e) {
      i.linkJump[r].title = t;
      const o = this.container.querySelector(`tpc[data-nodeid=me${i.id}] .linkJump`);
      o.title = t;
    }
  });
  for (const s of i.children || [])
    Gn.call(this, s, e, t);
}
const Je = function(i) {
  const e = W.createElement("epd");
  return e.innerText = i !== !1 ? "-" : "+", e.expanded = i !== !1, e.className = i !== !1 ? "minus" : "", e;
};
function Zi(i, e, t) {
  let n;
  e ? n = e : n = W.createElement("children");
  let s = [];
  for (let r = 0; r < i.length; r++) {
    const o = i[r];
    if ((o == null ? void 0 : o.type) === "summary") {
      const { smy: c } = this.createSummary(o);
      if (o.children && o.children.length > 0 && o.expanded !== !1) {
        const [u, d] = this.createChildren(o.children);
        c.appendChild(u), d && d.forEach((f) => {
          c.appendChild(f);
        });
      }
      s.push(c);
      continue;
    }
    const a = W.createElement("GRP");
    t === 0 ? a.className = "lhs" : t === 1 ? a.className = "rhs" : t === 2 && (o.direction === 0 ? a.className = "lhs" : o.direction === 1 && (a.className = "rhs"));
    const l = this.createTop(o);
    if (o.children && o.children.length > 0) {
      if (l.appendChild(Je(o.expanded)), a.appendChild(l), o.expanded !== !1) {
        const [c, u] = this.createChildren(o.children);
        a.appendChild(c), u && u.forEach((d) => {
          var f;
          (f = a.children) != null && f[2] || a.appendChild(W.createElement("smychildren")), a.children[2].appendChild(d);
        });
      }
    } else
      a.appendChild(l);
    n.appendChild(a);
  }
  return [n, s];
}
function Fi() {
  console.time("layout"), this.root.innerHTML = "", this.box.innerHTML = "";
  const i = this.createTopic(this.nodeData);
  ke.call(this, i, this.nodeData), i.draggable = !1, this.root.appendChild(i);
  const e = this.nodeData.children;
  if (!(!e || e.length === 0)) {
    if (this.direction === 2) {
      let t = 0, n = 0;
      e.map((s) => {
        s.direction === void 0 ? t <= n ? (s.direction = 0, t += 1) : (s.direction = 1, n += 1) : s.direction === 0 ? t += 1 : n += 1;
      });
    }
    this.createChildren(this.nodeData.children, this.box, this.direction), console.timeEnd("layout");
  }
}
var Un = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ie = { exports: {} }, _e = { exports: {} };
(function() {
  var i, e, t, n, s, r;
  typeof performance < "u" && performance !== null && performance.now ? _e.exports = function() {
    return performance.now();
  } : typeof process < "u" && process !== null && process.hrtime ? (_e.exports = function() {
    return (i() - s) / 1e6;
  }, e = process.hrtime, i = function() {
    var o;
    return o = e(), o[0] * 1e9 + o[1];
  }, n = i(), r = process.uptime() * 1e9, s = n - r) : Date.now ? (_e.exports = function() {
    return Date.now() - t;
  }, t = Date.now()) : (_e.exports = function() {
    return new Date().getTime() - t;
  }, t = new Date().getTime());
}).call(Un);
var qi = _e.exports, ye = typeof window > "u" ? Un : window, mt = ["moz", "webkit"], We = "AnimationFrame", Ge = ye["request" + We], it = ye["cancel" + We] || ye["cancelRequest" + We];
for (var Qe = 0; !Ge && Qe < mt.length; Qe++)
  Ge = ye[mt[Qe] + "Request" + We], it = ye[mt[Qe] + "Cancel" + We] || ye[mt[Qe] + "CancelRequest" + We];
if (!Ge || !it) {
  var Zt = 0, wn = 0, Be = [], Ii = 1e3 / 60;
  Ge = function(i) {
    if (Be.length === 0) {
      var e = qi(), t = Math.max(0, Ii - (e - Zt));
      Zt = t + e, setTimeout(function() {
        var n = Be.slice(0);
        Be.length = 0;
        for (var s = 0; s < n.length; s++)
          if (!n[s].cancelled)
            try {
              n[s].callback(Zt);
            } catch (r) {
              setTimeout(function() {
                throw r;
              }, 0);
            }
      }, Math.round(t));
    }
    return Be.push({
      handle: ++wn,
      callback: i,
      cancelled: !1
    }), wn;
  }, it = function(i) {
    for (var e = 0; e < Be.length; e++)
      Be[e].handle === i && (Be[e].cancelled = !0);
  };
}
Ie.exports = function(i) {
  return Ge.call(ye, i);
};
Ie.exports.cancel = function() {
  it.apply(ye, arguments);
};
Ie.exports.polyfill = function(i) {
  i || (i = ye), i.requestAnimationFrame = Ge, i.cancelAnimationFrame = it;
};
var Jt = function(i) {
  this.ok = !1, this.alpha = 1, i.charAt(0) == "#" && (i = i.substr(1, 6)), i = i.replace(/ /g, ""), i = i.toLowerCase();
  var e = {
    aliceblue: "f0f8ff",
    antiquewhite: "faebd7",
    aqua: "00ffff",
    aquamarine: "7fffd4",
    azure: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "000000",
    blanchedalmond: "ffebcd",
    blue: "0000ff",
    blueviolet: "8a2be2",
    brown: "a52a2a",
    burlywood: "deb887",
    cadetblue: "5f9ea0",
    chartreuse: "7fff00",
    chocolate: "d2691e",
    coral: "ff7f50",
    cornflowerblue: "6495ed",
    cornsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "00ffff",
    darkblue: "00008b",
    darkcyan: "008b8b",
    darkgoldenrod: "b8860b",
    darkgray: "a9a9a9",
    darkgreen: "006400",
    darkkhaki: "bdb76b",
    darkmagenta: "8b008b",
    darkolivegreen: "556b2f",
    darkorange: "ff8c00",
    darkorchid: "9932cc",
    darkred: "8b0000",
    darksalmon: "e9967a",
    darkseagreen: "8fbc8f",
    darkslateblue: "483d8b",
    darkslategray: "2f4f4f",
    darkturquoise: "00ced1",
    darkviolet: "9400d3",
    deeppink: "ff1493",
    deepskyblue: "00bfff",
    dimgray: "696969",
    dodgerblue: "1e90ff",
    feldspar: "d19275",
    firebrick: "b22222",
    floralwhite: "fffaf0",
    forestgreen: "228b22",
    fuchsia: "ff00ff",
    gainsboro: "dcdcdc",
    ghostwhite: "f8f8ff",
    gold: "ffd700",
    goldenrod: "daa520",
    gray: "808080",
    green: "008000",
    greenyellow: "adff2f",
    honeydew: "f0fff0",
    hotpink: "ff69b4",
    indianred: "cd5c5c",
    indigo: "4b0082",
    ivory: "fffff0",
    khaki: "f0e68c",
    lavender: "e6e6fa",
    lavenderblush: "fff0f5",
    lawngreen: "7cfc00",
    lemonchiffon: "fffacd",
    lightblue: "add8e6",
    lightcoral: "f08080",
    lightcyan: "e0ffff",
    lightgoldenrodyellow: "fafad2",
    lightgrey: "d3d3d3",
    lightgreen: "90ee90",
    lightpink: "ffb6c1",
    lightsalmon: "ffa07a",
    lightseagreen: "20b2aa",
    lightskyblue: "87cefa",
    lightslateblue: "8470ff",
    lightslategray: "778899",
    lightsteelblue: "b0c4de",
    lightyellow: "ffffe0",
    lime: "00ff00",
    limegreen: "32cd32",
    linen: "faf0e6",
    magenta: "ff00ff",
    maroon: "800000",
    mediumaquamarine: "66cdaa",
    mediumblue: "0000cd",
    mediumorchid: "ba55d3",
    mediumpurple: "9370d8",
    mediumseagreen: "3cb371",
    mediumslateblue: "7b68ee",
    mediumspringgreen: "00fa9a",
    mediumturquoise: "48d1cc",
    mediumvioletred: "c71585",
    midnightblue: "191970",
    mintcream: "f5fffa",
    mistyrose: "ffe4e1",
    moccasin: "ffe4b5",
    navajowhite: "ffdead",
    navy: "000080",
    oldlace: "fdf5e6",
    olive: "808000",
    olivedrab: "6b8e23",
    orange: "ffa500",
    orangered: "ff4500",
    orchid: "da70d6",
    palegoldenrod: "eee8aa",
    palegreen: "98fb98",
    paleturquoise: "afeeee",
    palevioletred: "d87093",
    papayawhip: "ffefd5",
    peachpuff: "ffdab9",
    peru: "cd853f",
    pink: "ffc0cb",
    plum: "dda0dd",
    powderblue: "b0e0e6",
    purple: "800080",
    rebeccapurple: "663399",
    red: "ff0000",
    rosybrown: "bc8f8f",
    royalblue: "4169e1",
    saddlebrown: "8b4513",
    salmon: "fa8072",
    sandybrown: "f4a460",
    seagreen: "2e8b57",
    seashell: "fff5ee",
    sienna: "a0522d",
    silver: "c0c0c0",
    skyblue: "87ceeb",
    slateblue: "6a5acd",
    slategray: "708090",
    snow: "fffafa",
    springgreen: "00ff7f",
    steelblue: "4682b4",
    tan: "d2b48c",
    teal: "008080",
    thistle: "d8bfd8",
    tomato: "ff6347",
    turquoise: "40e0d0",
    violet: "ee82ee",
    violetred: "d02090",
    wheat: "f5deb3",
    white: "ffffff",
    whitesmoke: "f5f5f5",
    yellow: "ffff00",
    yellowgreen: "9acd32"
  };
  i = e[i] || i;
  for (var t = [
    {
      re: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*((?:\d?\.)?\d)\)$/,
      example: ["rgba(123, 234, 45, 0.8)", "rgba(255,234,245,1.0)"],
      process: function(l) {
        return [
          parseInt(l[1]),
          parseInt(l[2]),
          parseInt(l[3]),
          parseFloat(l[4])
        ];
      }
    },
    {
      re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
      example: ["rgb(123, 234, 45)", "rgb(255,234,245)"],
      process: function(l) {
        return [
          parseInt(l[1]),
          parseInt(l[2]),
          parseInt(l[3])
        ];
      }
    },
    {
      re: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
      example: ["#00ff00", "336699"],
      process: function(l) {
        return [
          parseInt(l[1], 16),
          parseInt(l[2], 16),
          parseInt(l[3], 16)
        ];
      }
    },
    {
      re: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      example: ["#fb0", "f0f"],
      process: function(l) {
        return [
          parseInt(l[1] + l[1], 16),
          parseInt(l[2] + l[2], 16),
          parseInt(l[3] + l[3], 16)
        ];
      }
    }
  ], n = 0; n < t.length; n++) {
    var s = t[n].re, r = t[n].process, o = s.exec(i);
    if (o) {
      var a = r(o);
      this.r = a[0], this.g = a[1], this.b = a[2], a.length > 3 && (this.alpha = a[3]), this.ok = !0;
    }
  }
  this.r = this.r < 0 || isNaN(this.r) ? 0 : this.r > 255 ? 255 : this.r, this.g = this.g < 0 || isNaN(this.g) ? 0 : this.g > 255 ? 255 : this.g, this.b = this.b < 0 || isNaN(this.b) ? 0 : this.b > 255 ? 255 : this.b, this.alpha = this.alpha < 0 ? 0 : this.alpha > 1 || isNaN(this.alpha) ? 1 : this.alpha, this.toRGB = function() {
    return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
  }, this.toRGBA = function() {
    return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.alpha + ")";
  }, this.toHex = function() {
    var l = this.r.toString(16), c = this.g.toString(16), u = this.b.toString(16);
    return l.length == 1 && (l = "0" + l), c.length == 1 && (c = "0" + c), u.length == 1 && (u = "0" + u), "#" + l + c + u;
  }, this.getHelpXML = function() {
    for (var l = new Array(), c = 0; c < t.length; c++)
      for (var u = t[c].example, d = 0; d < u.length; d++)
        l[l.length] = u[d];
    for (var f in e)
      l[l.length] = f;
    var h = document.createElement("ul");
    h.setAttribute("id", "rgbcolor-examples");
    for (var c = 0; c < l.length; c++)
      try {
        var g = document.createElement("li"), p = new RGBColor(l[c]), v = document.createElement("div");
        v.style.cssText = "margin: 3px; border: 1px solid black; background:" + p.toHex() + "; color:" + p.toHex(), v.appendChild(document.createTextNode("test"));
        var w = document.createTextNode(
          " " + l[c] + " -> " + p.toRGB() + " -> " + p.toHex()
        );
        g.appendChild(v), g.appendChild(w), h.appendChild(g);
      } catch {
      }
    return h;
  };
};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Jn = function(i, e) {
  return (Jn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, n) {
    t.__proto__ = n;
  } || function(t, n) {
    for (var s in n)
      Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
  })(i, e);
};
function Kn(i, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  function t() {
    this.constructor = i;
  }
  Jn(i, e), i.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
function Wi(i) {
  var e = "";
  Array.isArray(i) || (i = [i]);
  for (var t = 0; t < i.length; t++) {
    var n = i[t];
    if (n.type === b.CLOSE_PATH)
      e += "z";
    else if (n.type === b.HORIZ_LINE_TO)
      e += (n.relative ? "h" : "H") + n.x;
    else if (n.type === b.VERT_LINE_TO)
      e += (n.relative ? "v" : "V") + n.y;
    else if (n.type === b.MOVE_TO)
      e += (n.relative ? "m" : "M") + n.x + " " + n.y;
    else if (n.type === b.LINE_TO)
      e += (n.relative ? "l" : "L") + n.x + " " + n.y;
    else if (n.type === b.CURVE_TO)
      e += (n.relative ? "c" : "C") + n.x1 + " " + n.y1 + " " + n.x2 + " " + n.y2 + " " + n.x + " " + n.y;
    else if (n.type === b.SMOOTH_CURVE_TO)
      e += (n.relative ? "s" : "S") + n.x2 + " " + n.y2 + " " + n.x + " " + n.y;
    else if (n.type === b.QUAD_TO)
      e += (n.relative ? "q" : "Q") + n.x1 + " " + n.y1 + " " + n.x + " " + n.y;
    else if (n.type === b.SMOOTH_QUAD_TO)
      e += (n.relative ? "t" : "T") + n.x + " " + n.y;
    else {
      if (n.type !== b.ARC)
        throw new Error('Unexpected command type "' + n.type + '" at index ' + t + ".");
      e += (n.relative ? "a" : "A") + n.rX + " " + n.rY + " " + n.xRot + " " + +n.lArcFlag + " " + +n.sweepFlag + " " + n.x + " " + n.y;
    }
  }
  return e;
}
function Kt(i, e) {
  var t = i[0], n = i[1];
  return [t * Math.cos(e) - n * Math.sin(e), t * Math.sin(e) + n * Math.cos(e)];
}
function ae() {
  for (var i = [], e = 0; e < arguments.length; e++)
    i[e] = arguments[e];
  for (var t = 0; t < i.length; t++)
    if (typeof i[t] != "number")
      throw new Error("assertNumbers arguments[" + t + "] is not a number. " + typeof i[t] + " == typeof " + i[t]);
  return !0;
}
var be = Math.PI;
function Ft(i, e, t) {
  i.lArcFlag = i.lArcFlag === 0 ? 0 : 1, i.sweepFlag = i.sweepFlag === 0 ? 0 : 1;
  var n = i.rX, s = i.rY, r = i.x, o = i.y;
  n = Math.abs(i.rX), s = Math.abs(i.rY);
  var a = Kt([(e - r) / 2, (t - o) / 2], -i.xRot / 180 * be), l = a[0], c = a[1], u = Math.pow(l, 2) / Math.pow(n, 2) + Math.pow(c, 2) / Math.pow(s, 2);
  1 < u && (n *= Math.sqrt(u), s *= Math.sqrt(u)), i.rX = n, i.rY = s;
  var d = Math.pow(n, 2) * Math.pow(c, 2) + Math.pow(s, 2) * Math.pow(l, 2), f = (i.lArcFlag !== i.sweepFlag ? 1 : -1) * Math.sqrt(Math.max(0, (Math.pow(n, 2) * Math.pow(s, 2) - d) / d)), h = n * c / s * f, g = -s * l / n * f, p = Kt([h, g], i.xRot / 180 * be);
  i.cX = p[0] + (e + r) / 2, i.cY = p[1] + (t + o) / 2, i.phi1 = Math.atan2((c - g) / s, (l - h) / n), i.phi2 = Math.atan2((-c - g) / s, (-l - h) / n), i.sweepFlag === 0 && i.phi2 > i.phi1 && (i.phi2 -= 2 * be), i.sweepFlag === 1 && i.phi2 < i.phi1 && (i.phi2 += 2 * be), i.phi1 *= 180 / be, i.phi2 *= 180 / be;
}
function bn(i, e, t) {
  ae(i, e, t);
  var n = i * i + e * e - t * t;
  if (0 > n)
    return [];
  if (n === 0)
    return [[i * t / (i * i + e * e), e * t / (i * i + e * e)]];
  var s = Math.sqrt(n);
  return [[(i * t + e * s) / (i * i + e * e), (e * t - i * s) / (i * i + e * e)], [(i * t - e * s) / (i * i + e * e), (e * t + i * s) / (i * i + e * e)]];
}
var I, de = Math.PI / 180;
function xn(i, e, t) {
  return (1 - t) * i + t * e;
}
function Hn(i, e, t, n) {
  return i + Math.cos(n / 180 * be) * e + Math.sin(n / 180 * be) * t;
}
function An(i, e, t, n) {
  var s = 1e-6, r = e - i, o = t - e, a = 3 * r + 3 * (n - t) - 6 * o, l = 6 * (o - r), c = 3 * r;
  return Math.abs(a) < s ? [-c / l] : function(u, d, f) {
    f === void 0 && (f = 1e-6);
    var h = u * u / 4 - d;
    if (h < -f)
      return [];
    if (h <= f)
      return [-u / 2];
    var g = Math.sqrt(h);
    return [-u / 2 - g, -u / 2 + g];
  }(l / a, c / a, s);
}
function Dn(i, e, t, n, s) {
  var r = 1 - s;
  return i * (r * r * r) + e * (3 * r * r * s) + t * (3 * r * s * s) + n * (s * s * s);
}
(function(i) {
  function e() {
    return s(function(a, l, c) {
      return a.relative && (a.x1 !== void 0 && (a.x1 += l), a.y1 !== void 0 && (a.y1 += c), a.x2 !== void 0 && (a.x2 += l), a.y2 !== void 0 && (a.y2 += c), a.x !== void 0 && (a.x += l), a.y !== void 0 && (a.y += c), a.relative = !1), a;
    });
  }
  function t() {
    var a = NaN, l = NaN, c = NaN, u = NaN;
    return s(function(d, f, h) {
      return d.type & b.SMOOTH_CURVE_TO && (d.type = b.CURVE_TO, a = isNaN(a) ? f : a, l = isNaN(l) ? h : l, d.x1 = d.relative ? f - a : 2 * f - a, d.y1 = d.relative ? h - l : 2 * h - l), d.type & b.CURVE_TO ? (a = d.relative ? f + d.x2 : d.x2, l = d.relative ? h + d.y2 : d.y2) : (a = NaN, l = NaN), d.type & b.SMOOTH_QUAD_TO && (d.type = b.QUAD_TO, c = isNaN(c) ? f : c, u = isNaN(u) ? h : u, d.x1 = d.relative ? f - c : 2 * f - c, d.y1 = d.relative ? h - u : 2 * h - u), d.type & b.QUAD_TO ? (c = d.relative ? f + d.x1 : d.x1, u = d.relative ? h + d.y1 : d.y1) : (c = NaN, u = NaN), d;
    });
  }
  function n() {
    var a = NaN, l = NaN;
    return s(function(c, u, d) {
      if (c.type & b.SMOOTH_QUAD_TO && (c.type = b.QUAD_TO, a = isNaN(a) ? u : a, l = isNaN(l) ? d : l, c.x1 = c.relative ? u - a : 2 * u - a, c.y1 = c.relative ? d - l : 2 * d - l), c.type & b.QUAD_TO) {
        a = c.relative ? u + c.x1 : c.x1, l = c.relative ? d + c.y1 : c.y1;
        var f = c.x1, h = c.y1;
        c.type = b.CURVE_TO, c.x1 = ((c.relative ? 0 : u) + 2 * f) / 3, c.y1 = ((c.relative ? 0 : d) + 2 * h) / 3, c.x2 = (c.x + 2 * f) / 3, c.y2 = (c.y + 2 * h) / 3;
      } else
        a = NaN, l = NaN;
      return c;
    });
  }
  function s(a) {
    var l = 0, c = 0, u = NaN, d = NaN;
    return function(f) {
      if (isNaN(u) && !(f.type & b.MOVE_TO))
        throw new Error("path must start with moveto");
      var h = a(f, l, c, u, d);
      return f.type & b.CLOSE_PATH && (l = u, c = d), f.x !== void 0 && (l = f.relative ? l + f.x : f.x), f.y !== void 0 && (c = f.relative ? c + f.y : f.y), f.type & b.MOVE_TO && (u = l, d = c), h;
    };
  }
  function r(a, l, c, u, d, f) {
    return ae(a, l, c, u, d, f), s(function(h, g, p, v) {
      var w = h.x1, x = h.x2, m = h.relative && !isNaN(v), P = h.x !== void 0 ? h.x : m ? 0 : g, H = h.y !== void 0 ? h.y : m ? 0 : p;
      function A(se) {
        return se * se;
      }
      h.type & b.HORIZ_LINE_TO && l !== 0 && (h.type = b.LINE_TO, h.y = h.relative ? 0 : p), h.type & b.VERT_LINE_TO && c !== 0 && (h.type = b.LINE_TO, h.x = h.relative ? 0 : g), h.x !== void 0 && (h.x = h.x * a + H * c + (m ? 0 : d)), h.y !== void 0 && (h.y = P * l + h.y * u + (m ? 0 : f)), h.x1 !== void 0 && (h.x1 = h.x1 * a + h.y1 * c + (m ? 0 : d)), h.y1 !== void 0 && (h.y1 = w * l + h.y1 * u + (m ? 0 : f)), h.x2 !== void 0 && (h.x2 = h.x2 * a + h.y2 * c + (m ? 0 : d)), h.y2 !== void 0 && (h.y2 = x * l + h.y2 * u + (m ? 0 : f));
      var D = a * u - l * c;
      if (h.xRot !== void 0 && (a !== 1 || l !== 0 || c !== 0 || u !== 1))
        if (D === 0)
          delete h.rX, delete h.rY, delete h.xRot, delete h.lArcFlag, delete h.sweepFlag, h.type = b.LINE_TO;
        else {
          var O = h.xRot * Math.PI / 180, y = Math.sin(O), L = Math.cos(O), z = 1 / A(h.rX), N = 1 / A(h.rY), B = A(L) * z + A(y) * N, E = 2 * y * L * (z - N), S = A(y) * z + A(L) * N, k = B * u * u - E * l * u + S * l * l, F = E * (a * u + l * c) - 2 * (B * c * u + S * a * l), Y = B * c * c - E * a * c + S * a * a, M = (Math.atan2(F, k - Y) + Math.PI) % Math.PI / 2, j = Math.sin(M), U = Math.cos(M);
          h.rX = Math.abs(D) / Math.sqrt(k * A(U) + F * j * U + Y * A(j)), h.rY = Math.abs(D) / Math.sqrt(k * A(j) - F * j * U + Y * A(U)), h.xRot = 180 * M / Math.PI;
        }
      return h.sweepFlag !== void 0 && 0 > D && (h.sweepFlag = +!h.sweepFlag), h;
    });
  }
  function o() {
    return function(a) {
      var l = {};
      for (var c in a)
        l[c] = a[c];
      return l;
    };
  }
  i.ROUND = function(a) {
    function l(c) {
      return Math.round(c * a) / a;
    }
    return a === void 0 && (a = 1e13), ae(a), function(c) {
      return c.x1 !== void 0 && (c.x1 = l(c.x1)), c.y1 !== void 0 && (c.y1 = l(c.y1)), c.x2 !== void 0 && (c.x2 = l(c.x2)), c.y2 !== void 0 && (c.y2 = l(c.y2)), c.x !== void 0 && (c.x = l(c.x)), c.y !== void 0 && (c.y = l(c.y)), c.rX !== void 0 && (c.rX = l(c.rX)), c.rY !== void 0 && (c.rY = l(c.rY)), c;
    };
  }, i.TO_ABS = e, i.TO_REL = function() {
    return s(function(a, l, c) {
      return a.relative || (a.x1 !== void 0 && (a.x1 -= l), a.y1 !== void 0 && (a.y1 -= c), a.x2 !== void 0 && (a.x2 -= l), a.y2 !== void 0 && (a.y2 -= c), a.x !== void 0 && (a.x -= l), a.y !== void 0 && (a.y -= c), a.relative = !0), a;
    });
  }, i.NORMALIZE_HVZ = function(a, l, c) {
    return a === void 0 && (a = !0), l === void 0 && (l = !0), c === void 0 && (c = !0), s(function(u, d, f, h, g) {
      if (isNaN(h) && !(u.type & b.MOVE_TO))
        throw new Error("path must start with moveto");
      return l && u.type & b.HORIZ_LINE_TO && (u.type = b.LINE_TO, u.y = u.relative ? 0 : f), c && u.type & b.VERT_LINE_TO && (u.type = b.LINE_TO, u.x = u.relative ? 0 : d), a && u.type & b.CLOSE_PATH && (u.type = b.LINE_TO, u.x = u.relative ? h - d : h, u.y = u.relative ? g - f : g), u.type & b.ARC && (u.rX === 0 || u.rY === 0) && (u.type = b.LINE_TO, delete u.rX, delete u.rY, delete u.xRot, delete u.lArcFlag, delete u.sweepFlag), u;
    });
  }, i.NORMALIZE_ST = t, i.QT_TO_C = n, i.INFO = s, i.SANITIZE = function(a) {
    a === void 0 && (a = 0), ae(a);
    var l = NaN, c = NaN, u = NaN, d = NaN;
    return s(function(f, h, g, p, v) {
      var w = Math.abs, x = !1, m = 0, P = 0;
      if (f.type & b.SMOOTH_CURVE_TO && (m = isNaN(l) ? 0 : h - l, P = isNaN(c) ? 0 : g - c), f.type & (b.CURVE_TO | b.SMOOTH_CURVE_TO) ? (l = f.relative ? h + f.x2 : f.x2, c = f.relative ? g + f.y2 : f.y2) : (l = NaN, c = NaN), f.type & b.SMOOTH_QUAD_TO ? (u = isNaN(u) ? h : 2 * h - u, d = isNaN(d) ? g : 2 * g - d) : f.type & b.QUAD_TO ? (u = f.relative ? h + f.x1 : f.x1, d = f.relative ? g + f.y1 : f.y2) : (u = NaN, d = NaN), f.type & b.LINE_COMMANDS || f.type & b.ARC && (f.rX === 0 || f.rY === 0 || !f.lArcFlag) || f.type & b.CURVE_TO || f.type & b.SMOOTH_CURVE_TO || f.type & b.QUAD_TO || f.type & b.SMOOTH_QUAD_TO) {
        var H = f.x === void 0 ? 0 : f.relative ? f.x : f.x - h, A = f.y === void 0 ? 0 : f.relative ? f.y : f.y - g;
        m = isNaN(u) ? f.x1 === void 0 ? m : f.relative ? f.x : f.x1 - h : u - h, P = isNaN(d) ? f.y1 === void 0 ? P : f.relative ? f.y : f.y1 - g : d - g;
        var D = f.x2 === void 0 ? 0 : f.relative ? f.x : f.x2 - h, O = f.y2 === void 0 ? 0 : f.relative ? f.y : f.y2 - g;
        w(H) <= a && w(A) <= a && w(m) <= a && w(P) <= a && w(D) <= a && w(O) <= a && (x = !0);
      }
      return f.type & b.CLOSE_PATH && w(h - p) <= a && w(g - v) <= a && (x = !0), x ? [] : f;
    });
  }, i.MATRIX = r, i.ROTATE = function(a, l, c) {
    l === void 0 && (l = 0), c === void 0 && (c = 0), ae(a, l, c);
    var u = Math.sin(a), d = Math.cos(a);
    return r(d, u, -u, d, l - l * d + c * u, c - l * u - c * d);
  }, i.TRANSLATE = function(a, l) {
    return l === void 0 && (l = 0), ae(a, l), r(1, 0, 0, 1, a, l);
  }, i.SCALE = function(a, l) {
    return l === void 0 && (l = a), ae(a, l), r(a, 0, 0, l, 0, 0);
  }, i.SKEW_X = function(a) {
    return ae(a), r(1, 0, Math.atan(a), 1, 0, 0);
  }, i.SKEW_Y = function(a) {
    return ae(a), r(1, Math.atan(a), 0, 1, 0, 0);
  }, i.X_AXIS_SYMMETRY = function(a) {
    return a === void 0 && (a = 0), ae(a), r(-1, 0, 0, 1, a, 0);
  }, i.Y_AXIS_SYMMETRY = function(a) {
    return a === void 0 && (a = 0), ae(a), r(1, 0, 0, -1, 0, a);
  }, i.A_TO_C = function() {
    return s(function(a, l, c) {
      return b.ARC === a.type ? function(u, d, f) {
        var h, g, p, v;
        u.cX || Ft(u, d, f);
        for (var w = Math.min(u.phi1, u.phi2), x = Math.max(u.phi1, u.phi2) - w, m = Math.ceil(x / 90), P = new Array(m), H = d, A = f, D = 0; D < m; D++) {
          var O = xn(u.phi1, u.phi2, D / m), y = xn(u.phi1, u.phi2, (D + 1) / m), L = y - O, z = 4 / 3 * Math.tan(L * de / 4), N = [Math.cos(O * de) - z * Math.sin(O * de), Math.sin(O * de) + z * Math.cos(O * de)], B = N[0], E = N[1], S = [Math.cos(y * de), Math.sin(y * de)], k = S[0], F = S[1], Y = [k + z * Math.sin(y * de), F - z * Math.cos(y * de)], M = Y[0], j = Y[1];
          P[D] = { relative: u.relative, type: b.CURVE_TO };
          var U = function(se, he) {
            var we = Kt([se * u.rX, he * u.rY], u.xRot), Re = we[0], lt = we[1];
            return [u.cX + Re, u.cY + lt];
          };
          h = U(B, E), P[D].x1 = h[0], P[D].y1 = h[1], g = U(M, j), P[D].x2 = g[0], P[D].y2 = g[1], p = U(k, F), P[D].x = p[0], P[D].y = p[1], u.relative && (P[D].x1 -= H, P[D].y1 -= A, P[D].x2 -= H, P[D].y2 -= A, P[D].x -= H, P[D].y -= A), H = (v = [P[D].x, P[D].y])[0], A = v[1];
        }
        return P;
      }(a, a.relative ? 0 : l, a.relative ? 0 : c) : a;
    });
  }, i.ANNOTATE_ARCS = function() {
    return s(function(a, l, c) {
      return a.relative && (l = 0, c = 0), b.ARC === a.type && Ft(a, l, c), a;
    });
  }, i.CLONE = o, i.CALCULATE_BOUNDS = function() {
    var a = function(f) {
      var h = {};
      for (var g in f)
        h[g] = f[g];
      return h;
    }, l = e(), c = n(), u = t(), d = s(function(f, h, g) {
      var p = u(c(l(a(f))));
      function v(j) {
        j > d.maxX && (d.maxX = j), j < d.minX && (d.minX = j);
      }
      function w(j) {
        j > d.maxY && (d.maxY = j), j < d.minY && (d.minY = j);
      }
      if (p.type & b.DRAWING_COMMANDS && (v(h), w(g)), p.type & b.HORIZ_LINE_TO && v(p.x), p.type & b.VERT_LINE_TO && w(p.y), p.type & b.LINE_TO && (v(p.x), w(p.y)), p.type & b.CURVE_TO) {
        v(p.x), w(p.y);
        for (var x = 0, m = An(h, p.x1, p.x2, p.x); x < m.length; x++)
          0 < (M = m[x]) && 1 > M && v(Dn(h, p.x1, p.x2, p.x, M));
        for (var P = 0, H = An(g, p.y1, p.y2, p.y); P < H.length; P++)
          0 < (M = H[P]) && 1 > M && w(Dn(g, p.y1, p.y2, p.y, M));
      }
      if (p.type & b.ARC) {
        v(p.x), w(p.y), Ft(p, h, g);
        for (var A = p.xRot / 180 * Math.PI, D = Math.cos(A) * p.rX, O = Math.sin(A) * p.rX, y = -Math.sin(A) * p.rY, L = Math.cos(A) * p.rY, z = p.phi1 < p.phi2 ? [p.phi1, p.phi2] : -180 > p.phi2 ? [p.phi2 + 360, p.phi1 + 360] : [p.phi2, p.phi1], N = z[0], B = z[1], E = function(j) {
          var U = j[0], se = j[1], he = 180 * Math.atan2(se, U) / Math.PI;
          return he < N ? he + 360 : he;
        }, S = 0, k = bn(y, -D, 0).map(E); S < k.length; S++)
          (M = k[S]) > N && M < B && v(Hn(p.cX, D, y, M));
        for (var F = 0, Y = bn(L, -O, 0).map(E); F < Y.length; F++) {
          var M;
          (M = Y[F]) > N && M < B && w(Hn(p.cY, O, L, M));
        }
      }
      return f;
    });
    return d.minX = 1 / 0, d.maxX = -1 / 0, d.minY = 1 / 0, d.maxY = -1 / 0, d;
  };
})(I || (I = {}));
var re, Qn = function() {
  function i() {
  }
  return i.prototype.round = function(e) {
    return this.transform(I.ROUND(e));
  }, i.prototype.toAbs = function() {
    return this.transform(I.TO_ABS());
  }, i.prototype.toRel = function() {
    return this.transform(I.TO_REL());
  }, i.prototype.normalizeHVZ = function(e, t, n) {
    return this.transform(I.NORMALIZE_HVZ(e, t, n));
  }, i.prototype.normalizeST = function() {
    return this.transform(I.NORMALIZE_ST());
  }, i.prototype.qtToC = function() {
    return this.transform(I.QT_TO_C());
  }, i.prototype.aToC = function() {
    return this.transform(I.A_TO_C());
  }, i.prototype.sanitize = function(e) {
    return this.transform(I.SANITIZE(e));
  }, i.prototype.translate = function(e, t) {
    return this.transform(I.TRANSLATE(e, t));
  }, i.prototype.scale = function(e, t) {
    return this.transform(I.SCALE(e, t));
  }, i.prototype.rotate = function(e, t, n) {
    return this.transform(I.ROTATE(e, t, n));
  }, i.prototype.matrix = function(e, t, n, s, r, o) {
    return this.transform(I.MATRIX(e, t, n, s, r, o));
  }, i.prototype.skewX = function(e) {
    return this.transform(I.SKEW_X(e));
  }, i.prototype.skewY = function(e) {
    return this.transform(I.SKEW_Y(e));
  }, i.prototype.xSymmetry = function(e) {
    return this.transform(I.X_AXIS_SYMMETRY(e));
  }, i.prototype.ySymmetry = function(e) {
    return this.transform(I.Y_AXIS_SYMMETRY(e));
  }, i.prototype.annotateArcs = function() {
    return this.transform(I.ANNOTATE_ARCS());
  }, i;
}(), Yi = function(i) {
  return i === " " || i === "	" || i === "\r" || i === `
`;
}, zn = function(i) {
  return "0".charCodeAt(0) <= i.charCodeAt(0) && i.charCodeAt(0) <= "9".charCodeAt(0);
}, Gi = function(i) {
  function e() {
    var t = i.call(this) || this;
    return t.curNumber = "", t.curCommandType = -1, t.curCommandRelative = !1, t.canParseCommandOrComma = !0, t.curNumberHasExp = !1, t.curNumberHasExpDigits = !1, t.curNumberHasDecimal = !1, t.curArgs = [], t;
  }
  return Kn(e, i), e.prototype.finish = function(t) {
    if (t === void 0 && (t = []), this.parse(" ", t), this.curArgs.length !== 0 || !this.canParseCommandOrComma)
      throw new SyntaxError("Unterminated command at the path end.");
    return t;
  }, e.prototype.parse = function(t, n) {
    var s = this;
    n === void 0 && (n = []);
    for (var r = function(d) {
      n.push(d), s.curArgs.length = 0, s.canParseCommandOrComma = !0;
    }, o = 0; o < t.length; o++) {
      var a = t[o], l = !(this.curCommandType !== b.ARC || this.curArgs.length !== 3 && this.curArgs.length !== 4 || this.curNumber.length !== 1 || this.curNumber !== "0" && this.curNumber !== "1"), c = zn(a) && (this.curNumber === "0" && a === "0" || l);
      if (!zn(a) || c)
        if (a !== "e" && a !== "E")
          if (a !== "-" && a !== "+" || !this.curNumberHasExp || this.curNumberHasExpDigits)
            if (a !== "." || this.curNumberHasExp || this.curNumberHasDecimal || l) {
              if (this.curNumber && this.curCommandType !== -1) {
                var u = Number(this.curNumber);
                if (isNaN(u))
                  throw new SyntaxError("Invalid number ending at " + o);
                if (this.curCommandType === b.ARC) {
                  if (this.curArgs.length === 0 || this.curArgs.length === 1) {
                    if (0 > u)
                      throw new SyntaxError('Expected positive number, got "' + u + '" at index "' + o + '"');
                  } else if ((this.curArgs.length === 3 || this.curArgs.length === 4) && this.curNumber !== "0" && this.curNumber !== "1")
                    throw new SyntaxError('Expected a flag, got "' + this.curNumber + '" at index "' + o + '"');
                }
                this.curArgs.push(u), this.curArgs.length === Ui[this.curCommandType] && (b.HORIZ_LINE_TO === this.curCommandType ? r({ type: b.HORIZ_LINE_TO, relative: this.curCommandRelative, x: u }) : b.VERT_LINE_TO === this.curCommandType ? r({ type: b.VERT_LINE_TO, relative: this.curCommandRelative, y: u }) : this.curCommandType === b.MOVE_TO || this.curCommandType === b.LINE_TO || this.curCommandType === b.SMOOTH_QUAD_TO ? (r({ type: this.curCommandType, relative: this.curCommandRelative, x: this.curArgs[0], y: this.curArgs[1] }), b.MOVE_TO === this.curCommandType && (this.curCommandType = b.LINE_TO)) : this.curCommandType === b.CURVE_TO ? r({ type: b.CURVE_TO, relative: this.curCommandRelative, x1: this.curArgs[0], y1: this.curArgs[1], x2: this.curArgs[2], y2: this.curArgs[3], x: this.curArgs[4], y: this.curArgs[5] }) : this.curCommandType === b.SMOOTH_CURVE_TO ? r({ type: b.SMOOTH_CURVE_TO, relative: this.curCommandRelative, x2: this.curArgs[0], y2: this.curArgs[1], x: this.curArgs[2], y: this.curArgs[3] }) : this.curCommandType === b.QUAD_TO ? r({ type: b.QUAD_TO, relative: this.curCommandRelative, x1: this.curArgs[0], y1: this.curArgs[1], x: this.curArgs[2], y: this.curArgs[3] }) : this.curCommandType === b.ARC && r({ type: b.ARC, relative: this.curCommandRelative, rX: this.curArgs[0], rY: this.curArgs[1], xRot: this.curArgs[2], lArcFlag: this.curArgs[3], sweepFlag: this.curArgs[4], x: this.curArgs[5], y: this.curArgs[6] })), this.curNumber = "", this.curNumberHasExpDigits = !1, this.curNumberHasExp = !1, this.curNumberHasDecimal = !1, this.canParseCommandOrComma = !0;
              }
              if (!Yi(a))
                if (a === "," && this.canParseCommandOrComma)
                  this.canParseCommandOrComma = !1;
                else if (a !== "+" && a !== "-" && a !== ".")
                  if (c)
                    this.curNumber = a, this.curNumberHasDecimal = !1;
                  else {
                    if (this.curArgs.length !== 0)
                      throw new SyntaxError("Unterminated command at index " + o + ".");
                    if (!this.canParseCommandOrComma)
                      throw new SyntaxError('Unexpected character "' + a + '" at index ' + o + ". Command cannot follow comma");
                    if (this.canParseCommandOrComma = !1, a !== "z" && a !== "Z")
                      if (a === "h" || a === "H")
                        this.curCommandType = b.HORIZ_LINE_TO, this.curCommandRelative = a === "h";
                      else if (a === "v" || a === "V")
                        this.curCommandType = b.VERT_LINE_TO, this.curCommandRelative = a === "v";
                      else if (a === "m" || a === "M")
                        this.curCommandType = b.MOVE_TO, this.curCommandRelative = a === "m";
                      else if (a === "l" || a === "L")
                        this.curCommandType = b.LINE_TO, this.curCommandRelative = a === "l";
                      else if (a === "c" || a === "C")
                        this.curCommandType = b.CURVE_TO, this.curCommandRelative = a === "c";
                      else if (a === "s" || a === "S")
                        this.curCommandType = b.SMOOTH_CURVE_TO, this.curCommandRelative = a === "s";
                      else if (a === "q" || a === "Q")
                        this.curCommandType = b.QUAD_TO, this.curCommandRelative = a === "q";
                      else if (a === "t" || a === "T")
                        this.curCommandType = b.SMOOTH_QUAD_TO, this.curCommandRelative = a === "t";
                      else {
                        if (a !== "a" && a !== "A")
                          throw new SyntaxError('Unexpected character "' + a + '" at index ' + o + ".");
                        this.curCommandType = b.ARC, this.curCommandRelative = a === "a";
                      }
                    else
                      n.push({ type: b.CLOSE_PATH }), this.canParseCommandOrComma = !0, this.curCommandType = -1;
                  }
                else
                  this.curNumber = a, this.curNumberHasDecimal = a === ".";
            } else
              this.curNumber += a, this.curNumberHasDecimal = !0;
          else
            this.curNumber += a;
        else
          this.curNumber += a, this.curNumberHasExp = !0;
      else
        this.curNumber += a, this.curNumberHasExpDigits = this.curNumberHasExp;
    }
    return n;
  }, e.prototype.transform = function(t) {
    return Object.create(this, { parse: { value: function(n, s) {
      s === void 0 && (s = []);
      for (var r = 0, o = Object.getPrototypeOf(this).parse.call(this, n); r < o.length; r++) {
        var a = o[r], l = t(a);
        Array.isArray(l) ? s.push.apply(s, l) : s.push(l);
      }
      return s;
    } } });
  }, e;
}(Qn), b = function(i) {
  function e(t) {
    var n = i.call(this) || this;
    return n.commands = typeof t == "string" ? e.parse(t) : t, n;
  }
  return Kn(e, i), e.prototype.encode = function() {
    return e.encode(this.commands);
  }, e.prototype.getBounds = function() {
    var t = I.CALCULATE_BOUNDS();
    return this.transform(t), t;
  }, e.prototype.transform = function(t) {
    for (var n = [], s = 0, r = this.commands; s < r.length; s++) {
      var o = t(r[s]);
      Array.isArray(o) ? n.push.apply(n, o) : n.push(o);
    }
    return this.commands = n, this;
  }, e.encode = function(t) {
    return Wi(t);
  }, e.parse = function(t) {
    var n = new Gi(), s = [];
    return n.parse(t, s), n.finish(s), s;
  }, e.CLOSE_PATH = 1, e.MOVE_TO = 2, e.HORIZ_LINE_TO = 4, e.VERT_LINE_TO = 8, e.LINE_TO = 16, e.CURVE_TO = 32, e.SMOOTH_CURVE_TO = 64, e.QUAD_TO = 128, e.SMOOTH_QUAD_TO = 256, e.ARC = 512, e.LINE_COMMANDS = e.LINE_TO | e.HORIZ_LINE_TO | e.VERT_LINE_TO, e.DRAWING_COMMANDS = e.HORIZ_LINE_TO | e.VERT_LINE_TO | e.LINE_TO | e.CURVE_TO | e.SMOOTH_CURVE_TO | e.QUAD_TO | e.SMOOTH_QUAD_TO | e.ARC, e;
}(Qn), Ui = ((re = {})[b.MOVE_TO] = 2, re[b.LINE_TO] = 2, re[b.HORIZ_LINE_TO] = 1, re[b.VERT_LINE_TO] = 1, re[b.CLOSE_PATH] = 0, re[b.QUAD_TO] = 4, re[b.SMOOTH_QUAD_TO] = 2, re[b.CURVE_TO] = 6, re[b.SMOOTH_CURVE_TO] = 4, re[b.ARC] = 7, re);
function wt(i) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? wt = function(e) {
    return typeof e;
  } : wt = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, wt(i);
}
function Ji(i, e) {
  if (!(i instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
var Ki = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259], Qi = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
function _i(i, e, t, n, s) {
  if (typeof i == "string" && (i = document.getElementById(i)), !i || wt(i) !== "object" || !("getContext" in i))
    throw new TypeError("Expecting canvas with `getContext` method in processCanvasRGB(A) calls!");
  var r = i.getContext("2d");
  try {
    return r.getImageData(e, t, n, s);
  } catch (o) {
    throw new Error("unable to access image data: " + o);
  }
}
function $i(i, e, t, n, s, r) {
  if (!(isNaN(r) || r < 1)) {
    r |= 0;
    var o = _i(i, e, t, n, s);
    o = es(o, e, t, n, s, r), i.getContext("2d").putImageData(o, e, t);
  }
}
function es(i, e, t, n, s, r) {
  for (var o = i.data, a = 2 * r + 1, l = n - 1, c = s - 1, u = r + 1, d = u * (u + 1) / 2, f = new Ln(), h = f, g, p = 1; p < a; p++)
    h = h.next = new Ln(), p === u && (g = h);
  h.next = f;
  for (var v = null, w = null, x = 0, m = 0, P = Ki[r], H = Qi[r], A = 0; A < s; A++) {
    h = f;
    for (var D = o[m], O = o[m + 1], y = o[m + 2], L = o[m + 3], z = 0; z < u; z++)
      h.r = D, h.g = O, h.b = y, h.a = L, h = h.next;
    for (var N = 0, B = 0, E = 0, S = 0, k = u * D, F = u * O, Y = u * y, M = u * L, j = d * D, U = d * O, se = d * y, he = d * L, we = 1; we < u; we++) {
      var Re = m + ((l < we ? l : we) << 2), lt = o[Re], ln = o[Re + 1], cn = o[Re + 2], un = o[Re + 3], ct = u - we;
      j += (h.r = lt) * ct, U += (h.g = ln) * ct, se += (h.b = cn) * ct, he += (h.a = un) * ct, N += lt, B += ln, E += cn, S += un, h = h.next;
    }
    v = f, w = g;
    for (var Tt = 0; Tt < n; Tt++) {
      var Xt = he * P >> H;
      if (o[m + 3] = Xt, Xt !== 0) {
        var Nt = 255 / Xt;
        o[m] = (j * P >> H) * Nt, o[m + 1] = (U * P >> H) * Nt, o[m + 2] = (se * P >> H) * Nt;
      } else
        o[m] = o[m + 1] = o[m + 2] = 0;
      j -= k, U -= F, se -= Y, he -= M, k -= v.r, F -= v.g, Y -= v.b, M -= v.a;
      var Te = Tt + r + 1;
      Te = x + (Te < l ? Te : l) << 2, N += v.r = o[Te], B += v.g = o[Te + 1], E += v.b = o[Te + 2], S += v.a = o[Te + 3], j += N, U += B, se += E, he += S, v = v.next;
      var ut = w, hn = ut.r, fn = ut.g, dn = ut.b, gn = ut.a;
      k += hn, F += fn, Y += dn, M += gn, N -= hn, B -= fn, E -= dn, S -= gn, w = w.next, m += 4;
    }
    x += n;
  }
  for (var Ze = 0; Ze < n; Ze++) {
    m = Ze << 2;
    var Xe = o[m], Ne = o[m + 1], Me = o[m + 2], K = o[m + 3], Mt = u * Xe, Bt = u * Ne, Ct = u * Me, St = u * K, ht = d * Xe, ft = d * Ne, dt = d * Me, gt = d * K;
    h = f;
    for (var pn = 0; pn < u; pn++)
      h.r = Xe, h.g = Ne, h.b = Me, h.a = K, h = h.next;
    for (var vn = n, jt = 0, Et = 0, kt = 0, Vt = 0, pt = 1; pt <= r; pt++) {
      m = vn + Ze << 2;
      var vt = u - pt;
      ht += (h.r = Xe = o[m]) * vt, ft += (h.g = Ne = o[m + 1]) * vt, dt += (h.b = Me = o[m + 2]) * vt, gt += (h.a = K = o[m + 3]) * vt, Vt += Xe, jt += Ne, Et += Me, kt += K, h = h.next, pt < c && (vn += n);
    }
    m = Ze, v = f, w = g;
    for (var Rt = 0; Rt < s; Rt++) {
      var Q = m << 2;
      o[Q + 3] = K = gt * P >> H, K > 0 ? (K = 255 / K, o[Q] = (ht * P >> H) * K, o[Q + 1] = (ft * P >> H) * K, o[Q + 2] = (dt * P >> H) * K) : o[Q] = o[Q + 1] = o[Q + 2] = 0, ht -= Mt, ft -= Bt, dt -= Ct, gt -= St, Mt -= v.r, Bt -= v.g, Ct -= v.b, St -= v.a, Q = Ze + ((Q = Rt + u) < c ? Q : c) * n << 2, ht += Vt += v.r = o[Q], ft += jt += v.g = o[Q + 1], dt += Et += v.b = o[Q + 2], gt += kt += v.a = o[Q + 3], v = v.next, Mt += Xe = w.r, Bt += Ne = w.g, Ct += Me = w.b, St += K = w.a, Vt -= Xe, jt -= Ne, Et -= Me, kt -= K, w = w.next, m += n;
    }
  }
  return i;
}
var Ln = function i() {
  Ji(this, i), this.r = 0, this.g = 0, this.b = 0, this.a = 0, this.next = null;
};
function Ke(i) {
  return i.replace(/(?!\u3000)\s+/gm, " ");
}
function ts(i) {
  return i.replace(/^[\n \t]+/, "");
}
function ns(i) {
  return i.replace(/[\n \t]+$/, "");
}
function $(i) {
  const e = i.match(/-?(\d+(?:\.\d*(?:[eE][+-]?\d+)?)?|\.\d+)(?=\D|$)/gm);
  return e ? e.map(parseFloat) : [];
}
function is(i) {
  const e = $(i);
  return [
    e[0] || 0,
    e[1] || 0,
    e[2] || 0,
    e[3] || 0,
    e[4] || 0,
    e[5] || 0
  ];
}
const ss = /^[A-Z-]+$/;
function rs(i) {
  return ss.test(i) ? i.toLowerCase() : i;
}
function _n(i) {
  const e = /url\(('([^']+)'|"([^"]+)"|([^'")]+))\)/.exec(i);
  return e && (e[2] || e[3] || e[4]) || "";
}
function os(i) {
  if (!i.startsWith("rgb"))
    return i;
  let e = 3;
  return i.replace(
    /\d+(\.\d+)?/g,
    (n, s) => e-- && s ? String(Math.round(parseFloat(n))) : n
  );
}
const as = /(\[[^\]]+\])/g, ls = /(#[^\s+>~.[:]+)/g, cs = /(\.[^\s+>~.[:]+)/g, us = /(::[^\s+>~.[:]+|:first-line|:first-letter|:before|:after)/gi, hs = /(:[\w-]+\([^)]*\))/gi, fs = /(:[^\s+>~.[:]+)/g, ds = /([^\s+>~.[:]+)/g;
function Ce(i, e) {
  const t = e.exec(i);
  return t ? [
    i.replace(e, " "),
    t.length
  ] : [
    i,
    0
  ];
}
function gs(i) {
  const e = [
    0,
    0,
    0
  ];
  let t = i.replace(/:not\(([^)]*)\)/g, "     $1 ").replace(/{[\s\S]*/gm, " "), n = 0;
  return [t, n] = Ce(t, as), e[1] += n, [t, n] = Ce(t, ls), e[0] += n, [t, n] = Ce(t, cs), e[1] += n, [t, n] = Ce(t, us), e[2] += n, [t, n] = Ce(t, hs), e[1] += n, [t, n] = Ce(t, fs), e[1] += n, t = t.replace(/[*\s+>~]/g, " ").replace(/[#.]/g, " "), [t, n] = Ce(t, ds), e[2] += n, e.join("");
}
const Ye = 1e-8;
function On(i) {
  return Math.sqrt(Math.pow(i[0], 2) + Math.pow(i[1], 2));
}
function Qt(i, e) {
  return (i[0] * e[0] + i[1] * e[1]) / (On(i) * On(e));
}
function Tn(i, e) {
  return (i[0] * e[1] < i[1] * e[0] ? -1 : 1) * Math.acos(Qt(i, e));
}
function Xn(i) {
  return i * i * i;
}
function Nn(i) {
  return 3 * i * i * (1 - i);
}
function Mn(i) {
  return 3 * i * (1 - i) * (1 - i);
}
function Bn(i) {
  return (1 - i) * (1 - i) * (1 - i);
}
function Cn(i) {
  return i * i;
}
function Sn(i) {
  return 2 * i * (1 - i);
}
function jn(i) {
  return (1 - i) * (1 - i);
}
class T {
  static empty(e) {
    return new T(e, "EMPTY", "");
  }
  split() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : " ";
    const { document: t, name: n } = this;
    return Ke(this.getString()).trim().split(e).map(
      (s) => new T(t, n, s)
    );
  }
  hasValue(e) {
    const t = this.value;
    return t !== null && t !== "" && (e || t !== 0) && typeof t < "u";
  }
  isString(e) {
    const { value: t } = this, n = typeof t == "string";
    return !n || !e ? n : e.test(t);
  }
  isUrlDefinition() {
    return this.isString(/^url\(/);
  }
  isPixels() {
    if (!this.hasValue())
      return !1;
    const e = this.getString();
    switch (!0) {
      case e.endsWith("px"):
      case /^[0-9]+$/.test(e):
        return !0;
      default:
        return !1;
    }
  }
  setValue(e) {
    return this.value = e, this;
  }
  getValue(e) {
    return typeof e > "u" || this.hasValue() ? this.value : e;
  }
  getNumber(e) {
    if (!this.hasValue())
      return typeof e > "u" ? 0 : parseFloat(e);
    const { value: t } = this;
    let n = parseFloat(t);
    return this.isString(/%$/) && (n /= 100), n;
  }
  getString(e) {
    return typeof e > "u" || this.hasValue() ? typeof this.value > "u" ? "" : String(this.value) : String(e);
  }
  getColor(e) {
    let t = this.getString(e);
    return this.isNormalizedColor || (this.isNormalizedColor = !0, t = os(t), this.value = t), t;
  }
  getDpi() {
    return 96;
  }
  getRem() {
    return this.document.rootEmSize;
  }
  getEm() {
    return this.document.emSize;
  }
  getUnits() {
    return this.getString().replace(/[0-9.-]/g, "");
  }
  getPixels(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (!this.hasValue())
      return 0;
    const [n, s] = typeof e == "boolean" ? [
      void 0,
      e
    ] : [
      e
    ], { viewPort: r } = this.document.screen;
    switch (!0) {
      case this.isString(/vmin$/):
        return this.getNumber() / 100 * Math.min(r.computeSize("x"), r.computeSize("y"));
      case this.isString(/vmax$/):
        return this.getNumber() / 100 * Math.max(r.computeSize("x"), r.computeSize("y"));
      case this.isString(/vw$/):
        return this.getNumber() / 100 * r.computeSize("x");
      case this.isString(/vh$/):
        return this.getNumber() / 100 * r.computeSize("y");
      case this.isString(/rem$/):
        return this.getNumber() * this.getRem();
      case this.isString(/em$/):
        return this.getNumber() * this.getEm();
      case this.isString(/ex$/):
        return this.getNumber() * this.getEm() / 2;
      case this.isString(/px$/):
        return this.getNumber();
      case this.isString(/pt$/):
        return this.getNumber() * this.getDpi() * (1 / 72);
      case this.isString(/pc$/):
        return this.getNumber() * 15;
      case this.isString(/cm$/):
        return this.getNumber() * this.getDpi() / 2.54;
      case this.isString(/mm$/):
        return this.getNumber() * this.getDpi() / 25.4;
      case this.isString(/in$/):
        return this.getNumber() * this.getDpi();
      case (this.isString(/%$/) && s):
        return this.getNumber() * this.getEm();
      case this.isString(/%$/):
        return this.getNumber() * r.computeSize(n);
      default: {
        const o = this.getNumber();
        return t && o < 1 ? o * r.computeSize(n) : o;
      }
    }
  }
  getMilliseconds() {
    return this.hasValue() ? this.isString(/ms$/) ? this.getNumber() : this.getNumber() * 1e3 : 0;
  }
  getRadians() {
    if (!this.hasValue())
      return 0;
    switch (!0) {
      case this.isString(/deg$/):
        return this.getNumber() * (Math.PI / 180);
      case this.isString(/grad$/):
        return this.getNumber() * (Math.PI / 200);
      case this.isString(/rad$/):
        return this.getNumber();
      default:
        return this.getNumber() * (Math.PI / 180);
    }
  }
  getDefinition() {
    const e = this.getString(), t = /#([^)'"]+)/.exec(e), n = (t == null ? void 0 : t[1]) || e;
    return this.document.definitions[n];
  }
  getFillStyleDefinition(e, t) {
    let n = this.getDefinition();
    if (!n)
      return null;
    if (typeof n.createGradient == "function" && "getBoundingBox" in e)
      return n.createGradient(this.document.ctx, e, t);
    if (typeof n.createPattern == "function") {
      if (n.getHrefAttribute().hasValue()) {
        const s = n.getAttribute("patternTransform");
        n = n.getHrefAttribute().getDefinition(), n && s.hasValue() && n.getAttribute("patternTransform", !0).setValue(s.value);
      }
      if (n)
        return n.createPattern(this.document.ctx, e, t);
    }
    return null;
  }
  getTextBaseline() {
    if (!this.hasValue())
      return null;
    const e = this.getString();
    return T.textBaselineMapping[e] || null;
  }
  addOpacity(e) {
    let t = this.getColor();
    const n = t.length;
    let s = 0;
    for (let r = 0; r < n && (t[r] === "," && s++, s !== 3); r++)
      ;
    if (e.hasValue() && this.isString() && s !== 3) {
      const r = new Jt(t);
      r.ok && (r.alpha = e.getNumber(), t = r.toRGBA());
    }
    return new T(this.document, this.name, t);
  }
  constructor(e, t, n) {
    this.document = e, this.name = t, this.value = n, this.isNormalizedColor = !1;
  }
}
T.textBaselineMapping = {
  baseline: "alphabetic",
  "before-edge": "top",
  "text-before-edge": "top",
  middle: "middle",
  central: "middle",
  "after-edge": "bottom",
  "text-after-edge": "bottom",
  ideographic: "ideographic",
  alphabetic: "alphabetic",
  hanging: "hanging",
  mathematical: "alphabetic"
};
class st {
  clear() {
    this.viewPorts = [];
  }
  setCurrent(e, t) {
    this.viewPorts.push({
      width: e,
      height: t
    });
  }
  removeCurrent() {
    this.viewPorts.pop();
  }
  getRoot() {
    const [e] = this.viewPorts;
    return e || En();
  }
  getCurrent() {
    const { viewPorts: e } = this, t = e[e.length - 1];
    return t || En();
  }
  get width() {
    return this.getCurrent().width;
  }
  get height() {
    return this.getCurrent().height;
  }
  computeSize(e) {
    return typeof e == "number" ? e : e === "x" ? this.width : e === "y" ? this.height : Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2)) / Math.sqrt(2);
  }
  constructor() {
    this.viewPorts = [];
  }
}
st.DEFAULT_VIEWPORT_WIDTH = 800;
st.DEFAULT_VIEWPORT_HEIGHT = 600;
function En() {
  return {
    width: st.DEFAULT_VIEWPORT_WIDTH,
    height: st.DEFAULT_VIEWPORT_HEIGHT
  };
}
class Z {
  static parse(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    const [n = t, s = t] = $(e);
    return new Z(n, s);
  }
  static parseScale(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
    const [n = t, s = n] = $(e);
    return new Z(n, s);
  }
  static parsePath(e) {
    const t = $(e), n = t.length, s = [];
    for (let r = 0; r < n; r += 2)
      s.push(new Z(t[r], t[r + 1]));
    return s;
  }
  angleTo(e) {
    return Math.atan2(e.y - this.y, e.x - this.x);
  }
  applyTransform(e) {
    const { x: t, y: n } = this, s = t * e[0] + n * e[2] + e[4], r = t * e[1] + n * e[3] + e[5];
    this.x = s, this.y = r;
  }
  constructor(e, t) {
    this.x = e, this.y = t;
  }
}
class ps {
  isWorking() {
    return this.working;
  }
  start() {
    if (this.working)
      return;
    const { screen: e, onClick: t, onMouseMove: n } = this, s = e.ctx.canvas;
    s.onclick = t, s.onmousemove = n, this.working = !0;
  }
  stop() {
    if (!this.working)
      return;
    const e = this.screen.ctx.canvas;
    this.working = !1, e.onclick = null, e.onmousemove = null;
  }
  hasEvents() {
    return this.working && this.events.length > 0;
  }
  runEvents() {
    if (!this.working)
      return;
    const { screen: e, events: t, eventElements: n } = this, { style: s } = e.ctx.canvas;
    let r;
    s && (s.cursor = ""), t.forEach((o, a) => {
      let { run: l } = o;
      for (r = n[a]; r; )
        l(r), r = r.parent;
    }), this.events = [], this.eventElements = [];
  }
  checkPath(e, t) {
    if (!this.working || !t)
      return;
    const { events: n, eventElements: s } = this;
    n.forEach((r, o) => {
      let { x: a, y: l } = r;
      !s[o] && t.isPointInPath && t.isPointInPath(a, l) && (s[o] = e);
    });
  }
  checkBoundingBox(e, t) {
    if (!this.working || !t)
      return;
    const { events: n, eventElements: s } = this;
    n.forEach((r, o) => {
      let { x: a, y: l } = r;
      !s[o] && t.isPointInBox(a, l) && (s[o] = e);
    });
  }
  mapXY(e, t) {
    const { window: n, ctx: s } = this.screen, r = new Z(e, t);
    let o = s.canvas;
    for (; o; )
      r.x -= o.offsetLeft, r.y -= o.offsetTop, o = o.offsetParent;
    return n != null && n.scrollX && (r.x += n.scrollX), n != null && n.scrollY && (r.y += n.scrollY), r;
  }
  onClick(e) {
    const { x: t, y: n } = this.mapXY(e.clientX, e.clientY);
    this.events.push({
      type: "onclick",
      x: t,
      y: n,
      run(s) {
        s.onClick && s.onClick();
      }
    });
  }
  onMouseMove(e) {
    const { x: t, y: n } = this.mapXY(e.clientX, e.clientY);
    this.events.push({
      type: "onmousemove",
      x: t,
      y: n,
      run(s) {
        s.onMouseMove && s.onMouseMove();
      }
    });
  }
  constructor(e) {
    this.screen = e, this.working = !1, this.events = [], this.eventElements = [], this.onClick = this.onClick.bind(this), this.onMouseMove = this.onMouseMove.bind(this);
  }
}
const $n = typeof window < "u" ? window : null, ei = typeof fetch < "u" ? fetch.bind(void 0) : void 0;
class Pe {
  wait(e) {
    this.waits.push(e);
  }
  ready() {
    return this.readyPromise ? this.readyPromise : Promise.resolve();
  }
  isReady() {
    if (this.isReadyLock)
      return !0;
    const e = this.waits.every(
      (t) => t()
    );
    return e && (this.waits = [], this.resolveReady && this.resolveReady()), this.isReadyLock = e, e;
  }
  setDefaults(e) {
    e.strokeStyle = "rgba(0,0,0,0)", e.lineCap = "butt", e.lineJoin = "miter", e.miterLimit = 4;
  }
  setViewBox(e) {
    let { document: t, ctx: n, aspectRatio: s, width: r, desiredWidth: o, height: a, desiredHeight: l, minX: c = 0, minY: u = 0, refX: d, refY: f, clip: h = !1, clipX: g = 0, clipY: p = 0 } = e;
    const v = Ke(s).replace(/^defer\s/, ""), [w, x] = v.split(" "), m = w || "xMidYMid", P = x || "meet", H = r / o, A = a / l, D = Math.min(H, A), O = Math.max(H, A);
    let y = o, L = l;
    P === "meet" && (y *= D, L *= D), P === "slice" && (y *= O, L *= O);
    const z = new T(t, "refX", d), N = new T(t, "refY", f), B = z.hasValue() && N.hasValue();
    if (B && n.translate(-D * z.getPixels("x"), -D * N.getPixels("y")), h) {
      const E = D * g, S = D * p;
      n.beginPath(), n.moveTo(E, S), n.lineTo(r, S), n.lineTo(r, a), n.lineTo(E, a), n.closePath(), n.clip();
    }
    if (!B) {
      const E = P === "meet" && D === A, S = P === "slice" && O === A, k = P === "meet" && D === H, F = P === "slice" && O === H;
      m.startsWith("xMid") && (E || S) && n.translate(r / 2 - y / 2, 0), m.endsWith("YMid") && (k || F) && n.translate(0, a / 2 - L / 2), m.startsWith("xMax") && (E || S) && n.translate(r - y, 0), m.endsWith("YMax") && (k || F) && n.translate(0, a - L);
    }
    switch (!0) {
      case m === "none":
        n.scale(H, A);
        break;
      case P === "meet":
        n.scale(D, D);
        break;
      case P === "slice":
        n.scale(O, O);
        break;
    }
    n.translate(-c, -u);
  }
  start(e) {
    let { enableRedraw: t = !1, ignoreMouse: n = !1, ignoreAnimation: s = !1, ignoreDimensions: r = !1, ignoreClear: o = !1, forceRedraw: a, scaleWidth: l, scaleHeight: c, offsetX: u, offsetY: d } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const { mouse: f } = this, h = 1e3 / Pe.FRAMERATE;
    if (this.frameDuration = h, this.readyPromise = new Promise((x) => {
      this.resolveReady = x;
    }), this.isReady() && this.render(e, r, o, l, c, u, d), !t)
      return;
    let g = Date.now(), p = g, v = 0;
    const w = () => {
      g = Date.now(), v = g - p, v >= h && (p = g - v % h, this.shouldUpdate(s, a) && (this.render(e, r, o, l, c, u, d), f.runEvents())), this.intervalId = Ie.exports(w);
    };
    n || f.start(), this.intervalId = Ie.exports(w);
  }
  stop() {
    this.intervalId && (Ie.exports.cancel(this.intervalId), this.intervalId = null), this.mouse.stop();
  }
  shouldUpdate(e, t) {
    if (!e) {
      const { frameDuration: n } = this;
      if (this.animations.reduce(
        (r, o) => o.update(n) || r,
        !1
      ))
        return !0;
    }
    return !!(typeof t == "function" && t() || !this.isReadyLock && this.isReady() || this.mouse.hasEvents());
  }
  render(e, t, n, s, r, o, a) {
    const { viewPort: l, ctx: c, isFirstRender: u } = this, d = c.canvas;
    l.clear(), d.width && d.height && l.setCurrent(d.width, d.height);
    const f = e.getStyle("width"), h = e.getStyle("height");
    !t && (u || typeof s != "number" && typeof r != "number") && (f.hasValue() && (d.width = f.getPixels("x"), d.style && (d.style.width = "".concat(d.width, "px"))), h.hasValue() && (d.height = h.getPixels("y"), d.style && (d.style.height = "".concat(d.height, "px"))));
    let g = d.clientWidth || d.width, p = d.clientHeight || d.height;
    if (t && f.hasValue() && h.hasValue() && (g = f.getPixels("x"), p = h.getPixels("y")), l.setCurrent(g, p), typeof o == "number" && e.getAttribute("x", !0).setValue(o), typeof a == "number" && e.getAttribute("y", !0).setValue(a), typeof s == "number" || typeof r == "number") {
      const v = $(e.getAttribute("viewBox").getString());
      let w = 0, x = 0;
      if (typeof s == "number") {
        const P = e.getStyle("width");
        P.hasValue() ? w = P.getPixels("x") / s : v[2] && !isNaN(v[2]) && (w = v[2] / s);
      }
      if (typeof r == "number") {
        const P = e.getStyle("height");
        P.hasValue() ? x = P.getPixels("y") / r : v[3] && !isNaN(v[3]) && (x = v[3] / r);
      }
      w || (w = x), x || (x = w), e.getAttribute("width", !0).setValue(s), e.getAttribute("height", !0).setValue(r);
      const m = e.getStyle("transform", !0, !0);
      m.setValue("".concat(m.getString(), " scale(").concat(1 / w, ", ").concat(1 / x, ")"));
    }
    n || c.clearRect(0, 0, g, p), e.render(c), u && (this.isFirstRender = !1);
  }
  constructor(e, { fetch: t = ei, window: n = $n } = {}) {
    if (this.ctx = e, this.viewPort = new st(), this.mouse = new ps(this), this.animations = [], this.waits = [], this.frameDuration = 0, this.isReadyLock = !1, this.isFirstRender = !0, this.intervalId = null, this.window = n, !t)
      throw new Error("Can't find 'fetch' in 'globalThis', please provide it via options");
    this.fetch = t;
  }
}
Pe.defaultWindow = $n;
Pe.defaultFetch = ei;
Pe.FRAMERATE = 30;
Pe.MAX_VIRTUAL_PIXELS = 3e4;
const { defaultFetch: vs } = Pe, ms = typeof DOMParser < "u" ? DOMParser : void 0;
class qt {
  async parse(e) {
    return e.startsWith("<") ? this.parseFromString(e) : this.load(e);
  }
  parseFromString(e) {
    const t = new this.DOMParser();
    try {
      return this.checkDocument(t.parseFromString(e, "image/svg+xml"));
    } catch {
      return this.checkDocument(t.parseFromString(e, "text/xml"));
    }
  }
  checkDocument(e) {
    const t = e.getElementsByTagName("parsererror")[0];
    if (t)
      throw new Error(t.textContent || "Unknown parse error");
    return e;
  }
  async load(e) {
    const n = await (await this.fetch(e)).text();
    return this.parseFromString(n);
  }
  constructor({ fetch: e = vs, DOMParser: t = ms } = {}) {
    if (!e)
      throw new Error("Can't find 'fetch' in 'globalThis', please provide it via options");
    if (!t)
      throw new Error("Can't find 'DOMParser' in 'globalThis', please provide it via options");
    this.fetch = e, this.DOMParser = t;
  }
}
class ys {
  apply(e) {
    const { x: t, y: n } = this.point;
    e.translate(t || 0, n || 0);
  }
  unapply(e) {
    const { x: t, y: n } = this.point;
    e.translate(-1 * t || 0, -1 * n || 0);
  }
  applyToPoint(e) {
    const { x: t, y: n } = this.point;
    e.applyTransform([
      1,
      0,
      0,
      1,
      t || 0,
      n || 0
    ]);
  }
  constructor(e, t) {
    this.type = "translate", this.point = Z.parse(t);
  }
}
class Ps {
  apply(e) {
    const { cx: t, cy: n, originX: s, originY: r, angle: o } = this, a = t + s.getPixels("x"), l = n + r.getPixels("y");
    e.translate(a, l), e.rotate(o.getRadians()), e.translate(-a, -l);
  }
  unapply(e) {
    const { cx: t, cy: n, originX: s, originY: r, angle: o } = this, a = t + s.getPixels("x"), l = n + r.getPixels("y");
    e.translate(a, l), e.rotate(-1 * o.getRadians()), e.translate(-a, -l);
  }
  applyToPoint(e) {
    const { cx: t, cy: n, angle: s } = this, r = s.getRadians();
    e.applyTransform([
      1,
      0,
      0,
      1,
      t || 0,
      n || 0
    ]), e.applyTransform([
      Math.cos(r),
      Math.sin(r),
      -Math.sin(r),
      Math.cos(r),
      0,
      0
    ]), e.applyTransform([
      1,
      0,
      0,
      1,
      -t || 0,
      -n || 0
    ]);
  }
  constructor(e, t, n) {
    this.type = "rotate";
    const s = $(t);
    this.angle = new T(e, "angle", s[0]), this.originX = n[0], this.originY = n[1], this.cx = s[1] || 0, this.cy = s[2] || 0;
  }
}
class ws {
  apply(e) {
    const { scale: { x: t, y: n }, originX: s, originY: r } = this, o = s.getPixels("x"), a = r.getPixels("y");
    e.translate(o, a), e.scale(t, n || t), e.translate(-o, -a);
  }
  unapply(e) {
    const { scale: { x: t, y: n }, originX: s, originY: r } = this, o = s.getPixels("x"), a = r.getPixels("y");
    e.translate(o, a), e.scale(1 / t, 1 / n || t), e.translate(-o, -a);
  }
  applyToPoint(e) {
    const { x: t, y: n } = this.scale;
    e.applyTransform([
      t || 0,
      0,
      0,
      n || 0,
      0,
      0
    ]);
  }
  constructor(e, t, n) {
    this.type = "scale";
    const s = Z.parseScale(t);
    (s.x === 0 || s.y === 0) && (s.x = Ye, s.y = Ye), this.scale = s, this.originX = n[0], this.originY = n[1];
  }
}
class ti {
  apply(e) {
    const { originX: t, originY: n, matrix: s } = this, r = t.getPixels("x"), o = n.getPixels("y");
    e.translate(r, o), e.transform(s[0], s[1], s[2], s[3], s[4], s[5]), e.translate(-r, -o);
  }
  unapply(e) {
    const { originX: t, originY: n, matrix: s } = this, r = s[0], o = s[2], a = s[4], l = s[1], c = s[3], u = s[5], d = 0, f = 0, h = 1, g = 1 / (r * (c * h - u * f) - o * (l * h - u * d) + a * (l * f - c * d)), p = t.getPixels("x"), v = n.getPixels("y");
    e.translate(p, v), e.transform(g * (c * h - u * f), g * (u * d - l * h), g * (a * f - o * h), g * (r * h - a * d), g * (o * u - a * c), g * (a * l - r * u)), e.translate(-p, -v);
  }
  applyToPoint(e) {
    e.applyTransform(this.matrix);
  }
  constructor(e, t, n) {
    this.type = "matrix", this.matrix = is(t), this.originX = n[0], this.originY = n[1];
  }
}
class ni extends ti {
  constructor(e, t, n) {
    super(e, t, n), this.type = "skew", this.angle = new T(e, "angle", t);
  }
}
class bs extends ni {
  constructor(e, t, n) {
    super(e, t, n), this.type = "skewX", this.matrix = [
      1,
      0,
      Math.tan(this.angle.getRadians()),
      1,
      0,
      0
    ];
  }
}
class xs extends ni {
  constructor(e, t, n) {
    super(e, t, n), this.type = "skewY", this.matrix = [
      1,
      Math.tan(this.angle.getRadians()),
      0,
      1,
      0,
      0
    ];
  }
}
function Hs(i) {
  return Ke(i).trim().replace(/\)([a-zA-Z])/g, ") $1").replace(/\)(\s?,\s?)/g, ") ").split(/\s(?=[a-z])/);
}
function As(i) {
  const [e = "", t = ""] = i.split("(");
  return [
    e.trim(),
    t.trim().replace(")", "")
  ];
}
class Ee {
  static fromElement(e, t) {
    const n = t.getStyle("transform", !1, !0);
    if (n.hasValue()) {
      const [s, r = s] = t.getStyle("transform-origin", !1, !0).split();
      if (s && r) {
        const o = [
          s,
          r
        ];
        return new Ee(e, n.getString(), o);
      }
    }
    return null;
  }
  apply(e) {
    this.transforms.forEach(
      (t) => t.apply(e)
    );
  }
  unapply(e) {
    this.transforms.forEach(
      (t) => t.unapply(e)
    );
  }
  applyToPoint(e) {
    this.transforms.forEach(
      (t) => t.applyToPoint(e)
    );
  }
  constructor(e, t, n) {
    this.document = e, this.transforms = [], Hs(t).forEach((r) => {
      if (r === "none")
        return;
      const [o, a] = As(r), l = Ee.transformTypes[o];
      l && this.transforms.push(new l(this.document, a, n));
    });
  }
}
Ee.transformTypes = {
  translate: ys,
  rotate: Ps,
  scale: ws,
  matrix: ti,
  skewX: bs,
  skewY: xs
};
class R {
  getAttribute(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    const n = this.attributes[e];
    if (!n && t) {
      const s = new T(this.document, e, "");
      return this.attributes[e] = s, s;
    }
    return n || T.empty(this.document);
  }
  getHrefAttribute() {
    let e;
    for (const t in this.attributes)
      if (t === "href" || t.endsWith(":href")) {
        e = this.attributes[t];
        break;
      }
    return e || T.empty(this.document);
  }
  getStyle(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
    const s = this.styles[e];
    if (s)
      return s;
    const r = this.getAttribute(e);
    if (r.hasValue())
      return this.styles[e] = r, r;
    if (!n) {
      const { parent: o } = this;
      if (o) {
        const a = o.getStyle(e);
        if (a.hasValue())
          return a;
      }
    }
    if (t) {
      const o = new T(this.document, e, "");
      return this.styles[e] = o, o;
    }
    return T.empty(this.document);
  }
  render(e) {
    if (!(this.getStyle("display").getString() === "none" || this.getStyle("visibility").getString() === "hidden")) {
      if (e.save(), this.getStyle("mask").hasValue()) {
        const t = this.getStyle("mask").getDefinition();
        t && (this.applyEffects(e), t.apply(e, this));
      } else if (this.getStyle("filter").getValue("none") !== "none") {
        const t = this.getStyle("filter").getDefinition();
        t && (this.applyEffects(e), t.apply(e, this));
      } else
        this.setContext(e), this.renderChildren(e), this.clearContext(e);
      e.restore();
    }
  }
  setContext(e) {
  }
  applyEffects(e) {
    const t = Ee.fromElement(this.document, this);
    t && t.apply(e);
    const n = this.getStyle("clip-path", !1, !0);
    if (n.hasValue()) {
      const s = n.getDefinition();
      s && s.apply(e);
    }
  }
  clearContext(e) {
  }
  renderChildren(e) {
    this.children.forEach((t) => {
      t.render(e);
    });
  }
  addChild(e) {
    const t = e instanceof R ? e : this.document.createElement(e);
    t.parent = this, R.ignoreChildTypes.includes(t.type) || this.children.push(t);
  }
  matchesSelector(e) {
    var t;
    const { node: n } = this;
    if (typeof n.matches == "function")
      return n.matches(e);
    const s = (t = n.getAttribute) === null || t === void 0 ? void 0 : t.call(n, "class");
    return !s || s === "" ? !1 : s.split(" ").some(
      (r) => ".".concat(r) === e
    );
  }
  addStylesFromStyleDefinition() {
    const { styles: e, stylesSpecificity: t } = this.document;
    let n;
    for (const s in e)
      if (!s.startsWith("@") && this.matchesSelector(s)) {
        const r = e[s], o = t[s];
        if (r)
          for (const a in r) {
            let l = this.stylesSpecificity[a];
            typeof l > "u" && (l = "000"), o && o >= l && (n = r[a], n && (this.styles[a] = n), this.stylesSpecificity[a] = o);
          }
      }
  }
  removeStyles(e, t) {
    return t.reduce((s, r) => {
      const o = e.getStyle(r);
      if (!o.hasValue())
        return s;
      const a = o.getString();
      return o.setValue(""), [
        ...s,
        [
          r,
          a
        ]
      ];
    }, []);
  }
  restoreStyles(e, t) {
    t.forEach((n) => {
      let [s, r] = n;
      e.getStyle(s, !0).setValue(r);
    });
  }
  isFirstChild() {
    var e;
    return ((e = this.parent) === null || e === void 0 ? void 0 : e.children.indexOf(this)) === 0;
  }
  constructor(e, t, n = !1) {
    if (this.document = e, this.node = t, this.captureTextNodes = n, this.type = "", this.attributes = {}, this.styles = {}, this.stylesSpecificity = {}, this.animationFrozen = !1, this.animationFrozenValue = "", this.parent = null, this.children = [], !t || t.nodeType !== 1)
      return;
    Array.from(t.attributes).forEach((o) => {
      const a = rs(o.nodeName);
      this.attributes[a] = new T(e, a, o.value);
    }), this.addStylesFromStyleDefinition(), this.getAttribute("style").hasValue() && this.getAttribute("style").getString().split(";").map(
      (a) => a.trim()
    ).forEach((a) => {
      if (!a)
        return;
      const [l, c] = a.split(":").map(
        (u) => u.trim()
      );
      l && (this.styles[l] = new T(e, l, c));
    });
    const { definitions: s } = e, r = this.getAttribute("id");
    r.hasValue() && (s[r.getString()] || (s[r.getString()] = this)), Array.from(t.childNodes).forEach((o) => {
      if (o.nodeType === 1)
        this.addChild(o);
      else if (n && (o.nodeType === 3 || o.nodeType === 4)) {
        const a = e.createTextNode(o);
        a.getText().length > 0 && this.addChild(a);
      }
    });
  }
}
R.ignoreChildTypes = [
  "title"
];
class Ds extends R {
  constructor(e, t, n) {
    super(e, t, n);
  }
}
function zs(i) {
  const e = i.trim();
  return /^('|")/.test(e) ? e : '"'.concat(e, '"');
}
function Ls(i) {
  return typeof process > "u" ? i : i.trim().split(",").map(zs).join(",");
}
function Os(i) {
  if (!i)
    return "";
  const e = i.trim().toLowerCase();
  switch (e) {
    case "normal":
    case "italic":
    case "oblique":
    case "inherit":
    case "initial":
    case "unset":
      return e;
    default:
      return /^oblique\s+(-|)\d+deg$/.test(e) ? e : "";
  }
}
function Ts(i) {
  if (!i)
    return "";
  const e = i.trim().toLowerCase();
  switch (e) {
    case "normal":
    case "bold":
    case "lighter":
    case "bolder":
    case "inherit":
    case "initial":
    case "unset":
      return e;
    default:
      return /^[\d.]+$/.test(e) ? e : "";
  }
}
class J {
  static parse() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", t = arguments.length > 1 ? arguments[1] : void 0, n = "", s = "", r = "", o = "", a = "";
    const l = Ke(e).trim().split(" "), c = {
      fontSize: !1,
      fontStyle: !1,
      fontWeight: !1,
      fontVariant: !1
    };
    return l.forEach((u) => {
      switch (!0) {
        case (!c.fontStyle && J.styles.includes(u)):
          u !== "inherit" && (n = u), c.fontStyle = !0;
          break;
        case (!c.fontVariant && J.variants.includes(u)):
          u !== "inherit" && (s = u), c.fontStyle = !0, c.fontVariant = !0;
          break;
        case (!c.fontWeight && J.weights.includes(u)):
          u !== "inherit" && (r = u), c.fontStyle = !0, c.fontVariant = !0, c.fontWeight = !0;
          break;
        case !c.fontSize:
          u !== "inherit" && (o = u.split("/")[0] || ""), c.fontStyle = !0, c.fontVariant = !0, c.fontWeight = !0, c.fontSize = !0;
          break;
        default:
          u !== "inherit" && (a += u);
      }
    }), new J(n, s, r, o, a, t);
  }
  toString() {
    return [
      Os(this.fontStyle),
      this.fontVariant,
      Ts(this.fontWeight),
      this.fontSize,
      Ls(this.fontFamily)
    ].join(" ").trim();
  }
  constructor(e, t, n, s, r, o) {
    const a = o ? typeof o == "string" ? J.parse(o) : o : {};
    this.fontFamily = r || a.fontFamily, this.fontSize = s || a.fontSize, this.fontStyle = e || a.fontStyle, this.fontWeight = n || a.fontWeight, this.fontVariant = t || a.fontVariant;
  }
}
J.styles = "normal|italic|oblique|inherit";
J.variants = "normal|small-caps|inherit";
J.weights = "normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit";
class ue {
  get x() {
    return this.x1;
  }
  get y() {
    return this.y1;
  }
  get width() {
    return this.x2 - this.x1;
  }
  get height() {
    return this.y2 - this.y1;
  }
  addPoint(e, t) {
    typeof e < "u" && ((isNaN(this.x1) || isNaN(this.x2)) && (this.x1 = e, this.x2 = e), e < this.x1 && (this.x1 = e), e > this.x2 && (this.x2 = e)), typeof t < "u" && ((isNaN(this.y1) || isNaN(this.y2)) && (this.y1 = t, this.y2 = t), t < this.y1 && (this.y1 = t), t > this.y2 && (this.y2 = t));
  }
  addX(e) {
    this.addPoint(e, 0);
  }
  addY(e) {
    this.addPoint(0, e);
  }
  addBoundingBox(e) {
    if (!e)
      return;
    const { x1: t, y1: n, x2: s, y2: r } = e;
    this.addPoint(t, n), this.addPoint(s, r);
  }
  sumCubic(e, t, n, s, r) {
    return Math.pow(1 - e, 3) * t + 3 * Math.pow(1 - e, 2) * e * n + 3 * (1 - e) * Math.pow(e, 2) * s + Math.pow(e, 3) * r;
  }
  bezierCurveAdd(e, t, n, s, r) {
    const o = 6 * t - 12 * n + 6 * s, a = -3 * t + 9 * n - 9 * s + 3 * r, l = 3 * n - 3 * t;
    if (a === 0) {
      if (o === 0)
        return;
      const f = -l / o;
      0 < f && f < 1 && (e ? this.addX(this.sumCubic(f, t, n, s, r)) : this.addY(this.sumCubic(f, t, n, s, r)));
      return;
    }
    const c = Math.pow(o, 2) - 4 * l * a;
    if (c < 0)
      return;
    const u = (-o + Math.sqrt(c)) / (2 * a);
    0 < u && u < 1 && (e ? this.addX(this.sumCubic(u, t, n, s, r)) : this.addY(this.sumCubic(u, t, n, s, r)));
    const d = (-o - Math.sqrt(c)) / (2 * a);
    0 < d && d < 1 && (e ? this.addX(this.sumCubic(d, t, n, s, r)) : this.addY(this.sumCubic(d, t, n, s, r)));
  }
  addBezierCurve(e, t, n, s, r, o, a, l) {
    this.addPoint(e, t), this.addPoint(a, l), this.bezierCurveAdd(!0, e, n, r, a), this.bezierCurveAdd(!1, t, s, o, l);
  }
  addQuadraticCurve(e, t, n, s, r, o) {
    const a = e + 0.6666666666666666 * (n - e), l = t + 2 / 3 * (s - t), c = a + 1 / 3 * (r - e), u = l + 1 / 3 * (o - t);
    this.addBezierCurve(e, t, a, c, l, u, r, o);
  }
  isPointInBox(e, t) {
    const { x1: n, y1: s, x2: r, y2: o } = this;
    return n <= e && e <= r && s <= t && t <= o;
  }
  constructor(e = Number.NaN, t = Number.NaN, n = Number.NaN, s = Number.NaN) {
    this.x1 = e, this.y1 = t, this.x2 = n, this.y2 = s, this.addPoint(e, t), this.addPoint(n, s);
  }
}
class Ve extends R {
  calculateOpacity() {
    let e = 1, t = this;
    for (; t; ) {
      const n = t.getStyle("opacity", !1, !0);
      n.hasValue(!0) && (e *= n.getNumber()), t = t.parent;
    }
    return e;
  }
  setContext(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (!t) {
      const n = this.getStyle("fill"), s = this.getStyle("fill-opacity"), r = this.getStyle("stroke"), o = this.getStyle("stroke-opacity");
      if (n.isUrlDefinition()) {
        const h = n.getFillStyleDefinition(this, s);
        h && (e.fillStyle = h);
      } else if (n.hasValue()) {
        n.getString() === "currentColor" && n.setValue(this.getStyle("color").getColor());
        const h = n.getColor();
        h !== "inherit" && (e.fillStyle = h === "none" ? "rgba(0,0,0,0)" : h);
      }
      if (s.hasValue()) {
        const h = new T(this.document, "fill", e.fillStyle).addOpacity(s).getColor();
        e.fillStyle = h;
      }
      if (r.isUrlDefinition()) {
        const h = r.getFillStyleDefinition(this, o);
        h && (e.strokeStyle = h);
      } else if (r.hasValue()) {
        r.getString() === "currentColor" && r.setValue(this.getStyle("color").getColor());
        const h = r.getString();
        h !== "inherit" && (e.strokeStyle = h === "none" ? "rgba(0,0,0,0)" : h);
      }
      if (o.hasValue()) {
        const h = new T(this.document, "stroke", e.strokeStyle).addOpacity(o).getString();
        e.strokeStyle = h;
      }
      const a = this.getStyle("stroke-width");
      if (a.hasValue()) {
        const h = a.getPixels();
        e.lineWidth = h || Ye;
      }
      const l = this.getStyle("stroke-linecap"), c = this.getStyle("stroke-linejoin"), u = this.getStyle("stroke-miterlimit"), d = this.getStyle("stroke-dasharray"), f = this.getStyle("stroke-dashoffset");
      if (l.hasValue() && (e.lineCap = l.getString()), c.hasValue() && (e.lineJoin = c.getString()), u.hasValue() && (e.miterLimit = u.getNumber()), d.hasValue() && d.getString() !== "none") {
        const h = $(d.getString());
        typeof e.setLineDash < "u" ? e.setLineDash(h) : typeof e.webkitLineDash < "u" ? e.webkitLineDash = h : typeof e.mozDash < "u" && !(h.length === 1 && h[0] === 0) && (e.mozDash = h);
        const g = f.getPixels();
        typeof e.lineDashOffset < "u" ? e.lineDashOffset = g : typeof e.webkitLineDashOffset < "u" ? e.webkitLineDashOffset = g : typeof e.mozDashOffset < "u" && (e.mozDashOffset = g);
      }
    }
    if (this.modifiedEmSizeStack = !1, typeof e.font < "u") {
      const n = this.getStyle("font"), s = this.getStyle("font-style"), r = this.getStyle("font-variant"), o = this.getStyle("font-weight"), a = this.getStyle("font-size"), l = this.getStyle("font-family"), c = new J(s.getString(), r.getString(), o.getString(), a.hasValue() ? "".concat(a.getPixels(!0), "px") : "", l.getString(), J.parse(n.getString(), e.font));
      s.setValue(c.fontStyle), r.setValue(c.fontVariant), o.setValue(c.fontWeight), a.setValue(c.fontSize), l.setValue(c.fontFamily), e.font = c.toString(), a.isPixels() && (this.document.emSize = a.getPixels(), this.modifiedEmSizeStack = !0);
    }
    t || (this.applyEffects(e), e.globalAlpha = this.calculateOpacity());
  }
  clearContext(e) {
    super.clearContext(e), this.modifiedEmSizeStack && this.document.popEmSize();
  }
  constructor(...e) {
    super(...e), this.modifiedEmSizeStack = !1;
  }
}
class Le extends Ve {
  setContext(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    super.setContext(e, t);
    const n = this.getStyle("dominant-baseline").getTextBaseline() || this.getStyle("alignment-baseline").getTextBaseline();
    n && (e.textBaseline = n);
  }
  initializeCoordinates() {
    this.x = 0, this.y = 0, this.leafTexts = [], this.textChunkStart = 0, this.minX = Number.POSITIVE_INFINITY, this.maxX = Number.NEGATIVE_INFINITY;
  }
  getBoundingBox(e) {
    if (this.type !== "text")
      return this.getTElementBoundingBox(e);
    this.initializeCoordinates(), this.adjustChildCoordinatesRecursive(e);
    let t = null;
    return this.children.forEach((n, s) => {
      const r = this.getChildBoundingBox(e, this, this, s);
      t ? t.addBoundingBox(r) : t = r;
    }), t;
  }
  getFontSize() {
    const { document: e, parent: t } = this, n = J.parse(e.ctx.font).fontSize;
    return t.getStyle("font-size").getNumber(n);
  }
  getTElementBoundingBox(e) {
    const t = this.getFontSize();
    return new ue(this.x, this.y - t, this.x + this.measureText(e), this.y);
  }
  getGlyph(e, t, n) {
    const s = t[n];
    let r;
    if (e.isArabic) {
      var o;
      const a = t.length, l = t[n - 1], c = t[n + 1];
      let u = "isolated";
      (n === 0 || l === " ") && n < a - 1 && c !== " " && (u = "terminal"), n > 0 && l !== " " && n < a - 1 && c !== " " && (u = "medial"), n > 0 && l !== " " && (n === a - 1 || c === " ") && (u = "initial"), r = ((o = e.arabicGlyphs[s]) === null || o === void 0 ? void 0 : o[u]) || e.glyphs[s];
    } else
      r = e.glyphs[s];
    return r || (r = e.missingGlyph), r;
  }
  getText() {
    return "";
  }
  getTextFromNode(e) {
    const t = e || this.node, n = Array.from(t.parentNode.childNodes), s = n.indexOf(t), r = n.length - 1;
    let o = Ke(
      t.textContent || ""
    );
    return s === 0 && (o = ts(o)), s === r && (o = ns(o)), o;
  }
  renderChildren(e) {
    if (this.type !== "text") {
      this.renderTElementChildren(e);
      return;
    }
    this.initializeCoordinates(), this.adjustChildCoordinatesRecursive(e), this.children.forEach((n, s) => {
      this.renderChild(e, this, this, s);
    });
    const { mouse: t } = this.document.screen;
    t.isWorking() && t.checkBoundingBox(this, this.getBoundingBox(e));
  }
  renderTElementChildren(e) {
    const { document: t, parent: n } = this, s = this.getText(), r = n.getStyle("font-family").getDefinition();
    if (r) {
      const { unitsPerEm: l } = r.fontFace, c = J.parse(t.ctx.font), u = n.getStyle("font-size").getNumber(c.fontSize), d = n.getStyle("font-style").getString(c.fontStyle), f = u / l, h = r.isRTL ? s.split("").reverse().join("") : s, g = $(n.getAttribute("dx").getString()), p = h.length;
      for (let v = 0; v < p; v++) {
        const w = this.getGlyph(r, h, v);
        e.translate(this.x, this.y), e.scale(f, -f);
        const x = e.lineWidth;
        e.lineWidth = e.lineWidth * l / u, d === "italic" && e.transform(1, 0, 0.4, 1, 0, 0), w.render(e), d === "italic" && e.transform(1, 0, -0.4, 1, 0, 0), e.lineWidth = x, e.scale(1 / f, -1 / f), e.translate(-this.x, -this.y), this.x += u * (w.horizAdvX || r.horizAdvX) / l, typeof g[v] < "u" && !isNaN(g[v]) && (this.x += g[v]);
      }
      return;
    }
    const { x: o, y: a } = this;
    e.fillStyle && e.fillText(s, o, a), e.strokeStyle && e.strokeText(s, o, a);
  }
  applyAnchoring() {
    if (this.textChunkStart >= this.leafTexts.length)
      return;
    const e = this.leafTexts[this.textChunkStart], t = e.getStyle("text-anchor").getString("start"), n = !1;
    let s = 0;
    t === "start" && !n || t === "end" && n ? s = e.x - this.minX : t === "end" && !n || t === "start" && n ? s = e.x - this.maxX : s = e.x - (this.minX + this.maxX) / 2;
    for (let r = this.textChunkStart; r < this.leafTexts.length; r++)
      this.leafTexts[r].x += s;
    this.minX = Number.POSITIVE_INFINITY, this.maxX = Number.NEGATIVE_INFINITY, this.textChunkStart = this.leafTexts.length;
  }
  adjustChildCoordinatesRecursive(e) {
    this.children.forEach((t, n) => {
      this.adjustChildCoordinatesRecursiveCore(e, this, this, n);
    }), this.applyAnchoring();
  }
  adjustChildCoordinatesRecursiveCore(e, t, n, s) {
    const r = n.children[s];
    r.children.length > 0 ? r.children.forEach((o, a) => {
      t.adjustChildCoordinatesRecursiveCore(e, t, r, a);
    }) : this.adjustChildCoordinates(e, t, n, s);
  }
  adjustChildCoordinates(e, t, n, s) {
    const r = n.children[s];
    if (typeof r.measureText != "function")
      return r;
    e.save(), r.setContext(e, !0);
    const o = r.getAttribute("x"), a = r.getAttribute("y"), l = r.getAttribute("dx"), c = r.getAttribute("dy"), u = r.getStyle("font-family").getDefinition(), d = Boolean(u == null ? void 0 : u.isRTL);
    s === 0 && (o.hasValue() || o.setValue(r.getInheritedAttribute("x")), a.hasValue() || a.setValue(r.getInheritedAttribute("y")), l.hasValue() || l.setValue(r.getInheritedAttribute("dx")), c.hasValue() || c.setValue(r.getInheritedAttribute("dy")));
    const f = r.measureText(e);
    return d && (t.x -= f), o.hasValue() ? (t.applyAnchoring(), r.x = o.getPixels("x"), l.hasValue() && (r.x += l.getPixels("x"))) : (l.hasValue() && (t.x += l.getPixels("x")), r.x = t.x), t.x = r.x, d || (t.x += f), a.hasValue() ? (r.y = a.getPixels("y"), c.hasValue() && (r.y += c.getPixels("y"))) : (c.hasValue() && (t.y += c.getPixels("y")), r.y = t.y), t.y = r.y, t.leafTexts.push(r), t.minX = Math.min(t.minX, r.x, r.x + f), t.maxX = Math.max(t.maxX, r.x, r.x + f), r.clearContext(e), e.restore(), r;
  }
  getChildBoundingBox(e, t, n, s) {
    const r = n.children[s];
    if (typeof r.getBoundingBox != "function")
      return null;
    const o = r.getBoundingBox(e);
    return o && r.children.forEach((a, l) => {
      const c = t.getChildBoundingBox(e, t, r, l);
      o.addBoundingBox(c);
    }), o;
  }
  renderChild(e, t, n, s) {
    const r = n.children[s];
    r.render(e), r.children.forEach((o, a) => {
      t.renderChild(e, t, r, a);
    });
  }
  measureText(e) {
    const { measureCache: t } = this;
    if (~t)
      return t;
    const n = this.getText(), s = this.measureTargetText(e, n);
    return this.measureCache = s, s;
  }
  measureTargetText(e, t) {
    if (!t.length)
      return 0;
    const { parent: n } = this, s = n.getStyle("font-family").getDefinition();
    if (s) {
      const o = this.getFontSize(), a = s.isRTL ? t.split("").reverse().join("") : t, l = $(n.getAttribute("dx").getString()), c = a.length;
      let u = 0;
      for (let d = 0; d < c; d++)
        u += (this.getGlyph(s, a, d).horizAdvX || s.horizAdvX) * o / s.fontFace.unitsPerEm, typeof l[d] < "u" && !isNaN(l[d]) && (u += l[d]);
      return u;
    }
    if (!e.measureText)
      return t.length * 10;
    e.save(), this.setContext(e, !0);
    const { width: r } = e.measureText(t);
    return this.clearContext(e), e.restore(), r;
  }
  getInheritedAttribute(e) {
    let t = this;
    for (; t instanceof Le && t.isFirstChild() && t.parent; ) {
      const n = t.parent.getAttribute(e);
      if (n.hasValue(!0))
        return n.getString("0");
      t = t.parent;
    }
    return null;
  }
  constructor(e, t, n) {
    super(e, t, new.target === Le ? !0 : n), this.type = "text", this.x = 0, this.y = 0, this.leafTexts = [], this.textChunkStart = 0, this.minX = Number.POSITIVE_INFINITY, this.maxX = Number.NEGATIVE_INFINITY, this.measureCache = -1;
  }
}
class Dt extends Le {
  getText() {
    return this.text;
  }
  constructor(e, t, n) {
    super(e, t, new.target === Dt ? !0 : n), this.type = "tspan", this.text = this.children.length > 0 ? "" : this.getTextFromNode();
  }
}
class Xs extends Dt {
  constructor(...e) {
    super(...e), this.type = "textNode";
  }
}
class X extends b {
  reset() {
    this.i = -1, this.command = null, this.previousCommand = null, this.start = new Z(0, 0), this.control = new Z(0, 0), this.current = new Z(0, 0), this.points = [], this.angles = [];
  }
  isEnd() {
    const { i: e, commands: t } = this;
    return e >= t.length - 1;
  }
  next() {
    const e = this.commands[++this.i];
    return this.previousCommand = this.command, this.command = e, e;
  }
  getPoint() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "x", t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "y";
    const n = new Z(this.command[e], this.command[t]);
    return this.makeAbsolute(n);
  }
  getAsControlPoint(e, t) {
    const n = this.getPoint(e, t);
    return this.control = n, n;
  }
  getAsCurrentPoint(e, t) {
    const n = this.getPoint(e, t);
    return this.current = n, n;
  }
  getReflectedControlPoint() {
    const e = this.previousCommand.type;
    if (e !== b.CURVE_TO && e !== b.SMOOTH_CURVE_TO && e !== b.QUAD_TO && e !== b.SMOOTH_QUAD_TO)
      return this.current;
    const { current: { x: t, y: n }, control: { x: s, y: r } } = this;
    return new Z(2 * t - s, 2 * n - r);
  }
  makeAbsolute(e) {
    if (this.command.relative) {
      const { x: t, y: n } = this.current;
      e.x += t, e.y += n;
    }
    return e;
  }
  addMarker(e, t, n) {
    const { points: s, angles: r } = this;
    n && r.length > 0 && !r[r.length - 1] && (r[r.length - 1] = s[s.length - 1].angleTo(n)), this.addMarkerAngle(e, t ? t.angleTo(e) : null);
  }
  addMarkerAngle(e, t) {
    this.points.push(e), this.angles.push(t);
  }
  getMarkerPoints() {
    return this.points;
  }
  getMarkerAngles() {
    const { angles: e } = this, t = e.length;
    for (let n = 0; n < t; n++)
      if (!e[n]) {
        for (let s = n + 1; s < t; s++)
          if (e[s]) {
            e[n] = e[s];
            break;
          }
      }
    return e;
  }
  constructor(e) {
    super(e.replace(/([+\-.])\s+/gm, "$1").replace(/[^MmZzLlHhVvCcSsQqTtAae\d\s.,+-].*/g, "")), this.control = new Z(0, 0), this.start = new Z(0, 0), this.current = new Z(0, 0), this.command = null, this.commands = this.commands, this.i = -1, this.previousCommand = null, this.points = [], this.angles = [];
  }
}
class C extends Ve {
  path(e) {
    const { pathParser: t } = this, n = new ue();
    for (t.reset(), e && e.beginPath(); !t.isEnd(); )
      switch (t.next().type) {
        case X.MOVE_TO:
          this.pathM(e, n);
          break;
        case X.LINE_TO:
          this.pathL(e, n);
          break;
        case X.HORIZ_LINE_TO:
          this.pathH(e, n);
          break;
        case X.VERT_LINE_TO:
          this.pathV(e, n);
          break;
        case X.CURVE_TO:
          this.pathC(e, n);
          break;
        case X.SMOOTH_CURVE_TO:
          this.pathS(e, n);
          break;
        case X.QUAD_TO:
          this.pathQ(e, n);
          break;
        case X.SMOOTH_QUAD_TO:
          this.pathT(e, n);
          break;
        case X.ARC:
          this.pathA(e, n);
          break;
        case X.CLOSE_PATH:
          this.pathZ(e, n);
          break;
      }
    return n;
  }
  getBoundingBox(e) {
    return this.path();
  }
  getMarkers() {
    const { pathParser: e } = this, t = e.getMarkerPoints(), n = e.getMarkerAngles();
    return t.map(
      (r, o) => [
        r,
        n[o]
      ]
    );
  }
  renderChildren(e) {
    this.path(e), this.document.screen.mouse.checkPath(this, e);
    const t = this.getStyle("fill-rule");
    e.fillStyle !== "" && (t.getString("inherit") !== "inherit" ? e.fill(t.getString()) : e.fill()), e.strokeStyle !== "" && (this.getAttribute("vector-effect").getString() === "non-scaling-stroke" ? (e.save(), e.setTransform(1, 0, 0, 1, 0, 0), e.stroke(), e.restore()) : e.stroke());
    const n = this.getMarkers();
    if (n) {
      const s = n.length - 1, r = this.getStyle("marker-start"), o = this.getStyle("marker-mid"), a = this.getStyle("marker-end");
      if (r.isUrlDefinition()) {
        const l = r.getDefinition(), [c, u] = n[0];
        l.render(e, c, u);
      }
      if (o.isUrlDefinition()) {
        const l = o.getDefinition();
        for (let c = 1; c < s; c++) {
          const [u, d] = n[c];
          l.render(e, u, d);
        }
      }
      if (a.isUrlDefinition()) {
        const l = a.getDefinition(), [c, u] = n[s];
        l.render(e, c, u);
      }
    }
  }
  static pathM(e) {
    const t = e.getAsCurrentPoint();
    return e.start = e.current, {
      point: t
    };
  }
  pathM(e, t) {
    const { pathParser: n } = this, { point: s } = C.pathM(n), { x: r, y: o } = s;
    n.addMarker(s), t.addPoint(r, o), e && e.moveTo(r, o);
  }
  static pathL(e) {
    const { current: t } = e, n = e.getAsCurrentPoint();
    return {
      current: t,
      point: n
    };
  }
  pathL(e, t) {
    const { pathParser: n } = this, { current: s, point: r } = C.pathL(n), { x: o, y: a } = r;
    n.addMarker(r, s), t.addPoint(o, a), e && e.lineTo(o, a);
  }
  static pathH(e) {
    const { current: t, command: n } = e, s = new Z((n.relative ? t.x : 0) + n.x, t.y);
    return e.current = s, {
      current: t,
      point: s
    };
  }
  pathH(e, t) {
    const { pathParser: n } = this, { current: s, point: r } = C.pathH(n), { x: o, y: a } = r;
    n.addMarker(r, s), t.addPoint(o, a), e && e.lineTo(o, a);
  }
  static pathV(e) {
    const { current: t, command: n } = e, s = new Z(t.x, (n.relative ? t.y : 0) + n.y);
    return e.current = s, {
      current: t,
      point: s
    };
  }
  pathV(e, t) {
    const { pathParser: n } = this, { current: s, point: r } = C.pathV(n), { x: o, y: a } = r;
    n.addMarker(r, s), t.addPoint(o, a), e && e.lineTo(o, a);
  }
  static pathC(e) {
    const { current: t } = e, n = e.getPoint("x1", "y1"), s = e.getAsControlPoint("x2", "y2"), r = e.getAsCurrentPoint();
    return {
      current: t,
      point: n,
      controlPoint: s,
      currentPoint: r
    };
  }
  pathC(e, t) {
    const { pathParser: n } = this, { current: s, point: r, controlPoint: o, currentPoint: a } = C.pathC(n);
    n.addMarker(a, o, r), t.addBezierCurve(s.x, s.y, r.x, r.y, o.x, o.y, a.x, a.y), e && e.bezierCurveTo(r.x, r.y, o.x, o.y, a.x, a.y);
  }
  static pathS(e) {
    const { current: t } = e, n = e.getReflectedControlPoint(), s = e.getAsControlPoint("x2", "y2"), r = e.getAsCurrentPoint();
    return {
      current: t,
      point: n,
      controlPoint: s,
      currentPoint: r
    };
  }
  pathS(e, t) {
    const { pathParser: n } = this, { current: s, point: r, controlPoint: o, currentPoint: a } = C.pathS(n);
    n.addMarker(a, o, r), t.addBezierCurve(s.x, s.y, r.x, r.y, o.x, o.y, a.x, a.y), e && e.bezierCurveTo(r.x, r.y, o.x, o.y, a.x, a.y);
  }
  static pathQ(e) {
    const { current: t } = e, n = e.getAsControlPoint("x1", "y1"), s = e.getAsCurrentPoint();
    return {
      current: t,
      controlPoint: n,
      currentPoint: s
    };
  }
  pathQ(e, t) {
    const { pathParser: n } = this, { current: s, controlPoint: r, currentPoint: o } = C.pathQ(n);
    n.addMarker(o, r, r), t.addQuadraticCurve(s.x, s.y, r.x, r.y, o.x, o.y), e && e.quadraticCurveTo(r.x, r.y, o.x, o.y);
  }
  static pathT(e) {
    const { current: t } = e, n = e.getReflectedControlPoint();
    e.control = n;
    const s = e.getAsCurrentPoint();
    return {
      current: t,
      controlPoint: n,
      currentPoint: s
    };
  }
  pathT(e, t) {
    const { pathParser: n } = this, { current: s, controlPoint: r, currentPoint: o } = C.pathT(n);
    n.addMarker(o, r, r), t.addQuadraticCurve(s.x, s.y, r.x, r.y, o.x, o.y), e && e.quadraticCurveTo(r.x, r.y, o.x, o.y);
  }
  static pathA(e) {
    const { current: t, command: n } = e;
    let { rX: s, rY: r, xRot: o, lArcFlag: a, sweepFlag: l } = n;
    const c = o * (Math.PI / 180), u = e.getAsCurrentPoint(), d = new Z(Math.cos(c) * (t.x - u.x) / 2 + Math.sin(c) * (t.y - u.y) / 2, -Math.sin(c) * (t.x - u.x) / 2 + Math.cos(c) * (t.y - u.y) / 2), f = Math.pow(d.x, 2) / Math.pow(s, 2) + Math.pow(d.y, 2) / Math.pow(r, 2);
    f > 1 && (s *= Math.sqrt(f), r *= Math.sqrt(f));
    let h = (a === l ? -1 : 1) * Math.sqrt((Math.pow(s, 2) * Math.pow(r, 2) - Math.pow(s, 2) * Math.pow(d.y, 2) - Math.pow(r, 2) * Math.pow(d.x, 2)) / (Math.pow(s, 2) * Math.pow(d.y, 2) + Math.pow(r, 2) * Math.pow(d.x, 2)));
    isNaN(h) && (h = 0);
    const g = new Z(h * s * d.y / r, h * -r * d.x / s), p = new Z((t.x + u.x) / 2 + Math.cos(c) * g.x - Math.sin(c) * g.y, (t.y + u.y) / 2 + Math.sin(c) * g.x + Math.cos(c) * g.y), v = Tn([
      1,
      0
    ], [
      (d.x - g.x) / s,
      (d.y - g.y) / r
    ]), w = [
      (d.x - g.x) / s,
      (d.y - g.y) / r
    ], x = [
      (-d.x - g.x) / s,
      (-d.y - g.y) / r
    ];
    let m = Tn(w, x);
    return Qt(w, x) <= -1 && (m = Math.PI), Qt(w, x) >= 1 && (m = 0), {
      currentPoint: u,
      rX: s,
      rY: r,
      sweepFlag: l,
      xAxisRotation: c,
      centp: p,
      a1: v,
      ad: m
    };
  }
  pathA(e, t) {
    const { pathParser: n } = this, { currentPoint: s, rX: r, rY: o, sweepFlag: a, xAxisRotation: l, centp: c, a1: u, ad: d } = C.pathA(n), f = 1 - a ? 1 : -1, h = u + f * (d / 2), g = new Z(c.x + r * Math.cos(h), c.y + o * Math.sin(h));
    if (n.addMarkerAngle(g, h - f * Math.PI / 2), n.addMarkerAngle(s, h - f * Math.PI), t.addPoint(s.x, s.y), e && !isNaN(u) && !isNaN(d)) {
      const p = r > o ? r : o, v = r > o ? 1 : r / o, w = r > o ? o / r : 1;
      e.translate(c.x, c.y), e.rotate(l), e.scale(v, w), e.arc(0, 0, p, u, u + d, Boolean(1 - a)), e.scale(1 / v, 1 / w), e.rotate(-l), e.translate(-c.x, -c.y);
    }
  }
  static pathZ(e) {
    e.current = e.start;
  }
  pathZ(e, t) {
    C.pathZ(this.pathParser), e && t.x1 !== t.x2 && t.y1 !== t.y2 && e.closePath();
  }
  constructor(e, t, n) {
    super(e, t, n), this.type = "path", this.pathParser = new X(this.getAttribute("d").getString());
  }
}
class at extends Ve {
  setContext(e) {
    var t;
    const { document: n } = this, { screen: s, window: r } = n, o = e.canvas;
    if (s.setDefaults(e), "style" in o && typeof e.font < "u" && r && typeof r.getComputedStyle < "u") {
      e.font = r.getComputedStyle(o).getPropertyValue("font");
      const x = new T(n, "fontSize", J.parse(e.font).fontSize);
      x.hasValue() && (n.rootEmSize = x.getPixels("y"), n.emSize = n.rootEmSize);
    }
    this.getAttribute("x").hasValue() || this.getAttribute("x", !0).setValue(0), this.getAttribute("y").hasValue() || this.getAttribute("y", !0).setValue(0);
    let { width: a, height: l } = s.viewPort;
    this.getStyle("width").hasValue() || this.getStyle("width", !0).setValue("100%"), this.getStyle("height").hasValue() || this.getStyle("height", !0).setValue("100%"), this.getStyle("color").hasValue() || this.getStyle("color", !0).setValue("black");
    const c = this.getAttribute("refX"), u = this.getAttribute("refY"), d = this.getAttribute("viewBox"), f = d.hasValue() ? $(d.getString()) : null, h = !this.root && this.getStyle("overflow").getValue("hidden") !== "visible";
    let g = 0, p = 0, v = 0, w = 0;
    f && (g = f[0], p = f[1]), this.root || (a = this.getStyle("width").getPixels("x"), l = this.getStyle("height").getPixels("y"), this.type === "marker" && (v = g, w = p, g = 0, p = 0)), s.viewPort.setCurrent(a, l), this.node && (!this.parent || ((t = this.node.parentNode) === null || t === void 0 ? void 0 : t.nodeName) === "foreignObject") && this.getStyle("transform", !1, !0).hasValue() && !this.getStyle("transform-origin", !1, !0).hasValue() && this.getStyle("transform-origin", !0, !0).setValue("50% 50%"), super.setContext(e), e.translate(this.getAttribute("x").getPixels("x"), this.getAttribute("y").getPixels("y")), f && (a = f[2], l = f[3]), n.setViewBox({
      ctx: e,
      aspectRatio: this.getAttribute("preserveAspectRatio").getString(),
      width: s.viewPort.width,
      desiredWidth: a,
      height: s.viewPort.height,
      desiredHeight: l,
      minX: g,
      minY: p,
      refX: c.getValue(),
      refY: u.getValue(),
      clip: h,
      clipX: v,
      clipY: w
    }), f && (s.viewPort.removeCurrent(), s.viewPort.setCurrent(a, l));
  }
  clearContext(e) {
    super.clearContext(e), this.document.screen.viewPort.removeCurrent();
  }
  resize(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
    const s = this.getAttribute("width", !0), r = this.getAttribute("height", !0), o = this.getAttribute("viewBox"), a = this.getAttribute("style"), l = s.getNumber(0), c = r.getNumber(0);
    if (n)
      if (typeof n == "string")
        this.getAttribute("preserveAspectRatio", !0).setValue(n);
      else {
        const u = this.getAttribute("preserveAspectRatio");
        u.hasValue() && u.setValue(u.getString().replace(/^\s*(\S.*\S)\s*$/, "$1"));
      }
    if (s.setValue(e), r.setValue(t), o.hasValue() || o.setValue("0 0 ".concat(l || e, " ").concat(c || t)), a.hasValue()) {
      const u = this.getStyle("width"), d = this.getStyle("height");
      u.hasValue() && u.setValue("".concat(e, "px")), d.hasValue() && d.setValue("".concat(t, "px"));
    }
  }
  constructor(...e) {
    super(...e), this.type = "svg", this.root = !1;
  }
}
class ii extends C {
  path(e) {
    const t = this.getAttribute("x").getPixels("x"), n = this.getAttribute("y").getPixels("y"), s = this.getStyle("width", !1, !0).getPixels("x"), r = this.getStyle("height", !1, !0).getPixels("y"), o = this.getAttribute("rx"), a = this.getAttribute("ry");
    let l = o.getPixels("x"), c = a.getPixels("y");
    if (o.hasValue() && !a.hasValue() && (c = l), a.hasValue() && !o.hasValue() && (l = c), l = Math.min(l, s / 2), c = Math.min(c, r / 2), e) {
      const u = 4 * ((Math.sqrt(2) - 1) / 3);
      e.beginPath(), r > 0 && s > 0 && (e.moveTo(t + l, n), e.lineTo(t + s - l, n), e.bezierCurveTo(t + s - l + u * l, n, t + s, n + c - u * c, t + s, n + c), e.lineTo(t + s, n + r - c), e.bezierCurveTo(t + s, n + r - c + u * c, t + s - l + u * l, n + r, t + s - l, n + r), e.lineTo(t + l, n + r), e.bezierCurveTo(t + l - u * l, n + r, t, n + r - c + u * c, t, n + r - c), e.lineTo(t, n + c), e.bezierCurveTo(t, n + c - u * c, t + l - u * l, n, t + l, n), e.closePath());
    }
    return new ue(t, n, t + s, n + r);
  }
  getMarkers() {
    return null;
  }
  constructor(...e) {
    super(...e), this.type = "rect";
  }
}
class Ns extends C {
  path(e) {
    const t = this.getAttribute("cx").getPixels("x"), n = this.getAttribute("cy").getPixels("y"), s = this.getAttribute("r").getPixels();
    return e && s > 0 && (e.beginPath(), e.arc(t, n, s, 0, Math.PI * 2, !1), e.closePath()), new ue(t - s, n - s, t + s, n + s);
  }
  getMarkers() {
    return null;
  }
  constructor(...e) {
    super(...e), this.type = "circle";
  }
}
class Ms extends C {
  path(e) {
    const t = 4 * ((Math.sqrt(2) - 1) / 3), n = this.getAttribute("rx").getPixels("x"), s = this.getAttribute("ry").getPixels("y"), r = this.getAttribute("cx").getPixels("x"), o = this.getAttribute("cy").getPixels("y");
    return e && n > 0 && s > 0 && (e.beginPath(), e.moveTo(r + n, o), e.bezierCurveTo(r + n, o + t * s, r + t * n, o + s, r, o + s), e.bezierCurveTo(r - t * n, o + s, r - n, o + t * s, r - n, o), e.bezierCurveTo(r - n, o - t * s, r - t * n, o - s, r, o - s), e.bezierCurveTo(r + t * n, o - s, r + n, o - t * s, r + n, o), e.closePath()), new ue(r - n, o - s, r + n, o + s);
  }
  getMarkers() {
    return null;
  }
  constructor(...e) {
    super(...e), this.type = "ellipse";
  }
}
class Bs extends C {
  getPoints() {
    return [
      new Z(this.getAttribute("x1").getPixels("x"), this.getAttribute("y1").getPixels("y")),
      new Z(this.getAttribute("x2").getPixels("x"), this.getAttribute("y2").getPixels("y"))
    ];
  }
  path(e) {
    const [{ x: t, y: n }, { x: s, y: r }] = this.getPoints();
    return e && (e.beginPath(), e.moveTo(t, n), e.lineTo(s, r)), new ue(t, n, s, r);
  }
  getMarkers() {
    const [e, t] = this.getPoints(), n = e.angleTo(t);
    return [
      [
        e,
        n
      ],
      [
        t,
        n
      ]
    ];
  }
  constructor(...e) {
    super(...e), this.type = "line";
  }
}
class si extends C {
  path(e) {
    const { points: t } = this, [{ x: n, y: s }] = t, r = new ue(n, s);
    return e && (e.beginPath(), e.moveTo(n, s)), t.forEach((o) => {
      let { x: a, y: l } = o;
      r.addPoint(a, l), e && e.lineTo(a, l);
    }), r;
  }
  getMarkers() {
    const { points: e } = this, t = e.length - 1, n = [];
    return e.forEach((s, r) => {
      r !== t && n.push([
        s,
        s.angleTo(e[r + 1])
      ]);
    }), n.length > 0 && n.push([
      e[e.length - 1],
      n[n.length - 1][1]
    ]), n;
  }
  constructor(e, t, n) {
    super(e, t, n), this.type = "polyline", this.points = [], this.points = Z.parsePath(this.getAttribute("points").getString());
  }
}
class Cs extends si {
  path(e) {
    const t = super.path(e), [{ x: n, y: s }] = this.points;
    return e && (e.lineTo(n, s), e.closePath()), t;
  }
  constructor(...e) {
    super(...e), this.type = "polygon";
  }
}
class Ss extends R {
  createPattern(e, t, n) {
    const s = this.getStyle("width").getPixels("x", !0), r = this.getStyle("height").getPixels("y", !0), o = new at(this.document, null);
    o.attributes.viewBox = new T(this.document, "viewBox", this.getAttribute("viewBox").getValue()), o.attributes.width = new T(this.document, "width", "".concat(s, "px")), o.attributes.height = new T(this.document, "height", "".concat(r, "px")), o.attributes.transform = new T(this.document, "transform", this.getAttribute("patternTransform").getValue()), o.children = this.children;
    const a = this.document.createCanvas(s, r), l = a.getContext("2d"), c = this.getAttribute("x"), u = this.getAttribute("y");
    c.hasValue() && u.hasValue() && l.translate(c.getPixels("x", !0), u.getPixels("y", !0)), n.hasValue() ? this.styles["fill-opacity"] = n : Reflect.deleteProperty(this.styles, "fill-opacity");
    for (let f = -1; f <= 1; f++)
      for (let h = -1; h <= 1; h++)
        l.save(), o.attributes.x = new T(this.document, "x", f * a.width), o.attributes.y = new T(this.document, "y", h * a.height), o.render(l), l.restore();
    return e.createPattern(a, "repeat");
  }
  constructor(...e) {
    super(...e), this.type = "pattern";
  }
}
class js extends R {
  render(e, t, n) {
    if (!t)
      return;
    const { x: s, y: r } = t, o = this.getAttribute("orient").getString("auto"), a = this.getAttribute("markerUnits").getString("strokeWidth");
    e.translate(s, r), o === "auto" && e.rotate(n), a === "strokeWidth" && e.scale(e.lineWidth, e.lineWidth), e.save();
    const l = new at(this.document);
    l.type = this.type, l.attributes.viewBox = new T(this.document, "viewBox", this.getAttribute("viewBox").getValue()), l.attributes.refX = new T(this.document, "refX", this.getAttribute("refX").getValue()), l.attributes.refY = new T(this.document, "refY", this.getAttribute("refY").getValue()), l.attributes.width = new T(this.document, "width", this.getAttribute("markerWidth").getValue()), l.attributes.height = new T(this.document, "height", this.getAttribute("markerHeight").getValue()), l.attributes.overflow = new T(this.document, "overflow", this.getAttribute("overflow").getValue()), l.attributes.fill = new T(this.document, "fill", this.getAttribute("fill").getColor("black")), l.attributes.stroke = new T(this.document, "stroke", this.getAttribute("stroke").getValue("none")), l.children = this.children, l.render(e), e.restore(), a === "strokeWidth" && e.scale(1 / e.lineWidth, 1 / e.lineWidth), o === "auto" && e.rotate(-n), e.translate(-s, -r);
  }
  constructor(...e) {
    super(...e), this.type = "marker";
  }
}
class Es extends R {
  render() {
  }
  constructor(...e) {
    super(...e), this.type = "defs";
  }
}
class en extends Ve {
  getBoundingBox(e) {
    const t = new ue();
    return this.children.forEach((n) => {
      t.addBoundingBox(n.getBoundingBox(e));
    }), t;
  }
  constructor(...e) {
    super(...e), this.type = "g";
  }
}
class ri extends R {
  getGradientUnits() {
    return this.getAttribute("gradientUnits").getString("objectBoundingBox");
  }
  createGradient(e, t, n) {
    let s = this;
    this.getHrefAttribute().hasValue() && (s = this.getHrefAttribute().getDefinition(), this.inheritStopContainer(s));
    const { stops: r } = s, o = this.getGradient(e, t);
    if (!o)
      return this.addParentOpacity(n, r[r.length - 1].color);
    if (r.forEach((a) => {
      o.addColorStop(a.offset, this.addParentOpacity(n, a.color));
    }), this.getAttribute("gradientTransform").hasValue()) {
      const { document: a } = this, { MAX_VIRTUAL_PIXELS: l } = Pe, { viewPort: c } = a.screen, u = c.getRoot(), d = new ii(a);
      d.attributes.x = new T(a, "x", -l / 3), d.attributes.y = new T(a, "y", -l / 3), d.attributes.width = new T(a, "width", l), d.attributes.height = new T(a, "height", l);
      const f = new en(a);
      f.attributes.transform = new T(a, "transform", this.getAttribute("gradientTransform").getValue()), f.children = [
        d
      ];
      const h = new at(a);
      h.attributes.x = new T(a, "x", 0), h.attributes.y = new T(a, "y", 0), h.attributes.width = new T(a, "width", u.width), h.attributes.height = new T(a, "height", u.height), h.children = [
        f
      ];
      const g = a.createCanvas(u.width, u.height), p = g.getContext("2d");
      return p.fillStyle = o, h.render(p), p.createPattern(g, "no-repeat");
    }
    return o;
  }
  inheritStopContainer(e) {
    this.attributesToInherit.forEach((t) => {
      !this.getAttribute(t).hasValue() && e.getAttribute(t).hasValue() && this.getAttribute(t, !0).setValue(e.getAttribute(t).getValue());
    });
  }
  addParentOpacity(e, t) {
    return e.hasValue() ? new T(this.document, "color", t).addOpacity(e).getColor() : t;
  }
  constructor(e, t, n) {
    super(e, t, n), this.attributesToInherit = [
      "gradientUnits"
    ], this.stops = [];
    const { stops: s, children: r } = this;
    r.forEach((o) => {
      o.type === "stop" && s.push(o);
    });
  }
}
class ks extends ri {
  getGradient(e, t) {
    const n = this.getGradientUnits() === "objectBoundingBox", s = n ? t.getBoundingBox(e) : null;
    if (n && !s)
      return null;
    !this.getAttribute("x1").hasValue() && !this.getAttribute("y1").hasValue() && !this.getAttribute("x2").hasValue() && !this.getAttribute("y2").hasValue() && (this.getAttribute("x1", !0).setValue(0), this.getAttribute("y1", !0).setValue(0), this.getAttribute("x2", !0).setValue(1), this.getAttribute("y2", !0).setValue(0));
    const r = n ? s.x + s.width * this.getAttribute("x1").getNumber() : this.getAttribute("x1").getPixels("x"), o = n ? s.y + s.height * this.getAttribute("y1").getNumber() : this.getAttribute("y1").getPixels("y"), a = n ? s.x + s.width * this.getAttribute("x2").getNumber() : this.getAttribute("x2").getPixels("x"), l = n ? s.y + s.height * this.getAttribute("y2").getNumber() : this.getAttribute("y2").getPixels("y");
    return r === a && o === l ? null : e.createLinearGradient(r, o, a, l);
  }
  constructor(e, t, n) {
    super(e, t, n), this.type = "linearGradient", this.attributesToInherit.push("x1", "y1", "x2", "y2");
  }
}
class Vs extends ri {
  getGradient(e, t) {
    const n = this.getGradientUnits() === "objectBoundingBox", s = t.getBoundingBox(e);
    if (n && !s)
      return null;
    this.getAttribute("cx").hasValue() || this.getAttribute("cx", !0).setValue("50%"), this.getAttribute("cy").hasValue() || this.getAttribute("cy", !0).setValue("50%"), this.getAttribute("r").hasValue() || this.getAttribute("r", !0).setValue("50%");
    const r = n ? s.x + s.width * this.getAttribute("cx").getNumber() : this.getAttribute("cx").getPixels("x"), o = n ? s.y + s.height * this.getAttribute("cy").getNumber() : this.getAttribute("cy").getPixels("y");
    let a = r, l = o;
    this.getAttribute("fx").hasValue() && (a = n ? s.x + s.width * this.getAttribute("fx").getNumber() : this.getAttribute("fx").getPixels("x")), this.getAttribute("fy").hasValue() && (l = n ? s.y + s.height * this.getAttribute("fy").getNumber() : this.getAttribute("fy").getPixels("y"));
    const c = n ? (s.width + s.height) / 2 * this.getAttribute("r").getNumber() : this.getAttribute("r").getPixels(), u = this.getAttribute("fr").getPixels();
    return e.createRadialGradient(a, l, u, r, o, c);
  }
  constructor(e, t, n) {
    super(e, t, n), this.type = "radialGradient", this.attributesToInherit.push("cx", "cy", "r", "fx", "fy", "fr");
  }
}
class Rs extends R {
  constructor(e, t, n) {
    super(e, t, n), this.type = "stop";
    const s = Math.max(0, Math.min(1, this.getAttribute("offset").getNumber())), r = this.getStyle("stop-opacity");
    let o = this.getStyle("stop-color", !0);
    o.getString() === "" && o.setValue("#000"), r.hasValue() && (o = o.addOpacity(r)), this.offset = s, this.color = o.getColor();
  }
}
class tn extends R {
  getProperty() {
    const e = this.getAttribute("attributeType").getString(), t = this.getAttribute("attributeName").getString();
    return e === "CSS" ? this.parent.getStyle(t, !0) : this.parent.getAttribute(t, !0);
  }
  calcValue() {
    const { initialUnits: e } = this, { progress: t, from: n, to: s } = this.getProgress();
    let r = n.getNumber() + (s.getNumber() - n.getNumber()) * t;
    return e === "%" && (r *= 100), "".concat(r).concat(e);
  }
  update(e) {
    const { parent: t } = this, n = this.getProperty();
    if (this.initialValue || (this.initialValue = n.getString(), this.initialUnits = n.getUnits()), this.duration > this.maxDuration) {
      const r = this.getAttribute("fill").getString("remove");
      if (this.getAttribute("repeatCount").getString() === "indefinite" || this.getAttribute("repeatDur").getString() === "indefinite")
        this.duration = 0;
      else if (r === "freeze" && !this.frozen)
        this.frozen = !0, t && n && (t.animationFrozen = !0, t.animationFrozenValue = n.getString());
      else if (r === "remove" && !this.removed)
        return this.removed = !0, t && n && n.setValue(t.animationFrozen ? t.animationFrozenValue : this.initialValue), !0;
      return !1;
    }
    this.duration += e;
    let s = !1;
    if (this.begin < this.duration) {
      let r = this.calcValue();
      const o = this.getAttribute("type");
      if (o.hasValue()) {
        const a = o.getString();
        r = "".concat(a, "(").concat(r, ")");
      }
      n.setValue(r), s = !0;
    }
    return s;
  }
  getProgress() {
    const { document: e, values: t } = this;
    let n = (this.duration - this.begin) / (this.maxDuration - this.begin), s, r;
    if (t.hasValue()) {
      const o = n * (t.getValue().length - 1), a = Math.floor(o), l = Math.ceil(o);
      let c;
      c = t.getValue()[a], s = new T(e, "from", c ? parseFloat(c) : 0), c = t.getValue()[l], r = new T(e, "to", c ? parseFloat(c) : 0), n = (o - a) / (l - a);
    } else
      s = this.from, r = this.to;
    return {
      progress: n,
      from: s,
      to: r
    };
  }
  constructor(e, t, n) {
    super(e, t, n), this.type = "animate", this.duration = 0, this.initialUnits = "", this.removed = !1, this.frozen = !1, e.screen.animations.push(this), this.begin = this.getAttribute("begin").getMilliseconds(), this.maxDuration = this.begin + this.getAttribute("dur").getMilliseconds(), this.from = this.getAttribute("from"), this.to = this.getAttribute("to"), this.values = new T(e, "values", null);
    const s = this.getAttribute("values");
    s.hasValue() && this.values.setValue(s.getString().split(";"));
  }
}
class Zs extends tn {
  calcValue() {
    const { progress: e, from: t, to: n } = this.getProgress(), s = new Jt(t.getColor()), r = new Jt(n.getColor());
    if (s.ok && r.ok) {
      const o = s.r + (r.r - s.r) * e, a = s.g + (r.g - s.g) * e, l = s.b + (r.b - s.b) * e;
      return "rgb(".concat(Math.floor(o), ", ").concat(Math.floor(a), ", ").concat(Math.floor(l), ")");
    }
    return this.getAttribute("from").getColor();
  }
  constructor(...e) {
    super(...e), this.type = "animateColor";
  }
}
class Fs extends tn {
  calcValue() {
    const { progress: e, from: t, to: n } = this.getProgress(), s = $(t.getString()), r = $(n.getString());
    return s.map((a, l) => {
      const c = r[l];
      return a + (c - a) * e;
    }).join(" ");
  }
  constructor(...e) {
    super(...e), this.type = "animateTransform";
  }
}
class oi extends R {
  constructor(e, t, n) {
    super(e, t, n), this.type = "font-face", this.ascent = this.getAttribute("ascent").getNumber(), this.descent = this.getAttribute("descent").getNumber(), this.unitsPerEm = this.getAttribute("units-per-em").getNumber();
  }
}
class nn extends C {
  constructor(e, t, n) {
    super(e, t, n), this.type = "glyph", this.horizAdvX = this.getAttribute("horiz-adv-x").getNumber(), this.unicode = this.getAttribute("unicode").getString(), this.arabicForm = this.getAttribute("arabic-form").getString();
  }
}
class ai extends nn {
  constructor(...e) {
    super(...e), this.type = "missing-glyph", this.horizAdvX = 0;
  }
}
class qs extends R {
  render() {
  }
  constructor(e, t, n) {
    super(e, t, n), this.type = "font", this.isArabic = !1, this.glyphs = {}, this.arabicGlyphs = {}, this.isRTL = !1, this.horizAdvX = this.getAttribute("horiz-adv-x").getNumber();
    const { definitions: s } = e, { children: r } = this;
    for (const o of r)
      if (o instanceof oi) {
        this.fontFace = o;
        const a = o.getStyle("font-family");
        a.hasValue() && (s[a.getString()] = this);
      } else if (o instanceof ai)
        this.missingGlyph = o;
      else if (o instanceof nn)
        if (o.arabicForm) {
          this.isRTL = !0, this.isArabic = !0;
          const a = this.arabicGlyphs[o.unicode];
          typeof a > "u" ? this.arabicGlyphs[o.unicode] = {
            [o.arabicForm]: o
          } : a[o.arabicForm] = o;
        } else
          this.glyphs[o.unicode] = o;
  }
}
class Is extends Le {
  getText() {
    const e = this.getHrefAttribute().getDefinition();
    if (e) {
      const t = e.children[0];
      if (t)
        return t.getText();
    }
    return "";
  }
  constructor(...e) {
    super(...e), this.type = "tref";
  }
}
class Ws extends Le {
  getText() {
    return this.text;
  }
  renderChildren(e) {
    if (this.hasText) {
      super.renderChildren(e);
      const { document: t, x: n, y: s } = this, { mouse: r } = t.screen, o = new T(t, "fontSize", J.parse(t.ctx.font).fontSize);
      r.isWorking() && r.checkBoundingBox(this, new ue(n, s - o.getPixels("y"), n + this.measureText(e), s));
    } else if (this.children.length > 0) {
      const t = new en(this.document);
      t.children = this.children, t.parent = this, t.render(e);
    }
  }
  onClick() {
    const { window: e } = this.document;
    e && e.open(this.getHrefAttribute().getString());
  }
  onMouseMove() {
    const e = this.document.ctx;
    e.canvas.style.cursor = "pointer";
  }
  constructor(e, t, n) {
    super(e, t, n), this.type = "a";
    const { childNodes: s } = t, r = s[0], o = s.length > 0 && Array.from(s).every(
      (a) => a.nodeType === 3
    );
    this.hasText = o, this.text = o ? this.getTextFromNode(r) : "";
  }
}
class Ys extends Le {
  getText() {
    return this.text;
  }
  path(e) {
    const { dataArray: t } = this;
    e && e.beginPath(), t.forEach((n) => {
      let { type: s, points: r } = n;
      switch (s) {
        case X.LINE_TO:
          e && e.lineTo(r[0], r[1]);
          break;
        case X.MOVE_TO:
          e && e.moveTo(r[0], r[1]);
          break;
        case X.CURVE_TO:
          e && e.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5]);
          break;
        case X.QUAD_TO:
          e && e.quadraticCurveTo(r[0], r[1], r[2], r[3]);
          break;
        case X.ARC: {
          const [o, a, l, c, u, d, f, h] = r, g = l > c ? l : c, p = l > c ? 1 : l / c, v = l > c ? c / l : 1;
          e && (e.translate(o, a), e.rotate(f), e.scale(p, v), e.arc(0, 0, g, u, u + d, Boolean(1 - h)), e.scale(1 / p, 1 / v), e.rotate(-f), e.translate(-o, -a));
          break;
        }
        case X.CLOSE_PATH:
          e && e.closePath();
          break;
      }
    });
  }
  renderChildren(e) {
    this.setTextData(e), e.save();
    const t = this.parent.getStyle("text-decoration").getString(), n = this.getFontSize(), { glyphInfo: s } = this, r = e.fillStyle;
    t === "underline" && e.beginPath(), s.forEach((o, a) => {
      const { p0: l, p1: c, rotation: u, text: d } = o;
      e.save(), e.translate(l.x, l.y), e.rotate(u), e.fillStyle && e.fillText(d, 0, 0), e.strokeStyle && e.strokeText(d, 0, 0), e.restore(), t === "underline" && (a === 0 && e.moveTo(l.x, l.y + n / 8), e.lineTo(c.x, c.y + n / 5));
    }), t === "underline" && (e.lineWidth = n / 20, e.strokeStyle = r, e.stroke(), e.closePath()), e.restore();
  }
  getLetterSpacingAt() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
    return this.letterSpacingCache[e] || 0;
  }
  findSegmentToFitChar(e, t, n, s, r, o, a, l, c) {
    let u = o, d = this.measureText(e, l);
    l === " " && t === "justify" && n < s && (d += (s - n) / r), c > -1 && (u += this.getLetterSpacingAt(c));
    const f = this.textHeight / 20, h = this.getEquidistantPointOnPath(u, f, 0), g = this.getEquidistantPointOnPath(u + d, f, 0), p = {
      p0: h,
      p1: g
    }, v = h && g ? Math.atan2(g.y - h.y, g.x - h.x) : 0;
    if (a) {
      const w = Math.cos(Math.PI / 2 + v) * a, x = Math.cos(-v) * a;
      p.p0 = {
        ...h,
        x: h.x + w,
        y: h.y + x
      }, p.p1 = {
        ...g,
        x: g.x + w,
        y: g.y + x
      };
    }
    return u += d, {
      offset: u,
      segment: p,
      rotation: v
    };
  }
  measureText(e, t) {
    const { measuresCache: n } = this, s = t || this.getText();
    if (n.has(s))
      return n.get(s);
    const r = this.measureTargetText(e, s);
    return n.set(s, r), r;
  }
  setTextData(e) {
    if (this.glyphInfo)
      return;
    const t = this.getText(), n = t.split(""), s = t.split(" ").length - 1, r = this.parent.getAttribute("dx").split().map(
      (m) => m.getPixels("x")
    ), o = this.parent.getAttribute("dy").getPixels("y"), a = this.parent.getStyle("text-anchor").getString("start"), l = this.getStyle("letter-spacing"), c = this.parent.getStyle("letter-spacing");
    let u = 0;
    !l.hasValue() || l.getValue() === "inherit" ? u = c.getPixels() : l.hasValue() && l.getValue() !== "initial" && l.getValue() !== "unset" && (u = l.getPixels());
    const d = [], f = t.length;
    this.letterSpacingCache = d;
    for (let m = 0; m < f; m++)
      d.push(typeof r[m] < "u" ? r[m] : u);
    const h = d.reduce(
      (m, P, H) => H === 0 ? 0 : m + P || 0,
      0
    ), g = this.measureText(e), p = Math.max(g + h, 0);
    this.textWidth = g, this.textHeight = this.getFontSize(), this.glyphInfo = [];
    const v = this.getPathLength(), w = this.getStyle("startOffset").getNumber(0) * v;
    let x = 0;
    (a === "middle" || a === "center") && (x = -p / 2), (a === "end" || a === "right") && (x = -p), x += w, n.forEach((m, P) => {
      const { offset: H, segment: A, rotation: D } = this.findSegmentToFitChar(e, a, p, v, s, x, o, m, P);
      x = H, !(!A.p0 || !A.p1) && this.glyphInfo.push({
        text: n[P],
        p0: A.p0,
        p1: A.p1,
        rotation: D
      });
    });
  }
  parsePathData(e) {
    if (this.pathLength = -1, !e)
      return [];
    const t = [], { pathParser: n } = e;
    for (n.reset(); !n.isEnd(); ) {
      const { current: s } = n, r = s ? s.x : 0, o = s ? s.y : 0, a = n.next();
      let l = a.type, c = [];
      switch (a.type) {
        case X.MOVE_TO:
          this.pathM(n, c);
          break;
        case X.LINE_TO:
          l = this.pathL(n, c);
          break;
        case X.HORIZ_LINE_TO:
          l = this.pathH(n, c);
          break;
        case X.VERT_LINE_TO:
          l = this.pathV(n, c);
          break;
        case X.CURVE_TO:
          this.pathC(n, c);
          break;
        case X.SMOOTH_CURVE_TO:
          l = this.pathS(n, c);
          break;
        case X.QUAD_TO:
          this.pathQ(n, c);
          break;
        case X.SMOOTH_QUAD_TO:
          l = this.pathT(n, c);
          break;
        case X.ARC:
          c = this.pathA(n);
          break;
        case X.CLOSE_PATH:
          C.pathZ(n);
          break;
      }
      a.type !== X.CLOSE_PATH ? t.push({
        type: l,
        points: c,
        start: {
          x: r,
          y: o
        },
        pathLength: this.calcLength(r, o, l, c)
      }) : t.push({
        type: X.CLOSE_PATH,
        points: [],
        pathLength: 0
      });
    }
    return t;
  }
  pathM(e, t) {
    const { x: n, y: s } = C.pathM(e).point;
    t.push(n, s);
  }
  pathL(e, t) {
    const { x: n, y: s } = C.pathL(e).point;
    return t.push(n, s), X.LINE_TO;
  }
  pathH(e, t) {
    const { x: n, y: s } = C.pathH(e).point;
    return t.push(n, s), X.LINE_TO;
  }
  pathV(e, t) {
    const { x: n, y: s } = C.pathV(e).point;
    return t.push(n, s), X.LINE_TO;
  }
  pathC(e, t) {
    const { point: n, controlPoint: s, currentPoint: r } = C.pathC(e);
    t.push(n.x, n.y, s.x, s.y, r.x, r.y);
  }
  pathS(e, t) {
    const { point: n, controlPoint: s, currentPoint: r } = C.pathS(e);
    return t.push(n.x, n.y, s.x, s.y, r.x, r.y), X.CURVE_TO;
  }
  pathQ(e, t) {
    const { controlPoint: n, currentPoint: s } = C.pathQ(e);
    t.push(n.x, n.y, s.x, s.y);
  }
  pathT(e, t) {
    const { controlPoint: n, currentPoint: s } = C.pathT(e);
    return t.push(n.x, n.y, s.x, s.y), X.QUAD_TO;
  }
  pathA(e) {
    let { rX: t, rY: n, sweepFlag: s, xAxisRotation: r, centp: o, a1: a, ad: l } = C.pathA(e);
    return s === 0 && l > 0 && (l -= 2 * Math.PI), s === 1 && l < 0 && (l += 2 * Math.PI), [
      o.x,
      o.y,
      t,
      n,
      a,
      l,
      r,
      s
    ];
  }
  calcLength(e, t, n, s) {
    let r = 0, o = null, a = null, l = 0;
    switch (n) {
      case X.LINE_TO:
        return this.getLineLength(e, t, s[0], s[1]);
      case X.CURVE_TO:
        for (r = 0, o = this.getPointOnCubicBezier(0, e, t, s[0], s[1], s[2], s[3], s[4], s[5]), l = 0.01; l <= 1; l += 0.01)
          a = this.getPointOnCubicBezier(l, e, t, s[0], s[1], s[2], s[3], s[4], s[5]), r += this.getLineLength(o.x, o.y, a.x, a.y), o = a;
        return r;
      case X.QUAD_TO:
        for (r = 0, o = this.getPointOnQuadraticBezier(0, e, t, s[0], s[1], s[2], s[3]), l = 0.01; l <= 1; l += 0.01)
          a = this.getPointOnQuadraticBezier(l, e, t, s[0], s[1], s[2], s[3]), r += this.getLineLength(o.x, o.y, a.x, a.y), o = a;
        return r;
      case X.ARC: {
        r = 0;
        const c = s[4], u = s[5], d = s[4] + u;
        let f = Math.PI / 180;
        if (Math.abs(c - d) < f && (f = Math.abs(c - d)), o = this.getPointOnEllipticalArc(s[0], s[1], s[2], s[3], c, 0), u < 0)
          for (l = c - f; l > d; l -= f)
            a = this.getPointOnEllipticalArc(s[0], s[1], s[2], s[3], l, 0), r += this.getLineLength(o.x, o.y, a.x, a.y), o = a;
        else
          for (l = c + f; l < d; l += f)
            a = this.getPointOnEllipticalArc(s[0], s[1], s[2], s[3], l, 0), r += this.getLineLength(o.x, o.y, a.x, a.y), o = a;
        return a = this.getPointOnEllipticalArc(s[0], s[1], s[2], s[3], d, 0), r += this.getLineLength(o.x, o.y, a.x, a.y), r;
      }
    }
    return 0;
  }
  getPointOnLine(e, t, n, s, r) {
    let o = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : t, a = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : n;
    const l = (r - n) / (s - t + Ye);
    let c = Math.sqrt(e * e / (1 + l * l));
    s < t && (c *= -1);
    let u = l * c, d = null;
    if (s === t)
      d = {
        x: o,
        y: a + u
      };
    else if ((a - n) / (o - t + Ye) === l)
      d = {
        x: o + c,
        y: a + u
      };
    else {
      let f = 0, h = 0;
      const g = this.getLineLength(t, n, s, r);
      if (g < Ye)
        return null;
      let p = (o - t) * (s - t) + (a - n) * (r - n);
      p /= g * g, f = t + p * (s - t), h = n + p * (r - n);
      const v = this.getLineLength(o, a, f, h), w = Math.sqrt(e * e - v * v);
      c = Math.sqrt(w * w / (1 + l * l)), s < t && (c *= -1), u = l * c, d = {
        x: f + c,
        y: h + u
      };
    }
    return d;
  }
  getPointOnPath(e) {
    const t = this.getPathLength();
    let n = 0, s = null;
    if (e < -5e-5 || e - 5e-5 > t)
      return null;
    const { dataArray: r } = this;
    for (const o of r) {
      if (o && (o.pathLength < 5e-5 || n + o.pathLength + 5e-5 < e)) {
        n += o.pathLength;
        continue;
      }
      const a = e - n;
      let l = 0;
      switch (o.type) {
        case X.LINE_TO:
          s = this.getPointOnLine(a, o.start.x, o.start.y, o.points[0], o.points[1], o.start.x, o.start.y);
          break;
        case X.ARC: {
          const c = o.points[4], u = o.points[5], d = o.points[4] + u;
          if (l = c + a / o.pathLength * u, u < 0 && l < d || u >= 0 && l > d)
            break;
          s = this.getPointOnEllipticalArc(o.points[0], o.points[1], o.points[2], o.points[3], l, o.points[6]);
          break;
        }
        case X.CURVE_TO:
          l = a / o.pathLength, l > 1 && (l = 1), s = this.getPointOnCubicBezier(l, o.start.x, o.start.y, o.points[0], o.points[1], o.points[2], o.points[3], o.points[4], o.points[5]);
          break;
        case X.QUAD_TO:
          l = a / o.pathLength, l > 1 && (l = 1), s = this.getPointOnQuadraticBezier(l, o.start.x, o.start.y, o.points[0], o.points[1], o.points[2], o.points[3]);
          break;
      }
      if (s)
        return s;
      break;
    }
    return null;
  }
  getLineLength(e, t, n, s) {
    return Math.sqrt((n - e) * (n - e) + (s - t) * (s - t));
  }
  getPathLength() {
    return this.pathLength === -1 && (this.pathLength = this.dataArray.reduce(
      (e, t) => t.pathLength > 0 ? e + t.pathLength : e,
      0
    )), this.pathLength;
  }
  getPointOnCubicBezier(e, t, n, s, r, o, a, l, c) {
    const u = l * Xn(e) + o * Nn(e) + s * Mn(e) + t * Bn(e), d = c * Xn(e) + a * Nn(e) + r * Mn(e) + n * Bn(e);
    return {
      x: u,
      y: d
    };
  }
  getPointOnQuadraticBezier(e, t, n, s, r, o, a) {
    const l = o * Cn(e) + s * Sn(e) + t * jn(e), c = a * Cn(e) + r * Sn(e) + n * jn(e);
    return {
      x: l,
      y: c
    };
  }
  getPointOnEllipticalArc(e, t, n, s, r, o) {
    const a = Math.cos(o), l = Math.sin(o), c = {
      x: n * Math.cos(r),
      y: s * Math.sin(r)
    };
    return {
      x: e + (c.x * a - c.y * l),
      y: t + (c.x * l + c.y * a)
    };
  }
  buildEquidistantCache(e, t) {
    const n = this.getPathLength(), s = t || 0.25, r = e || n / 100;
    if (!this.equidistantCache || this.equidistantCache.step !== r || this.equidistantCache.precision !== s) {
      this.equidistantCache = {
        step: r,
        precision: s,
        points: []
      };
      let o = 0;
      for (let a = 0; a <= n; a += s) {
        const l = this.getPointOnPath(a), c = this.getPointOnPath(a + s);
        !l || !c || (o += this.getLineLength(l.x, l.y, c.x, c.y), o >= r && (this.equidistantCache.points.push({
          x: l.x,
          y: l.y,
          distance: a
        }), o -= r));
      }
    }
  }
  getEquidistantPointOnPath(e, t, n) {
    if (this.buildEquidistantCache(t, n), e < 0 || e - this.getPathLength() > 5e-5)
      return null;
    const s = Math.round(e / this.getPathLength() * (this.equidistantCache.points.length - 1));
    return this.equidistantCache.points[s] || null;
  }
  constructor(e, t, n) {
    super(e, t, n), this.type = "textPath", this.textWidth = 0, this.textHeight = 0, this.pathLength = -1, this.glyphInfo = null, this.letterSpacingCache = [], this.measuresCache = /* @__PURE__ */ new Map([
      [
        "",
        0
      ]
    ]);
    const s = this.getHrefAttribute().getDefinition();
    this.text = this.getTextFromNode(), this.dataArray = this.parsePathData(s);
  }
}
const Gs = /^\s*data:(([^/,;]+\/[^/,;]+)(?:;([^,;=]+=[^,;=]+))?)?(?:;(base64))?,(.*)$/i;
class Us extends Ve {
  async loadImage(e) {
    try {
      const t = await this.document.createImage(e);
      this.image = t;
    } catch (t) {
      console.error('Error while loading image "'.concat(e, '":'), t);
    }
    this.loaded = !0;
  }
  async loadSvg(e) {
    const t = Gs.exec(e);
    if (t) {
      const n = t[5];
      n && (t[4] === "base64" ? this.image = atob(n) : this.image = decodeURIComponent(n));
    } else
      try {
        const s = await (await this.document.fetch(e)).text();
        this.image = s;
      } catch (n) {
        console.error('Error while loading image "'.concat(e, '":'), n);
      }
    this.loaded = !0;
  }
  renderChildren(e) {
    const { document: t, image: n, loaded: s } = this, r = this.getAttribute("x").getPixels("x"), o = this.getAttribute("y").getPixels("y"), a = this.getStyle("width").getPixels("x"), l = this.getStyle("height").getPixels("y");
    if (!(!s || !n || !a || !l)) {
      if (e.save(), e.translate(r, o), typeof n == "string") {
        const c = t.canvg.forkString(e, n, {
          ignoreMouse: !0,
          ignoreAnimation: !0,
          ignoreDimensions: !0,
          ignoreClear: !0,
          offsetX: 0,
          offsetY: 0,
          scaleWidth: a,
          scaleHeight: l
        }), { documentElement: u } = c.document;
        u && (u.parent = this), c.render();
      } else
        t.setViewBox({
          ctx: e,
          aspectRatio: this.getAttribute("preserveAspectRatio").getString(),
          width: a,
          desiredWidth: n.width,
          height: l,
          desiredHeight: n.height
        }), this.loaded && (!("complete" in n) || n.complete) && e.drawImage(n, 0, 0);
      e.restore();
    }
  }
  getBoundingBox() {
    const e = this.getAttribute("x").getPixels("x"), t = this.getAttribute("y").getPixels("y"), n = this.getStyle("width").getPixels("x"), s = this.getStyle("height").getPixels("y");
    return new ue(e, t, e + n, t + s);
  }
  constructor(e, t, n) {
    super(e, t, n), this.type = "image", this.loaded = !1;
    const s = this.getHrefAttribute().getString();
    if (!s)
      return;
    const r = s.endsWith(".svg") || /^\s*data:image\/svg\+xml/i.test(s);
    e.images.push(this), r ? this.loadSvg(s) : this.loadImage(s);
  }
}
class Js extends Ve {
  render(e) {
  }
  constructor(...e) {
    super(...e), this.type = "symbol";
  }
}
class Ks {
  async load(e, t) {
    try {
      const { document: n } = this, r = (await n.canvg.parser.load(t)).getElementsByTagName("font");
      Array.from(r).forEach((o) => {
        const a = n.createElement(o);
        n.definitions[e] = a;
      });
    } catch (n) {
      console.error('Error while loading font "'.concat(t, '":'), n);
    }
    this.loaded = !0;
  }
  constructor(e) {
    this.document = e, this.loaded = !1, e.fonts.push(this);
  }
}
class li extends R {
  constructor(e, t, n) {
    super(e, t, n), this.type = "style", Ke(
      Array.from(t.childNodes).map(
        (o) => o.textContent
      ).join("").replace(/(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(^[\s]*\/\/.*)/gm, "").replace(/@import.*;/g, "")
    ).split("}").forEach((o) => {
      const a = o.trim();
      if (!a)
        return;
      const l = a.split("{"), c = l[0].split(","), u = l[1].split(";");
      c.forEach((d) => {
        const f = d.trim();
        if (!f)
          return;
        const h = e.styles[f] || {};
        if (u.forEach((g) => {
          const p = g.indexOf(":"), v = g.substr(0, p).trim(), w = g.substr(p + 1, g.length - p).trim();
          v && w && (h[v] = new T(e, v, w));
        }), e.styles[f] = h, e.stylesSpecificity[f] = gs(f), f === "@font-face") {
          const g = h["font-family"].getString().replace(/"|'/g, "");
          h.src.getString().split(",").forEach((v) => {
            if (v.indexOf('format("svg")') > 0) {
              const w = _n(v);
              w && new Ks(e).load(g, w);
            }
          });
        }
      });
    });
  }
}
li.parseExternalUrl = _n;
class Qs extends Ve {
  setContext(e) {
    super.setContext(e);
    const t = this.getAttribute("x"), n = this.getAttribute("y");
    t.hasValue() && e.translate(t.getPixels("x"), 0), n.hasValue() && e.translate(0, n.getPixels("y"));
  }
  path(e) {
    const { element: t } = this;
    t && t.path(e);
  }
  renderChildren(e) {
    const { document: t, element: n } = this;
    if (n) {
      let s = n;
      if (n.type === "symbol" && (s = new at(t), s.attributes.viewBox = new T(t, "viewBox", n.getAttribute("viewBox").getString()), s.attributes.preserveAspectRatio = new T(t, "preserveAspectRatio", n.getAttribute("preserveAspectRatio").getString()), s.attributes.overflow = new T(t, "overflow", n.getAttribute("overflow").getString()), s.children = n.children, n.styles.opacity = new T(t, "opacity", this.calculateOpacity())), s.type === "svg") {
        const o = this.getStyle("width", !1, !0), a = this.getStyle("height", !1, !0);
        o.hasValue() && (s.attributes.width = new T(t, "width", o.getString())), a.hasValue() && (s.attributes.height = new T(t, "height", a.getString()));
      }
      const r = s.parent;
      s.parent = this, s.render(e), s.parent = r;
    }
  }
  getBoundingBox(e) {
    const { element: t } = this;
    return t ? t.getBoundingBox(e) : null;
  }
  elementTransform() {
    const { document: e, element: t } = this;
    return t ? Ee.fromElement(e, t) : null;
  }
  get element() {
    return this.cachedElement || (this.cachedElement = this.getHrefAttribute().getDefinition()), this.cachedElement;
  }
  constructor(...e) {
    super(...e), this.type = "use";
  }
}
function yt(i, e, t, n, s, r) {
  return i[t * n * 4 + e * 4 + r];
}
function Pt(i, e, t, n, s, r, o) {
  i[t * n * 4 + e * 4 + r] = o;
}
function q(i, e, t) {
  return i[e] * t;
}
function ge(i, e, t, n) {
  return e + Math.cos(i) * t + Math.sin(i) * n;
}
class ci extends R {
  apply(e, t, n, s, r) {
    const { includeOpacity: o, matrix: a } = this, l = e.getImageData(0, 0, s, r);
    for (let c = 0; c < r; c++)
      for (let u = 0; u < s; u++) {
        const d = yt(l.data, u, c, s, r, 0), f = yt(l.data, u, c, s, r, 1), h = yt(l.data, u, c, s, r, 2), g = yt(l.data, u, c, s, r, 3);
        let p = q(a, 0, d) + q(a, 1, f) + q(a, 2, h) + q(a, 3, g) + q(a, 4, 1), v = q(a, 5, d) + q(a, 6, f) + q(a, 7, h) + q(a, 8, g) + q(a, 9, 1), w = q(a, 10, d) + q(a, 11, f) + q(a, 12, h) + q(a, 13, g) + q(a, 14, 1), x = q(a, 15, d) + q(a, 16, f) + q(a, 17, h) + q(a, 18, g) + q(a, 19, 1);
        o && (p = 0, v = 0, w = 0, x *= g / 255), Pt(l.data, u, c, s, r, 0, p), Pt(l.data, u, c, s, r, 1, v), Pt(l.data, u, c, s, r, 2, w), Pt(l.data, u, c, s, r, 3, x);
      }
    e.clearRect(0, 0, s, r), e.putImageData(l, 0, 0);
  }
  constructor(e, t, n) {
    super(e, t, n), this.type = "feColorMatrix";
    let s = $(this.getAttribute("values").getString());
    switch (this.getAttribute("type").getString("matrix")) {
      case "saturate": {
        const r = s[0];
        s = [
          0.213 + 0.787 * r,
          0.715 - 0.715 * r,
          0.072 - 0.072 * r,
          0,
          0,
          0.213 - 0.213 * r,
          0.715 + 0.285 * r,
          0.072 - 0.072 * r,
          0,
          0,
          0.213 - 0.213 * r,
          0.715 - 0.715 * r,
          0.072 + 0.928 * r,
          0,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          0,
          1
        ];
        break;
      }
      case "hueRotate": {
        const r = s[0] * Math.PI / 180;
        s = [
          ge(r, 0.213, 0.787, -0.213),
          ge(r, 0.715, -0.715, -0.715),
          ge(r, 0.072, -0.072, 0.928),
          0,
          0,
          ge(r, 0.213, -0.213, 0.143),
          ge(r, 0.715, 0.285, 0.14),
          ge(r, 0.072, -0.072, -0.283),
          0,
          0,
          ge(r, 0.213, -0.213, -0.787),
          ge(r, 0.715, -0.715, 0.715),
          ge(r, 0.072, 0.928, 0.072),
          0,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          0,
          1
        ];
        break;
      }
      case "luminanceToAlpha":
        s = [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0.2125,
          0.7154,
          0.0721,
          0,
          0,
          0,
          0,
          0,
          0,
          1
        ];
        break;
    }
    this.matrix = s, this.includeOpacity = this.getAttribute("includeOpacity").hasValue();
  }
}
class zt extends R {
  apply(e, t) {
    const { document: n } = this;
    let s = this.getAttribute("x").getPixels("x"), r = this.getAttribute("y").getPixels("y"), o = this.getStyle("width").getPixels("x"), a = this.getStyle("height").getPixels("y");
    if (!o && !a) {
      const h = new ue();
      this.children.forEach((g) => {
        h.addBoundingBox(g.getBoundingBox(e));
      }), s = Math.floor(h.x1), r = Math.floor(h.y1), o = Math.floor(h.width), a = Math.floor(h.height);
    }
    const l = this.removeStyles(t, zt.ignoreStyles), c = n.createCanvas(s + o, r + a), u = c.getContext("2d");
    n.screen.setDefaults(u), this.renderChildren(u), new ci(n, {
      nodeType: 1,
      childNodes: [],
      attributes: [
        {
          nodeName: "type",
          value: "luminanceToAlpha"
        },
        {
          nodeName: "includeOpacity",
          value: "true"
        }
      ]
    }).apply(u, 0, 0, s + o, r + a);
    const d = n.createCanvas(s + o, r + a), f = d.getContext("2d");
    n.screen.setDefaults(f), t.render(f), f.globalCompositeOperation = "destination-in", f.fillStyle = u.createPattern(c, "no-repeat"), f.fillRect(0, 0, s + o, r + a), e.fillStyle = f.createPattern(d, "no-repeat"), e.fillRect(0, 0, s + o, r + a), this.restoreStyles(t, l);
  }
  render(e) {
  }
  constructor(...e) {
    super(...e), this.type = "mask";
  }
}
zt.ignoreStyles = [
  "mask",
  "transform",
  "clip-path"
];
const kn = () => {
};
class _s extends R {
  apply(e) {
    const { document: t } = this, n = Reflect.getPrototypeOf(e), { beginPath: s, closePath: r } = e;
    n && (n.beginPath = kn, n.closePath = kn), Reflect.apply(s, e, []), this.children.forEach((o) => {
      if (!("path" in o))
        return;
      let a = "elementTransform" in o ? o.elementTransform() : null;
      a || (a = Ee.fromElement(t, o)), a && a.apply(e), o.path(e), n && (n.closePath = r), a && a.unapply(e);
    }), Reflect.apply(r, e, []), e.clip(), n && (n.beginPath = s, n.closePath = r);
  }
  render(e) {
  }
  constructor(...e) {
    super(...e), this.type = "clipPath";
  }
}
class Lt extends R {
  apply(e, t) {
    const { document: n, children: s } = this, r = "getBoundingBox" in t ? t.getBoundingBox(e) : null;
    if (!r)
      return;
    let o = 0, a = 0;
    s.forEach((w) => {
      const x = w.extraFilterDistance || 0;
      o = Math.max(o, x), a = Math.max(a, x);
    });
    const l = Math.floor(r.width), c = Math.floor(r.height), u = l + 2 * o, d = c + 2 * a;
    if (u < 1 || d < 1)
      return;
    const f = Math.floor(r.x), h = Math.floor(r.y), g = this.removeStyles(t, Lt.ignoreStyles), p = n.createCanvas(u, d), v = p.getContext("2d");
    n.screen.setDefaults(v), v.translate(-f + o, -h + a), t.render(v), s.forEach((w) => {
      typeof w.apply == "function" && w.apply(v, 0, 0, u, d);
    }), e.drawImage(p, 0, 0, u, d, f - o, h - a, u, d), this.restoreStyles(t, g);
  }
  render(e) {
  }
  constructor(...e) {
    super(...e), this.type = "filter";
  }
}
Lt.ignoreStyles = [
  "filter",
  "transform",
  "clip-path"
];
class $s extends R {
  apply(e, t, n, s, r) {
  }
  constructor(e, t, n) {
    super(e, t, n), this.type = "feDropShadow", this.addStylesFromStyleDefinition();
  }
}
class er extends R {
  apply(e, t, n, s, r) {
  }
  constructor(...e) {
    super(...e), this.type = "feMorphology";
  }
}
class tr extends R {
  apply(e, t, n, s, r) {
  }
  constructor(...e) {
    super(...e), this.type = "feComposite";
  }
}
class nr extends R {
  apply(e, t, n, s, r) {
    const { document: o, blurRadius: a } = this, l = o.window ? o.window.document.body : null, c = e.canvas;
    c.id = o.getUniqueId(), l && (c.style.display = "none", l.appendChild(c)), $i(c, t, n, s, r, a), l && l.removeChild(c);
  }
  constructor(e, t, n) {
    super(e, t, n), this.type = "feGaussianBlur", this.blurRadius = Math.floor(this.getAttribute("stdDeviation").getNumber()), this.extraFilterDistance = this.blurRadius;
  }
}
class ir extends R {
  constructor(...e) {
    super(...e), this.type = "title";
  }
}
class sr extends R {
  constructor(...e) {
    super(...e), this.type = "desc";
  }
}
const rr = {
  svg: at,
  rect: ii,
  circle: Ns,
  ellipse: Ms,
  line: Bs,
  polyline: si,
  polygon: Cs,
  path: C,
  pattern: Ss,
  marker: js,
  defs: Es,
  linearGradient: ks,
  radialGradient: Vs,
  stop: Rs,
  animate: tn,
  animateColor: Zs,
  animateTransform: Fs,
  font: qs,
  "font-face": oi,
  "missing-glyph": ai,
  glyph: nn,
  text: Le,
  tspan: Dt,
  tref: Is,
  a: Ws,
  textPath: Ys,
  image: Us,
  g: en,
  symbol: Js,
  style: li,
  use: Qs,
  mask: zt,
  clipPath: _s,
  filter: Lt,
  feDropShadow: $s,
  feMorphology: er,
  feComposite: tr,
  feColorMatrix: ci,
  feGaussianBlur: nr,
  title: ir,
  desc: sr
};
function or(i, e) {
  const t = document.createElement("canvas");
  return t.width = i, t.height = e, t;
}
async function ar(i) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  const t = document.createElement("img");
  return e && (t.crossOrigin = "Anonymous"), new Promise((n, s) => {
    t.onload = () => {
      n(t);
    }, t.onerror = (r, o, a, l, c) => {
      s(c);
    }, t.src = i;
  });
}
const It = 12;
class ze {
  bindCreateImage(e, t) {
    return typeof t == "boolean" ? (n, s) => e(n, typeof s == "boolean" ? s : t) : e;
  }
  get window() {
    return this.screen.window;
  }
  get fetch() {
    return this.screen.fetch;
  }
  get ctx() {
    return this.screen.ctx;
  }
  get emSize() {
    const { emSizeStack: e } = this;
    return e[e.length - 1] || It;
  }
  set emSize(e) {
    const { emSizeStack: t } = this;
    t.push(e);
  }
  popEmSize() {
    const { emSizeStack: e } = this;
    e.pop();
  }
  getUniqueId() {
    return "canvg".concat(++this.uniqueId);
  }
  isImagesLoaded() {
    return this.images.every(
      (e) => e.loaded
    );
  }
  isFontsLoaded() {
    return this.fonts.every(
      (e) => e.loaded
    );
  }
  createDocumentElement(e) {
    const t = this.createElement(e.documentElement);
    return t.root = !0, t.addStylesFromStyleDefinition(), this.documentElement = t, t;
  }
  createElement(e) {
    const t = e.nodeName.replace(/^[^:]+:/, ""), n = ze.elementTypes[t];
    return n ? new n(this, e) : new Ds(this, e);
  }
  createTextNode(e) {
    return new Xs(this, e);
  }
  setViewBox(e) {
    this.screen.setViewBox({
      document: this,
      ...e
    });
  }
  constructor(e, { rootEmSize: t = It, emSize: n = It, createCanvas: s = ze.createCanvas, createImage: r = ze.createImage, anonymousCrossOrigin: o } = {}) {
    this.canvg = e, this.definitions = {}, this.styles = {}, this.stylesSpecificity = {}, this.images = [], this.fonts = [], this.emSizeStack = [], this.uniqueId = 0, this.screen = e.screen, this.rootEmSize = t, this.emSize = n, this.createCanvas = s, this.createImage = this.bindCreateImage(r, o), this.screen.wait(
      () => this.isImagesLoaded()
    ), this.screen.wait(
      () => this.isFontsLoaded()
    );
  }
}
ze.createCanvas = or;
ze.createImage = ar;
ze.elementTypes = rr;
class je {
  static async from(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const r = await new qt(n).parse(t);
    return new je(e, r, n);
  }
  static fromString(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const r = new qt(n).parseFromString(t);
    return new je(e, r, n);
  }
  fork(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return je.from(e, t, {
      ...this.options,
      ...n
    });
  }
  forkString(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return je.fromString(e, t, {
      ...this.options,
      ...n
    });
  }
  ready() {
    return this.screen.ready();
  }
  isReady() {
    return this.screen.isReady();
  }
  async render() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.start({
      enableRedraw: !0,
      ignoreAnimation: !0,
      ignoreMouse: !0,
      ...e
    }), await this.ready(), this.stop();
  }
  start() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const { documentElement: t, screen: n, options: s } = this;
    n.start(t, {
      enableRedraw: !0,
      ...s,
      ...e
    });
  }
  stop() {
    this.screen.stop();
  }
  resize(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
    this.documentElement.resize(e, t, n);
  }
  constructor(e, t, n = {}) {
    this.parser = new qt(n), this.screen = new Pe(e, n), this.options = n;
    const s = new ze(this, n), r = s.createDocumentElement(t);
    this.document = s, this.documentElement = r;
  }
}
let rt = document, ne = 1e4, Ae = 1e4, ie = 1e4, De = 1e4, le = 40, ui = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
function hi() {
  ne = 1e4, Ae = 1e4, ie = 1e4, De = 1e4, le = 40;
}
function sn() {
  hi();
  let i = rt.querySelectorAll(".mindbox > grp, root"), e = "";
  for (let r = 0; r < i.length; r++) {
    let o = i[r], a = o.getBoundingClientRect(), l = o.offsetTop, c = l + a.height, u = o.offsetLeft, d = u + a.width;
    l < ne && (ne = l), c > Ae && (Ae = c), u < ie && (ie = u), d > De && (De = d), e += fi(o);
  }
  e += ur();
  let t = Ae - ne + le * 2, n = De - ie + le * 2, s = cr(t, n);
  return e = `<rect x="0" y="0" width="${n}" height="${t}" fill="#f6f6f6"></rect>` + e, s.innerHTML = e, s;
}
function lr() {
  rt = this.container, hi();
  let i = rt.querySelectorAll(".mindbox > grp, root"), e = "";
  for (let s = 0; s < i.length; s++) {
    let r = i[s], o = r.getBoundingClientRect(), a = r.offsetTop, l = a + o.height, c = r.offsetLeft, u = c + o.width;
    a < ne && (ne = a), l > Ae && (Ae = l), c < ie && (ie = c), u > De && (De = u), e += fi(r);
  }
  let t = Ae - ne, n = De - ie;
  return console.log("maxTop:", ne, "maxBottom:", Ae, "maxLeft:", ie, "maxRight:", De), [t + 5, n + 5];
}
function cr(i, e) {
  let t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  return t.setAttribute("height", i), t.setAttribute("width", e), t.setAttribute("xmlns", "http://www.w3.org/2000/svg"), t.setAttribute("version", "1.2"), t.setAttribute("xlink", "http://www.w3.org/1999/xlink"), t;
}
function ur() {
  let i = document.querySelector("root"), e = document.querySelector("root > tpc"), t = e.getBoundingClientRect(), n = getComputedStyle(e), s = e.parentNode, r = 0, o = 0, a = document.querySelector("root > tpc").nodeObj, l = getComputedStyle(s), c = i.offsetTop - ne, u = i.offsetLeft - ie, d = o + parseInt(l.paddingLeft) + parseInt(t.paddingLeft), f = r + parseInt(l.paddingTop) + parseInt(t.paddingTop) + parseInt(t.fontSize);
  r + parseInt(l.paddingTop) + parseInt(t.paddingTop);
  let h = document.querySelector(".svg2nd"), g = "";
  if (a.tags && a.tags.length) {
    let m = e.querySelectorAll(".tags > span");
    for (let P = 0; P < m.length; P++) {
      let H = m[P], A = H.getBoundingClientRect();
      g += `<rect x="${d}" y="${f + 4}" rx="5px" ry="5px" width="${A.width}" height="${A.height}" style="fill: #d6f0f8;"></rect>
        <foreignObject x="${d}" y="${f + 4}" rx="5px" ry="5px" width="${A.width}" height="${A.height}" > 
          <div sytle="font-size:12px">${H.innerHTML}</div>
        </foreignObject>
      `;
    }
  }
  let p = "";
  if (a.icons && a.icons.length) {
    let m = e.querySelectorAll(".icons > span");
    for (let P = 0; P < m.length; P++) {
      let H = m[P];
      H.getBoundingClientRect(), p += `
      <tspan>${H.innerHTML}</tspan>`;
    }
  }
  let v = "";
  if (a.image && a.image.length) {
    let m = tpc.querySelectorAll(".image");
    for (let P = 0; P < m.length; P++) {
      let H = m[P];
      H.getBoundingClientRect(), v += `${di(H.outerHTML)}`;
    }
  }
  let w = `<g transform="translate(${le - ie}, ${le - ne})">${h.innerHTML}</g>`;
  w += `<g id="root" transform="translate(${u + le}, ${c + le})">
      <rect x="${o}" y="${r}" rx="5px" ry="5px" width="${t.width}" height="${t.height}" style="fill: #00aaff;"></rect>
      <foreignObject x="${o + 15}" y="${r + 10}" width="${n.width}" height="${n.height}">
        <div xmlns="http://www.w3.org/1999/xhtml" style="padding:0;margin:0;font-family:\u5FAE\u8F6F\u96C5\u9ED1;font-size:${n.fontSize};font-weight:${n.fontWeight};color:${n.color};word-break: break-all;line-height: 1">
        ${a.topic}
        ${p}
        ${v}
      </div>
      </foreignObject>
      ${g}
  </g>`;
  let x = rt.querySelector(".topiclinks");
  return x && (w += `<g transform="translate(${le - ie}, ${le - ne})">${x.innerHTML}</g>`), w;
}
function fi(i) {
  let e = i.querySelectorAll("tpc"), t = i.offsetTop - ne, n = i.offsetLeft - ie, s = "", r = i.querySelector(".svg3rd");
  s += `<g transform="translate(${n + le}, ${t + le})">`, s += r ? r.innerHTML : "";
  for (let o = 0; o < e.length; o++) {
    let a = e[o], l = a.parentNode, c = a.nodeObj;
    if (c.root)
      continue;
    let u = a.getBoundingClientRect(), d = l.offsetTop, f = l.offsetLeft, h = getComputedStyle(a), g = getComputedStyle(l), p = f + parseInt(g.paddingLeft) + parseInt(h.paddingLeft), v = d + parseInt(g.paddingTop) + parseInt(h.paddingTop) + parseInt(h.fontSize), w = d + parseInt(g.paddingTop) + parseInt(h.paddingTop), x = "";
    h.borderWidth != "0px" && (x = `<rect x="${f + 15}" y="${d}" rx="5px" ry="5px" width="${u.width}" height="${u.height}" style="fill: rgba(0,0,0,0); stroke:#444;stroke-width:1px;"></rect>`);
    let m = "";
    h.backgroundColor != "rgba(0, 0, 0, 0)" && (m = `<rect x="${f + 15}" y="${d}" rx="5px" ry="5px" width="${u.width}" height="${u.height}" style="fill: ${h.backgroundColor};"></rect>`);
    let P = "";
    if (c.tags && c.tags.length) {
      let D = a.querySelectorAll(".tags > span");
      for (let O = 0; O < D.length; O++) {
        let y = D[O], L = y.getBoundingClientRect();
        P += `<rect x="${p}" y="${v + 4}" rx="5px" ry="5px" width="${L.width}" height="${L.height}" style="fill: #d6f0f8;"></rect>
          <foreignObject x="${p}" y="${v + 4}" rx="5px" ry="5px" width="${L.width}" height="${L.height}" > 
            <div sytle="font-size:12px">${y.innerHTML}</div>
          </foreignObject>`;
      }
    }
    let H = "";
    if (c.icons && c.icons.length) {
      let D = a.querySelectorAll(".icons > span");
      for (let O = 0; O < D.length; O++) {
        let y = D[O];
        y.getBoundingClientRect(), H += `
        <tspan>${y.innerHTML}</tspan>`;
      }
    }
    let A = "";
    if (c.image && c.image.length) {
      let D = a.querySelectorAll(".image");
      for (let O = 0; O < D.length; O++) {
        let y = D[O];
        y.getBoundingClientRect(), A += `${di(y.outerHTML)}`;
      }
    }
    s += `<g id="${c.id}">
      ${x}
      ${m}
      <foreignObject  x="${p}" y="${w}" width="${h.width}" height="${h.height}">
      <div xmlns="http://www.w3.org/1999/xhtml" style="padding:0;margin:0;font-family:\u5FAE\u8F6F\u96C5\u9ED1;font-size:${h.fontSize};font-weight:${h.fontWeight};color:${h.color};word-break: break-all;line-height: 1">
        ${c.topic}
        ${H}
        ${A}
      </div>
      </foreignObject>
      ${P}
  </g>`;
  }
  return s += "</g>", s;
}
function di(i) {
  return !i.endsWith("/>") && i.startsWith("<img") && (i = i.replace(/>$/, "/>")), i.replace(
    /<img\s+([^>]+)\/?>/gi,
    (t, n) => {
      let s = "", r = "100%", o = "100%", a = "";
      return n.replace(
        /(\w+)\s*=\s*(['"]?)(.*?)\2/g,
        (l, c, u, d) => {
          switch (c = c.toLowerCase(), c) {
            case "src":
              s = d;
              break;
            case "width":
              r = d;
              break;
            case "height":
              o = d;
              break;
            case "alt":
              a = d;
              break;
          }
        }
      ), s ? `<foreignObject width="${r}" height="${o}">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <img src="${s}" alt="${a}" style="width: 100%; height: 100%; object-fit: contain;"/>
              </div>
            </foreignObject>` : t;
    }
  );
}
function hr(i) {
  return i.replace(new RegExp("<img\\s+([^>]+)(?<!\\/)>", "gi"), "<img $1/>");
}
let fr = function() {
  let i = sn(), e = hr(i.outerHTML), t = URL.createObjectURL(
    new Blob([ui + e.replace(/&nbsp;/g, " ")])
  ), n = document.createElement("a");
  n.href = t, n.download = "mindmap.svg", n.click();
}, dr = function(i = this, e = "default") {
  return rt = i.container, sn();
}, gr = async function() {
  let i = sn();
  const e = document.createElement("canvas");
  e.style.display = "none";
  const t = e.getContext("2d");
  (await je.fromString(
    t,
    ui + i.outerHTML.replace(/&nbsp;/g, " ")
  )).start();
  let s = e.toDataURL("image/png"), r = document.createElement("a");
  r.href = s, r.download = "mindmap.png", r.click();
};
function Ot(i) {
  return i.isFocusMode ? i.nodeDataBackup : i.nodeData;
}
const pr = function(i, e, t) {
  if (!!i) {
    if (console.time("selectNode"), typeof i == "string")
      return this.selectNode(G(i));
    if (this.ctrlRepeat ? (i.className === "selected" ? i.className = "" : i.className = "selected", console.log(this.currentSummaryNodeArr)) : (this.currentNode && (this.currentNode.className = ""), i.className = "selected"), this != null && this.widthControll) {
      const n = i.querySelector("widthControllRight");
      n.className = "width-controll-right";
      const s = i.querySelector("widthControllLeft");
      s.className = "width-controll-left";
    }
    this.currentNode = i, e ? this.bus.fire("selectNewNode", i.nodeObj, t) : this.bus.fire("selectNode", i.nodeObj, t), console.timeEnd("selectNode");
  }
}, vr = function() {
  if (this.currentNode && (this.currentNode.className = "", this.widthControll)) {
    const i = this.currentNode.querySelector("widthControllRight");
    i.className = "";
    const e = this.currentNode.querySelector("widthControllLeft");
    e.className = "";
  }
  this.currentNode = null, this.bus.fire("unselectNode");
}, mr = function() {
  if (!this.currentNode || this.currentNode.dataset.nodeid === "meroot")
    return;
  const i = this.currentNode.parentElement.parentElement.nextSibling;
  let e;
  const t = this.currentNode.parentElement.parentElement;
  if (t.className === "rhs" || t.className === "lhs") {
    const n = this.mindElixirBox.querySelectorAll("." + t.className), s = Array.from(n).indexOf(t);
    if (s + 1 < n.length)
      e = n[s + 1].firstChild.firstChild;
    else
      return !1;
  } else if (i)
    e = i.firstChild.firstChild;
  else
    return !1;
  return this.selectNode(e), !0;
}, yr = function() {
  if (!this.currentNode || this.currentNode.dataset.nodeid === "meroot")
    return;
  const i = this.currentNode.parentElement.parentElement.previousSibling;
  let e;
  const t = this.currentNode.parentElement.parentElement;
  if (t.className === "rhs" || t.className === "lhs") {
    const n = this.mindElixirBox.querySelectorAll("." + t.className), s = Array.from(n).indexOf(t);
    if (s - 1 >= 0)
      e = n[s - 1].firstChild.firstChild;
    else
      return !1;
  } else if (i)
    e = i.firstChild.firstChild;
  else
    return !1;
  return this.selectNode(e), !0;
}, Pr = function() {
  if (!this.currentNode)
    return;
  const i = this.currentNode.parentElement.nextSibling;
  if (i && i.firstChild) {
    const e = i.firstChild.firstChild.firstChild;
    this.selectNode(e);
  }
}, wr = function() {
  if (!this.currentNode || this.currentNode.dataset.nodeid === "meroot")
    return;
  const i = this.currentNode.parentElement.parentElement.parentElement.previousSibling;
  if (i) {
    const e = i.firstChild;
    this.selectNode(e);
  }
}, br = function() {
  const i = {
    direction: this.direction,
    nodeData: Ot(this),
    linkData: this.linkData
  };
  return JSON.stringify(i, (e, t) => {
    if (e !== "parent")
      return e === "from" || e === "to" ? t.nodeObj.id : t;
  });
}, xr = function() {
  const i = {
    direction: this.direction,
    nodeData: Ot(this),
    linkData: this.linkData
  };
  return JSON.parse(
    JSON.stringify(i, (e, t) => {
      if (e !== "parent")
        return e === "from" || e === "to" ? t.nodeObj.id : t;
    })
  );
};
function rn(i, e, t) {
  e < t ? i.expanded = !0 : i.expanded = !1;
  for (const n of i.children || [])
    rn(n, e + 1, t);
}
const Hr = function() {
  const i = Number(this.container.querySelector(".numberSelection").value) || 2, e = {
    direction: this.direction,
    nodeData: Ot(this),
    linkData: this.linkData,
    height: lr.call(this),
    expandDeep: i
  };
  return rn(e.nodeData, 0, i), JSON.parse(
    JSON.stringify(e, (t, n) => {
      if (t !== "parent")
        return t === "from" || t === "to" ? n.nodeObj.id : n;
    })
  );
}, Ar = function() {
  const i = Ot(this);
  let e = "# " + i.topic + `

`;
  function t(n, s) {
    for (let r = 0; r < n.length; r++)
      s <= 6 ? e += "".padStart(s, "#") + " " + n[r].topic + `

` : e += "".padStart(s - 7, "	") + "- " + n[r].topic + `
`, n[r].children && t(n[r].children, s + 1);
  }
  return t(i.children, 2), e;
}, Dr = function() {
  this.editable = !0;
}, zr = function() {
  this.editable = !1;
}, Lr = function(i) {
  this.scaleVal = i, this.map.style.transform = "scale(" + i + ")";
};
function Or(i) {
  return i.querySelector("root").offsetWidth || 150;
}
function Tr(i) {
  return i.querySelector("root").offsetHeight || 150;
}
function Xr(i, e) {
  var s, r;
  const t = ((s = i == null ? void 0 : i.getBoundingClientRect()) == null ? void 0 : s.top) || 0, n = ((r = e == null ? void 0 : e.getBoundingClientRect()) == null ? void 0 : r.top) || t;
  return Math.abs(t - n);
}
function Nr(i) {
  const e = i.querySelector("root"), t = i.querySelector(".map-canvas children grp");
  return Xr(e, t);
}
const Mr = function() {
  this.container.scrollTo(
    1e4 - this.container.offsetWidth / 2,
    1e4 - this.container.offsetHeight / 2
  );
}, Br = function() {
  var i;
  ((i = this.nodeData) == null ? void 0 : i.children.length) > 0 ? this.container.scrollTo(
    1e4 - Or(this.container) / 2 - 10,
    1e4 - Tr(this.container) / 2 - Nr(this.container) - 5
  ) : this.container.scrollTo(
    1e4 - this.container.offsetWidth / 2,
    1e4 - this.container.offsetHeight / 2
  );
}, Cr = function(i) {
  i.nodeObj.root || (this.tempDirection === null && (this.tempDirection = this.direction), this.isFocusMode || (this.nodeDataBackup = this.nodeData, this.isFocusMode = !0), this.nodeData = i.nodeObj, this.nodeData.root = !0, this.initRight());
}, Sr = function() {
  this.isFocusMode = !1, this.tempDirection !== null && (delete this.nodeData.root, this.nodeData = this.nodeDataBackup, this.direction = this.tempDirection, this.tempDirection = null, this.init());
}, jr = function() {
  this.direction = 0, this.init();
}, Er = function() {
  this.direction = 1, this.init();
}, kr = function() {
  this.direction = 2, this.init();
}, Vr = function(i) {
  this.locale = i, this.init();
}, Rr = function(i, e) {
  const t = i.nodeObj;
  typeof e == "boolean" ? t.expanded = e : t.expanded !== !1 ? t.expanded = !1 : (t.expanded = !0, on(t)), this.layout(), this.linkDiv(), this.bus.fire("expandNode", t);
}, Zr = function() {
  this.addParentLink(this.nodeData), this.layout(), this.linkDiv();
};
function on(i) {
  i.expanded = !0;
  for (const e of i.children || [])
    on(e);
}
const Ue = document, Fr = function(i) {
  if (!i.style)
    return;
  const e = G(i.id, this), t = {
    color: e.style.color && mn(e.style.color),
    background: e.style.background && mn(e.style.background),
    fontSize: e.style.fontSize && e.style.fontSize + "px",
    fontWeight: e.style.fontWeight
  };
  e.style.color = i.style.color, e.style.background = i.style.background, e.style.fontSize = i.style.fontSize + "px", e.style.fontWeight = i.style.fontWeight || "normal", this.linkDiv(), this.bus.fire("operation", {
    name: "editStyle",
    obj: i,
    origin: t
  });
}, qr = function(i, e) {
  if (!e)
    return;
  const t = i.tags;
  e.length === 0 ? delete i.tags : i.tags = e;
  const n = G(i.id);
  ke.call(this, n, i), this.linkDiv(), this.bus.fire("operation", {
    name: "editTags",
    obj: i,
    origin: t
  });
}, Ir = function(i, e) {
  if (e == null)
    return;
  const t = i.icons;
  e.length === 0 ? delete i.icons : i.icons = e;
  const n = G(i.id);
  ke.call(this, n, i), this.linkDiv(), this.bus.fire("operation", {
    name: "editIcons",
    obj: i,
    origin: t
  });
}, Wr = function(i, e) {
  var r, o, a;
  if (e == null || e == null)
    return;
  const t = i.hyperLink, n = e.split(",");
  i.linkJump = (r = i.linkJump) == null ? void 0 : r.filter((l) => !!n.find((c) => c === l.title)), ((o = i.linkJump) == null ? void 0 : o.length) === 0 && delete i.linkJump, i.hyperLink = n.filter((l) => {
    var c;
    return l !== "" && !((c = i.linkJump) != null && c.find((u) => u.title === l));
  }), ((a = i.hyperLink) == null ? void 0 : a.length) === 0 && delete i.hyperLink;
  const s = G(i.id);
  ke.call(this, s, i), this.linkDiv(), this.bus.fire("operation", {
    name: "editHyperLink",
    obj: i,
    origin: t
  });
}, Yr = function(i, e) {
  if (e == null || e == null)
    return;
  const t = i.remark;
  i.remark = e;
  const n = G(i.id);
  ke.call(this, n, i), this.linkDiv(), this.bus.fire("operation", {
    name: "editRemark",
    obj: i,
    origin: t
  });
}, Gr = function(i, e) {
  const t = i || this.currentNode;
  if (!t)
    return;
  const n = t.nodeObj;
  if (n.root === !0) {
    this.addChild();
    return;
  }
  const s = e || this.generateNewObj();
  Ai(n, s), ce(this.nodeData);
  const r = t.parentElement;
  console.time("insertSibling_DOM");
  const { grp: o, top: a } = this.createGroup(s), l = r.parentNode.parentNode;
  l.insertBefore(o, r.parentNode.nextSibling), l.className === "mindbox" ? (this.processPrimaryNode(o, s), this.linkDiv()) : this.linkDiv(o.offsetParent), e || this.createInputDiv(a.children[0]), this.selectNode(a.children[0], !0), console.timeEnd("insertSibling_DOM"), this.bus.fire("operation", {
    name: "insertSibling",
    obj: s
  });
}, Ur = function(i, e) {
  const t = i || this.currentNode;
  if (!t)
    return;
  const n = t.nodeObj;
  if (n.root === !0) {
    this.addChild();
    return;
  }
  const s = e || this.generateNewObj();
  Di(n, s), ce(this.nodeData);
  const r = t.parentElement;
  console.time("insertSibling_DOM");
  const { grp: o, top: a } = this.createGroup(s), l = r.parentNode.parentNode;
  l.insertBefore(o, r.parentNode), l.className === "mindbox" ? (this.processPrimaryNode(o, s), this.linkDiv()) : this.linkDiv(o.offsetParent), e || this.createInputDiv(a.children[0]), this.selectNode(a.children[0], !0), console.timeEnd("insertSibling_DOM"), this.bus.fire("operation", {
    name: "insertSibling",
    obj: s
  });
}, Jr = function(i, e) {
  const t = i || this.currentNode;
  if (!t)
    return;
  const n = t.nodeObj;
  if (n.root === !0)
    return;
  const s = e || this.generateNewObj();
  zi(n, s), ce(this.nodeData);
  const r = t.parentElement.parentElement;
  console.time("insertParent_DOM");
  const { grp: o, top: a } = this.createGroup(s, !0);
  a.appendChild(Je(!0));
  const l = r.parentNode;
  r.insertAdjacentElement("afterend", o);
  const c = Ue.createElement("children");
  c.appendChild(r), a.insertAdjacentElement("afterend", c), l.className === "mindbox" ? (o.className = r.className, r.className = "", r.querySelector(".svg3rd").remove(), this.linkDiv()) : this.linkDiv(o.offsetParent), e || this.createInputDiv(a.children[0]), this.selectNode(a.children[0], !0), console.timeEnd("insertParent_DOM"), this.bus.fire("operation", {
    name: "insertParent",
    obj: s
  });
}, Kr = function(i, e) {
  var a;
  if (!i)
    return;
  const t = i.nodeObj, n = e || this.generateNewSummaryObj();
  t.parent.children.push(n), ce(this.nodeData);
  const s = i.parentNode.parentNode.parentNode.parentNode, { smy: r, top: o } = this.createSummary(n);
  if (!((a = s.children) != null && a.smychildren)) {
    const l = Ue.createElement("smychildren");
    l.setAttribute("name", "smychildren"), s.appendChild(l);
  }
  return s.children.smychildren.appendChild(r), this.layout(), this.linkDiv(), { newTop: o, newNodeObj: n };
}, gi = function(i, e) {
  if (!i)
    return;
  const t = i.nodeObj;
  t.expanded === !1 && (this.expandNode(i, !0), i = G(t.id));
  const n = e || this.generateNewObj();
  t.children ? t.children.push(n) : t.children = [n], ce(this.nodeData);
  const s = i.parentElement, { grp: r, top: o } = this.createGroup(n);
  if (s.tagName === "T") {
    if (s.children[1])
      s.nextSibling.appendChild(r);
    else {
      const a = Ue.createElement("children");
      a.appendChild(r), s.appendChild(Je(!0)), s.insertAdjacentElement("afterend", a);
    }
    this.layout(), this.linkDiv(r.offsetParent);
  } else
    s.tagName === "ROOT" && (this.processPrimaryNode(r, n), s.nextSibling.appendChild(r), this.linkDiv());
  return { newTop: o, newNodeObj: n };
}, Qr = function(i, e) {
  console.time("addSummary");
  const t = {}, n = [];
  this.container.querySelectorAll("tpc.selected").forEach((s) => {
    var r, o;
    (r = t[s.nodeObj.parent.id]) != null || (t[s.nodeObj.parent.id] = n.length), n[t[s.nodeObj.parent.id]] = (o = n[t[s.nodeObj.parent.id]]) != null ? o : [], n[t[s.nodeObj.parent.id]].push(s);
  }), console.log(n), n.forEach((s) => {
    var l, c, u;
    const r = s[0] || this.currentNode;
    if (this.currentSummaryNodeArr = s, !r || ((u = (c = (l = r == null ? void 0 : r.parentElement) == null ? void 0 : l.parentElement) == null ? void 0 : c.parentElement) == null ? void 0 : u.className) == "mindbox")
      return;
    const { newTop: o, newNodeObj: a } = Kr.call(this, r, e);
    console.timeEnd("addSummary"), e || this.createInputDiv(o.children[0]), this.selectNode(o.children[0], !0), this.bus.fire("operation", {
      name: "addSummary",
      obj: a
    });
  });
}, _r = function(i, e) {
  console.time("addChild");
  const t = i || this.currentNode;
  if (!t)
    return;
  const { newTop: n, newNodeObj: s } = gi.call(this, t, e);
  console.timeEnd("addChild"), e || this.createInputDiv(n.children[0]), this.selectNode(n.children[0], !0), this.bus.fire("operation", {
    name: "addChild",
    obj: s
  });
}, $r = function(i, e) {
  console.time("copyNode");
  const t = JSON.parse(
    JSON.stringify(i.nodeObj, (s, r) => {
      if (s !== "parent")
        return r;
    })
  );
  qn(t);
  const { newNodeObj: n } = gi.call(this, e, t);
  console.timeEnd("copyNode"), this.bus.fire("operation", {
    name: "copyNode",
    obj: n
  });
}, eo = function(i) {
  const e = i || this.currentNode;
  if (!e)
    return;
  const t = e.parentNode.parentNode, n = e.nodeObj;
  xi(n), t.parentNode.insertBefore(t, t.previousSibling), this.linkDiv(), this.bus.fire("operation", {
    name: "moveUpNode",
    obj: n
  });
}, to = function(i) {
  const e = i || this.currentNode;
  if (!e)
    return;
  const t = e.parentNode.parentNode, n = e.nodeObj;
  Hi(n), t.nextSibling ? t.insertAdjacentElement("beforebegin", t.nextSibling) : t.parentNode.prepend(t), this.linkDiv(), this.bus.fire("operation", {
    name: "moveDownNode",
    obj: n
  });
}, no = function(i) {
  const e = i || this.currentNode;
  if (!e)
    return;
  const t = e.nodeObj;
  if (t.root === !0)
    throw new Error("Can not remove root node");
  const n = t.parent.children.findIndex((l) => l === t), s = t.parent.children[n + 1], r = s && s.id, o = At(t), a = e.parentNode;
  if (a.tagName !== "ROOT") {
    if (o === 0) {
      const l = a.parentNode.parentNode.previousSibling;
      l.tagName !== "ROOT" && l.children[1].remove(), this.selectParent();
    } else
      this.selectPrevSibling() || this.selectNextSibling();
    for (const l in this.linkData) {
      const c = this.linkData[l];
      (c.from === a.firstChild || c.to === a.firstChild) && this.removeLink(
        this.mindElixirBox.querySelector(
          `[data-linkid=${this.linkData[l].id}]`
        )
      );
    }
    a.parentNode.remove(), this.linkDiv(), this.bus.fire("operation", {
      name: "removeNode",
      obj: t,
      originSiblingId: r,
      originParentId: t.parent.id
    });
  }
}, io = function(i, e) {
  const t = i.nodeObj, n = e.nodeObj, s = t.parent.id;
  if (n.expanded === !1 && (this.expandNode(e, !0), i = G(t.id), e = G(n.id)), !bi(t, n)) {
    console.warn("Invalid move");
    return;
  }
  console.time("moveNode"), Li(t, n), ce(this.nodeData);
  const r = i.parentElement, o = r.parentNode.parentNode, a = e.parentElement;
  if (o.className === "mindbox" ? r.parentNode.lastChild.remove() : r.parentNode.className === "mindbox" && (r.style.cssText = ""), a.tagName === "T")
    if (o.className === "mindbox" && (r.parentNode.className = ""), a.children[1])
      a.nextSibling.appendChild(r.parentNode);
    else {
      const l = Ue.createElement("children");
      l.appendChild(r.parentNode), a.appendChild(Je(!0)), a.parentElement.insertBefore(l, a.nextSibling);
    }
  else
    a.tagName === "ROOT" && (this.processPrimaryNode(r.parentNode, t), a.nextSibling.appendChild(r.parentNode));
  this.linkDiv(), this.bus.fire("operation", {
    name: "moveNode",
    obj: { fromObj: t, toObj: n, originParentId: s }
  }), console.timeEnd("moveNode");
}, so = function(i, e) {
  const t = i.nodeObj, n = e.nodeObj, s = t.parent.id;
  Oi(t, n), ce(this.nodeData);
  const r = i.parentElement, o = r.parentNode, a = e.parentElement, l = a.parentNode;
  a.parentNode.parentNode.insertBefore(o, l), this.processPrimaryNode(r.parentElement, t), this.linkDiv(), this.bus.fire("operation", {
    name: "moveNodeBefore",
    obj: { fromObj: t, toObj: n, originParentId: s }
  });
}, ro = function(i, e) {
  const t = i.nodeObj, n = e.nodeObj, s = t.parent.id;
  Ti(t, n), ce(this.nodeData);
  const r = i.parentElement, o = r.parentNode, a = e.parentElement, l = a.parentNode;
  a.parentNode.parentNode.insertBefore(o, l.nextSibling), this.processPrimaryNode(r.parentElement, t), this.linkDiv(), this.bus.fire("operation", {
    name: "moveNodeAfter",
    obj: { fromObj: t, toObj: n, originParentId: s }
  });
}, oo = function(i) {
  const e = i || this.currentNode;
  !e || this.createInputDiv(e);
}, ao = function(i, e) {
  i.childNodes[0].textContent = e, i.nodeObj.topic = e, this.linkDiv();
};
function lo(i, e) {
  if (this.direction === 0)
    i.className = "lhs";
  else if (this.direction === 1)
    i.className = "rhs";
  else if (this.direction === 2) {
    const t = Ue.querySelectorAll(".lhs").length, n = Ue.querySelectorAll(".rhs").length;
    t <= n ? (i.className = "lhs", e.direction = 0) : (i.className = "rhs", e.direction = 1);
  }
}
const co = function(i, e, t, n) {
  const s = this.map.getBoundingClientRect();
  if (!i || !e)
    return;
  const r = i.getBoundingClientRect(), o = e.getBoundingClientRect(), a = (r.x + r.width / 2 - s.x) / this.scaleVal, l = (r.y + r.height / 2 - s.y) / this.scaleVal, c = (o.x + o.width / 2 - s.x) / this.scaleVal, u = (o.y + o.height / 2 - s.y) / this.scaleVal;
  let d, f, h, g;
  t ? (d = a + n.delta1.x, f = l + n.delta1.y, h = c + n.delta2.x, g = u + n.delta2.y) : (l + u) / 2 - l <= r.height / 2 ? (d = (r.x + r.width - s.x) / this.scaleVal + 100, f = l, h = (o.x + o.width - s.x) / this.scaleVal + 100, g = u) : (d = (a + c) / 2, f = (l + u) / 2, h = (a + c) / 2, g = (l + u) / 2);
  const p = {
    cx: a,
    cy: l,
    w: r.width,
    h: r.height
  }, v = {
    cx: c,
    cy: u,
    w: o.width,
    h: o.height
  }, w = Gt(p, d, f), x = w.x, m = w.y, P = Ut(v, h, g), H = P.x, A = P.y, D = In(h, g, H, A), O = Bi(
    `M ${x} ${m} C ${d} ${f} ${h} ${g} ${H} ${A}`,
    `M ${D.x1} ${D.y1} L ${H} ${A} L ${D.x2} ${D.y2}`
  );
  let y;
  t ? (y = {
    id: n.id,
    label: "",
    from: i,
    to: e,
    delta1: {
      x: d - a,
      y: f - l
    },
    delta2: {
      x: h - c,
      y: g - u
    }
  }, this.linkData[n.id] = y, O.linkObj = y, O.dataset.linkid = n.id) : (y = {
    id: ot(),
    label: "",
    from: i,
    to: e,
    delta1: {
      x: d - a,
      y: f - l
    },
    delta2: {
      x: h - c,
      y: g - u
    }
  }, this.linkData[y.id] = y, O.linkObj = y, O.dataset.linkid = y.id, this.currentLink = O), this.linkSvgGroup.appendChild(O), t || this.showLinkController(d, f, h, g, y, p, v);
}, uo = function(i) {
  let e;
  if (i ? e = i : e = this.currentLink, !e)
    return;
  this.hideLinkController();
  const t = e.linkObj.id;
  delete this.linkData[t], e.remove(), e = null;
}, ho = function(i) {
  this.currentLink = i;
  const e = i.linkObj, t = e.from, n = e.to, s = this.map.getBoundingClientRect(), r = t.getBoundingClientRect(), o = n.getBoundingClientRect(), a = (r.x + r.width / 2 - s.x) / this.scaleVal, l = (r.y + r.height / 2 - s.y) / this.scaleVal, c = (o.x + o.width / 2 - s.x) / this.scaleVal, u = (o.y + o.height / 2 - s.y) / this.scaleVal, d = {
    cx: a,
    cy: l,
    w: r.width,
    h: r.height
  }, f = {
    cx: c,
    cy: u,
    w: o.width,
    h: o.height
  }, h = a + e.delta1.x, g = l + e.delta1.y, p = c + e.delta2.x, v = u + e.delta2.y;
  this.showLinkController(h, g, p, v, e, d, f);
}, fo = function() {
  this.linkController.style.display = "none", this.P2.style.display = "none", this.P3.style.display = "none";
}, go = function(i, e, t, n, s, r, o) {
  this.linkController.style.display = "initial", this.P2.style.display = "initial", this.P3.style.display = "initial";
  const a = Gt(r, i, e);
  let l = a.x, c = a.y;
  const u = Ut(o, t, n);
  let d = u.x, f = u.y;
  this.P2.style.cssText = `top:${e}px;left:${i}px;`, this.P3.style.cssText = `top:${n}px;left:${t}px;`, this.line1.setAttribute("x1", l), this.line1.setAttribute("y1", c), this.line1.setAttribute("x2", i), this.line1.setAttribute("y2", e), this.line2.setAttribute("x1", t), this.line2.setAttribute("y1", n), this.line2.setAttribute("x2", d), this.line2.setAttribute("y2", f), this.helper1 && (this.helper1.destory(this.map), this.helper2.destory(this.map)), this.helper1 = new nt(this.P2), this.helper2 = new nt(this.P3), this.helper1.init(this.map, (h, g) => {
    i = i - h / this.scaleVal, e = e - g / this.scaleVal;
    const p = Gt(r, i, e);
    l = p.x, c = p.y, this.P2.style.top = e + "px", this.P2.style.left = i + "px", this.currentLink.children[0].setAttribute(
      "d",
      `M ${l} ${c} C ${i} ${e} ${t} ${n} ${d} ${f}`
    ), this.line1.setAttribute("x1", l), this.line1.setAttribute("y1", c), this.line1.setAttribute("x2", i), this.line1.setAttribute("y2", e), s.delta1.x = i - r.cx, s.delta1.y = e - r.cy;
  }), this.helper2.init(this.map, (h, g) => {
    t = t - h / this.scaleVal, n = n - g / this.scaleVal;
    const p = Ut(o, t, n);
    d = p.x, f = p.y;
    const v = In(t, n, d, f);
    this.P3.style.top = n + "px", this.P3.style.left = t + "px", this.currentLink.children[0].setAttribute(
      "d",
      `M ${l} ${c} C ${i} ${e} ${t} ${n} ${d} ${f}`
    ), this.currentLink.children[1].setAttribute(
      "d",
      `M ${v.x1} ${v.y1} L ${d} ${f} L ${v.x2} ${v.y2}`
    ), this.line2.setAttribute("x1", t), this.line2.setAttribute("y1", n), this.line2.setAttribute("x2", d), this.line2.setAttribute("y2", f), s.delta2.x = t - o.cx, s.delta2.y = n - o.cy;
  });
};
function po(i) {
  var v, w;
  var e = this.primaryNodeHorizontalGap || 65, t = this.primaryNodeVerticalGap || 25;
  console.time("linkDiv");
  const n = this.root;
  n.style.cssText = `top:${1e4 - n.offsetHeight / 2}px;left:${1e4 - n.offsetWidth / 2}px;`;
  const s = this.box.children;
  this.svg2nd.innerHTML = "";
  let r = 0, o, a = 0, l = 0, c = 0, u = 0, d = 0, f;
  if (this.direction === 2) {
    let x = 0, m = 0, P = 0, H = 0;
    for (let A = 0; A < s.length; A++) {
      const D = s[A];
      D.className === "lhs" ? (u += D.offsetHeight + t, P += D.offsetHeight, x += 1) : (d += D.offsetHeight + t, H += D.offsetHeight, m += 1);
    }
    u > d ? (f = 1e4 - Math.max(u) / 2, o = "r", a = (u - H) / (m - 1)) : (f = 1e4 - Math.max(d) / 2, o = "l", a = (d - P) / (x - 1));
  } else {
    for (let x = 0; x < s.length; x++)
      r += s[x].offsetHeight + t;
    f = 1e4 - r / 2;
  }
  let h = "";
  const g = 1e4 - n.offsetWidth / 2 - e + 60, p = 1e4 + n.offsetWidth / 2 + e - 60;
  for (let x = 0; x < s.length; x++) {
    let m, P;
    const H = s[x], A = H.offsetHeight;
    let D = n.offsetLeft - 10;
    if (H.className === "lhs") {
      H.style.top = f + l + "px", H.style.left = g - H.offsetWidth + "px", m = g - 15, P = f + l + A / 2;
      let y = 1e4;
      this.primaryLinkStyle === 2 ? (this.direction === 2 && (y = 1e4 - n.offsetWidth / 6), P < 1e4 ? h += `M ${y} 10000 V ${P + 20} C ${y} ${P} ${y} ${P} ${y - 20} ${P} H ${m}` : h += `M ${y} 10000 V ${P - 20} C ${y} ${P} ${y} ${P} ${y - 20} ${P} H ${m}`) : h += `M 10000 10000 H ${D} V ${P} H ${m}`, o === "l" ? l += A + a : l += A + t;
    } else {
      D = n.offsetLeft + n.offsetWidth + 10, H.style.top = f + c + "px", H.style.left = p + "px", m = p + 15, P = f + c + A / 2;
      let y = 1e4;
      this.primaryLinkStyle === 2 ? (this.direction === 2 && (y = 1e4 + n.offsetWidth / 6), P < 1e4 ? h += `M ${y} 10000 V ${P + 20} C ${y} ${P} ${y} ${P} ${y + 20} ${P} H ${m}` : h += `M ${y} 10000 V ${P - 20} C ${y} ${P} ${y} ${P} ${y + 20} ${P} H ${m}`) : h += `M 10000 10000 H ${D} V ${P} H ${m}`, o === "r" ? c += A + a : c += A + t;
    }
    const O = H.children[0].children[1];
    O && (O.style.top = (O.parentNode.offsetHeight - O.offsetHeight) / 2 + "px", H.className === "lhs" ? O.style.left = -10 + "px" : O.style.left = O.parentNode.offsetWidth - 10 + "px");
  }
  this.svg2nd.appendChild(Xi(h));
  for (let x = 0; x < s.length; x++) {
    const m = s[x];
    if (!(i && i !== s[x]) && m.childElementCount) {
      const P = tt("svg3rd"), H = tt("svg3rd");
      m.querySelectorAll(".svg3rd").forEach((O) => {
        O.remove();
      }), m.appendChild(P);
      const A = m.children[0];
      let D;
      ((w = (v = m.children) == null ? void 0 : v[2]) == null ? void 0 : w.tagName) === "SMYCHILDREN" ? D = [...m.children[1].children, ...m.children[2].children] : D = m.children[1].children, xe = "", bt = "", pi(D, A, this.nodeData.children[x], !0), P.appendChild(Mi(xe)), bt.length > 0 && (m.appendChild(H), H.appendChild(Ni(bt)));
    }
  }
  this.linkSvgGroup.innerHTML = "";
  for (const x in this.linkData) {
    const m = this.linkData[x];
    typeof m.from == "string" ? this.createLink(G(m.from), G(m.to), !0, m) : this.createLink(
      G(m.from.nodeObj.id),
      G(m.to.nodeObj.id),
      !0,
      m
    );
  }
  console.timeEnd("linkDiv");
}
let xe = "", bt = "";
function pi(i, e, t, n) {
  var c, u, d;
  let s = e.offsetTop, r = e.offsetLeft, o = e.offsetWidth, a = e.offsetHeight, l = !1;
  e.offsetParent.tagName === "SMY" && (l = !0, s += e.offsetParent.offsetTop, r += e.offsetParent.offsetLeft);
  for (let f = 0; f < i.length; f++) {
    const h = i[f];
    if ((h == null ? void 0 : h.tagName) === "SMY") {
      let y = i[0], L = i[f - 1];
      const z = {};
      t.children[f].summary.range.forEach((M) => {
        z[M] = !0;
      });
      let N = !0;
      for (let M = 0; M < f; M++) {
        const j = i[M].children[0].children[0].getAttribute("data-nodeid").slice(2);
        z[j] && (N && (N = !1, y = i[M]), L = i[M]);
      }
      const B = y.offsetLeft + y.offsetWidth + 8, E = y.offsetTop + 15, S = L.offsetTop + L.offsetHeight - 5, k = L.offsetLeft + L.offsetWidth + 8, F = h.offsetTop + h.children[0].offsetTop + h.children[0].offsetHeight;
      let Y = (c = h.style.top) != null ? c : 0;
      typeof Y == "string" && (Y = Number(Y.replace("px", ""))), h.style.top = Y + (S + E + h.children[0].clientHeight) / 2 - F + "px", bt += `M ${B} ${E} H ${B + 10} V ${S} H${k}`;
    }
    const g = h.children[0];
    let p = g.offsetTop, v = g.offsetHeight;
    l && (p += g.offsetParent.offsetTop);
    let w;
    n ? w = s + a / 2 : w = s + a;
    const x = p + v;
    let m, P, H;
    const A = h.offsetParent.className || h.offsetParent.offsetParent.className;
    A === "lhs" && (h == null ? void 0 : h.tagName) !== "SMY" ? (m = r + 15, H = r, P = r - g.offsetWidth, p + v < s + a / 2 + 50 && p + v > s + a / 2 - 50 ? xe += `M ${m} ${w} H ${H} V ${x} H ${P}` : p + v >= s + a / 2 ? xe += `M ${m} ${w} H ${H} V ${x} H ${P}` : xe += `M ${m} ${w} H ${H} V ${x} H ${P}`) : A === "rhs" && (h == null ? void 0 : h.tagName) !== "SMY" && (m = r + o - 15, H = r + o, P = r + o + g.offsetWidth, l && (m += 15), p + v < s + a / 2 + 50 && p + v > s + a / 2 - 50 ? xe += `M ${m} ${w} H ${H} V ${x} H ${P}` : p + v >= s + a / 2 ? xe += `M ${m} ${w} H ${H} V ${x} H ${P}` : xe += `M ${m} ${w} H ${H} V ${x} H ${P}`);
    const D = g.children[1];
    if (D) {
      if (D.style.top = (g.offsetHeight - D.offsetHeight) / 2 + "px", A === "lhs" ? D.style.left = -10 + "px" : A === "rhs" && (D.style.left = g.offsetWidth - 10 + "px"), !D.expanded)
        continue;
    } else
      continue;
    let O;
    ((d = (u = h.children) == null ? void 0 : u[2]) == null ? void 0 : d.tagName) === "SMYCHILDREN" ? O = [...h.children[1].children, ...h.children[2].children] : O = [...h.children[1].children], O.length > 0 && pi(O, g, t.children[f]);
  }
}
function vo(i) {
  i.map.addEventListener("click", (e) => {
    e.target.nodeName === "EPD" ? i.expandNode(e.target.previousSibling) : e.target.parentElement.nodeName === "T" || e.target.parentElement.nodeName === "ROOT" ? i.selectNode(e.target, !1, e) : e.target.nodeName === "path" ? e.target.parentElement.nodeName === "g" && i.selectLink(e.target.parentElement) : e.target.className === "circle" || (i.unselectNode(), i.container.querySelectorAll("tpc.selected").forEach((t) => {
      t.className = "";
    }), i.hideLinkController());
  }), i.map.addEventListener("dblclick", (e) => {
    if (e.preventDefault(), !!i.editable) {
      if (e.target.parentElement.nodeName === "T" || e.target.parentElement.nodeName === "ROOT")
        i.beginEdit(e.target);
      else if (e.target.className !== "content") {
        let t = e.target;
        for (; t.parentElement; )
          if (t = t.parentElement, t.nodeName === "TPC") {
            i.beginEdit(t);
            break;
          }
      }
    }
  }), i.map.addEventListener("mousemove", (e) => {
    if (!i.nodeDraggable && e && e.target.className === "selected") {
      Se.clear(), e.target.draggable = !1;
      return;
    }
    e.target.contentEditable !== "true" && Se.onMove(e, i.container);
  }), i.map.addEventListener("mousedown", (e) => {
    e.target.contentEditable !== "true" && (Se.afterMoving = !1, Se.mousedown = !0);
  }), i.map.addEventListener("mouseleave", (e) => {
    Se.clear();
  }), i.map.addEventListener("mouseup", (e) => {
    Se.clear();
  }), i.map.addEventListener("wheel", (e) => {
  });
}
const Vn = {
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
}, V = {
  cn: Vn,
  zh_CN: Vn,
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
function mo(i, e) {
  const t = (m) => {
    const P = document.createElement("div");
    return P.innerText = m, P.style.cssText = "position:absolute;bottom:20px;left:50%;transform:translateX(-50%);", P;
  }, n = (m, P, H) => {
    const A = document.createElement("li");
    return A.id = m, A.innerHTML = `<span>${Yt(P)}</span><span>${Yt(H)}</span>`, A;
  }, s = V[i.locale] ? i.locale : "en", r = n("cm-add_child", V[s].addChild, "tab"), o = n("cm-add_parent", V[s].addParent, ""), a = n("cm-add_sibling", V[s].addSibling, "enter"), l = n(
    "cm-remove_child",
    V[s].removeNode,
    "delete"
  ), c = n("cm-fucus", V[s].focus, ""), u = n("cm-unfucus", V[s].cancelFocus, ""), d = n("cm-up", V[s].moveUp, "PgUp"), f = n("cm-down", V[s].moveDown, "Pgdn"), h = n("cm-link", V[s].link, ""), g = n("cm-nodelink", V[s].nodeLink, ""), p = n("cm-summary", V[s].summary, ""), v = document.createElement("ul");
  if (v.className = "menu-list", v.appendChild(r), v.appendChild(o), v.appendChild(a), v.appendChild(l), (!e || e.focus) && (v.appendChild(c), v.appendChild(u)), v.appendChild(d), v.appendChild(f), (!e || e.link) && (v.appendChild(h), v.appendChild(g)), v.appendChild(p), e && e.extend)
    for (let m = 0; m < e.extend.length; m++) {
      const P = e.extend[m], H = n(P.name, P.name, P.key || "");
      v.appendChild(H), H.onclick = (A) => {
        P.onclick(A);
      };
    }
  const w = document.createElement("cmenu");
  w.appendChild(v), w.hidden = !0, i.container.append(w);
  let x = !0;
  i.container.oncontextmenu = function(m) {
    if (m.preventDefault(), !i.editable)
      return;
    const P = m.target;
    if (P.tagName === "TPC") {
      P.parentElement.tagName === "ROOT" ? x = !0 : x = !1, x ? (c.className = "disabled", d.className = "disabled", f.className = "disabled", a.className = "disabled", l.className = "disabled") : (c.className = "", d.className = "", f.className = "", a.className = "", l.className = ""), i.selectNode(P), w.hidden = !1;
      const H = v.offsetHeight, A = v.offsetWidth;
      H + m.clientY > window.innerHeight ? (v.style.top = "", v.style.bottom = "0px") : (v.style.bottom = "", v.style.top = m.clientY + 15 + "px"), A + m.clientX > window.innerWidth ? (v.style.left = "", v.style.right = "0px") : (v.style.right = "", v.style.left = m.clientX + 10 + "px");
    }
  }, w.onclick = (m) => {
    m.target === w && (w.hidden = !0);
  }, r.onclick = (m) => {
    i.addChild(), w.hidden = !0;
  }, p.onclick = (m) => {
    i.addSummary(), w.hidden = !0;
  }, o.onclick = (m) => {
    i.insertParent(), w.hidden = !0;
  }, a.onclick = (m) => {
    x || (i.insertSibling(), w.hidden = !0);
  }, l.onclick = (m) => {
    x || (i.removeNode(), w.hidden = !0);
  }, c.onclick = (m) => {
    x || (i.focusNode(i.currentNode), w.hidden = !0);
  }, u.onclick = (m) => {
    i.cancelFocus(), w.hidden = !0;
  }, d.onclick = (m) => {
    x || (i.moveUpNode(), w.hidden = !0);
  }, f.onclick = (m) => {
    x || (i.moveDownNode(), w.hidden = !0);
  }, h.onclick = (m) => {
    w.hidden = !0;
    const P = i.currentNode, H = t(V[s].clickTips);
    i.container.appendChild(H), i.map.addEventListener(
      "click",
      (A) => {
        if (A.preventDefault(), H.remove(), A.target.parentElement.nodeName === "T" || A.target.parentElement.nodeName === "ROOT") {
          const D = i.currentNode;
          i.createLink(P, D);
        } else
          console.log("\u53D6\u6D88\u8FDE\u63A5");
      },
      {
        once: !0
      }
    );
  }, g.onclick = (m) => {
    w.hidden = !0;
    const P = i.currentNode, H = t(V[s].clickTips);
    i.container.appendChild(H), i.map.addEventListener(
      "click",
      (A) => {
        if (A.preventDefault(), H.remove(), A.target.parentElement.nodeName === "T" || A.target.parentElement.nodeName === "ROOT") {
          const D = i.currentNode;
          P.nodeObj.linkJump || (P.nodeObj.linkJump = []), P.nodeObj.linkJump.push(
            {
              toId: D.nodeObj.id,
              title: D.nodeObj.topic
            }
          ), i.shapeTpc(P, P.nodeObj), i.linkDiv();
        } else
          console.log("\u53D6\u6D88\u8FDE\u63A5");
      },
      {
        once: !0
      }
    );
  };
}
const Rn = '<svg style="width: 1.3em;height: 1.3em;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3464"><path d="M909.061224 684.930612c-5.22449 0-10.44898-2.089796-14.628571-6.269388l-291.526531-291.52653c-4.179592-4.179592-10.971429-4.179592-14.628571 0l-143.673469 143.673469c-9.926531 9.926531-22.987755 15.15102-37.093878 15.151021s-27.167347-5.22449-37.093877-15.151021l-39.183674-39.183673c-4.179592-4.179592-10.971429-4.179592-14.628571 0l-187.036735 187.036734c-8.359184 8.359184-21.420408 8.359184-29.779592 0-8.359184-8.359184-8.359184-21.420408 0-29.779591l187.036735-187.036735c20.37551-20.37551 53.289796-20.37551 73.665306 0l39.183673 39.183673c2.612245 2.612245 5.746939 3.134694 7.314286 3.134694s4.702041-0.522449 7.314286-3.134694l143.673469-143.673469c20.37551-20.37551 53.289796-20.37551 73.665306 0l291.526531 291.526531c8.359184 8.359184 8.359184 21.420408 0 29.779591-3.657143 4.179592-8.881633 6.269388-14.106123 6.269388zM846.367347 867.265306H177.632653c-45.97551 0-83.591837-37.616327-83.591837-83.591837V240.326531c0-45.97551 37.616327-83.591837 83.591837-83.591837h668.734694c45.97551 0 83.591837 37.616327 83.591837 83.591837v543.346938c0 45.97551-37.616327 83.591837-83.591837 83.591837zM177.632653 198.530612c-22.987755 0-41.795918 18.808163-41.795918 41.795919v543.346938c0 22.987755 18.808163 41.795918 41.795918 41.795919h668.734694c22.987755 0 41.795918-18.808163 41.795918-41.795919V240.326531c0-22.987755-18.808163-41.795918-41.795918-41.795919H177.632653zM261.22449 303.020408m-52.244898 0a52.244898 52.244898 0 1 0 104.489796 0 52.244898 52.244898 0 1 0-104.489796 0ZM644.179592 768h-365.714286c-11.493878 0-20.897959-9.404082-20.897959-20.897959s9.404082-20.897959 20.897959-20.897959h365.714286c11.493878 0 20.897959 9.404082 20.897959 20.897959s-9.404082 20.897959-20.897959 20.897959zM461.322449 670.82449h-182.857143c-11.493878 0-20.897959-9.404082-20.897959-20.897959s9.404082-20.897959 20.897959-20.89796h182.857143c11.493878 0 20.897959 9.404082 20.897959 20.89796s-9.404082 20.897959-20.897959 20.897959z" p-id="3465"></path></svg>';
function an(i, e) {
  var n;
  let t = "";
  for (let s = 0; s < ((n = i.children) == null ? void 0 : n.length); s++)
    t += `<li class="sidebar-links">${an(i.children[s], e + 1)}</li>`;
  return !(i != null && i.children) || !i.children.length ? `<p class="sidebar-title" id="sidebar${i.id}"><span class="arrow" ${i.topic ? "" : 'style="margin-bottom:5px;"'}"></span><span>${i.topic ? i.topic : Rn}</span></p>` : `<p class="sidebar-title" id="sidebar${i.id}"><span class="arrow ${e < 2 ? "down" : "right"}" ${i.topic ? "" : 'style="margin-bottom:5px;"'}></span><span>${i.topic ? i.topic : Rn}</span></p><ul class="sidebar-heading open ${e < 2 ? "" : "hidden"}">${t}</ul>`;
}
function yo(i, e) {
  const t = i.nodeData;
  e.innerHTML = `${an(t, 0)}`, e.querySelectorAll(".sidebar-title").forEach((n) => {
    n.onclick = () => {
      const s = n.querySelector(".down"), r = n.querySelector(".right"), o = i.container.querySelector(".sidebar-title.active");
      o == null || o.classList.remove("active"), s ? (n.parentElement.querySelector("ul").classList.add("hidden"), s.classList.replace("down", "right")) : r && (n.parentElement.querySelector("ul").classList.remove("hidden"), r.classList.replace("right", "down")), n.classList.add("active"), Wn.call(i, n.id.replace("sidebar", ""));
    };
  });
}
function Po(i) {
  const e = document.createElement("sidebar");
  e.style.maxHeight = window.innerHeight - 215 + "px", i.sidebar = e;
  const t = i.nodeData;
  e.innerHTML = `${an(t, 0)}`, i.container.append(e);
}
const pe = (i, e) => {
  const t = document.createElement("span");
  return t.id = i, t.innerHTML = `<svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-${e}"></use>
  </svg>`, t;
};
let Wt = null;
function wo(i, e) {
  return function() {
    const t = arguments;
    Wt && clearTimeout(Wt), Wt = setTimeout(function() {
      i.apply(this, t);
    }, e);
  };
}
function bo(i) {
  var d;
  const e = document.createElement("toolbar"), t = pe("fullscreen", "full"), n = pe("toCenter", "living"), s = pe("zoomout", "move"), r = pe("zoomin", "add"), o = document.createElement("input");
  o.className = "numberSelection", o.type = "number", o.min = "2", o.max = "100", o.step = "1", o.value = ((d = i == null ? void 0 : i.expandDeep) == null ? void 0 : d.toString()) || "2", o.oninput = wo(() => {
    const f = i.getAllDataWithAutoHide();
    on(f == null ? void 0 : f.nodeData), i.layout(), i.linkDiv();
  }, 300);
  const a = document.createElement("span");
  if (a.innerText = "100%", e.appendChild(o), e.appendChild(t), e.appendChild(n), e.appendChild(s), e.appendChild(r), i.uploadButton) {
    const f = Do(i);
    e.appendChild(f);
  }
  e.className = "rb", t.onclick = () => {
    i.container.requestFullscreen();
  }, n.onclick = () => {
    i.toTopLeft();
  }, s.onclick = () => {
    i.scaleVal < 0.6 || i.scale(i.scaleVal -= 0.2);
  }, r.onclick = () => {
    i.scaleVal > 1.6 || i.scale(i.scaleVal += 0.2);
  };
  const l = i.scrollContainer;
  let c = window.innerWidth - (l == null ? void 0 : l.getBoundingClientRect().right) + parseInt(l && getComputedStyle(l).paddingRight) + (l == null ? void 0 : l.offsetWidth) - (l == null ? void 0 : l.clientWidth);
  return new IntersectionObserver((f) => {
    f.forEach((h) => {
      h.isIntersecting && (c = window.innerWidth - (l == null ? void 0 : l.getBoundingClientRect().right) + parseInt(l && getComputedStyle(l).paddingRight) + (l == null ? void 0 : l.offsetWidth) - (l == null ? void 0 : l.clientWidth));
    });
  }, { root: l }).observe(e), l == null || l.addEventListener("scroll", (f) => {
    const g = l.scrollTop + l.clientHeight, p = i.mindElixirBox.offsetTop, v = i.mindElixirBox.offsetTop + i.mindElixirBox.clientHeight, w = i.mindElixirBox.clientHeight;
    g < p + e.clientHeight + 40 ? (e.style.position = "absolute", e.style.bottom = w - 20 - e.clientHeight + "px", e.style.right = "20px") : g <= v ? (e.style.position = "fixed", e.style.bottom = "20px", e.style.right = c + 20 + "px") : g > v && (e.style.position = "absolute", e.style.bottom = "20px", e.style.right = "20px");
  }), e;
}
function xo(i, e) {
  var t = !1;
  return function() {
    t || (i.apply(this, arguments), t = !0, setTimeout(function() {
      t = !1;
    }, e));
  };
}
function Ho(i) {
  const e = document.createElement("toolbar"), t = pe("sidebar", "menu"), n = pe("tbltl", "left"), s = pe("tbltr", "right"), r = pe("tblts", "side");
  e.appendChild(t), e.appendChild(n), e.appendChild(s), e.appendChild(r), e.className = "lt", t.onclick = () => {
    const c = document.querySelector("sidebar");
    yo(i, c), c.classList.contains("selected") ? c.removeAttribute("class") : c.setAttribute("class", "selected");
  }, n.onclick = () => {
    i.initLeft();
  }, s.onclick = () => {
    i.initRight();
  }, r.onclick = () => {
    i.initSide();
  };
  const o = i.scrollContainer;
  let a = (o == null ? void 0 : o.getBoundingClientRect().left) + parseInt(o && getComputedStyle(o).paddingLeft);
  return new IntersectionObserver((c) => {
    c.forEach((u) => {
      u.isIntersecting && (a = (o == null ? void 0 : o.getBoundingClientRect().left) + parseInt(o && getComputedStyle(o).paddingLeft));
    });
  }, { root: o }).observe(e), i.bus.addListener("updateToolbarOffsetLeft", () => {
    a = (o == null ? void 0 : o.getBoundingClientRect().left) + parseInt(o && getComputedStyle(o).paddingLeft), e.style.position === "fixed" && (e.style.left = a + 20 + "px");
  }), o == null || o.addEventListener(
    "scroll",
    (c) => {
      const u = o.scrollTop, d = i.mindElixirBox.offsetTop, f = i.mindElixirBox.clientHeight, h = d + f - e.clientHeight - 40;
      u > h ? (e.style.position = "absolute", e.style.top = h - d + 20 + "px", e.style.left = "20px", i.sidebar.style.position = "absolute", i.sidebar.style.top = h - d + 20 + "px", i.sidebar.style.left = "80px", i.sidebar.style.maxHeight = "154px") : u >= d ? (e.style.position = "fixed", e.style.top = "20px", e.style.left = a + 20 + "px", i.sidebar.style.position = "fixed", i.sidebar.style.top = "195px", i.sidebar.style.left = a + 20 + "px", xo(() => {
        i.sidebar.style.maxHeight = Math.min(h - u - 10, window.innerHeight) + "px";
      }, 250)()) : u < d && (e.style.position = "absolute", e.style.top = "20px", e.style.left = "20px", i.sidebar.style.position = "absolute", i.sidebar.style.top = "195px", i.sidebar.style.left = "20px");
    }
  ), e;
}
function Ao(i) {
  const e = pe("close", "close");
  return e.onclick = () => {
    console.log("\u5173\u95ED"), i.bus.fire("close", {});
  }, e;
}
function Do(i) {
  const e = document.createElement("span");
  e.innerHTML = `
  <form action="" enctype="multipart/form-data" method="post" class="fm">
    <input type="file" name="file" class="selectFile">
  </form>
  <svg t="1662362270319" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2591" width="200" height="200">
  <path d="M324.6592 352.13312c7.1168 0 13.34272-2.66752 18.688-8.00768l141.50656-141.51168v443.2128c0 15.12448 11.5712 26.70592 26.7008 26.70592s26.7008-11.58144 26.7008-26.70592V202.61376l141.50656 141.51168c5.34528 5.34016 12.4672 8.00768 18.688 8.00768 6.23616 0 13.35296-2.66752 18.69312-8.00768 10.68032-10.68032 10.68032-27.59168 0-37.38112l-186.9056-186.89536c-0.88576-0.89088-2.66752-2.66752-4.44416-3.5584-0.88576 0-1.77664-0.89088-1.77664-0.89088-0.896-0.88576-1.78688-0.88576-2.67776-1.77664-0.89088 0-1.77664-0.89088-2.66752-0.89088-0.896 0-1.77664-0.89088-2.66752-0.89088a21.67296 21.67296 0 0 0-10.68032 0c-0.89088 0-1.77664 0.89088-2.66752 0.89088-0.89088 0-1.78176 0.89088-2.67264 0.89088-0.89088 0-1.77664 0.89088-2.66752 1.77664-0.89088 0-1.77664 0.89088-1.77664 0.89088-1.78176 0.89088-2.66752 1.78176-4.4544 3.5584L304.18944 306.74432c-10.68032 10.68032-10.68032 27.59168 0 37.38112 7.1168 5.34016 13.34784 8.00768 20.46976 8.00768z" fill="#333333" p-id="2592"></path><path d="M929.84832 556.83072c-15.1296 0-26.7008 11.5712-26.7008 26.7008v206.47936c0 38.272-31.15008 69.42208-69.41696 69.42208H189.37856c-38.26688 0-69.41696-31.15008-69.41696-69.42208v-206.47936c0-15.1296-11.5712-26.7008-26.7008-26.7008s-26.69568 11.5712-26.69568 26.7008v206.47936c0 67.6352 55.17824 122.81856 122.81856 122.81856h645.23776c67.64544 0 122.82368-55.18336 122.82368-122.81856v-206.47936c-0.896-15.1296-12.4672-26.7008-27.5968-26.7008z" 
  fill="#333333" p-id="2593"></path>
  </svg>
  `;
  const t = e.children[0];
  return t.addEventListener("change", (n) => {
    i.bus.fire("upload", t);
  }), e;
}
function zo(i) {
  i.mindElixirBox.append(Ho(i)), i.container.append(bo(i)), i.closeButton && i.container.append(Ao(i));
}
const Lo = "data:image/webp;base64,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", Oo = "data:image/webp;base64,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", To = "data:image/webp;base64,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", Xo = "data:image/webp;base64,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", No = "data:image/webp;base64,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", Mo = "data:image/webp;base64,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", Bo = "data:image/webp;base64,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", Co = "data:image/webp;base64,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", So = "data:image/webp;base64,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", jo = "data:image/webp;base64,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", Eo = "data:image/webp;base64,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", ko = "data:image/webp;base64,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", Vo = "data:image/webp;base64,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", Ro = "data:image/webp;base64,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", Zo = "data:image/webp;base64,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", Fo = "data:image/webp;base64,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", qo = "data:image/webp;base64,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", Io = "data:image/webp;base64,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", Wo = "data:image/webp;base64,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", Yo = "data:image/webp;base64,UklGRiYPAABXRUJQVlA4TBkPAAAvf8AfEFVZtf5/1eVmbqI+utwe2N/vPifMsnT/9zLzvr/fb//3jv/LMlcFVHQXK2YGxdzudVRB16aaYezYkO0aVR05uYOsqq7eAHdUVGSZWZ0VlVomObKkW5tZIV9mJoVBRW+Z7oCZmZlV74H5AlgxM3N1VFSZ2wuozg20ntsLYHrLctw5Mr7omZlBdVQY9NFjS4FTBhVVCJMsWj53UG5lfJmZmVEyc4+VHNu2ais/lg8kAS3aTsshAooA3N3dufbu2evsvdY+F3cJ4Of0JTeS5EhS7R7p6Qr3qFnO93ev0+fUOcWHQGAAgGAy27Zt27Zt27Zt27Zt27ZtPhckSZLjNpDr5K2GwMyAkPiBttZO4G2tncC89srnctFd6mwOoFJuxExlg1x2dOJg1rIwBLgKcA7nnsEr5X8K9RXpPeQ52BXSQdJq0rih0ZZMt9U25+gu7oFPHORSh5qEdBzyOU1J/ln5J/ivqOilSSq/QJ5RGUcxmWO0Sq9tBO4vo1vNVvsBiaxkFeVWvRB1ZBeITYoEMhLtPRoQCWWi/hf8qqDFJE9pasHiQvpIUnSGgo0BljwCSoY0kvTSFqLd5cBVJQFNsggCXsgW0r/UEaIJ5SioXEvXL0BJIVw/Q2BEFXLBFqILFyLz4XtU9p8I0CNHMNfEhCsXmLPspkz8lDyetDDaejHh0oWihwltvPBkEbkiAfA7btKU9IsyCj6gYoRvlQTcqzDh3oVih4lwtNiiKLV+7AKHQjQtv8kgTSuRzSr4+AYdZWFFAK8WM8CagxApPmuh7pEuM1g+Lir3RD4dXIrlXDZCWtnBpD6Rt0hQHJO2rwmpRSiEQpvYM8p2Lj1xhsZqx5mwCWn8WS4VaSZqgqiGvQZZmdzlKwhLkirskFyQlEGYhq0k1vUKL2kYmAVtlV8rwkLATHzhjndIaw0y0u6lAXF7MwSXjCRAizlqugRtsSCbCHplXocsqWln3wXWIcVxBw8wYFRv0ANHFVp9N0BdZGvr+y5QHFDsgcaXccYge8MPj3DOCHxi9GsDlQ+YOcUPS5x31qdK728koEkUb7b1SjnLBN3kbFEPYhES2TGBynML3j7g5kzYXYo+P2GSRpeb0oVyO1iOhBZng3rpFDRUNk2wUPOPnFu8941Bi0n/LFkIudvY4Gf4jX4tkGyhq2TOPd57Cn7IVUsRoFhqtR+Iup/+j1Zk4Gx0PPqMB+8LNgYYpNdjDEUgaKu3WcT+M5H2D3jzBpA9Cg2uvFsUk5CTFXTPUAQgG6bkAyRa+7OUO5K6Vl8MxDjxvpXTEx2gybCIGERF4nA6JL9gHX285HP75wp3Ir9qChH8sVchArdopIL0g4maDdcurNE8m1qDCG53beaINFZUoL70kQS8L/uPWgJpTBXpCmbd+rAkTQXyOmiLJRl4v1vKG7UEUkYZGZvGn0Z5Qsj4KtdKIOkfEgETywLY1ThbGBFPDt5PuFmtBJKszcgbNHeo/qPOkoT3gZbGaFoFRtNN8MvWDF4tBnWHPXiy8J7SRavA9Yt1j6vvO1nSqYFss/GmLU6XapJ6rQJDrVH3naNqQN3/cdLwvmeAQy2rGRFR9p37B5hReMx8kkc+x7fwNFAuLdKxLL/Mv4QRVa04XyeJ5HKY46vFRg+/SF67swZZ7TOR5Cfx9A846brSAFDtFkGtqAKDv7CLWDLx/jiVSgMIX8st7TtJOpQrwpKSpOL9SZX+8yFh3xlQskoZIk//SCy+ZU2s+nL/+XXokmTvO/+iNOYWycV7yFil/1CGZWh5P6NryaD63sqtDT+hZG7GKQFy/7lWVvcZUVmOLElNMt6DTVPa33kyB9QSmabhg5ImGl+43OOdTe4/YAt8xmnqf5Tb07y+G8NTyEufTcaSsztGXBS1opQgNHgOWeuHLvC6y//k9ofsQ7N64zzKruh7imZz+nSYAy2/dTXJnEBNJaV0T/FSqoVRntaNY180xjhNZ76+QikjCOSV9gcu0XqjSgbVq5XK46okp9maUL8pkpu5ZWVTmXn2BFOcnEG5K6dxKbe/f9Ybw8jJSCdelhyckV/xKlGOFH+9h3dJwa87hHuKy3s0EnvZb01y9yVZ894vX6kF8rFG8XKn/AllkpDtHMgdAw2p7LIq3yH69a9038bev0Nmj3U2B5A0Cj4GlcGjetMWtGXl7jeGVkjT0YtaUSS/cNsJnMFlKo6QqGR8R9J8i2iPIFa/Z7xWc1c0h3ql3+6SRot+JFXyGCTvDySXok2It8ConBvuQUd09V9JFQ1320FbZ9WSH1ILuckQjOXqbP4Hri9PUrfSKHmxsxpIQdNc1RuSDJ00DXhHL/kVtZLLVZ7G4/43oJwniuGwQ9VAE5jtrqotIx0G0oDKi36dy3VufiPKkwS1TQwHEyaWoy+AcVfFHpUJy4yBGIh+Xct1LpiUW608SaTxYjjh+13ecnhHo9FVr/mQZcYwKCv6VcmFJlCtxpAnCamFGA4fQ2mggjMxrvoPZuIsM9byw18Uoh+FtVxoZqucsAbLUVAOB3JTpwLvI+iq/fHdFDFAy7rsVyYXmldeV56kH8rhBK3OOgCrk7t8BXHVfdvffoFksK7PGFa6yH6HkgsNZP+x5UmakRzON6+v0Uvou7S75j+iyg3a2XWBk/1WJmf6dDsV2awWTuhhrFGgE+0O73tUIACUvDxwaX4Un2KqdU7wKK6Rjajh9De6yO8Gcogf6PQiVxpb9SNzJ6ZaLQkglQbJgR7OvJHtzIbgNPSp63rnFbSl33E2LHTwIVS637XFVLsi5I84SJct4UDyIJtIZomV296Oe6+gaFI4vUC7xvuCj2/QDI1e9H5k30luUVninKTwVfgtfq8TU+2W8tizra8k0eV1YqrdkhIgLlFaDjog5FA9ElPtiqSPYoYQ3HRAyHUvplptx2KGoPLhUP2I8DJ3BuFw9w+/iKIHat+e9rTmwV/0YZBITnHiGK3wxYH9cg4vBZnPVBrrer1cW4oPPsI4UZ/szm+I0ic768Jh1hFsg/xY3ldC5WeV/1ttN2d2QqsPB6SsjHSRZEAubeGwY0dnZXDkYJbdxtBVxTJGeXvZEVcWfSEcSh6gff+T1SeMChbokGZfvpcKC5rL6AwzSwKaqOuQERHZmSXVpHGyOlKLaPSx5pTkPwqiSeVTg6hYtDT4vey8qKFl9WlHgVpsa05N2F2Wh3cRjJJCVbJzMNf2qrL6pu30hGxupVsqKtYDkFvw4YhgX8Ndy37ole1WVl+XmaBVqvPUIcL95gPMi6hj2W8d1Yw8yeobsFFN6jFaHKRp5d3PbCOsUsh+g7Z0/QLk5yCrh4GZiQVT1qfxUG8ZjWO6jMhlKfuRjPj8S2X1k1oYB+pMfKRp0NZCUSuKJQ7SatkPMtbnymT1Z1YnBuHLsIggr2U/UCWfC29thIp60BaLqvlNyOl4SVOok99UUyhYyqH4BR+C4XP5VcrmPaqaQTbfGs4T7gmRjYIruiiXvAzf/Houjjt47zspnRcSdUcQulxhqDDlP9zzCdZLQZKr1i+oqXIcS/U+7weTB+iVduS9JBsbhhoSpLwrsxT2lYUhHz2hNNZtMzFDxW9GG5HjgIzJqOeKJgcUZc19bcRAzUObRWlrm1oCwathIXxeObWbhRLH4zMumLz1qWBJjRzOmnQoAf8s+BhUb0JyKQhQ1/QEfR1yJkGWA62V46jNPEv7sKzZNHxcUknyzHNRgezfgItdFryk81DTgOTmzNIo8R3/bHIcSPMyZc6gaJJJkUYpN2KNW0K6V7vA++qH3FLLQunTHh4yXbmMDTNHq/8H6B5lzScMIYwJFOr3593gvW9YX0mXC3rh3PsOIsK5t7+7oim9K9yTfO54RYbc7vB+2XIRuGUnwhhESSGS0GydpkpTL28seBKMipqBloZLvKc0F+OAOiTYfHBgmUrpkGvTygTPVwinO0lzBLd4L73NWdlQGLRUKXXp2V46itBqS5kQzqKyXRbBBN0xnvcOuARb2XEgjRBc7qeVxWdlOGcq9asobVg6f6DHviZjIG0c1jX53D9otGTEUTO04NIClU2FHcnvO29OK9g/kcIpnRcSqAlFCrJZQVs+a/UmorsQOxOFb9OVzGocyYWrBGixhTGllfedWTKt9IvHbNIWYtwuS2yg8JRq5XOH7KaM1i8YOWjl9ERPHjdZvNYSy7L8sv/SprV2BaN1/0lj/wBNGhSVKp6U8jFau+IKj4SRwwovjXL4xFHx/i9au1ocazSTBUb1afnV9iNTtnzusPmOtc3bY/pIEuwijsqHxlJXavrcYVml0i3T8t0mh/4BXzRGCwGf8XOHyCYqpOlGdpsYPq+RMggX/UTNlb1K3ebUnCch36XlSQV0os8MP8vrsjXqFvds70jEX2ugcn48KJEZ7/etb9xHu3917PXmq/tSmUcwKRfp0/eYic9AfkE09hxztf2CHkcTFiKjffj/lKfQNXshcnyUOOmfxr4BwMpTRnz2oMUuDTdyNL4Cq1+juGhx0KYGiPQEBx5gIz/6sGDKWct95DAN4wFDRW9eYQBwtrVTV2QHT15sbREyWeqQLYXLPZ57WrYdC0bpeiwA7P7DyYMfvQ9jIE3r/3MIt4Q2sccYuMLCNufn6LmTolaUINdEBnoNAi2Gl9Qd3VSRAHox8dOS6wcck7NNfcFPNd1tp+ljoNZsp08XzCig8qC1j2liYytvdvjcSbNHSShpAHDNktT+LxGN6kWvZCOp1RmwIjjwAOv0uZMzn+PX9lMV0KtXIrU4mpWjrfMedQ91rHzidKd0+9yJz1+P4DbSoU7nK0I28Rhlh1pZtnO7lwbEoRgROUbVijpP09TO+Q3FPjveCEt513OwIi9EiPu7XOQid+mewVd0vxRieO8xkMt3RBI4mi2cOFwqZ9CnWySXWy81GZAu3y1abBET+Rf7K4+fK164UcRaZa4jQgG9bNwM+ZvIpdJBFX080uE4WW6Zg0rtpIX1jWpXXDCYmoaTRiEqRTpPRKH00+6ppOgZ0bsmomZh3OF1egK37PHuG/DJol4OngdsweiuqB21j1/4hJHdDoNcYqRxG47OUv/ZXzPvk4Ys0jgkKoMQjP3WyqAdTrt4uVMe1nsfL65c+BiywRixnu2j3jXdzmvL07S8tvPpgvRvmStig7m23c0knjg8AA==", Go = "data:image/webp;base64,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", Uo = "data:image/webp;base64,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", Jo = "data:image/webp;base64,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", Ko = "data:image/webp;base64,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", Qo = "data:image/webp;base64,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", _o = "data:image/webp;base64,UklGRgIJAABXRUJQVlA4TPYIAAAvf8AfEDUHg7ZtBMX8Yd997yFExAQUescHRyXH765ThyH3g0LLdZgHORvuw8ibh8JEt/5/1ZbS3HQwLcyaiB7cHSK3e+/ZZ/9/B2/AGtP7/nvv/94Hi/64FPCawG6ERG9NAUSeTQMzEZ5NDXu9GnCH6EXoHYnQkZTcSmDdFKeOKYBF9FLc3Z3YLacBzSjAJSKiE0Jm8okNciRJrpWPkxii4b2unpl9X+vPkZuWV2yQTuAKxEiSHCmYobXWcLtT1a+1CQTuYPjHBxwAAAwob2Tbtm3btm3bdrNta7Jt12673gfBjSRFUtX5mO+6Joc+AKnatmVK/yTj7jMr3N3d3d39t/d5DzFINSmIxPZbc6YCLSYCBYjAXsPQ592z1T/ArEhCMdasSME5bq5tO5vvl8d2Mmaq7XbtyVbb5mz7dSBJkmmnZ55t2/j+y/47cCTJadA0Gdyk8R9GjPaoEaM9Ul39cn19ulxqT3exGfV3jF19P4ib0MrGKAKYTbYesgGinZzBzmWnA+p+/q/qu2UrIzz66xRTI3T5wdCYNcdiaFWm1bgpLsoATxYAAd+flQkoo/CvFo2xYuiVNrTDVaNPH3JBA8UCssra3TKLVGaBbrfn1v69AEiAHXIqbYzNG+sddcIWrn+YZWQC7IT42f5HpNDWwP+OjZHtGrcNmSYL8l9D3OcciGkid4Daqo9ceiB1iEz5/YgUlzJrff1FdxRbBkL6ITeBwAvVpWgetsaDh+kOUJlfrYgKzIBH2QvCBXhY9WUs8pcVsFHfOIezF5TLAcjGJ/CPFWyLXCKA8cDPmHKeRE4B8hUV/I8VCkQW4iTH06dt5Lgy0lGh129SXLoemhMPckFDpDtHxDfZrmXeXxiDfrUUpSGI61R81jPF1Tq7T4WQZUXAMtYDfqSj2zXFe2PybRgwVKwDtAP8paTbsxEcwMV/BFqGIv6ExDhI/8gkQ4W3P2RTyFJSk/NcUMmijkjPDg8QwYIeGEhNe8+u6E5i4OgD/1PTt++oOnSFDI1LDdeQb+iQEvEDOZep4ZvgeqW7UyaJ5DWcss96xdAHBHyctm63OWnBwWyOZQh/E9ctk38TJR+YO18bTF3vs5nXhOXOw9OXM2RCUO48I0bI8yukPDnX57vK3BS2vthbQeQLfbhDcmdHnguXjU638VW2EYjsAfbXch/FoU8Cqt6A5AVrGuH5tkItIrKP4ACBPbPy/TSDvghHetvm6AgKuS8vaT+3AbScBOn892+edEGEf+WOSqFFG6SzRSvf3Em4HmEljS4CDfoAnSE3PXNnf4yFPDSNTjAK0JncDPxyJ5HFGHMkdwz74GMYztkUc165c2yUMRYSyc5LMR7uJlaehyM453U230o+mz9AbZwpWhbY9//IEhlf+98w56L1Gg/XQNxHoVRFeOtniUxsPB/LUc5l1O1qLOHuOi3OdkUTltzNbHw/w1HOP7qLbF8UurBsO3sLcgZ0OQu5oLkjBoOwToJxnrR5NSpX3RyDYRjaYJwtIxNXTZDHd3l42/qjDn0gzhClrrJ2N6rCU0l0/ddgFIQz5KbrWPLxceXzl/8mDZz9ATgPNAs6fuw2J4NTbPmnr/0/mjTwuYenAOeKsuFzZzG0qugK6s+sgce3/jPd+SY+d5rWJxxqMoEhh/ncaYpLXl0mMMQpm7y+NyWOV5cJPKbtTE37u6918y3hUJsJvMbhXYzLnRasefWZwBvMmg2XOyEjA3+csEiKvVd5eC8L7yXRbeuPezB+/IzH/mHbostwPzlGLos2pz2Sy52AnCAR6T86TPYBdQ/TMdooLnJZtBj3bC53kq0PsnYybAbYnloGHkIQXhhra7jBS05TyFtHBzEz9l2O8L6erkyT7Qj5iFduZPmmOylm/XO5jA1dASupyHWxIxI2P9a/1m/YCljcF/xIxPpYLQtHnR0wH862ANlZ/6hXlruKf2H/kPE0MIy5ke5ySajK07n6OmQ8BZTf4tFgZnlvBThGqFTIaq5+DhrsAfU/MohfWYkof0qjQ2ZwBQwP3K6EBVLsOa2VvUWXVqc7ABCUIULYnS6/TR2LS8L8blx0JPkNLne2MsK1lMuMAJc7DzQFro6uwPEvnM2dpriooTzI586jaihDDvFH3lpDVdRQJqqEP/B3ew191pgM9iy9BECqH5MQl3i/Z3EcdyTcrZ0nk7XpOu5ITmXt5IvWyl3HHR9KyfLOwtDdYPZt7jru2FjvqN9JSET+Y5zL6D+Lvt/QqavfrJmuadWtzrq5Zno2MXXXCV/WC8HtCepx3DeOuP7duOnOLwRzJqdSPWpsFF5SrOwsLvKQ+rQpFiJQNamFDYgZvzOv689/zCJQQ93M7AigMxx9L1Onmqp1eWpyHjLNZ8gNT1Ob0x8Heaq/kTORH/I972y6A/RvceqGZ2uG3PM/72wZmYhTbkyOjyMWMoRRwHlnQL8QtgMsGx3GGma2XkikUPYKOe+MLI5x0lTBQYqM6+ooF4PDqLNSlPiPXyizTE24As47q0Im+UnteyEbF0SvOSd95BycEES1MtLvpG4SOqSCrzskE5S4TBF/gesObdiRNoJWiesOF/18ZzDFZcqsc3aKm7q9OvW2MuotXRCvG3ZNwsl3+7PuetAh+EnVHc8KeVUPHUjTbPTlKEaV0GduiuZ+KEgVVPLcBN0rSvWIgeTe+rEw1QV3pIUcXEV3EqdadVEnfEkJ5NuzEaj+T/YiHcDz+6NQfaIYqjkVw431jjrkZ3uVpDR1anPcgsqonxTc8XHU+05slfTMBHJG6UhGvu/kmjmz4ppEJP2auPedtN/3MjeiA0rNeDXYqzT6dNWX8YuxQO7Z0FAj4/pZ4HwMwLUFv8XmaGt0imJa2icLVGWoHoDmv0XrtWXUrRwyNxOuVTGqBaS50Nsf7NnTIb4llFn/RWPI1Mj2GhWkfiguOAn22W+Bs5D4EMebZL8YetX6i+640t0pk6ooldS3pxwKUXrp4Bg3cnCDDxJV+tPyTyfMNbr1deT/BXqt3bv4BrNm0xj3iNa4cshVe/qFnc6Fp+8Gm/mxjbE5hOBHtb/veFcbCg==", $o = "data:image/webp;base64,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", ea = "data:image/webp;base64,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", ta = "data:image/webp;base64,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", na = "data:image/webp;base64,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", ia = "data:image/webp;base64,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", sa = "data:image/webp;base64,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", ra = "data:image/webp;base64,UklGRkwWAABXRUJQVlA4TEAWAAAv/8A/EDUH47ZtJEn9l51zgt1/REwAp63XPtFupq6ZTFWmOuoz9pynVImBqRHczAjLxaZM3d5jc1D/iSkTbiExsKlS9rSibQrGbF31zVvjk5s+s3P/v2nrzvNS8h6ss+f/t84+N7Zt27bxIvQC8ipS2radKvU9e++1157//5ynnbHtrNhYsVrbtu3kjFSnje2kc1LaKW1jjzxl7KSy2ztubNu2/k8VJxXLXcXGubeN7drcsa/NNqwyzhjXtzLPc+NE1m1rhiR1j23berLNR9u27Zmoysj4voh7b9QYv7YMpG0T/5r/VRYkyaZthW3btm3btm3bNr6er23b9n3WtW1jZEGSHbeNXnXu4wEWIfLZAsBfKtq2r7ObtYWZmZmZmZmZmfFwmJmZmZmZJj08M7//7//+ZwPRsaUwyH/luWKzgrGzgtijA6qkYyPTriKVXJnqY0uyV2zhrytru4NKxt8GEvnryO7gk/XdQGWuynYFx2YFtUfX8h6iIQgAQKjplG1dy7ZtY0a23Wx7e/T89x8SG0mKpGn5GLqrqWaW/vmBQ80PHEooF7VqVXYu46swIuIk0gI5EoSSyaGkmEwrrAl4v4hWSVYBZ9cgugGBnuYa1xh5ZMBP0BhKzWS+UJJNbRFockFIN8pxdk3WB7Jzccg4/0MxwA2wJEkFVIOmSQ5UFQjgQSFSjYn4XLYLmgJUkaRCLD7/cncEN4y/E0ZUyACCiUoBS0SPRV1csdLovMfHzh15MhM6E64TavJF96KOQgZIJaLUB7pP1sU2coH3DGsBqSLEHPIxWvn9IrtZ5j5kE8gjltkTrLdkXWw1l5FB7yLQmch3aLKPCsHMD9QAD4JWcjfJupgjF8A1oDkC90ioBA8KUuUqYogtoI/oNc0kKI0hQONEfvmMUuqYKLIJ3yTyIhoZQlWG+CB4hTWMJu/Gm5H7EUjozKC7ZF2MURdyD+TqjCh36UPwHVOQk4QB/iXrYqS6XAoU3yA0PpMjAUA56Emla44OQJn5ht9XjEiD2gBvKl5JbOHTdf8wATLIgeiHqnxxAfpGZDeCX8ziXIhRYUL0RxORnQusdTR5THTuY/jDBJYfapTTIVrWROTngtSvH/bnCaahTWhFE3Ejl3sAVH0g9xHnl1J3qepnIuJ0Hd2JBLHMbm5T7QAV5B0ed//xmsCSR0M3d3jHmctKguhwNOYXYVZ4HTtSA5nT4oJkFBkb69HDCJuGQVHgW3xBFegOqcRJ7Bw249OHDz4nRmYlS8TdXGAtRR8Sc63u2B+1Ask9ekVz7A4ofoqnIXENHkzGJjeaJeJ6LkSTjYbRobpj5JnAOvMRVZJLU1m7UndsAiyg8sxHigJUPIkA04m6o6mYgb76iyrRCoDJgTNQFJoonfmMaq+5Sl+6+htO7jeqgDeU0ie/6NFEeyNRa5qIb3JBqiV/NgLBGnooQPM+lGUHNO8xiIWKi2jDhwpBsAPhE4pEieTCl1IFXZlKXaS9dPiTaieJmUAAlyF8SpXkhSoncYg8PUu1NSr8hXmD2G4K/7trVOc43K4gihOFKEnus6RyhQ8GOXFHIihBUN2RJEqu8H+W8RCt5HDgTkTEosTUHUE+gseIIn3kXwoPAK9DFIUKqTsasW8VPESO0wo4xurgyt6GJncbZ6A88o0hBEt5zRsQcNhTXwFVCKKXjQioOxqS7xRMuAZRoOIShCvVDtOjXPkZqGJPBJxLFuPDbpzAx4WY75Db1muu4mGuOw4r+1Kr4Q4yK/V3IbdNAetRi4y17niwdYoW/s8KDrPDG2MZS/ivwFRHaQIsxrrjvAPER4kmivWYO4AhC3chUwU1jcJ3BkqSKJuYqGaBHKMGTRUQw8aI9sllS3XFboHcD0hzAZoOAU+TSe4bFpTOZRPufpZIwy0AmqaD43XsLJoAC+ibcLHe7MGxiPYhYr8RLcvIfJ3IkfA5rj4HFE40KbGMqHGJaM1BVjEDQ9bSOdYwWUFrmRoBZMtSI+bWNTiawYUTJdusIZr7dSCc7g1EZ1l/f5NOTFGyiha/HAinuqF2qwLaYsVLd84bYBW9d/ovgXCqgHCr8DkxeE/SCS8vBuTpg047/mjRaOQWxYv9ai8WA/owzitwqkTLL7dXd6RWjHiiWQELoiZF6FQBIdbqjo3v4oJ3J96Lq1mYGKtpIn6G7+4xfpKo7sh0b1Jyg+KJ0k1spCzZgN9eoKHH2ak7opu7/OYfmaTASE6Uw29vhiZnK3XH3zrwtcTpNoIYSZnhFLyM3GH+ykhs1B3JFDjw0fdyYmb09kDXHGSyLdQdzXs8V5AvzqOdCGZ0ABbvGbyM4LFRWCuvO5Lpkk9vlsGOqEUevFSJWiquO5pI3QE3V9EpQBtpIv2Ap0qkVuHl1+MIluXTy1YpQVSuAZ+SLHTpQ6js+gM5UwfoU6UUoRky+FSjwqAik90X0lsdkGlJGaKsK/iU6PsolVx+gWwcoPdzUojC8KlupALtJL8dEPfZfphCdDX+M3x6QRMgJ7/4Bjk44EibDKWIWmXhUz1AYvUrOeDdjTSKGesoIn7Cpz9/XNLSC5GWA0SlKuWkLF+BL83wNc2klSeSQQeIORIcyOkSGpCR600Iwgd4c0CWNR6k/BVec5hAONnJJ0mFA8QgGy6MgXYakBGUJKo7moK8wwEJH5kgXFBoogcaWP86m4A0Sd0REOEA0S6FD6K2aVpY/7adoO5Yv5QD3t1MwQltJYvyTQND4IL18oUnEiUHiCplvPjfFVkLMQDJhrIBqHagqWIeihtaIKKFGGyi7PeNCRHRgwNNzTXHD1HOOfwYKOh+Qn8QlKs7RuDtADHEiiMabIMfA1WQa7m64ysdEBLKER0EJb6HTwH9ZeqOw/bmwEe6YwJPRO2T8GlvI8Zffe7IAZG/bSXjythEFPkDPFUqPOMvvokmHDjOF3YG2CVllSP4UqRGYpkfqF14V9my5wHL5FwhfBm518Yn6OKuPq/igLINtkn5NLws21rcxfef5Ut+623rjE1UyW/Ay8g1xZjcU6iwrsXLsRDGH1HYOXQZ0NUUv0ItffQuXLxnJdvuewPUQGS/X6LjHLRUDcmXnnsjliexWVHeJXh0sXhXrUNt01yChpnNlFrDxJhuWcxlB9Eynklq/R26BzTJqXQsf1/ajWAH4LAAZJRWnsj8FOPxkIsPVilrlvdxX9txKou4tuGyhZg7l7Nhj43RG+BwreGOY8zhDpjuKzCJCMQ8EwFfS6dG525CrFefvxb84DXnn8t4wuxsIYasyz7YzdkiI3Tc3VqlNNhRtin3zMl31R0qrV8vPvemLjMWsV99HlK2KfT5j+5+evMggC3EDuVy9umZUndcgtqm3SvelWsm2RVV7rVGlV5x3ZGSfHvpRvlyMuTBe04vrzF6/osJW4g1X5fNRIu4ZkjdcQlqnlel7MGLCR85uA0fksziuiPRjB3lKsaoraY5yxZi21SXA7D1dBM0KtTwmT3PKKo7HqXTzo+34UjDBrJYduHxWTzaTIAeQi3s2tLvNsu2sahZHqdlmEAqNMe5bQ1Vh70BNlWnuNucdiGSwFALYRPWRuqqZSaI7fQAoNYBbpswUHGtGsIN7L1QXe11vrQHp2gPvxyEssVqNbzc5oI4F3uKH4Vl2uCYgpF7iNY+ZjUcz+rp1hS+gOXNAT60jCfJHa4ZaPQ+vlogsrJ74jrJBixxKbB9ZknFecE3AafIMgSSVMvn7XccYGfrDLOI/I2vjCCJ4RNut1sl2TYuQd9wlpJUhEAyU8RqulUP7QXZLv/X23OEt8KZ9/4sK0TBod04tso+RPEu/hS0F5oAq9W+VGfyFKxhHPCTNY8BAzHQ1u6ouDioTu09WPEM4CMrnwqm+RZw9J/qwVFoslC9/pKXAP9YxgKwS57+U1OpG3FmSld7cDC2b4w0mogBrv4bDblwpnRVD7jIw8AvXIIcXBQQQiaHSdG0ScP7g90pVKOA9HPx0XTuV8CtfeEArEKNihT0gUwroyyb6cNgNeOAH+wgyD2jJiVpJDPJqDmm9gasZDrwgTUsaS6pSjdE7gerLP3/jbVvHupZdenjiVZ5qX5ntIHWTdA4r7IU1l/ANjPVF90CtK23R8Rfasso29wfp9L/1xugXXanUF0Gb/9f/IQo03RWq0yQSlUAssHHEECIH7aRaNNOgnwTCDLKbnuTQIg0F1bRadFGmoynQJ6ZtjcRjujx732qPcufDab0CciQ9jaGDLoe7dUoba2ZpLYrIZTk9l8iBJQIvz19tKWvS6QfUijgbH9SHAn4vxpyzQETKwXtn04OIYJNEK04CLqHFCuSTZJVQU0QosDIHW3Yg1OkD4kC/l5JEiHSn1tPpwWbqDJvQNHdbkEICzfMLhTBt5QvyT0s+sptyKK6q3Fa6KYqxHoDRokajiuMptf72mIbZvY4GiV5j1iWNJke/utPyFyCHHCUJPXv0hSi1gE7KnudA+H+4VGiIGq5CnREdEhC/bh9EiK9FUK6Eom/1jFgOvwXIjWk/g6JhGheAIma50FK8Taurq0SidwzkCjHAqS34fBww/4kEj9DooSPEGXkdvMDhxrWKZFIewESPYgo22w1AKolEmWbIFGZBkQZUpU9ft0hKEUi0SMMktElDFFGJjmED0kkZm+BJKdLIMoizySEz0sU+dtVSHI3LPIHQGmuYg/BBMhtshT/W5ikzDkJ6H2FxQjuIY9oWgRKNi7Bo6D50Py4kDxihBEoY4QJHiX6XPS+G3mOrCcDRYfw6KiFR+TJyJPsCiqi5DfgKESy8Ojh6LDJPUijVzwBiypVwWnrXvTGW1jT0uguXrDoczR69uL3HaMtVxr9BixaIIJGd1H8vuMoZCxN1DfAj0v4P/oHMPrp4vcd5xNSYfR8A7iI8o+BaZ3gTyQl8w4SfZdFb5kFjFplob0QT+nEcyRZshx5FRi9ikVJ0kLpnIvC1hL/AxjtIPoGilIlVzrv4M3WK4lIewEZGWlOQen15THzDhK1SCJqHIEmf0OiRA1x8w4eSxLR2wOa9HBBogCXuHkHI6EaQhCxjAeavAv1arQNBUXsxHtnFyTWG28ANBl0EYcSDRbNOyhwawVF+7BJo0gfjjRq8oqffN8U5IcRQ9wHR7/goOwl/zCqMpPvC1pndLIKOLoFIyPXV27tATR5i/HibhxwtAcn4i8UWX/l1h74MLx7KSN6pg10RLdQwLvLPYq07NILSFULIeoc4BzOFUwLFrMHLOI4+LFTzAoOzl0hQGSUlJVVQ05RygvaAAeuVjQVzOUaeG0hZ0fxrlVsXEeiE0QWfUmhrNClD+H1Qkb0pzlay3Bw8Zi5hd9tuOMCx4m4mgUEuT/jSEMoKwRAuAzxnnG0uDVgKm9BfM6JHjg5rkMJnkDIkAtOIIzYIWJEL9XGzUqOwn3lc843sYSPW5c9h/Hyi01Ammjd4U2IGNG7RHEK3V6stmkRf7DU+a8GO65w6rIuMQhSwJdk6w5HwNsqYUibKsUndGP0ktxjfvCOu1sQlwk7XQaBQvgSrjv8GQlfdPsOD4uEFD1MOsvcHBSP3WoX7DoAQFfShWevwk/PPs3jwXIPvqjwol2Vsm0kHHKQbLPqUxKlkDSIlvmHtPolinkDBjicU96O112C/lecgzyjvhvUE34fwqn4h7RBJkrNF8uxwKcdmTdmSSnNQQabqE73knzd4YEp+80+pK2hUWawTV3SVjscwYeU5SCrnQD41xxqr2DdYeqy45b4BiPz35pMB9hsx8VQE0jRBv5RZrqOStYdnuyCR/8r8zFdvkaJGTLTfwlstyP1mXFKSpbw+V8EzHY77wCx7ClnfBomMWM+pkPZbaIKdjC0o2jbahr2UfxLXkqVXkVqx7oH7zE9D8XKBHEJOq9OO6J+apt2AMbajvvyAs3XKxLCiVhF/WKCMIbpk3Tn1AtTqivjtRhH8S+/w0mjTKVCIRC1cj6p806w2UgTrO4oKd61loltB5v1A8BpgIoFAFMbYzc1L7Cu8Lf+VJcQvzv3w1hykBpjOzpz37BULITrMHbTaAMGk9TSXBJ8YiLFjWFmDDlIL4ztIEm1IEygwAHts3WTYyuZVatZHhQqio8CQ3et5iBfOiBbO7Y7kQDXghBADmzdlOqKNfsQbdMeR3FEj/ipfqnVZ73vha0d67Yi1D/D1U1Vy6wYo5fslsDhXxLe6u9Alo8FnwNc7SAZrFsRQsNPDAQ3TM3y9LHoVcbbB1lzCbguZ2lZX+xWwNQOktsHWBICJZFMzVosYMEOrDZpkX7gEeKvQBenA7dt2bMAUzs2Y2/fMT33xNKs8/+bCbqR+J6AY/ag/gEO5s9wtfOJdwBLO+6xQYv7Dow+JMay+Y5CQ+avGJdr/Agg85J1ZS7KbGTP/hbgyLnzfVb3HUgQydFNgZ+HdAvBVRstkCmuJLGVJNC69rYadSYJTTrIMArzDhC3ydAlV/0FebjEeQQPZFNN4z7wcAkK2NVUqDPRSLvlfQeaH6hJTu13yUwpQ85Afa/jKxSnZ6IMmiHDv86A87yjtb7vQNNjbL9LytUNMyhdd1sbdP2bcg0jjS7yrzOJGcO+A2+TrOv8nQvJe459B5oAnWShJXGPriz7DgTRkZy0HL5yqwT4ZKBRptJbS2GIqzAJgSCuhaCACDbhModuGQDqj8WmVm04MTxY0y0BwFy+A4tRtdrwMkqi//4HWItCZKxqoaGH4xq+R3JqMnZmIVAl1+Z3HQRK7EIgMevN53ozYixACKcawt9aDTiLEMKevE1RChAiBFCAryEXLui+Q57tZ6cXdd8hp/Yxglhh9x0SdfM6k3f/NSr8bAm8VKvUsAV69uz/ipKDwPsO2UinT7W9yJ4aPyEQSIGO/ekappAXet8hpmJ+vTcvte4u9r5DvrkFPzpcFCITfN8hkwgwT+DFMsv4O2EkA5OB1t/Qm++07mIW50IUqExEnsKD/GZjjwnShVruZYxk5nwGtHgrB1R7LEaSVeyxzy51l8BOLiRGJKd+8q8PBVeE0CA0oCEfIRk0P1A7JIT6jjp9A/Tc5yjOKIk/7s0vnvC+4JoQNrgjwLU/jPGGdnfEx/OJ9foCYPh2wU0hTGD5oaLJmbIDHwDtQ2wdvu+4avUPdwK6d10HqOCM3E8fK1ia8BOSWreB2gBM/EcPu+YwPcp7c9cTAIoSBg9+RT+4rpvetI66P+47uP7pG7jnrVdvDyLUeMVGu6msCa245R57GcVD9x1svpKH1f42Z2zh03VP3Xdw9DHBC3W64Jy3OZ7P7jt4Qn8QgFx3Kx25PwRhTUAaZKkJbAJI6MynkasbmXoTqR8reE8o/HFAf28SHQepfhO5/bYW/Kd0G5tAtluC9yzLEEDj1AqkR9FUq8LJa9ba0ORBrummYibIHQDg0jxHqHCozXp5VCj87gYCJsfehSH5l4fgaUVxxp2D4j8DuucCegbNX3UdhwoheFtcdDciPSpQMWWL3SwviLM3wJdRN1u433LXyM6l59wnvOc/MknFM/ZdOXh7ZCaRqiSTPOYnN1joAwe5kUv3XMUekQbIARC8C8BHUNOGgL5RtnpueMeDPzHVnQHOQMckqyPvdkMPH4gkDRBsxN6QuvmI+xvFfeCQAA==", oa = "data:image/webp;base64,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", oe = (i) => {
  const e = document.createElement("div");
  return i && (e.id = i), e;
}, aa = [
  "#000000",
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
function la(i) {
  const e = V[i.locale] ? i.locale : "en";
  let t;
  const n = oe("nm-style"), s = oe("nm-tag"), r = oe("nm-icon"), o = oe("nm-link"), a = oe("nm-remark");
  n.innerHTML = `
      <div class="nm-fontsize-container">
        ${["15", "24", "32"].map((y) => `<div class="size"  data-size="${y}">
        <svg class="icon" style="width: ${y}px;height: ${y}px" aria-hidden="true">
          <use xlink:href="#icon-a"></use>
        </svg></div>`).join("")}<div class="bold"><svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-B"></use>
  </svg></div>
      </div>
      <div class="nm-fontcolor-container">
        ${aa.map((y) => {
    let L = y;
    return y === "#f6f6f6" && (L = ""), `<div class="split6"><div class="palette" data-color="${L}" style="background-color: ${y};"></div></div>`;
  }).join("")}
      </div>
      <div class="bof">
      <span class="font">${V[e].font}</span>
      <span class="background">${V[e].background}</span>
      </div>
  `, s.innerHTML = `${V[e].tag}<textarea class="nm-tag" tabindex="-1" placeholder="${V[e].tagsSeparate}" /><br>`, r.innerHTML = `${V[e].icon}<div class="nm-icon" contenteditable="true" spellcheck="false" placeholder="${V[e].iconsSeparate}" ></div>`, o.innerHTML = `${V[e].hyperlink}<textarea class="nm-link" tabindex="-1" placeholder="${V[e].linkSeparate}" /><br>`, a.innerHTML = `${V[e].remark}<textarea class="nm-remark" tabindex="-1" placeholder="${V[e].reamrkSeparate}" /><br>`;
  const l = oe();
  l.className = "picker", l.style.display = "none", l.innerHTML = '<div class="header"></div><div class="body"><div class="container"></div></div>';
  const c = l.querySelector(".container");
  ["\u5168\u90E8", "\u65D7\u6746", "\u6570\u5B57", "\u5176\u4ED6", "\u4EBA\u50CF", "\u661F\u661F"].forEach((y, L) => {
    const z = oe();
    z.className = "box", L === 0 && (z.className = "box active"), z.innerText = y, z.onclick = () => {
      [...l.children[0].children].forEach((N) => {
        N.className = "box";
      }), z.className = "box active", c.style.transform = `translateX(${-(L * 275)}px)`;
    }, l.children[0].appendChild(z);
  });
  const d = {
    flag: 4,
    number: 8,
    other: 17,
    portrait: 2,
    star: 3
  }, f = oe();
  f.className = "list", Object.keys(d).forEach((y) => {
    const L = oe();
    L.className = "list";
    for (let z = 1; z <= d[y]; z++) {
      const N = document.createElement("img"), B = oe();
      B.className = "item", N.style.width = "100%", N.style.height = "100%", N.src = new URL((/* @__PURE__ */ Object.assign({ "../iconfont/icon/flag/flag1.webp": Lo, "../iconfont/icon/flag/flag2.webp": Oo, "../iconfont/icon/flag/flag3.webp": To, "../iconfont/icon/flag/flag4.webp": Xo, "../iconfont/icon/number/number1.webp": No, "../iconfont/icon/number/number2.webp": Mo, "../iconfont/icon/number/number3.webp": Bo, "../iconfont/icon/number/number4.webp": Co, "../iconfont/icon/number/number5.webp": So, "../iconfont/icon/number/number6.webp": jo, "../iconfont/icon/number/number7.webp": Eo, "../iconfont/icon/number/number8.webp": ko, "../iconfont/icon/other/other1.webp": Vo, "../iconfont/icon/other/other10.webp": Ro, "../iconfont/icon/other/other11.webp": Zo, "../iconfont/icon/other/other12.webp": Fo, "../iconfont/icon/other/other13.webp": qo, "../iconfont/icon/other/other14.webp": Io, "../iconfont/icon/other/other15.webp": Wo, "../iconfont/icon/other/other16.webp": Yo, "../iconfont/icon/other/other17.webp": Go, "../iconfont/icon/other/other2.webp": Uo, "../iconfont/icon/other/other3.webp": Jo, "../iconfont/icon/other/other4.webp": Ko, "../iconfont/icon/other/other5.webp": Qo, "../iconfont/icon/other/other6.webp": _o, "../iconfont/icon/other/other7.webp": $o, "../iconfont/icon/other/other8.webp": ea, "../iconfont/icon/other/other9.webp": ta, "../iconfont/icon/portrait/portrait1.webp": na, "../iconfont/icon/portrait/portrait2.webp": ia, "../iconfont/icon/star/star1.webp": sa, "../iconfont/icon/star/star2.webp": ra, "../iconfont/icon/star/star3.webp": oa }))[`../iconfont/icon/${y}/${y + z}.webp`], self.location).href, B.appendChild(N), L.appendChild(B), f.appendChild(B.cloneNode(!0));
    }
    l.children[1].children[0].appendChild(L), l.children[1].children[0].insertBefore(f, l.children[1].children[0].children[0]);
  }), l.onclick = (y) => {
    if (y.target.nodeName === "IMG") {
      const L = oe();
      L.className = "divItem", L.appendChild(y.target.cloneNode()), H.appendChild(L), i.updateNodeIcons(i.currentNode.nodeObj, H.innerHTML), y.stopPropagation();
    }
  }, r.appendChild(l);
  function h(y) {
    y.ondblclick = (L) => {
      const z = document.createElement("textarea"), N = y.children[0], B = i.container.offsetHeight - y.offsetTop - 60, E = 30, S = (k) => k < E ? E : k > B ? B : k;
      z.value = N.value, z.style.position = "absolute", z.style.left = N.offsetLeft + "px", z.style.top = N.offsetTop - 10 + "px", z.style.height = S(N.scrollHeight) + "px", z.style.width = N.offsetWidth + "px", z.oninput = (k) => {
        let F = k.target.scrollHeight;
        z.style.height = S(F) + "px";
      }, z.onblur = (k) => {
        N.value = z.value, N.dispatchEvent(new CustomEvent("change")), z.remove();
      }, y.appendChild(z), z.focus();
    };
  }
  h(s), h(o), h(a);
  const g = document.createElement("nmenu");
  g.innerHTML = `
  <div class="button-container"><svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-close"></use>
  </svg></div>
  `, g.appendChild(n), g.appendChild(s), g.appendChild(r), g.appendChild(o), g.appendChild(a), g.hidden = !0;
  function p(y, L) {
    var z = i.container.querySelectorAll(y);
    [].forEach.call(z, function(N) {
      N.classList.remove(L);
    });
  }
  i.container.append(g);
  const v = g.querySelectorAll(".size"), w = g.querySelector(".bold"), x = g.querySelector(".button-container"), m = g.querySelector(".font"), P = i.container.querySelector(".nm-tag"), H = i.container.querySelector(".nm-icon"), A = i.container.querySelector(".nm-link"), D = i.container.querySelector(".nm-remark");
  g.onclick = (y) => {
    if (!i.currentNode)
      return;
    const L = i.currentNode.nodeObj, z = y.target;
    z.className === "palette" ? (L.style || (L.style = {}), p(".palette", "nmenu-selected"), z.className = "palette nmenu-selected", t === "font" ? L.style.color = z.dataset.color : t === "background" && (L.style.background = z.dataset.color), i.updateNodeStyle(L)) : z.className === "background" ? (p(".palette", "nmenu-selected"), t = "background", z.className = "background selected", z.previousElementSibling.className = "font", L.style && L.style.background && (g.querySelector(
      '.palette[data-color="' + L.style.background + '"]'
    ).className = "palette nmenu-selected")) : z.className === "font" && (p(".palette", "nmenu-selected"), t = "font", z.className = "font selected", z.nextElementSibling.className = "background", L.style && L.style.color && (g.querySelector(
      '.palette[data-color="' + L.style.color + '"]'
    ).className = "palette nmenu-selected")), z.className !== "picker" && z.className !== "header" && z.className !== "item" && z.className !== "list" && z.className !== "box" && z.className !== "box active" && (l.style.display = "none");
  }, Array.from(v).map(
    (y) => {
      y.onclick = (L) => {
        i.currentNode.nodeObj.style || (i.currentNode.nodeObj.style = {}), p(".size", "size-selected");
        const z = L.currentTarget;
        i.currentNode.nodeObj.style.fontSize = z.dataset.size, z.className = "size size-selected", i.updateNodeStyle(i.currentNode.nodeObj);
      };
    }
  ), w.onclick = (y) => {
    i.currentNode.nodeObj.style || (i.currentNode.nodeObj.style = {}), i.currentNode.nodeObj.style.fontWeight === "bold" ? (delete i.currentNode.nodeObj.style.fontWeight, y.currentTarget.className = "bold", i.updateNodeStyle(i.currentNode.nodeObj)) : (i.currentNode.nodeObj.style.fontWeight = "bold", y.currentTarget.className = "bold size-selected", i.updateNodeStyle(i.currentNode.nodeObj));
  }, P.onchange = (y) => {
    if (!!i.currentNode && (y.target.value !== null || y.target.value !== void 0)) {
      let L;
      y.target.value === "" ? L = [] : L = y.target.value.split(","), i.updateNodeTags(i.currentNode.nodeObj, L);
    }
  }, H.addEventListener("input", (y) => {
    !i.currentNode || (y.target.innerHTML !== null || y.target.innerHTML !== void 0) && i.updateNodeIcons(i.currentNode.nodeObj, y.target.innerHTML);
  }), H.onclick = (y) => {
    l.style.display = "", y.stopPropagation();
  }, A.onchange = (y) => {
    if (!!i.currentNode && (y.target.value !== null || y.target.value !== void 0)) {
      const L = y.target.value;
      i.updateNodeHyperLink(i.currentNode.nodeObj, L);
    }
  }, D.onchange = (y) => {
    if (!!i.currentNode && (y.target.value !== null || y.target.value !== void 0)) {
      const L = y.target.value;
      i.updateNodeRemark(i.currentNode.nodeObj, L);
    }
  };
  let O = "open";
  x.onclick = (y) => {
    O === "open" ? (O = "close", g.className = "close", x.innerHTML = '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-menu"></use></svg>') : (O = "open", g.className = "", x.innerHTML = '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-close"></use></svg>');
  }, i.bus.addListener("unselectNode", function() {
    g.hidden = !0;
  }), i.bus.addListener("selectNode", function(y, L) {
    if (!!L) {
      if (g.hidden = !1, p(".palette", "nmenu-selected"), p(".size", "size-selected"), p(".bold", "size-selected"), t = "font", m.className = "font selected", m.nextElementSibling.className = "background", y.style) {
        if (y.style.fontSize) {
          const z = g.querySelector(
            '.size[data-size="' + y.style.fontSize + '"]'
          );
          z && (z.className = "size size-selected");
        }
        if (y.style.fontWeight) {
          const z = g.querySelector(".bold");
          z && (z.className = "bold size-selected");
        }
        if (y.style.color) {
          const z = g.querySelector(
            '.palette[data-color="' + y.style.color + '"]'
          );
          z && (z.className = "palette nmenu-selected");
        }
      }
      y.tags ? P.value = y.tags.join(",") : P.value = "", y.icons ? H.innerHTML = y.icons : H.innerText = "", A.value = "", y.hyperLink && (A.value = y.hyperLink), y.linkJump && (A.value.length > 0 && (A.value += ","), A.value += y.linkJump.map((z) => z.title).reduce((z, N, B) => z + (B ? "," : "") + N, "")), y.remark ? D.value = y.remark : D.value = "", l.style.display = "none";
    }
  });
}
const _t = document, ca = function(i, e) {
  if (!e)
    return $t(i), i;
  const t = i.getElementsByClassName("insert-preview"), n = `insert-preview ${e} show`;
  if (t.length > 0)
    t[0].className = n;
  else {
    const s = _t.createElement("div");
    s.className = n, i.appendChild(s);
  }
  return i;
}, $t = function(i) {
  if (!i)
    return;
  const e = i.getElementsByClassName("insert-preview");
  for (const t of e || [])
    t.remove();
}, Zn = function(i, e) {
  const t = e.parentNode.parentNode.contains(i);
  return i && i.tagName === "TPC" && i !== e && !t && i.nodeObj.root !== !0;
};
function ua(i) {
  let e, t, n;
  i.map.addEventListener("dragstart", function(r) {
    e = r.target, e.parentNode.parentNode.style.opacity = "0.5", Se.clear();
  }), i.map.addEventListener("dragend", async function(r) {
    r.target.style.opacity = "", $t(n);
    const o = e.nodeObj;
    switch (t) {
      case "before":
        i.moveNodeBefore(e, n), i.selectNode(G(o.id));
        break;
      case "after":
        i.moveNodeAfter(e, n), i.selectNode(G(o.id));
        break;
      case "in":
        i.moveNode(e, n);
        break;
    }
    e.parentNode.parentNode.style.opacity = "1", e = null;
  }), i.map.addEventListener("dragover", yi(function(r) {
    $t(n);
    const o = _t.elementFromPoint(
      r.clientX,
      r.clientY - 12
    );
    if (Zn(o, e)) {
      n = o;
      const a = o.getBoundingClientRect().y;
      r.clientY > a + o.clientHeight ? t = "after" : r.clientY > a + o.clientHeight / 2 && (t = "in");
    } else {
      const a = _t.elementFromPoint(
        r.clientX,
        r.clientY + 12
      );
      if (Zn(a, e)) {
        n = a;
        const l = a.getBoundingClientRect().y;
        r.clientY < l ? t = "before" : r.clientY < l + a.clientHeight / 2 && (t = "in");
      } else
        t = n = null;
    }
    n && ca(n, t);
  }, 200));
}
function ha(i) {
  const e = {
    13: (t) => {
      t.preventDefault(), i.insertSibling();
    },
    9: () => {
      i.addChild();
    },
    17: (t) => {
      i.ctrlRepeat = !0;
    },
    91: (t) => {
      i.ctrlRepeat = !0;
    },
    113: () => {
      i.beginEdit();
    },
    38: () => {
      i.selectPrevSibling();
    },
    40: () => {
      i.selectNextSibling();
    },
    37: () => {
      !i.currentNode || (i.currentNode.offsetParent.offsetParent.className === "rhs" ? i.selectParent() : (i.currentNode.offsetParent.offsetParent.className === "lhs" || i.currentNode.nodeObj.root) && i.selectFirstChild());
    },
    39: () => {
      !i.currentNode || (i.currentNode.offsetParent.offsetParent.className === "rhs" || i.currentNode.nodeObj.root ? i.selectFirstChild() : i.currentNode.offsetParent.offsetParent.className === "lhs" && i.selectParent());
    },
    33() {
      i.moveUpNode();
    },
    34() {
      i.moveDownNode();
    },
    67(t) {
      (t.metaKey || t.ctrlKey) && (i.waitCopy = i.currentNode);
    },
    86(t) {
      !i.waitCopy || (t.metaKey || t.ctrlKey) && (i.copyNode(i.waitCopy, i.currentNode), i.waitCopy = null);
    },
    90: (t) => {
      !i.allowUndo || (t.metaKey || t.ctrlKey) && i.undo();
    },
    187: (t) => {
      if (t.metaKey || t.ctrlKey) {
        if (i.scaleVal > 1.6)
          return;
        i.scale(i.scaleVal += 0.2);
      }
    },
    189: (t) => {
      if (t.metaKey || t.ctrlKey) {
        if (i.scaleVal < 0.6)
          return;
        i.scale(i.scaleVal -= 0.2);
      }
    }
  };
  i.map.onkeydown = (t) => {
    !i.editable || t.target === t.currentTarget && (t.keyCode === 8 || t.keyCode === 46 ? i.currentLink ? i.removeLink() : i.removeNode() : e[t.keyCode] && e[t.keyCode](t));
  }, i.map.onkeyup = (t) => {
    (t.keyCode === 17 || t.keyCode === 91) && (i.ctrlRepeat = !1);
  };
}
function fa(i, e) {
  const t = (f, h) => {
    const g = document.createElement("div");
    return g.id = f, g.innerHTML = `<svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-${h}"></use>
  </svg>`, g;
  }, n = t("cm-add_child", "zijiedian"), s = t("cm-add_sibling", "tongjijiedian-"), r = t("cm-remove_child", "shanchu2"), o = t("cm-up", "rising"), a = t("cm-down", "falling"), l = t("cm-edit", "edit"), c = document.createElement("ul");
  if (c.className = "menu-list", e && e.extend)
    for (let f = 0; f < e.extend.length; f++) {
      const h = e.extend[f], g = t(h.name, h.name);
      c.appendChild(g), g.onclick = (p) => {
        h.onclick(p);
      };
    }
  const u = document.createElement("mmenu");
  u.appendChild(n), u.appendChild(s), u.appendChild(r), u.appendChild(o), u.appendChild(a), u.appendChild(l), u.hidden = !0, i.container.append(u);
  let d = !0;
  i.bus.addListener("unselectNode", function() {
    u.hidden = !0;
  }), i.bus.addListener("selectNode", function(f) {
    u.hidden = !1, f.root ? d = !0 : d = !1;
  }), u.onclick = (f) => {
    f.target === u && (u.hidden = !0);
  }, n.onclick = (f) => {
    i.addChild();
  }, s.onclick = (f) => {
    d || i.insertSibling();
  }, r.onclick = (f) => {
    d || i.removeNode();
  }, o.onclick = (f) => {
    d || i.moveUpNode();
  }, a.onclick = (f) => {
    d || i.moveDownNode();
  }, l.onclick = (f) => {
    i.beginEdit();
  };
}
function vi() {
  this.handlers = {};
}
vi.prototype = {
  showHandler: function() {
    console.log(this.handlers);
  },
  addListener: function(i, e) {
    this.handlers[i] === void 0 && (this.handlers[i] = []), this.handlers[i].push(e);
  },
  fire: function(i, ...e) {
    if (this.handlers[i] instanceof Array)
      for (var t = this.handlers[i], n = 0; n < t.length; n++)
        t[n](...e);
  },
  removeListener: function(i, e) {
    if (!!this.handlers[i]) {
      var t = this.handlers[i];
      if (!e)
        t.length = 0;
      else if (t.length)
        for (var n = 0; n < t.length; n++)
          t[n] === e && this.handlers[i].splice(n, 1);
    }
  }
};
let da = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">', fe = 40, He = document, ve, $e, me, et, xt, Ht;
function ga() {
  ve = 1e4, $e = 1e4, me = 1e4, et = 1e4, xt = 0, Ht = 0;
}
function pa() {
  let i = He.querySelectorAll(".mindbox > grp, root"), e = "";
  for (let n = 0; n < i.length; n++) {
    let s = i[n], r = s.getBoundingClientRect(), o = s.offsetTop, a = o + r.height, l = s.offsetLeft, c = l + r.width;
    o < ve && (ve = o), a > $e && ($e = a), l < me && (me = l), c > et && (et = c);
  }
  for (let n = 0; n < i.length; n++) {
    let s = i[n];
    s.tagName !== "ROOT" && (e += Pa(s));
  }
  console.log(ve, $e, me, et), e += ya(), xt = $e - ve + fe * 2, Ht = et - me + fe * 2;
  let t = va(xt, Ht);
  return e = `<rect x="0" y="0" width="${Ht}" height="${xt}" fill="#f6f6f6"></rect>` + e, t.innerHTML = e, t;
}
function va(i, e) {
  let t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  return t.setAttribute("width", "100%"), t.setAttribute("xmlns", "http://www.w3.org/2000/svg"), t.setAttribute("version", "1.2"), t.setAttribute("xlink", "http://www.w3.org/1999/xlink"), t.setAttribute("viewBox", `0 0 ${e} ${i}`), t;
}
function ma(i, e) {
  return i;
}
function ya() {
  let i = He.querySelector("root"), t = He.querySelector("root > tpc").getBoundingClientRect(), n = 0, s = 0, r = He.querySelector("root > tpc").nodeObj, o = i.offsetTop - ve, a = i.offsetLeft - me, l = He.querySelector(".svg2nd"), c = `<g transform="translate(${fe - me}, ${fe - ve})">${l.innerHTML}</g>`;
  c += `<g id="root" transform="translate(${a + fe}, ${o + fe})">
      <rect x="${s}" y="${n}" rx="5px" ry="5px" width="${t.width}" height="${t.height}" style="fill: #00aaff;"></rect>
      <text x="${s + 15}" y="${n + 35}" text-anchor="start" align="top" anchor="start" font-family="\u5FAE\u8F6F\u96C5\u9ED1" font-size="25px" font-weight="normal" fill="#ffffff">
        <tspan> ${ma(r.topic, t.width)}</tspan>
      </text>
  </g>`;
  let u = He.querySelector(".topiclinks");
  return u && (c += `<g transform="translate(${fe - me}, ${fe - ve})">${u.innerHTML}</g>`), c;
}
function Pa(i) {
  let e = i.querySelectorAll("tpc"), t = i.offsetTop - ve, n = i.offsetLeft - me, s = "", r = i.querySelector(".svg3rd");
  s += `<g transform="translate(${n + fe}, ${t + fe})">`, s += r ? r.innerHTML : "";
  for (let o = 0; o < e.length; o++) {
    let a = e[o], l = a.parentNode, c = a.nodeObj;
    if (c.root)
      continue;
    let u = a.getBoundingClientRect(), d = l.offsetTop, f = l.offsetLeft, h = getComputedStyle(a), g = getComputedStyle(l), p = f + parseInt(g.paddingLeft) + parseInt(h.paddingLeft), v = d + parseInt(g.paddingTop) + parseInt(h.paddingTop) + parseInt(h.fontSize), w = "";
    h.borderWidth != "0px" && (w = `<rect x="${f + 15}" y="${d}" rx="5px" ry="5px" width="${u.width}" height="${u.height}" style="fill: rgba(0,0,0,0); stroke:#444;stroke-width:1px;"></rect>`);
    let x = "";
    h.backgroundColor != "rgba(0, 0, 0, 0)" && (x = `<rect x="${f + 15}" y="${d}" rx="5px" ry="5px" width="${u.width}" height="${u.height}" style="fill: ${h.backgroundColor};"></rect>`);
    let m = "";
    if (c.tags && c.tags.length) {
      let H = a.querySelectorAll(".tags > span");
      for (let A = 0; A < H.length; A++) {
        let D = H[A], O = D.getBoundingClientRect();
        m += `<rect x="${p}" y="${v + 4}" rx="5px" ry="5px" width="${O.width}" height="${O.height}" style="fill: #d6f0f8;"></rect>
        <text font-family="\u5FAE\u8F6F\u96C5\u9ED1" font-size="12px"  fill="#276f86" x="${p + 4}" y="${v + 4 + 12}">${D.innerHTML}</text>`;
      }
    }
    let P = "";
    if (c.icons && c.icons.length) {
      let H = a.querySelectorAll(".icons > span");
      for (let A = 0; A < H.length; A++) {
        let D = H[A];
        D.getBoundingClientRect(), P += `
        <tspan>${D.innerHTML}</tspan>`;
      }
    }
    s += `<g id="${c.id}">
      ${w}
      ${x}
      <text x="${p}" y="${v}" text-anchor="start" align="top" anchor="start" font-family="\u5FAE\u8F6F\u96C5\u9ED1" font-size="${h.fontSize}" font-weight="${h.fontWeight}" fill="${h.color}">
        ${c.topic}
        ${P}
      </text>
      ${m}
  </g>`;
  }
  return s += "</g>", s;
}
function wa() {
  return He.querySelector("root > tpc").innerText;
}
let ba = async function(i, e) {
  if (!i)
    throw new Error("Mind-elixir instance is not presented. ---> exportSvg(instance, fileName)");
  ga(), He = i.container;
  let t = pa();
  const n = document.createElement("canvas");
  n.style.display = "none";
  const s = n.getContext("2d");
  (await je.fromString(
    s,
    da + t.outerHTML.replace(/&nbsp;/g, " ")
  )).start();
  let o = n.toDataURL("image/png"), a = document.createElement("a");
  a.href = o, a.download = e || wa() + ".png", a.click();
};
(function(i) {
  var e, t, n, s, r, o, a = '<svg><symbol id="icon-edit" viewBox="0 0 1024 1024"><path d="M423.765333 128a42.666667 42.666667 0 0 1 3.2 85.205333L423.765333 213.333333H234.666667a64 64 0 0 0-63.872 60.245334L170.666667 277.333333v512a64 64 0 0 0 60.245333 63.872L234.666667 853.333333h512a64 64 0 0 0 63.872-60.245333L810.666667 789.333333v-189.098666a42.666667 42.666667 0 0 1 85.205333-3.2l0.128 3.2V789.333333a149.333333 149.333333 0 0 1-144.213333 149.248L746.666667 938.666667h-512a149.333333 149.333333 0 0 1-149.248-144.213334L85.333333 789.333333v-512a149.333333 149.333333 0 0 1 144.213334-149.248L234.666667 128h189.098666z m324.949334-53.248a42.666667 42.666667 0 0 1 60.330666 0l150.869334 150.869333a42.666667 42.666667 0 0 1 0 60.330667l-329.386667 329.386667a42.666667 42.666667 0 0 1-29.44 12.458666l-153.386667 2.517334a42.666667 42.666667 0 0 1-43.349333-43.349334l2.56-153.386666a42.666667 42.666667 0 0 1 12.458667-29.44z m30.165333 90.496L491.946667 452.266667l-1.493334 91.989333 92.032-1.493333 286.976-286.976-90.538666-90.538667z"  ></path></symbol><symbol id="icon-rising" viewBox="0 0 1024 1024"><path d="M553.173333 803.84h-64l0.021334-474.581333-224.021334 224-45.269333-45.226667L521.6 206.293333l301.717333 301.696-45.269333 45.269334-224.853333-224.896v475.477333z"  ></path></symbol><symbol id="icon-falling" viewBox="0 0 1024 1024"><path d="M553.173333 238.314667h-64l0.021334 474.602666-224.021334-224-45.269333 45.226667L521.6 835.861333l301.717333-301.717333-45.269333-45.226667-224.853333 224.853334V238.336z"  ></path></symbol><symbol id="icon-shanchu2" viewBox="0 0 1024 1024"><path d="M516.60601807 107.93026734c-82.64382935 0-149.71865844 65.51751709-152.5729065 147.77160644H171.37136841c-21.40603638 0-38.92044068 17.38504028-38.92044068 38.92126465 0 21.40686036 17.38504028 38.92208862 38.92126466 38.92208862h42.94308471v435.40136719c0 81.73498536 55.39828492 148.55026245 123.90106201 148.55026245h348.99444581c68.37341309 0 123.90106201-66.42553711 123.901062-148.55026245V333.80477906h38.92126465c21.40686036 0 38.92126464-17.38586426 38.92126465-38.92208863 0-21.40686036-17.38504028-38.92126464-38.92126465-38.92126465H668.91854859C666.45321656 173.44860839 599.24902344 107.93109131 516.60601807 107.93109131z m-79.65939331 147.77160644c2.85424805-42.16442872 37.2354126-74.85809326 79.78875732-74.85809326s76.93450927 32.82302857 79.39984131 74.85809326H436.94662476z m-98.86047364 589.01165771c-24.2611084 0-50.98754883-31.13717651-50.98754883-75.76693725V333.80477906h450.97036744V769.33551026c0 44.50039673-26.72644043 75.76776123-50.98754884 75.76776122H338.08615112v-0.38973999z m0 0"  ></path><path d="M390.37063599 751.17263794c17.77313232 0 32.43411255-17.7739563 32.43411255-40.08883667V482.35504151c0-22.31488037-14.53079224-40.08966065-32.43411255-40.08966065-17.77478027 0-32.43493653 17.77478027-32.43493653 40.08966065v228.72875976c0 22.18469239 14.27124023 40.08883667 32.43493653 40.08883667z m117.41308594 0c17.7739563 0 32.43411255-17.7739563 32.43411255-40.08883667V482.35504151c0-22.31488037-14.53079224-40.08966065-32.43411255-40.08966065-17.7739563 0-32.43493653 17.77478027-32.43493653 40.08966065v228.72875976c0 22.18469239 14.66098023 40.08883667 32.43493653 40.08883667z m123.51049804 0c17.7739563 0 32.43493653-17.7739563 32.43493652-40.08883667V482.35504151c0-22.31488037-14.53079224-40.08966065-32.43493652-40.08966065-17.7739563 0-32.43411255 17.77478027-32.43411255 40.08966065v228.72875976c0 22.18469239 14.14105224 40.08883667 32.43411255 40.08883667z m0 0"  ></path></symbol><symbol id="icon-zijiedian" viewBox="0 0 1024 1024"><path d="M312.208 472c19.568-157.856 153.432-280 315.656-280 175.68 0 318.112 143.272 318.112 320S803.552 832 627.864 832c-162.224 0-296.08-122.144-315.656-280H120a40 40 0 0 1 0-80h192.208zM632 752c132.552 0 240-107.448 240-240 0-132.552-107.448-240-240-240-132.552 0-240 107.448-240 240 0 132.552 107.448 240 240 240z m-40-280v-80a40 40 0 0 1 80 0v80h80a40 40 0 0 1 0 80h-80v80a40 40 0 0 1-80 0v-80h-80a40 40 0 0 1 0-80h80z"  ></path></symbol><symbol id="icon-tongjijiedian-" viewBox="0 0 1024 1024"><path d="M803.84 131.626667H410.24A59.733333 59.733333 0 0 0 350.506667 192v45.226667H199.68a51.626667 51.626667 0 0 0-51.626667 51.626666v465.92a51.626667 51.626667 0 0 0 51.626667 51.626667h187.52v-55.466667h-162.133333a21.333333 21.333333 0 0 1-21.333334-21.333333V313.386667a21.333333 21.333333 0 0 1 21.333334-21.333334h125.653333v64a59.733333 59.733333 0 0 0 59.733333 59.733334h393.386667a59.733333 59.733333 0 0 0 59.733333-59.733334V192a59.733333 59.733333 0 0 0-59.733333-60.373333z m4.266667 224.64a4.266667 4.266667 0 0 1-4.266667 4.266666H410.24a4.266667 4.266667 0 0 1-4.266667-4.266666V192a4.266667 4.266667 0 0 1 4.266667-4.266667h393.6a4.266667 4.266667 0 0 1 4.266667 4.266667zM716.16 749.44h-81.28v-81.493333a27.733333 27.733333 0 0 0-55.466667 0v81.28h-81.493333a27.733333 27.733333 0 1 0 0 55.466666h81.28v81.28a27.733333 27.733333 0 1 0 55.466667 0v-81.066666h81.28a27.733333 27.733333 0 0 0 0-55.466667z"  ></path></symbol><symbol id="icon-close" viewBox="0 0 1024 1024"><path d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128L512.128 467.904l-263.04-263.84c-12.448-12.48-32.704-12.544-45.248-0.064-12.512 12.48-12.544 32.736-0.064 45.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248a31.937 31.937 0 0 0 22.688 9.44c8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408a31.94 31.94 0 0 0 22.592-9.344c12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z" fill="" ></path></symbol><symbol id="icon-menu" viewBox="0 0 1024 1024"><path d="M109.714 292.571h804.572c21.943 0 36.571-21.942 36.571-43.885 0-14.629-14.628-29.257-36.571-29.257H109.714c-21.943 0-36.571 14.628-36.571 36.571 0 14.629 14.628 36.571 36.571 36.571zM914.286 512H109.714c-21.943 0-36.571 14.629-36.571 36.571 0 14.629 14.628 36.572 36.571 36.572h804.572c21.943 0 36.571-21.943 36.571-43.886 0-14.628-14.628-29.257-36.571-29.257z m0 292.571H109.714c-21.943 0-36.571 14.629-36.571 36.572s14.628 36.571 36.571 36.571h804.572c21.943 0 36.571-21.943 36.571-36.571 0-21.943-14.628-36.572-36.571-36.572z"  ></path></symbol><symbol id="icon-right" viewBox="0 0 1024 1024"><path d="M385 560.69999999L385 738.9c0 36.90000001 26.4 68.5 61.3 68.5l150.2 0c1.5 0 3-0.1 4.5-0.3 10.2 38.7 45.5 67.3 87.5 67.3 50 0 90.5-40.5 90.5-90.5s-40.5-90.5-90.5-90.5c-42 0-77.3 28.6-87.5 67.39999999-1.4-0.3-2.9-0.4-4.5-0.39999999L446.3 760.4c-6.8 0-14.3-8.9-14.3-21.49999999l0-427.00000001c0-12.7 7.40000001-21.5 14.30000001-21.5l150.19999999 0c1.5 0 3-0.2 4.5-0.4 10.2 38.8 45.5 67.3 87.5 67.3 50 0 90.5-40.5 90.5-90.4 0-49.9-40.5-90.6-90.5-90.59999999-42 0-77.3 28.6-87.5 67.39999999-1.4-0.2-2.9-0.4-4.49999999-0.4L446.3 243.3c-34.80000001 0-61.3 31.6-61.3 68.50000001L385 513.7l-79.1 0c-10.4-38.5-45.49999999-67-87.4-67-50 0-90.5 40.5-90.5 90.5s40.5 90.5 90.5 90.5c41.79999999 0 77.00000001-28.4 87.4-67L385 560.69999999z" fill="#333333" ></path></symbol><symbol id="icon-left" viewBox="0 0 1024 1024"><path d="M639 463.30000001L639 285.1c0-36.90000001-26.4-68.5-61.3-68.5l-150.2 0c-1.5 0-3 0.1-4.5 0.3-10.2-38.7-45.5-67.3-87.5-67.3-50 0-90.5 40.5-90.5 90.5s40.5 90.5 90.5 90.5c42 0 77.3-28.6 87.5-67.39999999 1.4 0.3 2.9 0.4 4.5 0.39999999L577.7 263.6c6.8 0 14.3 8.9 14.3 21.49999999l0 427.00000001c0 12.7-7.40000001 21.5-14.30000001 21.5l-150.19999999 0c-1.5 0-3 0.2-4.5 0.4-10.2-38.8-45.5-67.3-87.5-67.3-50 0-90.5 40.5-90.5 90.4 0 49.9 40.5 90.6 90.5 90.59999999 42 0 77.3-28.6 87.5-67.39999999 1.4 0.2 2.9 0.4 4.49999999 0.4L577.7 780.7c34.80000001 0 61.3-31.6 61.3-68.50000001L639 510.3l79.1 0c10.4 38.5 45.49999999 67 87.4 67 50 0 90.5-40.5 90.5-90.5s-40.5-90.5-90.5-90.5c-41.79999999 0-77.00000001 28.4-87.4 67L639 463.30000001z" fill="#333333" ></path></symbol><symbol id="icon-side" viewBox="0 0 1024 1024"><path d="M851.91168 328.45312c-59.97056 0-108.6208 48.47104-108.91264 108.36992l-137.92768 38.4a109.14304 109.14304 0 0 0-63.46752-46.58688l1.39264-137.11872c47.29344-11.86816 82.31936-54.66624 82.31936-105.64096 0-60.15488-48.76288-108.91776-108.91776-108.91776s-108.91776 48.76288-108.91776 108.91776c0 49.18784 32.60928 90.75712 77.38368 104.27392l-1.41312 138.87488a109.19936 109.19936 0 0 0-63.50336 48.55808l-138.93632-39.48544 0.01024-0.72704c0-60.15488-48.76288-108.91776-108.91776-108.91776s-108.91776 48.75776-108.91776 108.91776c0 60.15488 48.76288 108.91264 108.91776 108.91264 39.3984 0 73.91232-20.92032 93.03552-52.2496l139.19232 39.552-0.00512 0.2304c0 25.8304 9.00096 49.5616 24.02816 68.23424l-90.14272 132.63872a108.7488 108.7488 0 0 0-34.2528-5.504c-60.15488 0-108.91776 48.768-108.91776 108.91776 0 60.16 48.76288 108.91776 108.91776 108.91776 60.16 0 108.92288-48.75776 108.92288-108.91776 0-27.14624-9.9328-51.968-26.36288-71.04l89.04704-131.03104a108.544 108.544 0 0 0 37.6832 6.70208 108.672 108.672 0 0 0 36.48512-6.272l93.13792 132.57216a108.48256 108.48256 0 0 0-24.69888 69.0688c0 60.16 48.768 108.92288 108.91776 108.92288 60.16 0 108.91776-48.76288 108.91776-108.92288 0-60.14976-48.75776-108.91776-108.91776-108.91776a108.80512 108.80512 0 0 0-36.69504 6.3488l-93.07136-132.48a108.48768 108.48768 0 0 0 24.79616-72.22784l136.09984-37.888c18.99008 31.93856 53.84192 53.3504 93.69088 53.3504 60.16 0 108.92288-48.75776 108.92288-108.91264-0.00512-60.15488-48.77312-108.92288-108.92288-108.92288z"  ></path></symbol><symbol id="icon-B" viewBox="0 0 1024 1024"><path d="M98.067692 65.457231H481.28c75.854769 0 132.411077 3.150769 169.668923 9.452307 37.336615 6.301538 70.656 19.534769 100.036923 39.620924 29.459692 20.007385 53.956923 46.710154 73.570462 80.029538 19.692308 33.398154 29.459692 70.734769 29.459692 112.167385 0 44.898462-12.130462 86.094769-36.233846 123.588923a224.886154 224.886154 0 0 1-98.461539 84.283077c58.368 17.092923 103.266462 46.08 134.695385 87.04 31.350154 40.96 47.025231 89.088 47.025231 144.462769 0 43.638154-10.082462 86.016-30.404923 127.212308-20.243692 41.196308-47.891692 74.043077-83.02277 98.697846-35.052308 24.654769-78.296615 39.778462-129.732923 45.449846-32.295385 3.465846-110.119385 5.671385-233.472 6.537846H98.067692V65.457231z m193.536 159.507692V446.621538h126.818462c75.460923 0 122.328615-1.024 140.603077-3.229538 33.083077-3.938462 59.155692-15.36 78.139077-34.343385 18.904615-18.904615 28.435692-43.874462 28.435692-74.830769 0-29.696-8.192-53.720615-24.497231-72.310154-16.384-18.510769-40.644923-29.696-72.940307-33.634461-19.140923-2.205538-74.279385-3.308308-165.415385-3.308308h-111.064615z m0 381.243077v256.315077h179.2c69.710769 0 113.979077-1.969231 132.726154-5.907692 28.750769-5.198769 52.145231-17.959385 70.262154-38.281847 18.116923-20.243692 27.096615-47.340308 27.096615-81.368615 0-28.750769-6.931692-53.169231-20.873846-73.255385a118.232615 118.232615 0 0 0-60.494769-43.795692c-26.387692-9.137231-83.574154-13.705846-171.638154-13.705846H291.603692z"  ></path></symbol><symbol id="icon-a" viewBox="0 0 1024 1024"><path d="M757.76 665.6q0 20.48 1.536 34.304t7.68 22.016 18.944 12.288 34.304 4.096q-3.072 25.6-15.36 44.032-11.264 16.384-33.28 29.696t-62.976 13.312q-11.264 0-20.48-0.512t-17.408-2.56l-6.144-2.048-1.024 0q-4.096-1.024-10.24-4.096-2.048-2.048-4.096-2.048-1.024-1.024-2.048-1.024-14.336-8.192-23.552-17.408t-14.336-17.408q-6.144-10.24-9.216-20.48-63.488 75.776-178.176 75.776-48.128 0-88.064-15.36t-69.12-44.032-45.056-68.096-15.872-88.576 16.896-89.088 47.616-67.584 74.24-42.496 96.768-14.848q48.128 0 88.576 17.408t66.048 49.152q0-8.192 0.512-16.384t0.512-15.36q0-71.68-39.936-104.448t-128-32.768q-43.008 0-84.992 6.656t-84.992 17.92q14.336-28.672 25.088-47.616t24.064-29.184q30.72-24.576 158.72-24.576 79.872 0 135.168 13.824t90.624 43.52 51.2 75.264 15.872 108.032l0 200.704zM487.424 743.424q50.176 0 79.872-33.28t29.696-95.744q0-61.44-28.672-93.696t-76.8-32.256q-52.224 0-82.944 33.28t-30.72 94.72q0 58.368 31.744 92.672t77.824 34.304z"  ></path></symbol><symbol id="icon-full" viewBox="0 0 1024 1024"><path d="M639.328 416c8.032 0 16.096-3.008 22.304-9.056l202.624-197.184-0.8 143.808c-0.096 17.696 14.144 32.096 31.808 32.192 0.064 0 0.128 0 0.192 0 17.6 0 31.904-14.208 32-31.808l1.248-222.208c0-0.672-0.352-1.248-0.384-1.92 0.032-0.512 0.288-0.896 0.288-1.408 0.032-17.664-14.272-32-31.968-32.032L671.552 96l-0.032 0c-17.664 0-31.968 14.304-32 31.968C639.488 145.632 653.824 160 671.488 160l151.872 0.224-206.368 200.8c-12.672 12.32-12.928 32.608-0.64 45.248C622.656 412.736 630.976 416 639.328 416z"  ></path><path d="M896.032 639.552 896.032 639.552c-17.696 0-32 14.304-32.032 31.968l-0.224 151.872-200.832-206.4c-12.32-12.64-32.576-12.96-45.248-0.64-12.672 12.352-12.928 32.608-0.64 45.248l197.184 202.624-143.808-0.8c-0.064 0-0.128 0-0.192 0-17.6 0-31.904 14.208-32 31.808-0.096 17.696 14.144 32.096 31.808 32.192l222.24 1.248c0.064 0 0.128 0 0.192 0 0.64 0 1.12-0.32 1.76-0.352 0.512 0.032 0.896 0.288 1.408 0.288l0.032 0c17.664 0 31.968-14.304 32-31.968L928 671.584C928.032 653.952 913.728 639.584 896.032 639.552z"  ></path><path d="M209.76 159.744l143.808 0.8c0.064 0 0.128 0 0.192 0 17.6 0 31.904-14.208 32-31.808 0.096-17.696-14.144-32.096-31.808-32.192L131.68 95.328c-0.064 0-0.128 0-0.192 0-0.672 0-1.248 0.352-1.888 0.384-0.448 0-0.8-0.256-1.248-0.256 0 0-0.032 0-0.032 0-17.664 0-31.968 14.304-32 31.968L96 352.448c-0.032 17.664 14.272 32 31.968 32.032 0 0 0.032 0 0.032 0 17.664 0 31.968-14.304 32-31.968l0.224-151.936 200.832 206.4c6.272 6.464 14.624 9.696 22.944 9.696 8.032 0 16.096-3.008 22.304-9.056 12.672-12.32 12.96-32.608 0.64-45.248L209.76 159.744z"  ></path><path d="M362.368 617.056l-202.624 197.184 0.8-143.808c0.096-17.696-14.144-32.096-31.808-32.192-0.064 0-0.128 0-0.192 0-17.6 0-31.904 14.208-32 31.808l-1.248 222.24c0 0.704 0.352 1.312 0.384 2.016 0 0.448-0.256 0.832-0.256 1.312-0.032 17.664 14.272 32 31.968 32.032L352.448 928c0 0 0.032 0 0.032 0 17.664 0 31.968-14.304 32-31.968s-14.272-32-31.968-32.032l-151.936-0.224 206.4-200.832c12.672-12.352 12.96-32.608 0.64-45.248S375.008 604.704 362.368 617.056z"  ></path></symbol><symbol id="icon-add" viewBox="0 0 1024 1024"><path d="M863.328 482.56l-317.344-1.12L545.984 162.816c0-17.664-14.336-32-32-32s-32 14.336-32 32l0 318.4L159.616 480.064c-0.032 0-0.064 0-0.096 0-17.632 0-31.936 14.24-32 31.904C127.424 529.632 141.728 544 159.392 544.064l322.592 1.152 0 319.168c0 17.696 14.336 32 32 32s32-14.304 32-32l0-318.944 317.088 1.12c0.064 0 0.096 0 0.128 0 17.632 0 31.936-14.24 32-31.904C895.264 496.992 880.96 482.624 863.328 482.56z"  ></path></symbol><symbol id="icon-move" viewBox="0 0 1024 1024"><path d="M863.744 544 163.424 544c-17.664 0-32-14.336-32-32s14.336-32 32-32l700.32 0c17.696 0 32 14.336 32 32S881.44 544 863.744 544z"  ></path></symbol><symbol id="icon-living" viewBox="0 0 1024 1024"><path d="M514.133333 488.533333m-106.666666 0a106.666667 106.666667 0 1 0 213.333333 0 106.666667 106.666667 0 1 0-213.333333 0Z" fill="#666666" ></path><path d="M512 64C264.533333 64 64 264.533333 64 512c0 236.8 183.466667 428.8 416 445.866667v-134.4c-53.333333-59.733333-200.533333-230.4-200.533333-334.933334 0-130.133333 104.533333-234.666667 234.666666-234.666666s234.666667 104.533333 234.666667 234.666666c0 61.866667-49.066667 153.6-145.066667 270.933334l-59.733333 68.266666V960C776.533333 942.933333 960 748.8 960 512c0-247.466667-200.533333-448-448-448z" fill="#666666" ></path></symbol></svg>', l = (l = document.getElementsByTagName("script"))[l.length - 1].getAttribute("data-injectcss");
  if (l && !i.__iconfont__svg__cssinject__) {
    i.__iconfont__svg__cssinject__ = !0;
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (u) {
      console && console.log(u);
    }
  }
  function c() {
    r || (r = !0, n());
  }
  e = function() {
    var u, d, f, h;
    (h = document.createElement("div")).innerHTML = a, a = null, (f = h.getElementsByTagName("svg")[0]) && (f.setAttribute("aria-hidden", "true"), f.style.position = "absolute", f.style.width = 0, f.style.height = 0, f.style.overflow = "hidden", u = f, (d = document.body).firstChild ? (h = u, (f = d.firstChild).parentNode.insertBefore(h, f)) : d.appendChild(u));
  }, document.addEventListener ? ~["complete", "loaded", "interactive"].indexOf(document.readyState) ? setTimeout(e, 0) : (t = function() {
    document.removeEventListener("DOMContentLoaded", t, !1), e();
  }, document.addEventListener("DOMContentLoaded", t, !1)) : document.attachEvent && (n = e, s = i.document, r = !1, (o = function() {
    try {
      s.documentElement.doScroll("left");
    } catch {
      return void setTimeout(o, 50);
    }
    c();
  })(), s.onreadystatechange = function() {
    s.readyState == "complete" && (s.onreadystatechange = null, c());
  });
})(window);
const Fe = G, qe = document;
function Oe({
  el: i,
  data: e,
  direction: t,
  locale: n,
  draggable: s,
  editable: r,
  contextMenu: o,
  contextMenuOption: a,
  toolBar: l,
  nodeMenu: c,
  keypress: u,
  before: d,
  newTopicName: f,
  allowUndo: h,
  primaryLinkStyle: g,
  overflowHidden: p,
  primaryNodeHorizontalGap: v,
  primaryNodeVerticalGap: w,
  mobileMenu: x,
  closeButton: m,
  widthControll: P,
  uploadButton: H,
  nodeDraggable: A,
  scrollContainer: D
}) {
  const O = document.getElementById(i);
  !O || (this.mindElixirBox = O, this.before = d || {}, this.nodeData = e.nodeData, this.linkData = e.linkData || {}, this.expandDeep = e == null ? void 0 : e.expandDeep, this.locale = n, this.contextMenuOption = a, this.contextMenu = o === void 0 ? !0 : o, this.toolBar = l === void 0 ? !0 : l, this.nodeMenu = c === void 0 ? !0 : c, this.keypress = u === void 0 ? !0 : u, this.closeButton = m === void 0 ? !1 : m, this.widthControll = P === void 0 ? !0 : P, this.mobileMenu = x, this.direction = e.direction !== void 0 ? e.direction : typeof t == "number" ? t : 1, this.draggable = s === void 0 ? !0 : s, this.newTopicName = f, this.editable = r === void 0 ? !0 : r, this.allowUndo = h === void 0 ? !0 : h, this.currentNode = null, this.currentLink = null, this.inputDiv = null, this.scaleVal = 1, this.tempDirection = null, this.primaryLinkStyle = g || 0, this.overflowHidden = p, this.primaryNodeHorizontalGap = v, this.primaryNodeVerticalGap = w, this.uploadButton = H === void 0 ? !0 : H, this.nodeDraggable = A === void 0 ? !0 : A, this.scrollContainer = D, this.bus = new vi(), this.bus.addListener("operation", (y) => {
    if (this.isUndo) {
      this.isUndo = !1;
      return;
    }
    ["moveNode", "removeNode", "addChild", "finishEdit", "editStyle", "editTags", "editIcons"].includes(
      y.name
    ) && this.history.push(y);
  }), this.history = [], this.isUndo = !1, this.undo = function() {
    const y = this.history.pop();
    !y || (this.isUndo = !0, y.name === "moveNode" ? this.moveNode(
      Fe(y.obj.fromObj.id),
      Fe(y.obj.originParentId)
    ) : y.name === "removeNode" ? y.originSiblingId ? this.insertBefore(Fe(y.originSiblingId), y.obj) : this.addChild(Fe(y.originParentId), y.obj) : y.name === "addChild" || y.name === "copyNode" ? this.removeNode(Fe(y.obj.id)) : y.name === "finishEdit" ? this.setNodeTopic(Fe(y.obj.id), y.origin) : this.isUndo = !1);
  });
}
function _(i) {
  return async function(...e) {
    (!this.before[i.name] || await this.before[i.name].apply(this, e)) && i.apply(this, e);
  };
}
Oe.prototype = {
  addParentLink: ce,
  getObjById: Fn,
  generateNewObj: Pi,
  generateNewSummaryObj: wi,
  insertSibling: _(Gr),
  insertBefore: _(Ur),
  insertParent: _(Jr),
  addSummary: _(Qr),
  addChild: _(_r),
  copyNode: _($r),
  moveNode: _(io),
  removeNode: _(no),
  moveUpNode: _(eo),
  moveDownNode: _(to),
  beginEdit: _(oo),
  moveNodeBefore: _(so),
  moveNodeAfter: _(ro),
  updateNodeStyle: Fr,
  updateNodeTags: qr,
  updateNodeIcons: Ir,
  updateNodeHyperLink: Wr,
  updateNodeRemark: Yr,
  processPrimaryNode: lo,
  setNodeTopic: ao,
  createLink: co,
  removeLink: uo,
  selectLink: ho,
  hideLinkController: fo,
  showLinkController: go,
  layout: Fi,
  linkDiv: po,
  createInputDiv: Ri,
  shapeTpc: ke,
  createChildren: Zi,
  createGroup: Si,
  createTop: Ei,
  createTopic: ki,
  createSummary: ji,
  selectNode: pr,
  unselectNode: vr,
  selectNextSibling: mr,
  selectPrevSibling: yr,
  selectFirstChild: Pr,
  selectParent: wr,
  getAllDataString: br,
  getAllData: xr,
  getAllDataWithAutoHide: Hr,
  getAllDataMd: Ar,
  scale: Lr,
  toCenter: Mr,
  toTopLeft: Br,
  focusNode: Cr,
  cancelFocus: Sr,
  initLeft: jr,
  initRight: Er,
  initSide: kr,
  setLocale: Vr,
  enableEdit: Dr,
  disableEdit: zr,
  expandNode: Rr,
  refresh: Zr,
  exportSvg: fr,
  exportSvgDom: dr,
  exportPng: gr,
  anotherExportPng: ba,
  init: function(i, e) {
    i && (this.nodeData = i), e && (this.expandDeep = e), ce(this.nodeData), console.log("ME_version " + Oe.version), console.log(this), this.mindElixirBox.className.indexOf("mind-elixir") === -1 && (this.mindElixirBox.className += "mind-elixir"), this.mindElixirBox.innerHTML = "", this.container = qe.createElement("div"), this.container.className = "map-container", this.overflowHidden && (this.container.style.overflow = "hidden"), this.map = qe.createElement("div"), this.map.className = "map-canvas", this.map.setAttribute("tabindex", "0"), this.container.appendChild(this.map), this.mindElixirBox.appendChild(this.container), this.root = qe.createElement("root"), this.box = qe.createElement("children"), this.box.className = "mindbox", this.svg2nd = tt("svg2nd"), this.linkController = tt("linkcontroller"), this.P2 = qe.createElement("div"), this.P3 = qe.createElement("div"), this.P2.className = this.P3.className = "circle", this.line1 = yn(0, 0, 0, 0), this.line2 = yn(0, 0, 0, 0), this.linkController.appendChild(this.line1), this.linkController.appendChild(this.line2), this.linkSvgGroup = tt("topiclinks"), this.map.appendChild(this.root), this.map.appendChild(this.box), this.map.appendChild(this.svg2nd), this.map.appendChild(this.linkController), this.map.appendChild(this.linkSvgGroup), this.map.appendChild(this.P2), this.map.appendChild(this.P3), this.toolBar && zo(this), this.nodeMenu && la(this), this.keypress && ha(this), Po(this), mi() && this.mobileMenu ? fa(this) : this.contextMenu && mo(this, this.contextMenuOption), this.draggable && ua(this), rn(this.nodeData, 0, this.expandDeep || 2), this.layout(), this.linkDiv(), this.toTopLeft(), vo(this);
  }
};
Oe.LEFT = 0;
Oe.RIGHT = 1;
Oe.SIDE = 2;
Oe.version = "0.17.0";
Oe.E = G;
Oe.new = (i) => ({
  nodeData: {
    id: ot(),
    topic: i || "new topic",
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
  Oe as default
};
//# sourceMappingURL=mind.mjs.map
