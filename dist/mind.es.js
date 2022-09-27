const LEFT = 0;
const RIGHT = 1;
const SIDE = 2;
const GAP = 15;
const PRIMARY_NODE_HORIZONTAL_GAP = 65;
const PRIMARY_NODE_VERTICAL_GAP = 25;
function encodeHTML(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}
const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const rgbHex = (rgb) => {
  return rgb.replace(/\brgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g, function($0, $1, $2, $3) {
    return "#" + ("0" + Number($1).toString(16)).substr(-2) + ("0" + Number($2).toString(16)).substr(-2) + ("0" + Number($3).toString(16)).substr(-2);
  });
};
const getObjById = function(id, data) {
  data = data || this.nodeData;
  if (data.id === id) {
    return data;
  } else if (data.children && data.children.length) {
    for (let i = 0; i < data.children.length; i++) {
      const res = getObjById(id, data.children[i]);
      if (res)
        return res;
    }
  } else {
    return null;
  }
};
const addParentLink = (data, parent) => {
  data.parent = parent;
  if (data.children) {
    for (let i = 0; i < data.children.length; i++) {
      addParentLink(data.children[i], data);
    }
  }
};
function refreshIds(data) {
  data.id = generateUUID();
  if (data.children) {
    for (let i = 0; i < data.children.length; i++) {
      refreshIds(data.children[i]);
    }
  }
}
const throttle = (fn, wait) => {
  var pre = Date.now();
  return function() {
    var context = this;
    var args = arguments;
    var now = Date.now();
    if (now - pre >= wait) {
      fn.apply(context, args);
      pre = Date.now();
    }
  };
};
function getArrowPoints(p3x, p3y, p4x, p4y) {
  const deltay = p4y - p3y;
  const deltax = p3x - p4x;
  let angle = Math.atan(Math.abs(deltay) / Math.abs(deltax)) / 3.14 * 180;
  if (deltax < 0 && deltay > 0) {
    angle = 180 - angle;
  }
  if (deltax < 0 && deltay < 0) {
    angle = 180 + angle;
  }
  if (deltax > 0 && deltay < 0) {
    angle = 360 - angle;
  }
  const arrowLength = 20;
  const arrowAngle = 30;
  var a1 = angle + arrowAngle;
  const a2 = angle - arrowAngle;
  return {
    x1: p4x + Math.cos(Math.PI * a1 / 180) * arrowLength,
    y1: p4y - Math.sin(Math.PI * a1 / 180) * arrowLength,
    x2: p4x + Math.cos(Math.PI * a2 / 180) * arrowLength,
    y2: p4y - Math.sin(Math.PI * a2 / 180) * arrowLength
  };
}
function calcP1(fromData, p2x, p2y) {
  let x, y;
  const k = (fromData.cy - p2y) / (p2x - fromData.cx);
  if (k > fromData.h / fromData.w || k < -fromData.h / fromData.w) {
    if (fromData.cy - p2y < 0) {
      x = fromData.cx - fromData.h / 2 / k;
      y = fromData.cy + fromData.h / 2;
    } else {
      x = fromData.cx + fromData.h / 2 / k;
      y = fromData.cy - fromData.h / 2;
    }
  } else {
    if (fromData.cx - p2x < 0) {
      x = fromData.cx + fromData.w / 2;
      y = fromData.cy - fromData.w * k / 2;
    } else {
      x = fromData.cx - fromData.w / 2;
      y = fromData.cy + fromData.w * k / 2;
    }
  }
  return {
    x,
    y
  };
}
function calcP4(toData, p3x, p3y) {
  let x, y;
  const k = (toData.cy - p3y) / (p3x - toData.cx);
  if (k > toData.h / toData.w || k < -toData.h / toData.w) {
    if (toData.cy - p3y < 0) {
      x = toData.cx - toData.h / 2 / k;
      y = toData.cy + toData.h / 2;
    } else {
      x = toData.cx + toData.h / 2 / k;
      y = toData.cy - toData.h / 2;
    }
  } else {
    if (toData.cx - p3x < 0) {
      x = toData.cx + toData.w / 2;
      y = toData.cy - toData.w * k / 2;
    } else {
      x = toData.cx - toData.w / 2;
      y = toData.cy + toData.w * k / 2;
    }
  }
  return {
    x,
    y
  };
}
function generateUUID() {
  return (new Date().getTime().toString(16) + Math.random().toString(16).substr(2)).substr(2, 16);
}
function generateNewObj() {
  const id = generateUUID();
  return {
    topic: this.newTopicName || "new node",
    id
  };
}
function generateNewSummaryObj() {
  const id = generateUUID();
  return {
    topic: this.newTopicName || "new node",
    id,
    type: "summary",
    summary: {
      topicId: id,
      range: this.currentSummaryNodeArr.map((val) => val.nodeObj.id)
    }
  };
}
function checkMoveValid(from, to) {
  let valid = true;
  while (to.parent) {
    if (to.parent === from) {
      valid = false;
      break;
    }
    to = to.parent;
  }
  return valid;
}
function moveUpObj(obj) {
  const childrenList = obj.parent.children;
  const index2 = childrenList.indexOf(obj);
  const t = childrenList[index2];
  if (index2 === 0) {
    childrenList[index2] = childrenList[childrenList.length - 1];
    childrenList[childrenList.length - 1] = t;
  } else {
    childrenList[index2] = childrenList[index2 - 1];
    childrenList[index2 - 1] = t;
  }
}
function moveDownObj(obj) {
  const childrenList = obj.parent.children;
  const index2 = childrenList.indexOf(obj);
  const t = childrenList[index2];
  if (index2 === childrenList.length - 1) {
    childrenList[index2] = childrenList[0];
    childrenList[0] = t;
  } else {
    childrenList[index2] = childrenList[index2 + 1];
    childrenList[index2 + 1] = t;
  }
}
function removeNodeObj(obj) {
  const childrenList = obj.parent.children;
  const index2 = childrenList.indexOf(obj);
  childrenList.splice(index2, 1);
  return childrenList.length;
}
function insertNodeObj(obj, newObj) {
  const childrenList = obj.parent.children;
  const index2 = childrenList.indexOf(obj);
  childrenList.splice(index2 + 1, 0, newObj);
}
function insertBeforeNodeObj(obj, newObj) {
  const childrenList = obj.parent.children;
  const index2 = childrenList.indexOf(obj);
  childrenList.splice(index2, 0, newObj);
}
function insertParentNodeObj(obj, newObj) {
  const childrenList = obj.parent.children;
  const index2 = childrenList.indexOf(obj);
  childrenList[index2] = newObj;
  newObj.children = [obj];
}
function moveNodeObj(from, to) {
  removeNodeObj(from);
  if (to.children)
    to.children.push(from);
  else
    to.children = [from];
}
function moveNodeBeforeObj(from, to) {
  removeNodeObj(from);
  const childrenList = to.parent.children;
  let toIndex = 0;
  for (let i = 0; i < childrenList.length; i++) {
    if (childrenList[i] === to) {
      toIndex = i;
      break;
    }
  }
  childrenList.splice(toIndex, 0, from);
}
function moveNodeAfterObj(from, to) {
  removeNodeObj(from);
  const childrenList = to.parent.children;
  let toIndex = 0;
  for (let i = 0; i < childrenList.length; i++) {
    if (childrenList[i] === to) {
      toIndex = i;
      break;
    }
  }
  childrenList.splice(toIndex + 1, 0, from);
}
const dragMoveHelper = {
  afterMoving: false,
  mousedown: false,
  lastX: null,
  lastY: null,
  onMove(e, container) {
    if (this.mousedown) {
      this.afterMoving = true;
      if (!this.lastX) {
        this.lastX = e.pageX;
        this.lastY = e.pageY;
        return;
      }
      const deltaX = this.lastX - e.pageX;
      const deltaY = this.lastY - e.pageY;
      container.scrollTo(container.scrollLeft + deltaX, container.scrollTop + deltaY);
      this.lastX = e.pageX;
      this.lastY = e.pageY;
    }
  },
  clear() {
    this.afterMoving = false;
    this.mousedown = false;
    this.lastX = null;
    this.lastY = null;
  }
};
function LinkDragMoveHelper(dom) {
  this.dom = dom;
  this.mousedown = false;
  this.lastX = null;
  this.lastY = null;
}
LinkDragMoveHelper.prototype.init = function(map, cb) {
  this.handleMouseMove = (e) => {
    e.stopPropagation();
    if (this.mousedown) {
      if (!this.lastX) {
        this.lastX = e.pageX;
        this.lastY = e.pageY;
        return;
      }
      const deltaX = this.lastX - e.pageX;
      const deltaY = this.lastY - e.pageY;
      cb(deltaX, deltaY);
      this.lastX = e.pageX;
      this.lastY = e.pageY;
    }
  };
  this.handleMouseDown = (e) => {
    e.stopPropagation();
    this.mousedown = true;
  };
  this.handleClear = (e) => {
    e.stopPropagation();
    this.clear();
  };
  map.addEventListener("mousemove", this.handleMouseMove);
  map.addEventListener("mouseleave", this.handleClear);
  map.addEventListener("mouseup", this.handleClear);
  this.dom.addEventListener("mousedown", this.handleMouseDown);
};
LinkDragMoveHelper.prototype.destory = function(map) {
  map.removeEventListener("mousemove", this.handleMouseMove);
  map.removeEventListener("mouseleave", this.handleClear);
  map.removeEventListener("mouseup", this.handleClear);
  this.dom.removeEventListener("mousedown", this.handleMouseDown);
};
LinkDragMoveHelper.prototype.clear = function() {
  this.mousedown = false;
  this.lastX = null;
  this.lastY = null;
};
const $d$5 = document;
const findEle = (id, instance) => {
  const scope = instance ? instance.mindElixirBox : $d$5;
  return scope.querySelector(`[data-nodeid=me${id}]`);
};
function resizeNode(widthControll, tpc2, anotherWidthControll) {
  widthControll.onpointerdown = (eDown) => {
    if (!tpc2.classList.contains("selected"))
      return;
    const startX = eDown.clientX;
    const width = tpc2.clientWidth - Number(getComputedStyle(tpc2).paddingLeft.replace("px", "")) - Number(getComputedStyle(tpc2).paddingRight.replace("px", ""));
    widthControll.onpointermove = (eMove) => {
      const endX = eMove.clientX;
      tpc2.style.width = (width + endX - startX).toString() + "px";
      widthControll.style.height = anotherWidthControll.style.height = tpc2.clientHeight.toString() + "px";
      if (!tpc2.nodeObj.style)
        tpc2.nodeObj.style = {};
      tpc2.nodeObj.style.width = tpc2.style.width;
      tpc2.nodeObj.style.controllWidth = widthControll.style.height;
      eMove.preventDefault();
    };
    widthControll.setPointerCapture(eDown.pointerId);
    eDown.preventDefault();
  };
  widthControll.onpointerup = (eUp) => {
    var _a;
    widthControll.onpointermove = null;
    widthControll.releasePointerCapture(eUp.pointerId);
    (_a = this == null ? void 0 : this.linkDiv) == null ? void 0 : _a.call(this);
  };
}
const shapeTpc = function(tpc2, nodeObj) {
  var _a;
  const widthControllRight = $d$5.createElement("widthControllRight");
  const widthControllLeft = $d$5.createElement("widthControllLeft");
  tpc2.textContent = nodeObj.topic;
  if (this == null ? void 0 : this.widthControll) {
    resizeNode.call(this, widthControllLeft, tpc2, widthControllRight);
    resizeNode.call(this, widthControllRight, tpc2, widthControllLeft);
    tpc2.appendChild(widthControllRight);
    tpc2.appendChild(widthControllLeft);
  }
  if (nodeObj.style) {
    tpc2.style.color = nodeObj.style.color || "#2c3e50";
    tpc2.style.background = nodeObj.style.background ? nodeObj.style.background : ((_a = nodeObj == null ? void 0 : nodeObj.parent) == null ? void 0 : _a.root) ? "#ffffff" : "inherit";
    if (/[a-z]/i.test(nodeObj.style.fontSize))
      tpc2.style.fontSize = nodeObj.style.fontSize;
    else
      tpc2.style.fontSize = nodeObj.style.fontSize + "px";
    tpc2.style.fontWeight = nodeObj.style.fontWeight || "normal";
    tpc2.style.width = nodeObj.style.width || "fit-content";
    widthControllLeft.style.height = widthControllRight.style.height = nodeObj.style.controllWidth || "29px";
  }
  if (nodeObj.image) {
    const images = nodeObj.image;
    images.forEach((val) => {
      const imgContainer = $d$5.createElement("img");
      imgContainer.className = "image";
      imgContainer.src = val.url;
      imgContainer.style.width = val.width + "px";
      imgContainer.style.height = val.height + "px";
      imgContainer.style.display = "block";
      tpc2.appendChild(imgContainer);
    });
  }
  if (nodeObj.hyperLink) {
    const linkContainer = $d$5.createElement("a");
    linkContainer.className = "hyper-link";
    linkContainer.target = "_blank";
    linkContainer.innerHTML = '<svg t="1662346495524" style="font-size:20px;margin-left: 3px" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2372" width="22" height="22"><path d="M573.44 640a187.68 187.68 0 0 1-132.8-55.36L416 560l45.28-45.28 24.64 24.64a124.32 124.32 0 0 0 170.08 5.76l1.44-1.28a49.44 49.44 0 0 0 4-3.84l101.28-101.28a124.16 124.16 0 0 0 0-176l-1.92-1.92a124.16 124.16 0 0 0-176 0l-51.68 51.68a49.44 49.44 0 0 0-3.84 4l-20 24.96-49.92-40L480 276.32a108.16 108.16 0 0 1 8.64-9.28l51.68-51.68a188.16 188.16 0 0 1 266.72 0l1.92 1.92a188.16 188.16 0 0 1 0 266.72l-101.28 101.28a112 112 0 0 1-8.48 7.84 190.24 190.24 0 0 1-125.28 48z" fill="#002fa7" p-id="2373"></path><path d="M350.72 864a187.36 187.36 0 0 1-133.28-55.36l-1.92-1.92a188.16 188.16 0 0 1 0-266.72l101.28-101.28a112 112 0 0 1 8.48-7.84 188.32 188.32 0 0 1 258.08 7.84L608 464l-45.28 45.28-24.64-24.64A124.32 124.32 0 0 0 368 478.88l-1.44 1.28a49.44 49.44 0 0 0-4 3.84l-101.28 101.28a124.16 124.16 0 0 0 0 176l1.92 1.92a124.16 124.16 0 0 0 176 0l51.68-51.68a49.44 49.44 0 0 0 3.84-4l20-24.96 50.08 40-20.8 25.12a108.16 108.16 0 0 1-8.64 9.28l-51.68 51.68A187.36 187.36 0 0 1 350.72 864z" fill="#002fa7" p-id="2374"></path></svg>';
    linkContainer.href = nodeObj.hyperLink;
    tpc2.appendChild(linkContainer);
  }
  if (nodeObj.remark) {
    const content = $d$5.createElement("div");
    content.className = "content hidden";
    content.textContent = nodeObj.remark;
    const remarkContainer = $d$5.createElement("div");
    remarkContainer.className = "remark";
    remarkContainer.innerHTML = `<svg t="1659682144612" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2580" width="200" height="200"><path d="M625.728 57.472c19.264 0 34.688 6.848 48.128 20.16l208.96 207.04c14.272 13.12 21.568 29.568 21.568 49.28v504.576c0 71.808-56.256 127.744-128.576 127.744H252.16c-72.128 0-128.576-55.68-128.576-127.744V184.704c0-71.68 56.256-127.232 128.576-127.232z m-34.304 76.8H252.16c-30.144 0-51.776 21.376-51.776 50.432v653.824c0 29.44 21.888 50.944 51.776 50.944h523.648c30.016 0 51.84-21.632 51.84-50.944l-0.128-464.512H687.488A96 96 0 0 1 591.936 287.36l-0.448-9.216V134.208zM665.6 704a38.4 38.4 0 0 1 0 76.8H294.4a38.4 38.4 0 0 1 0-76.8h371.2z m0-192a38.4 38.4 0 0 1 0 76.8H294.4a38.4 38.4 0 0 1 0-76.8h371.2z m-192-192a38.4 38.4 0 1 1 0 76.8H294.4a38.4 38.4 0 1 1 0-76.8h179.2z m181.824-152.512v110.592a32 32 0 0 0 26.24 31.488l5.76 0.512h111.872L655.424 167.424z" p-id="2581"></path></svg>`;
    let delayTask;
    content.onmouseover = () => {
      clearTimeout(delayTask);
    };
    remarkContainer.onmouseover = () => {
      content.classList.remove("hidden");
    };
    content.onmouseleave = () => {
      delayTask = setTimeout(() => {
        if (!content.classList.contains("hidden")) {
          content.classList.add("hidden");
        }
      }, 300);
    };
    remarkContainer.onmouseleave = () => {
      delayTask = setTimeout(() => {
        if (!content.classList.contains("hidden")) {
          content.classList.add("hidden");
        }
      }, 300);
    };
    remarkContainer.appendChild(content);
    tpc2.appendChild(remarkContainer);
  }
  if (nodeObj.icons) {
    const iconsContainer = $d$5.createElement("span");
    iconsContainer.className = "icons";
    iconsContainer.innerHTML = nodeObj.icons.filter((icon) => icon !== "").map((icon) => `<span>${encodeHTML(icon)}</span>`).join("");
    tpc2.appendChild(iconsContainer);
  }
  if (nodeObj.linkJump) {
    nodeObj.linkJump.forEach((val) => {
      const button = document.createElement("a");
      button.className = "linkJump";
      button.title = val.title;
      button.innerHTML = '<svg t="1661493526135" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2220" width="16" height="16"><path d="M1001.175714 593.762001L700.806246 293.324796a76.091491 76.091491 0 0 0-107.566725 0 76.023754 76.023754 0 0 0 0 107.544146l171.713884 171.826779H152.653982v-115.288769a76.046333 76.046333 0 0 0-152.115245 0v152.092666c0 6.931777 2.145012 13.253918 3.951338 19.621218-1.806326 6.389879-3.951339 12.644283-3.951338 19.621218a76.068912 76.068912 0 0 0 76.046333 76.068912h686.020111L593.239521 894.131468a76.046333 76.046333 0 1 0 107.566725 107.566726L1001.175714 701.328726a76.091491 76.091491 0 0 0 0-107.566725z" fill="#1296db" p-id="2221"></path></svg>';
      button.onclick = () => {
        moveToNode.call(this, val.toId);
      };
      tpc2.appendChild(button);
    });
  }
  if (nodeObj.tags) {
    const tagsContainer = $d$5.createElement("div");
    tagsContainer.className = "tags";
    tagsContainer.innerHTML = nodeObj.tags.filter((tag) => tag !== "").map((tag) => `<span>${encodeHTML(tag)}</span>`).join("");
    tpc2.appendChild(tagsContainer);
  }
};
function moveToNode(id) {
  let toNode = this.container.querySelector(`tpc[data-nodeid=me${id}]`);
  if (!toNode) {
    findUnExpandedParent(this.nodeData, id);
    this.layout();
    this.linkDiv();
    toNode = this.container.querySelector(`tpc[data-nodeid=me${id}]`);
  }
  toNode.scrollIntoView({ block: "center", behavior: "smooth" });
  toNode.className = "blink";
  setTimeout(() => {
    toNode.classList.remove("blink");
  }, 3e3);
}
function findUnExpandedParent(node2, toId) {
  if (node2.id === toId) {
    return true;
  }
  let flag = false;
  for (const val of node2.children || []) {
    if (findUnExpandedParent(val, toId))
      flag = true;
  }
  if (flag)
    node2.expanded = true;
  return flag;
}
const createGroup = function(nodeObj, omitChildren) {
  const grp = $d$5.createElement("GRP");
  const top = this.createTop(nodeObj);
  grp.appendChild(top);
  if (!omitChildren && nodeObj.children && nodeObj.children.length > 0) {
    top.appendChild(createExpander(nodeObj.expanded));
    if (nodeObj.expanded !== false) {
      const [children, smyChild] = this.createChildren(nodeObj.children);
      grp.appendChild(children);
    }
  }
  return { grp, top };
};
const createSummary = function(nodeObj, omitChildren) {
  const smy = $d$5.createElement("SMY");
  const top = this.createTop(nodeObj);
  smy.appendChild(top);
  if (!omitChildren && nodeObj.children && nodeObj.children.length > 0) {
    top.appendChild(createExpander(nodeObj.expanded));
    if (nodeObj.expanded !== false) {
      this.createChildren(nodeObj.children);
    }
  }
  return { smy, top };
};
const createTop = function(nodeObj) {
  const top = $d$5.createElement("t");
  const tpc2 = this.createTopic(nodeObj);
  shapeTpc.call(this, tpc2, nodeObj);
  top.appendChild(tpc2);
  return top;
};
const createTopic = function(nodeObj) {
  const topic = $d$5.createElement("tpc");
  topic.nodeObj = nodeObj;
  topic.dataset.nodeid = "me" + nodeObj.id;
  topic.draggable = this.draggable;
  return topic;
};
function selectText(div) {
  const range = $d$5.createRange();
  range.selectNodeContents(div);
  const getSelection = window.getSelection();
  if (getSelection) {
    getSelection.removeAllRanges();
    getSelection.addRange(range);
  }
}
function createInputDiv(tpc2) {
  var _a, _b, _c, _d, _e, _f, _g;
  console.time("createInputDiv");
  if (!tpc2)
    return;
  let div = $d$5.createElement("div");
  const origin = tpc2.childNodes[0].textContent;
  tpc2.appendChild(div);
  div.id = "input-box";
  div.contentEditable = "true";
  div.spellcheck = false;
  div.textContent = origin;
  if (tpc2.nodeObj.image) {
    const images = tpc2.nodeObj.image;
    images.forEach((val) => {
      const imgContainer = $d$5.createElement("img");
      imgContainer.src = val.url;
      imgContainer.style.width = val.width + "px";
      imgContainer.style.display = "block";
      div.appendChild(imgContainer);
    });
  }
  div.style.cssText = `min-width:${tpc2.offsetWidth - 22}px;min-height:${tpc2.clientHeight - 16}px`;
  if ((_b = (_a = tpc2.nodeObj) == null ? void 0 : _a.style) == null ? void 0 : _b.width) {
    div.style.width = "auto";
  }
  if (((_d = (_c = tpc2.nodeObj) == null ? void 0 : _c.style) == null ? void 0 : _d.color) === "#ffffff" || ((_e = tpc2.nodeObj) == null ? void 0 : _e.id) === "root" && !((_g = (_f = tpc2.nodeObj) == null ? void 0 : _f.style) == null ? void 0 : _g.color)) {
    div.style.color = "#2c3e50";
  }
  if (this.direction === LEFT)
    div.style.right = "0";
  div.focus();
  selectText(div);
  this.inputDiv = div;
  this.bus.fire("operation", {
    name: "beginEdit",
    obj: tpc2.nodeObj
  });
  div.addEventListener("keydown", (e) => {
    e.stopPropagation();
    const key = e.key;
    if (key === "Enter" || key === "Tab") {
      if (e.shiftKey)
        return;
      e.preventDefault();
      this.inputDiv.blur();
      this.map.focus();
    }
  });
  div.addEventListener("blur", () => {
    if (!div)
      return;
    const node2 = tpc2.nodeObj;
    const topic = div.textContent.trim();
    node2.image = [];
    div.childNodes.forEach((val) => {
      if (val.nodeName === "IMG") {
        node2.image.push({
          url: val.src,
          width: val.width,
          height: val.height
        });
      }
    });
    if (topic === "" && node2.image.length === 0)
      node2.topic = origin;
    else
      node2.topic = topic;
    div.remove();
    this.inputDiv = div = null;
    if (topic === origin && node2.image.length === 0)
      return;
    tpc2.childNodes[0].textContent = node2.topic;
    const widthControllLeft = tpc2.querySelector("widthControllRight");
    const widthControllRight = tpc2.querySelector("widthControllRight");
    if (!node2.style)
      node2.style = {};
    node2.style.controllWidth = widthControllLeft.style.height = widthControllRight.style.height = tpc2.clientHeight.toString() + "px";
    delete node2.style.width;
    this.shapeTpc(tpc2, node2);
    this.linkDiv();
    updateLinkJumpTitle.call(this, this.nodeData, node2.id, node2.topic);
    this.bus.fire("operation", {
      name: "finishEdit",
      obj: node2,
      origin
    });
  });
  console.timeEnd("createInputDiv");
}
function updateLinkJumpTitle(node2, id, topic) {
  var _a;
  (_a = node2 == null ? void 0 : node2.linkJump) == null ? void 0 : _a.forEach(({ toId }, index2) => {
    if (toId === id) {
      node2.linkJump[index2].title = topic;
      const button = this.container.querySelector(`tpc[data-nodeid=me${node2.id}] .linkJump`);
      button.title = topic;
    }
  });
  for (const val of node2.children || []) {
    updateLinkJumpTitle.call(this, val, id, topic);
  }
}
const createExpander = function(expanded) {
  const expander = $d$5.createElement("epd");
  expander.innerText = expanded !== false ? "-" : "+";
  expander.expanded = expanded !== false;
  expander.className = expanded !== false ? "minus" : "";
  return expander;
};
function createChildren(data, container, direction) {
  let chldr;
  if (container) {
    chldr = container;
  } else {
    chldr = $d$5.createElement("children");
  }
  let smyEle = [];
  for (let i = 0; i < data.length; i++) {
    const nodeObj = data[i];
    if ((nodeObj == null ? void 0 : nodeObj.type) === "summary") {
      const { smy } = this.createSummary(nodeObj);
      if (nodeObj.children && nodeObj.children.length > 0) {
        if (nodeObj.expanded !== false) {
          const [children, smyChild] = this.createChildren(nodeObj.children);
          smy.appendChild(children);
          if (smyChild) {
            smyChild.forEach((val) => {
              smy.appendChild(val);
            });
          }
        }
      }
      smyEle.push(smy);
      continue;
    }
    const grp = $d$5.createElement("GRP");
    if (direction === LEFT) {
      grp.className = "lhs";
    } else if (direction === RIGHT) {
      grp.className = "rhs";
    } else if (direction === SIDE) {
      if (nodeObj.direction === LEFT) {
        grp.className = "lhs";
      } else if (nodeObj.direction === RIGHT) {
        grp.className = "rhs";
      }
    }
    const top = this.createTop(nodeObj);
    if (nodeObj.children && nodeObj.children.length > 0) {
      top.appendChild(createExpander(nodeObj.expanded));
      grp.appendChild(top);
      if (nodeObj.expanded !== false) {
        const [children, smy] = this.createChildren(nodeObj.children);
        grp.appendChild(children);
        if (smy) {
          smy.forEach((val) => {
            var _a;
            if (!((_a = grp.children) == null ? void 0 : _a[2])) {
              grp.appendChild($d$5.createElement("smychildren"));
            }
            grp.children[2].appendChild(val);
          });
        }
      }
    } else {
      grp.appendChild(top);
    }
    chldr.appendChild(grp);
  }
  return [chldr, smyEle];
}
function layout() {
  console.time("layout");
  this.root.innerHTML = "";
  this.box.innerHTML = "";
  const tpc2 = this.createTopic(this.nodeData);
  shapeTpc.call(this, tpc2, this.nodeData);
  tpc2.draggable = false;
  this.root.appendChild(tpc2);
  const primaryNodes = this.nodeData.children;
  if (!primaryNodes || primaryNodes.length === 0)
    return;
  if (this.direction === SIDE) {
    let lcount = 0;
    let rcount = 0;
    primaryNodes.map((node2) => {
      if (node2.direction === void 0) {
        if (lcount <= rcount) {
          node2.direction = LEFT;
          lcount += 1;
        } else {
          node2.direction = RIGHT;
          rcount += 1;
        }
      } else {
        if (node2.direction === LEFT) {
          lcount += 1;
        } else {
          rcount += 1;
        }
      }
    });
  }
  this.createChildren(this.nodeData.children, this.box, this.direction);
  console.timeEnd("layout");
}
const $d$4 = document;
const svgNS = "http://www.w3.org/2000/svg";
const createMainPath = function(d) {
  const path2 = $d$4.createElementNS(svgNS, "path");
  path2.setAttribute("d", d);
  path2.setAttribute("stroke", "#555");
  path2.setAttribute("fill", "none");
  path2.setAttribute("stroke-width", "1");
  path2.setAttribute("stroke-linecap", "square");
  path2.setAttribute("transform", "translate(0.5,-0.5)");
  return path2;
};
const createLinkSvg = function(klass) {
  const svg = $d$4.createElementNS(svgNS, "svg");
  svg.setAttribute("class", klass);
  return svg;
};
const createSvgPath = function(d) {
  const path2 = $d$4.createElementNS(svgNS, "path");
  path2.setAttribute("d", d);
  path2.setAttribute("fill", "none");
  path2.setAttribute("stroke-linecap", "square");
  path2.setAttribute("stroke", "#F6A04D");
  path2.setAttribute("stroke-width", "3");
  path2.setAttribute("transform", "translate(0.5,-0.5)");
  return path2;
};
const createLine = function(x1, y1, x2, y2) {
  const line = $d$4.createElementNS(svgNS, "line");
  line.setAttribute("x1", x1.toString());
  line.setAttribute("y1", y1.toString());
  line.setAttribute("x2", x2.toString());
  line.setAttribute("y2", y2.toString());
  line.setAttribute("stroke", "#bbb");
  line.setAttribute("fill", "none");
  line.setAttribute("stroke-width", "2");
  return line;
};
const createPath = function(d) {
  const path2 = $d$4.createElementNS(svgNS, "path");
  path2.setAttribute("d", d);
  path2.setAttribute("stroke", "#555");
  path2.setAttribute("fill", "none");
  path2.setAttribute("stroke-linecap", "square");
  path2.setAttribute("stroke-width", "1");
  path2.setAttribute("transform", "translate(0.5,-0.5)");
  return path2;
};
const createSvgGroup = function(d, arrowd) {
  const g = $d$4.createElementNS(svgNS, "g");
  const path2 = $d$4.createElementNS(svgNS, "path");
  const arrow = $d$4.createElementNS(svgNS, "path");
  arrow.setAttribute("d", arrowd);
  arrow.setAttribute("stroke", "rgb(235, 95, 82)");
  arrow.setAttribute("fill", "none");
  arrow.setAttribute("stroke-linecap", "cap");
  arrow.setAttribute("stroke-width", "2");
  path2.setAttribute("d", d);
  path2.setAttribute("stroke", "rgb(235, 95, 82)");
  path2.setAttribute("fill", "none");
  path2.setAttribute("stroke-linecap", "cap");
  path2.setAttribute("stroke-width", "2");
  g.appendChild(path2);
  g.appendChild(arrow);
  return g;
};
let $d$3 = document;
let maxTop = 1e4;
let maxBottom = 1e4;
let maxLeft = 1e4;
let maxRight = 1e4;
let imgPadding = 40;
let head = `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">`;
function init() {
  maxTop = 1e4;
  maxBottom = 1e4;
  maxLeft = 1e4;
  maxRight = 1e4;
  imgPadding = 40;
}
function generateSvgDom() {
  init();
  let primaryNodes = $d$3.querySelectorAll(".mindbox > grp, root");
  let svgContent = "";
  for (let i = 0; i < primaryNodes.length; i++) {
    let primaryNode = primaryNodes[i];
    let rect = primaryNode.getBoundingClientRect();
    let top = primaryNode.offsetTop;
    let bottom = top + rect.height;
    let left = primaryNode.offsetLeft;
    let right = left + rect.width;
    if (top < maxTop) {
      maxTop = top;
    }
    if (bottom > maxBottom) {
      maxBottom = bottom;
    }
    if (left < maxLeft) {
      maxLeft = left;
    }
    if (right > maxRight) {
      maxRight = right;
    }
    svgContent += PrimaryToSvg(primaryNode);
  }
  console.log(maxTop, maxBottom, maxLeft, maxRight);
  svgContent += RootToSvg();
  let svgHeight = maxBottom - maxTop + imgPadding * 2;
  let svgWidth = maxRight - maxLeft + imgPadding * 2;
  let svgFile = createSvg(svgHeight, svgWidth);
  svgContent = `<rect x="0" y="0" width="${svgWidth}" height="${svgHeight}" fill="#f6f6f6"></rect>` + svgContent;
  svgFile.innerHTML = svgContent;
  return svgFile;
}
function getHeightAndWidth() {
  $d$3 = this.container;
  init();
  let primaryNodes = $d$3.querySelectorAll(".mindbox > grp, root");
  let svgContent = "";
  for (let i = 0; i < primaryNodes.length; i++) {
    let primaryNode = primaryNodes[i];
    let rect = primaryNode.getBoundingClientRect();
    let top = primaryNode.offsetTop;
    let bottom = top + rect.height;
    let left = primaryNode.offsetLeft;
    let right = left + rect.width;
    if (top < maxTop) {
      maxTop = top;
    }
    if (bottom > maxBottom) {
      maxBottom = bottom;
    }
    if (left < maxLeft) {
      maxLeft = left;
    }
    if (right > maxRight) {
      maxRight = right;
    }
    svgContent += PrimaryToSvg(primaryNode);
  }
  console.log(maxTop, maxBottom, maxLeft, maxRight);
  let svgHeight = maxBottom - maxTop;
  let svgWidth = maxRight - maxLeft;
  console.log("svgHeight", svgHeight);
  return [svgHeight + 5, svgWidth + 5];
}
function createSvg(height, width) {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("height", height);
  svg.setAttribute("width", width);
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("version", "1.2");
  svg.setAttribute("xlink", "http://www.w3.org/1999/xlink");
  return svg;
}
function RootToSvg() {
  let root = document.querySelector("root");
  let rootTpc = document.querySelector("root > tpc");
  let rect = rootTpc.getBoundingClientRect();
  let tpcStyle = getComputedStyle(rootTpc);
  let t = rootTpc.parentNode;
  let top = 0;
  let left = 0;
  let nodeObj = document.querySelector("root > tpc").nodeObj;
  let tStyle = getComputedStyle(t);
  let rootOffsetY = root.offsetTop - maxTop;
  let rootOffsetX = root.offsetLeft - maxLeft;
  let topicOffsetLeft = left + parseInt(tStyle.paddingLeft) + parseInt(rect.paddingLeft);
  let topicOffsetTop = top + parseInt(tStyle.paddingTop) + parseInt(rect.paddingTop) + parseInt(rect.fontSize);
  top + parseInt(tStyle.paddingTop) + parseInt(rect.paddingTop);
  let svg2ndEle = document.querySelector(".svg2nd");
  let tags = "";
  if (nodeObj.tags && nodeObj.tags.length) {
    let tagsEle = rootTpc.querySelectorAll(".tags > span");
    for (let i = 0; i < tagsEle.length; i++) {
      let tag = tagsEle[i];
      let tagRect = tag.getBoundingClientRect();
      tags += `<rect x="${topicOffsetLeft}" y="${topicOffsetTop + 4}" rx="5px" ry="5px" width="${tagRect.width}" height="${tagRect.height}" style="fill: #d6f0f8;"></rect>
        <foreignObject x="${topicOffsetLeft}" y="${topicOffsetTop + 4}" rx="5px" ry="5px" width="${tagRect.width}" height="${tagRect.height}" > 
          <div sytle="font-size:12px">${tag.innerHTML}</div>
        </foreignObject>
      `;
    }
  }
  let icons = "";
  if (nodeObj.icons && nodeObj.icons.length) {
    let iconsEle = rootTpc.querySelectorAll(".icons > span");
    for (let i = 0; i < iconsEle.length; i++) {
      let icon = iconsEle[i];
      icon.getBoundingClientRect();
      icons += `
      <tspan>${icon.innerHTML}</tspan>`;
    }
  }
  let images = "";
  if (nodeObj.image && nodeObj.image.length) {
    let imagesEle = tpc.querySelectorAll(".image");
    for (let i = 0; i < imagesEle.length; i++) {
      let image = imagesEle[i];
      image.getBoundingClientRect();
      images += `${image.outerHTML}`;
    }
  }
  let svg2nd = `<g transform="translate(${imgPadding - maxLeft}, ${imgPadding - maxTop})">${svg2ndEle.innerHTML}</g>`;
  svg2nd += `<g id="root" transform="translate(${rootOffsetX + imgPadding}, ${rootOffsetY + imgPadding})">
      <rect x="${left}" y="${top}" rx="5px" ry="5px" width="${rect.width}" height="${rect.height}" style="fill: #00aaff;"></rect>
      <foreignObject x="${left + 15}" y="${top + 10}" width="${tpcStyle.width}" height="${tpcStyle.height}" ">
        <div xmlns="http://www.w3.org/1999/xhtml" style="padding:0;margin:0;font-family:\u5FAE\u8F6F\u96C5\u9ED1;font-size:${tpcStyle.fontSize};font-weight:${tpcStyle.fontWeight};color:${tpcStyle.color};word-break: break-all;line-height: 1">
        ${nodeObj.topic}
        ${icons}
        ${images}
      </div>
      </foreignObject>
      ${tags}
  </g>`;
  let topiclinks = $d$3.querySelector(".topiclinks");
  if (topiclinks) {
    svg2nd += `<g transform="translate(${imgPadding - maxLeft}, ${imgPadding - maxTop})">${topiclinks.innerHTML}</g>`;
  }
  return svg2nd;
}
function PrimaryToSvg(primaryNode) {
  let topics = primaryNode.querySelectorAll("tpc");
  let primaryNodeOffsetY = primaryNode.offsetTop - maxTop;
  let primaryNodeOffsetX = primaryNode.offsetLeft - maxLeft;
  let svg = "";
  let svg3rd = primaryNode.querySelector(".svg3rd");
  svg += `<g transform="translate(${primaryNodeOffsetX + imgPadding}, ${primaryNodeOffsetY + imgPadding})">`;
  svg += svg3rd ? svg3rd.innerHTML : "";
  for (let i = 0; i < topics.length; i++) {
    let tpc2 = topics[i];
    let t = tpc2.parentNode;
    let nodeObj = tpc2.nodeObj;
    if (nodeObj.root) {
      continue;
    }
    let tpcRect = tpc2.getBoundingClientRect();
    let top = t.offsetTop;
    let left = t.offsetLeft;
    let tpcStyle = getComputedStyle(tpc2);
    let tStyle = getComputedStyle(t);
    let topicOffsetLeft = left + parseInt(tStyle.paddingLeft) + parseInt(tpcStyle.paddingLeft);
    let topicOffsetTop = top + parseInt(tStyle.paddingTop) + parseInt(tpcStyle.paddingTop) + parseInt(tpcStyle.fontSize);
    let topicOffsetTopTop = top + parseInt(tStyle.paddingTop) + parseInt(tpcStyle.paddingTop);
    let border = "";
    if (tpcStyle.borderWidth != "0px") {
      border = `<rect x="${left + 15}" y="${top}" rx="5px" ry="5px" width="${tpcRect.width}" height="${tpcRect.height}" style="fill: rgba(0,0,0,0); stroke:#444;stroke-width:1px;"></rect>`;
    }
    let backgroundColor = "";
    if (tpcStyle.backgroundColor != "rgba(0, 0, 0, 0)") {
      backgroundColor = `<rect x="${left + 15}" y="${top}" rx="5px" ry="5px" width="${tpcRect.width}" height="${tpcRect.height}" style="fill: ${tpcStyle.backgroundColor};"></rect>`;
    }
    let tags = "";
    if (nodeObj.tags && nodeObj.tags.length) {
      let tagsEle = tpc2.querySelectorAll(".tags > span");
      for (let i2 = 0; i2 < tagsEle.length; i2++) {
        let tag = tagsEle[i2];
        let tagRect = tag.getBoundingClientRect();
        tags += `<rect x="${topicOffsetLeft}" y="${topicOffsetTop + 4}" rx="5px" ry="5px" width="${tagRect.width}" height="${tagRect.height}" style="fill: #d6f0f8;"></rect>
          <foreignObject x="${topicOffsetLeft}" y="${topicOffsetTop + 4}" rx="5px" ry="5px" width="${tagRect.width}" height="${tagRect.height}" > 
            <div sytle="font-size:12px">${tag.innerHTML}</div>
          </foreignObject>`;
      }
    }
    let icons = "";
    if (nodeObj.icons && nodeObj.icons.length) {
      let iconsEle = tpc2.querySelectorAll(".icons > span");
      for (let i2 = 0; i2 < iconsEle.length; i2++) {
        let icon = iconsEle[i2];
        icon.getBoundingClientRect();
        icons += `
        <tspan>${icon.innerHTML}</tspan>`;
      }
    }
    let images = "";
    if (nodeObj.image && nodeObj.image.length) {
      let imagesEle = tpc2.querySelectorAll(".image");
      for (let i2 = 0; i2 < imagesEle.length; i2++) {
        let image = imagesEle[i2];
        image.getBoundingClientRect();
        images += `${image.outerHTML}`;
      }
    }
    svg += `<g id="${nodeObj.id}">
      ${border}
      ${backgroundColor}
      <foreignObject  x="${topicOffsetLeft}" y="${topicOffsetTopTop}" width="${tpcStyle.width}" height="${tpcStyle.height}">
      <div xmlns="http://www.w3.org/1999/xhtml" style="padding:0;margin:0;font-family:\u5FAE\u8F6F\u96C5\u9ED1;font-size:${tpcStyle.fontSize};font-weight:${tpcStyle.fontWeight};color:${tpcStyle.color};word-break: break-all;line-height: 1">
        ${nodeObj.topic}
        ${icons}
        ${images}
      </div>
      </foreignObject>
      ${tags}
  </g>`;
  }
  svg += "</g>";
  return svg;
}
let exportSvg = function() {
  let svgFile = generateSvgDom();
  let dlUrl = URL.createObjectURL(new Blob([head + svgFile.outerHTML.replace(/&nbsp;/g, " ")]));
  let a = document.createElement("a");
  a.href = dlUrl;
  a.download = "me-mindmap.svg";
  a.click();
};
let exportSvgDom = function(instance = this, fileName = "default") {
  $d$3 = instance.container;
  let svgFile = generateSvgDom();
  return svgFile;
};
function getData(instance) {
  return instance.isFocusMode ? instance.nodeDataBackup : instance.nodeData;
}
const selectNode = function(targetElement, isNewNode, clickEvent) {
  if (!targetElement)
    return;
  console.time("selectNode");
  if (typeof targetElement === "string") {
    return this.selectNode(findEle(targetElement));
  }
  if (this.ctrlRepeat) {
    if (targetElement.className === "selected") {
      targetElement.className = "";
    } else {
      targetElement.className = "selected";
    }
    console.log(this.currentSummaryNodeArr);
  } else {
    if (this.currentNode)
      this.currentNode.className = "";
    targetElement.className = "selected";
  }
  if (this == null ? void 0 : this.widthControll) {
    const widthControllRight = targetElement.querySelector("widthControllRight");
    widthControllRight.className = "width-controll-right";
    const widthControllLeft = targetElement.querySelector("widthControllLeft");
    widthControllLeft.className = "width-controll-left";
  }
  this.currentNode = targetElement;
  if (isNewNode) {
    this.bus.fire("selectNewNode", targetElement.nodeObj, clickEvent);
  } else {
    this.bus.fire("selectNode", targetElement.nodeObj, clickEvent);
  }
  console.timeEnd("selectNode");
};
const unselectNode = function() {
  if (this.currentNode) {
    this.currentNode.className = "";
    if (this.widthControll) {
      const widthControllRight = this.currentNode.querySelector("widthControllRight");
      widthControllRight.className = "";
      const widthControllLeft = this.currentNode.querySelector("widthControllLeft");
      widthControllLeft.className = "";
    }
  }
  this.currentNode = null;
  this.bus.fire("unselectNode");
};
const selectNextSibling = function() {
  if (!this.currentNode || this.currentNode.dataset.nodeid === "meroot")
    return void 0;
  const sibling = this.currentNode.parentElement.parentElement.nextSibling;
  let target;
  const grp = this.currentNode.parentElement.parentElement;
  if (grp.className === "rhs" || grp.className === "lhs") {
    const siblingList = this.mindElixirBox.querySelectorAll("." + grp.className);
    const i = Array.from(siblingList).indexOf(grp);
    if (i + 1 < siblingList.length) {
      target = siblingList[i + 1].firstChild.firstChild;
    } else {
      return false;
    }
  } else if (sibling) {
    target = sibling.firstChild.firstChild;
  } else {
    return false;
  }
  this.selectNode(target);
  return true;
};
const selectPrevSibling = function() {
  if (!this.currentNode || this.currentNode.dataset.nodeid === "meroot")
    return void 0;
  const sibling = this.currentNode.parentElement.parentElement.previousSibling;
  let target;
  const grp = this.currentNode.parentElement.parentElement;
  if (grp.className === "rhs" || grp.className === "lhs") {
    const siblingList = this.mindElixirBox.querySelectorAll("." + grp.className);
    const i = Array.from(siblingList).indexOf(grp);
    if (i - 1 >= 0) {
      target = siblingList[i - 1].firstChild.firstChild;
    } else {
      return false;
    }
  } else if (sibling) {
    target = sibling.firstChild.firstChild;
  } else {
    return false;
  }
  this.selectNode(target);
  return true;
};
const selectFirstChild = function() {
  if (!this.currentNode)
    return;
  const children = this.currentNode.parentElement.nextSibling;
  if (children && children.firstChild) {
    const target = children.firstChild.firstChild.firstChild;
    this.selectNode(target);
  }
};
const selectParent = function() {
  if (!this.currentNode || this.currentNode.dataset.nodeid === "meroot")
    return void 0;
  const parent = this.currentNode.parentElement.parentElement.parentElement.previousSibling;
  if (parent) {
    const target = parent.firstChild;
    this.selectNode(target);
  }
};
const getAllDataString = function() {
  const data = {
    direction: this.direction,
    nodeData: getData(this),
    linkData: this.linkData
  };
  return JSON.stringify(data, (k, v) => {
    if (k === "parent")
      return void 0;
    if (k === "from")
      return v.nodeObj.id;
    if (k === "to")
      return v.nodeObj.id;
    return v;
  });
};
const getAllData = function() {
  const data = {
    direction: this.direction,
    nodeData: getData(this),
    linkData: this.linkData
  };
  return JSON.parse(JSON.stringify(data, (k, v) => {
    if (k === "parent")
      return void 0;
    if (k === "from")
      return v.nodeObj.id;
    if (k === "to")
      return v.nodeObj.id;
    return v;
  }));
};
function autoHide(nodeData, cnt, deep) {
  if (cnt < deep) {
    nodeData.expanded = true;
  } else {
    nodeData.expanded = false;
  }
  for (const val of nodeData.children || []) {
    autoHide(val, cnt + 1, deep);
  }
}
const getAllDataWithAutoHide = function() {
  const expandDeep = Number(this.container.querySelector(".numberSelection").value) || 2;
  const data = {
    direction: this.direction,
    nodeData: getData(this),
    linkData: this.linkData,
    height: getHeightAndWidth.call(this),
    expandDeep
  };
  autoHide(data.nodeData, 0, expandDeep);
  return JSON.parse(JSON.stringify(data, (k, v) => {
    if (k === "parent")
      return void 0;
    if (k === "from")
      return v.nodeObj.id;
    if (k === "to")
      return v.nodeObj.id;
    return v;
  }));
};
const getAllDataMd = function() {
  const data = getData(this);
  let mdString = "# " + data.topic + "\n\n";
  function writeMd(children, deep) {
    for (let i = 0; i < children.length; i++) {
      if (deep <= 6) {
        mdString += "".padStart(deep, "#") + " " + children[i].topic + "\n\n";
      } else {
        mdString += "".padStart(deep - 7, "	") + "- " + children[i].topic + "\n";
      }
      if (children[i].children) {
        writeMd(children[i].children, deep + 1);
      }
    }
  }
  writeMd(data.children, 2);
  return mdString;
};
const enableEdit = function() {
  this.editable = true;
};
const disableEdit = function() {
  this.editable = false;
};
const scale = function(scaleVal) {
  this.scaleVal = scaleVal;
  this.map.style.transform = "scale(" + scaleVal + ")";
};
function getRootWidth(node2) {
  const root = node2.querySelector("root");
  return root.offsetWidth || 150;
}
function getRootHeight(node2) {
  const root = node2.querySelector("root");
  return root.offsetHeight || 150;
}
function getHeightDistance(a, b) {
  var _a, _b;
  const aHeight = ((_a = a == null ? void 0 : a.getBoundingClientRect()) == null ? void 0 : _a.top) || 0;
  const bHeight = ((_b = b == null ? void 0 : b.getBoundingClientRect()) == null ? void 0 : _b.top) || aHeight;
  return Math.abs(aHeight - bHeight);
}
function getHeightFromRootToChild(node2) {
  const tpc2 = node2.querySelector("root");
  const childTpc = node2.querySelector(".map-canvas children grp");
  return getHeightDistance(tpc2, childTpc);
}
const toCenter = function() {
  this.container.scrollTo(1e4 - this.container.offsetWidth / 2, 1e4 - this.container.offsetHeight / 2);
};
const toTopLeft = function() {
  var _a;
  if (((_a = this.nodeData) == null ? void 0 : _a.children.length) > 0) {
    this.container.scrollTo(1e4 - getRootWidth(this.container) / 2 - 10, 1e4 - getRootHeight(this.container) / 2 - getHeightFromRootToChild(this.container) - 5);
  } else {
    this.container.scrollTo(1e4 - this.container.offsetWidth / 2, 1e4 - this.container.offsetHeight / 2);
  }
};
const focusNode = function(tpcEl) {
  if (tpcEl.nodeObj.root)
    return;
  if (this.tempDirection === null) {
    this.tempDirection = this.direction;
  }
  if (!this.isFocusMode) {
    this.nodeDataBackup = this.nodeData;
    this.isFocusMode = true;
  }
  this.nodeData = tpcEl.nodeObj;
  this.nodeData.root = true;
  this.initRight();
};
const cancelFocus = function() {
  this.isFocusMode = false;
  if (this.tempDirection !== null) {
    delete this.nodeData.root;
    this.nodeData = this.nodeDataBackup;
    this.direction = this.tempDirection;
    this.tempDirection = null;
    this.init();
  }
};
const initLeft = function() {
  this.direction = 0;
  this.init();
};
const initRight = function() {
  this.direction = 1;
  this.init();
};
const initSide = function() {
  this.direction = 2;
  this.init();
};
const setLocale = function(locale) {
  this.locale = locale;
  this.init();
};
const expandNode = function(el, isExpand) {
  const node2 = el.nodeObj;
  if (typeof isExpand === "boolean") {
    node2.expanded = isExpand;
  } else if (node2.expanded !== false) {
    node2.expanded = false;
  } else {
    node2.expanded = true;
    expandNodeChild(node2);
  }
  this.layout();
  this.linkDiv();
  this.bus.fire("expandNode", node2);
};
const refresh = function() {
  this.addParentLink(this.nodeData);
  this.layout();
  this.linkDiv();
};
function expandNodeChild(nodeData) {
  nodeData.expanded = true;
  for (const val of nodeData.children || []) {
    expandNodeChild(val);
  }
}
const $d$2 = document;
const updateNodeStyle = function(object) {
  if (!object.style)
    return;
  const nodeEle = findEle(object.id, this);
  const origin = {
    color: nodeEle.style.color && rgbHex(nodeEle.style.color),
    background: nodeEle.style.background && rgbHex(nodeEle.style.background),
    fontSize: nodeEle.style.fontSize && nodeEle.style.fontSize + "px",
    fontWeight: nodeEle.style.fontWeight
  };
  nodeEle.style.color = object.style.color;
  nodeEle.style.background = object.style.background;
  nodeEle.style.fontSize = object.style.fontSize + "px";
  nodeEle.style.fontWeight = object.style.fontWeight || "normal";
  this.linkDiv();
  this.bus.fire("operation", {
    name: "editStyle",
    obj: object,
    origin
  });
};
const updateNodeTags = function(object, tags) {
  if (!tags)
    return;
  const oldVal = object.tags;
  if (tags.length === 0)
    delete object.tags;
  else
    object.tags = tags;
  const nodeEle = findEle(object.id);
  shapeTpc.call(this, nodeEle, object);
  this.linkDiv();
  this.bus.fire("operation", {
    name: "editTags",
    obj: object,
    origin: oldVal
  });
};
const updateNodeIcons = function(object, icons) {
  if (!icons)
    return;
  const oldVal = object.icons;
  object.icons = icons;
  const nodeEle = findEle(object.id);
  shapeTpc.call(this, nodeEle, object);
  this.linkDiv();
  this.bus.fire("operation", {
    name: "editIcons",
    obj: object,
    origin: oldVal
  });
};
const updateNodeHyperLink = function(object, hyperLink) {
  var _a, _b, _c;
  if (hyperLink == null || hyperLink == void 0)
    return;
  const oldVal = object.hyperLink;
  const hyperLinkArr = hyperLink.split(",");
  object.linkJump = (_a = object.linkJump) == null ? void 0 : _a.filter((link) => {
    return hyperLinkArr.find((val) => val === link.title) ? true : false;
  });
  if (((_b = object.linkJump) == null ? void 0 : _b.length) === 0)
    delete object.linkJump;
  object.hyperLink = hyperLinkArr.filter((link) => {
    var _a2;
    return link !== "" && !((_a2 = object.linkJump) == null ? void 0 : _a2.find((val) => val.title === link));
  });
  if (((_c = object.hyperLink) == null ? void 0 : _c.length) === 0)
    delete object.hyperLink;
  const nodeEle = findEle(object.id);
  shapeTpc.call(this, nodeEle, object);
  this.linkDiv();
  this.bus.fire("operation", {
    name: "editHyperLink",
    obj: object,
    origin: oldVal
  });
};
const updateNodeRemark = function(object, remark) {
  if (remark == null || remark == void 0)
    return;
  const oldVal = object.remark;
  object.remark = remark;
  const nodeEle = findEle(object.id);
  shapeTpc.call(this, nodeEle, object);
  this.linkDiv();
  this.bus.fire("operation", {
    name: "editRemark",
    obj: object,
    origin: oldVal
  });
};
const insertSibling = function(el, node) {
  const nodeEle = el || this.currentNode;
  if (!nodeEle)
    return;
  const nodeObj = nodeEle.nodeObj;
  if (nodeObj.root === true) {
    this.addChild();
    return;
  }
  const newNodeObj = node || this.generateNewObj();
  insertNodeObj(nodeObj, newNodeObj);
  addParentLink(this.nodeData);
  const t = nodeEle.parentElement;
  console.time("insertSibling_DOM");
  const { grp, top } = this.createGroup(newNodeObj);
  const children = t.parentNode.parentNode;
  children.insertBefore(grp, t.parentNode.nextSibling);
  if (children.className === "mindbox") {
    this.processPrimaryNode(grp, newNodeObj);
    this.linkDiv();
  } else {
    this.linkDiv(grp.offsetParent);
  }
  if (!node) {
    this.createInputDiv(top.children[0]);
  }
  this.selectNode(top.children[0], true);
  console.timeEnd("insertSibling_DOM");
  this.bus.fire("operation", {
    name: "insertSibling",
    obj: newNodeObj
  });
};
const insertBefore = function(el, node) {
  const nodeEle = el || this.currentNode;
  if (!nodeEle)
    return;
  const nodeObj = nodeEle.nodeObj;
  if (nodeObj.root === true) {
    this.addChild();
    return;
  }
  const newNodeObj = node || this.generateNewObj();
  insertBeforeNodeObj(nodeObj, newNodeObj);
  addParentLink(this.nodeData);
  const t = nodeEle.parentElement;
  console.time("insertSibling_DOM");
  const { grp, top } = this.createGroup(newNodeObj);
  const children = t.parentNode.parentNode;
  children.insertBefore(grp, t.parentNode);
  if (children.className === "mindbox") {
    this.processPrimaryNode(grp, newNodeObj);
    this.linkDiv();
  } else {
    this.linkDiv(grp.offsetParent);
  }
  if (!node) {
    this.createInputDiv(top.children[0]);
  }
  this.selectNode(top.children[0], true);
  console.timeEnd("insertSibling_DOM");
  this.bus.fire("operation", {
    name: "insertSibling",
    obj: newNodeObj
  });
};
const insertParent = function(el, node) {
  const nodeEle = el || this.currentNode;
  if (!nodeEle)
    return;
  const nodeObj = nodeEle.nodeObj;
  if (nodeObj.root === true) {
    return;
  }
  const newNodeObj = node || this.generateNewObj();
  insertParentNodeObj(nodeObj, newNodeObj);
  addParentLink(this.nodeData);
  const grp0 = nodeEle.parentElement.parentElement;
  console.time("insertParent_DOM");
  const { grp, top } = this.createGroup(newNodeObj, true);
  top.appendChild(createExpander(true));
  const children0 = grp0.parentNode;
  grp0.insertAdjacentElement("afterend", grp);
  const c = $d$2.createElement("children");
  c.appendChild(grp0);
  top.insertAdjacentElement("afterend", c);
  if (children0.className === "mindbox") {
    grp.className = grp0.className;
    grp0.className = "";
    grp0.querySelector(".svg3rd").remove();
    this.linkDiv();
  } else {
    this.linkDiv(grp.offsetParent);
  }
  if (!node) {
    this.createInputDiv(top.children[0]);
  }
  this.selectNode(top.children[0], true);
  console.timeEnd("insertParent_DOM");
  this.bus.fire("operation", {
    name: "insertParent",
    obj: newNodeObj
  });
};
const addSummaryFunction = function(nodeEle, node) {
  var _a;
  if (!nodeEle)
    return void 0;
  const nodeObj = nodeEle.nodeObj;
  const newNodeObj = node || this.generateNewSummaryObj();
  nodeObj.parent.children.push(newNodeObj);
  addParentLink(this.nodeData);
  const top = nodeEle.parentNode.parentNode.parentNode.parentNode;
  const { smy, top: newTop } = this.createSummary(newNodeObj);
  if (!((_a = top.children) == null ? void 0 : _a["smychildren"])) {
    const smychildren = $d$2.createElement("smychildren");
    smychildren.setAttribute("name", "smychildren");
    top.appendChild(smychildren);
  }
  top.children["smychildren"].appendChild(smy);
  this.layout();
  this.linkDiv();
  return { newTop, newNodeObj };
};
const addChildFunction = function(nodeEle, node) {
  if (!nodeEle)
    return void 0;
  const nodeObj = nodeEle.nodeObj;
  if (nodeObj.expanded === false) {
    this.expandNode(nodeEle, true);
    nodeEle = findEle(nodeObj.id);
  }
  const newNodeObj = node || this.generateNewObj();
  if (nodeObj.children)
    nodeObj.children.push(newNodeObj);
  else
    nodeObj.children = [newNodeObj];
  addParentLink(this.nodeData);
  const top = nodeEle.parentElement;
  const { grp, top: newTop } = this.createGroup(newNodeObj);
  if (top.tagName === "T") {
    if (top.children[1]) {
      top.nextSibling.appendChild(grp);
    } else {
      const c = $d$2.createElement("children");
      c.appendChild(grp);
      top.appendChild(createExpander(true));
      top.insertAdjacentElement("afterend", c);
    }
    this.layout();
    this.linkDiv(grp.offsetParent);
  } else if (top.tagName === "ROOT") {
    this.processPrimaryNode(grp, newNodeObj);
    top.nextSibling.appendChild(grp);
    this.linkDiv();
  }
  return { newTop, newNodeObj };
};
const addSummary = function(el, node) {
  console.time("addSummary");
  const parentIndex = {};
  const selectedArr = [];
  this.container.querySelectorAll("tpc.selected").forEach((value) => {
    var _a, _b;
    (_a = parentIndex[value.nodeObj.parent.id]) != null ? _a : parentIndex[value.nodeObj.parent.id] = selectedArr.length;
    selectedArr[parentIndex[value.nodeObj.parent.id]] = (_b = selectedArr[parentIndex[value.nodeObj.parent.id]]) != null ? _b : [];
    selectedArr[parentIndex[value.nodeObj.parent.id]].push(value);
  });
  console.log(selectedArr);
  selectedArr.forEach((val) => {
    var _a, _b, _c;
    const nodeEle = val[0] || this.currentNode;
    this.currentSummaryNodeArr = val;
    if (!nodeEle)
      return;
    if (((_c = (_b = (_a = nodeEle == null ? void 0 : nodeEle.parentElement) == null ? void 0 : _a.parentElement) == null ? void 0 : _b.parentElement) == null ? void 0 : _c.className) == "mindbox")
      return;
    const { newTop, newNodeObj } = addSummaryFunction.call(this, nodeEle, node);
    console.timeEnd("addSummary");
    if (!node) {
      this.createInputDiv(newTop.children[0]);
    }
    this.selectNode(newTop.children[0], true);
    this.bus.fire("operation", {
      name: "addSummary",
      obj: newNodeObj
    });
  });
};
const addChild = function(el, node) {
  console.time("addChild");
  const nodeEle = el || this.currentNode;
  if (!nodeEle)
    return;
  const { newTop, newNodeObj } = addChildFunction.call(this, nodeEle, node);
  console.timeEnd("addChild");
  if (!node) {
    this.createInputDiv(newTop.children[0]);
  }
  this.selectNode(newTop.children[0], true);
  this.bus.fire("operation", {
    name: "addChild",
    obj: newNodeObj
  });
};
const copyNode = function(node, to) {
  console.time("copyNode");
  const deepCloneObj = JSON.parse(JSON.stringify(node.nodeObj, (k, v) => {
    if (k === "parent")
      return void 0;
    return v;
  }));
  refreshIds(deepCloneObj);
  const { newNodeObj } = addChildFunction.call(this, to, deepCloneObj);
  console.timeEnd("copyNode");
  this.bus.fire("operation", {
    name: "copyNode",
    obj: newNodeObj
  });
};
const moveUpNode = function(el) {
  const nodeEle = el || this.currentNode;
  if (!nodeEle)
    return;
  const grp = nodeEle.parentNode.parentNode;
  const obj = nodeEle.nodeObj;
  moveUpObj(obj);
  grp.parentNode.insertBefore(grp, grp.previousSibling);
  this.linkDiv();
  this.bus.fire("operation", {
    name: "moveUpNode",
    obj
  });
};
const moveDownNode = function(el) {
  const nodeEle = el || this.currentNode;
  if (!nodeEle)
    return;
  const grp = nodeEle.parentNode.parentNode;
  const obj = nodeEle.nodeObj;
  moveDownObj(obj);
  if (grp.nextSibling) {
    grp.insertAdjacentElement("beforebegin", grp.nextSibling);
  } else {
    grp.parentNode.prepend(grp);
  }
  this.linkDiv();
  this.bus.fire("operation", {
    name: "moveDownNode",
    obj
  });
};
const removeNode = function(el) {
  const nodeEle = el || this.currentNode;
  if (!nodeEle)
    return;
  const nodeObj = nodeEle.nodeObj;
  if (nodeObj.root === true) {
    throw new Error("Can not remove root node");
  }
  const index2 = nodeObj.parent.children.findIndex((node) => node === nodeObj);
  const next = nodeObj.parent.children[index2 + 1];
  const originSiblingId = next && next.id;
  const childrenLength = removeNodeObj(nodeObj);
  const t = nodeEle.parentNode;
  if (t.tagName === "ROOT") {
    return;
  }
  if (childrenLength === 0) {
    const parentT = t.parentNode.parentNode.previousSibling;
    if (parentT.tagName !== "ROOT") {
      parentT.children[1].remove();
    }
    this.selectParent();
  } else {
    const success = this.selectPrevSibling();
    if (!success)
      this.selectNextSibling();
  }
  for (const prop in this.linkData) {
    const link = this.linkData[prop];
    if (link.from === t.firstChild || link.to === t.firstChild) {
      this.removeLink(this.mindElixirBox.querySelector(`[data-linkid=${this.linkData[prop].id}]`));
    }
  }
  t.parentNode.remove();
  this.linkDiv();
  this.bus.fire("operation", {
    name: "removeNode",
    obj: nodeObj,
    originSiblingId,
    originParentId: nodeObj.parent.id
  });
};
const moveNode = function(from, to) {
  const fromObj = from.nodeObj;
  const toObj = to.nodeObj;
  const originParentId = fromObj.parent.id;
  if (toObj.expanded === false) {
    this.expandNode(to, true);
    from = findEle(fromObj.id);
    to = findEle(toObj.id);
  }
  if (!checkMoveValid(fromObj, toObj)) {
    console.warn("Invalid move");
    return;
  }
  console.time("moveNode");
  moveNodeObj(fromObj, toObj);
  addParentLink(this.nodeData);
  const fromTop = from.parentElement;
  const fromChilren = fromTop.parentNode.parentNode;
  const toTop = to.parentElement;
  if (fromChilren.className === "mindbox") {
    fromTop.parentNode.lastChild.remove();
  } else if (fromTop.parentNode.className === "mindbox") {
    fromTop.style.cssText = "";
  }
  if (toTop.tagName === "T") {
    if (fromChilren.className === "mindbox") {
      fromTop.parentNode.className = "";
    }
    if (toTop.children[1]) {
      toTop.nextSibling.appendChild(fromTop.parentNode);
    } else {
      const c = $d$2.createElement("children");
      c.appendChild(fromTop.parentNode);
      toTop.appendChild(createExpander(true));
      toTop.parentElement.insertBefore(c, toTop.nextSibling);
    }
  } else if (toTop.tagName === "ROOT") {
    this.processPrimaryNode(fromTop.parentNode, fromObj);
    toTop.nextSibling.appendChild(fromTop.parentNode);
  }
  this.linkDiv();
  this.bus.fire("operation", {
    name: "moveNode",
    obj: { fromObj, toObj, originParentId }
  });
  console.timeEnd("moveNode");
};
const moveNodeBefore = function(from, to) {
  const fromObj = from.nodeObj;
  const toObj = to.nodeObj;
  const originParentId = fromObj.parent.id;
  moveNodeBeforeObj(fromObj, toObj);
  addParentLink(this.nodeData);
  const fromTop = from.parentElement;
  const fromGrp = fromTop.parentNode;
  const toTop = to.parentElement;
  const toGrp = toTop.parentNode;
  const toChilren = toTop.parentNode.parentNode;
  toChilren.insertBefore(fromGrp, toGrp);
  this.processPrimaryNode(fromTop.parentElement, fromObj);
  this.linkDiv();
  this.bus.fire("operation", {
    name: "moveNodeBefore",
    obj: { fromObj, toObj, originParentId }
  });
};
const moveNodeAfter = function(from, to) {
  const fromObj = from.nodeObj;
  const toObj = to.nodeObj;
  const originParentId = fromObj.parent.id;
  moveNodeAfterObj(fromObj, toObj);
  addParentLink(this.nodeData);
  const fromTop = from.parentElement;
  const fromGrp = fromTop.parentNode;
  const toTop = to.parentElement;
  const toGrp = toTop.parentNode;
  const toChilren = toTop.parentNode.parentNode;
  toChilren.insertBefore(fromGrp, toGrp.nextSibling);
  this.processPrimaryNode(fromTop.parentElement, fromObj);
  this.linkDiv();
  this.bus.fire("operation", {
    name: "moveNodeAfter",
    obj: { fromObj, toObj, originParentId }
  });
};
const beginEdit = function(el) {
  const nodeEle = el || this.currentNode;
  if (!nodeEle)
    return;
  this.createInputDiv(nodeEle);
};
const setNodeTopic = function(tpc2, topic) {
  tpc2.childNodes[0].textContent = topic;
  tpc2.nodeObj.topic = topic;
  this.linkDiv();
};
function processPrimaryNode(primaryNode, obj) {
  if (this.direction === LEFT) {
    primaryNode.className = "lhs";
  } else if (this.direction === RIGHT) {
    primaryNode.className = "rhs";
  } else if (this.direction === SIDE) {
    const l = $d$2.querySelectorAll(".lhs").length;
    const r = $d$2.querySelectorAll(".rhs").length;
    if (l <= r) {
      primaryNode.className = "lhs";
      obj.direction = LEFT;
    } else {
      primaryNode.className = "rhs";
      obj.direction = RIGHT;
    }
  }
}
const createLink = function(from, to, isInitPaint, obj) {
  const map = this.map.getBoundingClientRect();
  if (!from || !to) {
    return;
  }
  const pfrom = from.getBoundingClientRect();
  const pto = to.getBoundingClientRect();
  const fromCenterX = (pfrom.x + pfrom.width / 2 - map.x) / this.scaleVal;
  const fromCenterY = (pfrom.y + pfrom.height / 2 - map.y) / this.scaleVal;
  const toCenterX = (pto.x + pto.width / 2 - map.x) / this.scaleVal;
  const toCenterY = (pto.y + pto.height / 2 - map.y) / this.scaleVal;
  let p2x, p2y, p3x, p3y;
  if (isInitPaint) {
    p2x = fromCenterX + obj.delta1.x;
    p2y = fromCenterY + obj.delta1.y;
    p3x = toCenterX + obj.delta2.x;
    p3y = toCenterY + obj.delta2.y;
  } else {
    if ((fromCenterY + toCenterY) / 2 - fromCenterY <= pfrom.height / 2) {
      p2x = (pfrom.x + pfrom.width - map.x) / this.scaleVal + 100;
      p2y = fromCenterY;
      p3x = (pto.x + pto.width - map.x) / this.scaleVal + 100;
      p3y = toCenterY;
    } else {
      p2x = (fromCenterX + toCenterX) / 2;
      p2y = (fromCenterY + toCenterY) / 2;
      p3x = (fromCenterX + toCenterX) / 2;
      p3y = (fromCenterY + toCenterY) / 2;
    }
  }
  const fromData = {
    cx: fromCenterX,
    cy: fromCenterY,
    w: pfrom.width,
    h: pfrom.height
  };
  const toData = {
    cx: toCenterX,
    cy: toCenterY,
    w: pto.width,
    h: pto.height
  };
  const p1 = calcP1(fromData, p2x, p2y);
  const p1x = p1.x;
  const p1y = p1.y;
  const p4 = calcP4(toData, p3x, p3y);
  const p4x = p4.x;
  const p4y = p4.y;
  const arrowPoint = getArrowPoints(p3x, p3y, p4x, p4y);
  const newSvgGroup = createSvgGroup(`M ${p1x} ${p1y} C ${p2x} ${p2y} ${p3x} ${p3y} ${p4x} ${p4y}`, `M ${arrowPoint.x1} ${arrowPoint.y1} L ${p4x} ${p4y} L ${arrowPoint.x2} ${arrowPoint.y2}`);
  let newLinkObj;
  if (isInitPaint) {
    newLinkObj = {
      id: obj.id,
      label: "",
      from,
      to,
      delta1: {
        x: p2x - fromCenterX,
        y: p2y - fromCenterY
      },
      delta2: {
        x: p3x - toCenterX,
        y: p3y - toCenterY
      }
    };
    this.linkData[obj.id] = newLinkObj;
    newSvgGroup.linkObj = newLinkObj;
    newSvgGroup.dataset.linkid = obj.id;
  } else {
    newLinkObj = {
      id: generateUUID(),
      label: "",
      from,
      to,
      delta1: {
        x: p2x - fromCenterX,
        y: p2y - fromCenterY
      },
      delta2: {
        x: p3x - toCenterX,
        y: p3y - toCenterY
      }
    };
    this.linkData[newLinkObj.id] = newLinkObj;
    newSvgGroup.linkObj = newLinkObj;
    newSvgGroup.dataset.linkid = newLinkObj.id;
    this.currentLink = newSvgGroup;
  }
  this.linkSvgGroup.appendChild(newSvgGroup);
  if (!isInitPaint) {
    this.showLinkController(p2x, p2y, p3x, p3y, newLinkObj, fromData, toData);
  }
};
const removeLink = function(linkSvg) {
  let link;
  if (linkSvg) {
    link = linkSvg;
  } else {
    link = this.currentLink;
  }
  if (!link)
    return;
  this.hideLinkController();
  const id = link.linkObj.id;
  delete this.linkData[id];
  link.remove();
  link = null;
};
const selectLink = function(targetElement) {
  this.currentLink = targetElement;
  const obj = targetElement.linkObj;
  const from = obj.from;
  const to = obj.to;
  const map = this.map.getBoundingClientRect();
  const pfrom = from.getBoundingClientRect();
  const pto = to.getBoundingClientRect();
  const fromCenterX = (pfrom.x + pfrom.width / 2 - map.x) / this.scaleVal;
  const fromCenterY = (pfrom.y + pfrom.height / 2 - map.y) / this.scaleVal;
  const toCenterX = (pto.x + pto.width / 2 - map.x) / this.scaleVal;
  const toCenterY = (pto.y + pto.height / 2 - map.y) / this.scaleVal;
  const fromData = {
    cx: fromCenterX,
    cy: fromCenterY,
    w: pfrom.width,
    h: pfrom.height
  };
  const toData = {
    cx: toCenterX,
    cy: toCenterY,
    w: pto.width,
    h: pto.height
  };
  const p2x = fromCenterX + obj.delta1.x;
  const p2y = fromCenterY + obj.delta1.y;
  const p3x = toCenterX + obj.delta2.x;
  const p3y = toCenterY + obj.delta2.y;
  this.showLinkController(p2x, p2y, p3x, p3y, obj, fromData, toData);
};
const hideLinkController = function() {
  this.linkController.style.display = "none";
  this.P2.style.display = "none";
  this.P3.style.display = "none";
};
const showLinkController = function(p2x, p2y, p3x, p3y, linkObj, fromData, toData) {
  this.linkController.style.display = "initial";
  this.P2.style.display = "initial";
  this.P3.style.display = "initial";
  const p1 = calcP1(fromData, p2x, p2y);
  let p1x = p1.x;
  let p1y = p1.y;
  const p4 = calcP4(toData, p3x, p3y);
  let p4x = p4.x;
  let p4y = p4.y;
  this.P2.style.cssText = `top:${p2y}px;left:${p2x}px;`;
  this.P3.style.cssText = `top:${p3y}px;left:${p3x}px;`;
  this.line1.setAttribute("x1", p1x);
  this.line1.setAttribute("y1", p1y);
  this.line1.setAttribute("x2", p2x);
  this.line1.setAttribute("y2", p2y);
  this.line2.setAttribute("x1", p3x);
  this.line2.setAttribute("y1", p3y);
  this.line2.setAttribute("x2", p4x);
  this.line2.setAttribute("y2", p4y);
  if (this.helper1) {
    this.helper1.destory(this.map);
    this.helper2.destory(this.map);
  }
  this.helper1 = new LinkDragMoveHelper(this.P2);
  this.helper2 = new LinkDragMoveHelper(this.P3);
  this.helper1.init(this.map, (deltaX, deltaY) => {
    p2x = p2x - deltaX / this.scaleVal;
    p2y = p2y - deltaY / this.scaleVal;
    const p12 = calcP1(fromData, p2x, p2y);
    p1x = p12.x;
    p1y = p12.y;
    this.P2.style.top = p2y + "px";
    this.P2.style.left = p2x + "px";
    this.currentLink.children[0].setAttribute("d", `M ${p1x} ${p1y} C ${p2x} ${p2y} ${p3x} ${p3y} ${p4x} ${p4y}`);
    this.line1.setAttribute("x1", p1x);
    this.line1.setAttribute("y1", p1y);
    this.line1.setAttribute("x2", p2x);
    this.line1.setAttribute("y2", p2y);
    linkObj.delta1.x = p2x - fromData.cx;
    linkObj.delta1.y = p2y - fromData.cy;
  });
  this.helper2.init(this.map, (deltaX, deltaY) => {
    p3x = p3x - deltaX / this.scaleVal;
    p3y = p3y - deltaY / this.scaleVal;
    const p42 = calcP4(toData, p3x, p3y);
    p4x = p42.x;
    p4y = p42.y;
    const arrowPoint = getArrowPoints(p3x, p3y, p4x, p4y);
    this.P3.style.top = p3y + "px";
    this.P3.style.left = p3x + "px";
    this.currentLink.children[0].setAttribute("d", `M ${p1x} ${p1y} C ${p2x} ${p2y} ${p3x} ${p3y} ${p4x} ${p4y}`);
    this.currentLink.children[1].setAttribute("d", `M ${arrowPoint.x1} ${arrowPoint.y1} L ${p4x} ${p4y} L ${arrowPoint.x2} ${arrowPoint.y2}`);
    this.line2.setAttribute("x1", p3x);
    this.line2.setAttribute("y1", p3y);
    this.line2.setAttribute("x2", p4x);
    this.line2.setAttribute("y2", p4y);
    linkObj.delta2.x = p3x - toData.cx;
    linkObj.delta2.y = p3y - toData.cy;
  });
};
function linkDiv(primaryNode) {
  var _a, _b;
  var primaryNodeHorizontalGap = this.primaryNodeHorizontalGap || PRIMARY_NODE_HORIZONTAL_GAP;
  var primaryNodeVerticalGap = this.primaryNodeVerticalGap || PRIMARY_NODE_VERTICAL_GAP;
  console.time("linkDiv");
  const root = this.root;
  root.style.cssText = `top:${1e4 - root.offsetHeight / 2}px;left:${1e4 - root.offsetWidth / 2}px;`;
  const primaryNodeList = this.box.children;
  this.svg2nd.innerHTML = "";
  let totalHeight = 0;
  let shortSide;
  let shortSideGap = 0;
  let currentOffsetL = 0;
  let currentOffsetR = 0;
  let totalHeightL = 0;
  let totalHeightR = 0;
  let base;
  if (this.direction === SIDE) {
    let countL = 0;
    let countR = 0;
    let totalHeightLWithoutGap = 0;
    let totalHeightRWithoutGap = 0;
    for (let i = 0; i < primaryNodeList.length; i++) {
      const el = primaryNodeList[i];
      if (el.className === "lhs") {
        totalHeightL += el.offsetHeight + primaryNodeVerticalGap;
        totalHeightLWithoutGap += el.offsetHeight;
        countL += 1;
      } else {
        totalHeightR += el.offsetHeight + primaryNodeVerticalGap;
        totalHeightRWithoutGap += el.offsetHeight;
        countR += 1;
      }
    }
    if (totalHeightL > totalHeightR) {
      base = 1e4 - Math.max(totalHeightL) / 2;
      shortSide = "r";
      shortSideGap = (totalHeightL - totalHeightRWithoutGap) / (countR - 1);
    } else {
      base = 1e4 - Math.max(totalHeightR) / 2;
      shortSide = "l";
      shortSideGap = (totalHeightR - totalHeightLWithoutGap) / (countL - 1);
    }
  } else {
    for (let i = 0; i < primaryNodeList.length; i++) {
      const el = primaryNodeList[i];
      totalHeight += el.offsetHeight + primaryNodeVerticalGap;
    }
    base = 1e4 - totalHeight / 2;
  }
  let primaryPath = "";
  const alignRight = 1e4 - root.offsetWidth / 2 - primaryNodeHorizontalGap + 60;
  const alignLeft = 1e4 + root.offsetWidth / 2 + primaryNodeHorizontalGap - 60;
  for (let i = 0; i < primaryNodeList.length; i++) {
    let x2, y2;
    const el = primaryNodeList[i];
    const elOffsetH = el.offsetHeight;
    let xMiddle = root.offsetLeft - 10;
    if (el.className === "lhs") {
      el.style.top = base + currentOffsetL + "px";
      el.style.left = alignRight - el.offsetWidth + "px";
      x2 = alignRight - 15;
      y2 = base + currentOffsetL + elOffsetH / 2;
      let LEFT2 = 1e4;
      if (this.primaryLinkStyle === 2) {
        if (this.direction === SIDE) {
          LEFT2 = 1e4 - root.offsetWidth / 6;
        }
        if (y2 < 1e4) {
          primaryPath += `M ${LEFT2} 10000 V ${y2 + 20} C ${LEFT2} ${y2} ${LEFT2} ${y2} ${LEFT2 - 20} ${y2} H ${x2}`;
        } else {
          primaryPath += `M ${LEFT2} 10000 V ${y2 - 20} C ${LEFT2} ${y2} ${LEFT2} ${y2} ${LEFT2 - 20} ${y2} H ${x2}`;
        }
      } else {
        primaryPath += `M 10000 10000 H ${xMiddle} V ${y2} H ${x2}`;
      }
      if (shortSide === "l") {
        currentOffsetL += elOffsetH + shortSideGap;
      } else {
        currentOffsetL += elOffsetH + primaryNodeVerticalGap;
      }
    } else {
      xMiddle = root.offsetLeft + root.offsetWidth + 10;
      el.style.top = base + currentOffsetR + "px";
      el.style.left = alignLeft + "px";
      x2 = alignLeft + 15;
      y2 = base + currentOffsetR + elOffsetH / 2;
      let LEFT2 = 1e4;
      if (this.primaryLinkStyle === 2) {
        if (this.direction === SIDE) {
          LEFT2 = 1e4 + root.offsetWidth / 6;
        }
        if (y2 < 1e4) {
          primaryPath += `M ${LEFT2} 10000 V ${y2 + 20} C ${LEFT2} ${y2} ${LEFT2} ${y2} ${LEFT2 + 20} ${y2} H ${x2}`;
        } else {
          primaryPath += `M ${LEFT2} 10000 V ${y2 - 20} C ${LEFT2} ${y2} ${LEFT2} ${y2} ${LEFT2 + 20} ${y2} H ${x2}`;
        }
      } else {
        primaryPath += `M 10000 10000 H ${xMiddle} V ${y2} H ${x2}`;
      }
      if (shortSide === "r") {
        currentOffsetR += elOffsetH + shortSideGap;
      } else {
        currentOffsetR += elOffsetH + primaryNodeVerticalGap;
      }
    }
    const expander = el.children[0].children[1];
    if (expander) {
      expander.style.top = (expander.parentNode.offsetHeight - expander.offsetHeight) / 2 + "px";
      if (el.className === "lhs") {
        expander.style.left = -10 + "px";
      } else {
        expander.style.left = expander.parentNode.offsetWidth - 10 + "px";
      }
    }
  }
  this.svg2nd.appendChild(createMainPath(primaryPath));
  for (let i = 0; i < primaryNodeList.length; i++) {
    const el = primaryNodeList[i];
    if (primaryNode && primaryNode !== primaryNodeList[i]) {
      continue;
    }
    if (el.childElementCount) {
      const svg = createLinkSvg("svg3rd");
      const svgSMY = createLinkSvg("svg3rd");
      el.querySelectorAll(".svg3rd").forEach((val) => {
        val.remove();
      });
      el.appendChild(svg);
      const parent = el.children[0];
      let children;
      if (((_b = (_a = el.children) == null ? void 0 : _a[2]) == null ? void 0 : _b.tagName) === "SMYCHILDREN") {
        children = [...el.children[1].children, ...el.children[2].children];
      } else
        children = el.children[1].children;
      path = "";
      smypath = "";
      loopChildren(children, parent, this.nodeData.children[i], true);
      svg.appendChild(createPath(path));
      if (smypath.length > 0) {
        el.appendChild(svgSMY);
        svgSMY.appendChild(createSvgPath(smypath));
      }
    }
  }
  this.linkSvgGroup.innerHTML = "";
  for (const prop in this.linkData) {
    const link = this.linkData[prop];
    if (typeof link.from === "string") {
      this.createLink(findEle(link.from), findEle(link.to), true, link);
    } else {
      this.createLink(findEle(link.from.nodeObj.id), findEle(link.to.nodeObj.id), true, link);
    }
  }
  console.timeEnd("linkDiv");
}
let path = "";
let smypath = "";
function loopChildren(children, parent, nodeData, first) {
  var _a, _b, _c;
  let parentOT = parent.offsetTop;
  let parentOL = parent.offsetLeft;
  let parentOW = parent.offsetWidth;
  let parentOH = parent.offsetHeight;
  let isSmyChild = false;
  if (parent.offsetParent.tagName === "SMY") {
    isSmyChild = true;
    parentOT += parent.offsetParent.offsetTop;
    parentOL += parent.offsetParent.offsetLeft;
  }
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if ((child == null ? void 0 : child.tagName) === "SMY") {
      let firstEl = children[0];
      let lastEl = children[i - 1];
      const rangeMap = {};
      nodeData.children[i].summary.range.forEach((val) => {
        rangeMap[val] = true;
      });
      let flag = true;
      for (let j = 0; j < i; j++) {
        const key = children[j].children[0].children[0].getAttribute("data-nodeid").slice(2);
        if (rangeMap[key]) {
          if (flag) {
            flag = false;
            firstEl = children[j];
          }
          lastEl = children[j];
        }
      }
      const xfirst = firstEl.offsetLeft + firstEl.offsetWidth + 8;
      const yfirst = firstEl.offsetTop + 15;
      const ylast = lastEl.offsetTop + lastEl.offsetHeight - 5;
      const xlast = lastEl.offsetLeft + lastEl.offsetWidth + 8;
      const y = child.offsetTop + child.children[0].offsetTop + child.children[0].offsetHeight;
      let top = (_a = child.style.top) != null ? _a : 0;
      if (typeof top === "string")
        top = Number(top.replace("px", ""));
      child.style.top = top + (ylast + yfirst + 20) / 2 - y + "px";
      smypath += `M ${xfirst} ${yfirst} H ${xfirst + 10} V ${ylast} H${xlast}`;
    }
    const childT = child.children[0];
    let childTOT = childT.offsetTop;
    let childTOH = childT.offsetHeight;
    if (isSmyChild) {
      childTOT += childT.offsetParent.offsetTop;
    }
    let y1;
    if (first || isSmyChild) {
      y1 = parentOT + parentOH / 2;
    } else {
      y1 = parentOT + parentOH;
    }
    const y2 = childTOT + childTOH;
    let x1, x2, xMiddle;
    const direction = child.offsetParent.className || child.offsetParent.offsetParent.className;
    if (direction === "lhs" && (child == null ? void 0 : child.tagName) !== "SMY") {
      x1 = parentOL + GAP;
      xMiddle = parentOL;
      x2 = parentOL - childT.offsetWidth;
      if (childTOT + childTOH < parentOT + parentOH / 2 + 50 && childTOT + childTOH > parentOT + parentOH / 2 - 50) {
        path += `M ${x1} ${y1} H ${xMiddle} V ${y2} H ${x2}`;
      } else if (childTOT + childTOH >= parentOT + parentOH / 2) {
        path += `M ${x1} ${y1} H ${xMiddle} V ${y2} H ${x2}`;
      } else {
        path += `M ${x1} ${y1} H ${xMiddle} V ${y2} H ${x2}`;
      }
    } else if (direction === "rhs" && (child == null ? void 0 : child.tagName) !== "SMY") {
      x1 = parentOL + parentOW - GAP;
      if (isSmyChild)
        x1 += GAP;
      xMiddle = parentOL + parentOW;
      x2 = parentOL + parentOW + childT.offsetWidth;
      if (childTOT + childTOH < parentOT + parentOH / 2 + 50 && childTOT + childTOH > parentOT + parentOH / 2 - 50) {
        path += `M ${x1} ${y1} H ${xMiddle} V ${y2} H ${x2}`;
      } else if (childTOT + childTOH >= parentOT + parentOH / 2) {
        path += `M ${x1} ${y1} H ${xMiddle} V ${y2} H ${x2}`;
      } else {
        path += `M ${x1} ${y1} H ${xMiddle} V ${y2} H ${x2}`;
      }
    }
    const expander = childT.children[1];
    if (expander) {
      expander.style.top = (childT.offsetHeight - expander.offsetHeight) / 2 + "px";
      if (direction === "lhs") {
        expander.style.left = -10 + "px";
      } else if (direction === "rhs") {
        expander.style.left = childT.offsetWidth - 10 + "px";
      }
      if (!expander.expanded)
        continue;
    } else {
      continue;
    }
    let nextChildren;
    if (((_c = (_b = child.children) == null ? void 0 : _b[2]) == null ? void 0 : _c.tagName) === "SMYCHILDREN") {
      nextChildren = [...child.children[1].children, ...child.children[2].children];
    } else {
      nextChildren = [...child.children[1].children];
    }
    if (nextChildren.length > 0)
      loopChildren(nextChildren, childT, nodeData.children[i]);
  }
}
function initMouseEvent(mind) {
  mind.map.addEventListener("click", (e) => {
    if (e.target.nodeName === "EPD") {
      mind.expandNode(e.target.previousSibling);
    } else if (e.target.parentElement.nodeName === "T" || e.target.parentElement.nodeName === "ROOT") {
      mind.selectNode(e.target, false, e);
    } else if (e.target.nodeName === "path") {
      if (e.target.parentElement.nodeName === "g") {
        mind.selectLink(e.target.parentElement);
      }
    } else if (e.target.className === "circle")
      ;
    else {
      mind.unselectNode();
      mind.container.querySelectorAll("tpc.selected").forEach((element) => {
        element.className = "";
      });
      mind.hideLinkController();
    }
  });
  mind.map.addEventListener("dblclick", (e) => {
    e.preventDefault();
    if (!mind.editable)
      return;
    if (e.target.parentElement.nodeName === "T" || e.target.parentElement.nodeName === "ROOT") {
      mind.beginEdit(e.target);
    } else if (e.target.className !== "content") {
      let node = e.target;
      while (node.parentElement) {
        node = node.parentElement;
        if (node.nodeName === "TPC") {
          mind.beginEdit(node);
          break;
        }
      }
    }
  });
  mind.map.addEventListener("mousemove", (e) => {
    if (!mind.nodeDraggable) {
      if (e && e.target.className === "selected") {
        dragMoveHelper.clear();
        e.target.draggable = false;
        return;
      }
    }
    if (e.target.contentEditable !== "true") {
      dragMoveHelper.onMove(e, mind.container);
    }
  });
  mind.map.addEventListener("mousedown", (e) => {
    if (e.target.contentEditable !== "true") {
      dragMoveHelper.afterMoving = false;
      dragMoveHelper.mousedown = true;
    }
  });
  mind.map.addEventListener("mouseleave", (e) => {
    dragMoveHelper.clear();
  });
  mind.map.addEventListener("mouseup", (e) => {
    dragMoveHelper.clear();
  });
  mind.map.addEventListener("wheel", (e) => {
  });
}
const cn = {
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
};
var i18n = {
  cn,
  zh_CN: cn,
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
function contextMenu$1(mind, option) {
  const createTips = (words) => {
    const div = document.createElement("div");
    div.innerText = words;
    div.style.cssText = "position:absolute;bottom:20px;left:50%;transform:translateX(-50%);";
    return div;
  };
  const createLi = (id, name, keyname) => {
    const li = document.createElement("li");
    li.id = id;
    li.innerHTML = `<span>${encodeHTML(name)}</span><span>${encodeHTML(keyname)}</span>`;
    return li;
  };
  const locale = i18n[mind.locale] ? mind.locale : "en";
  const add_child = createLi("cm-add_child", i18n[locale].addChild, "tab");
  const add_parent = createLi("cm-add_parent", i18n[locale].addParent, "");
  const add_sibling = createLi("cm-add_sibling", i18n[locale].addSibling, "enter");
  const remove_child = createLi("cm-remove_child", i18n[locale].removeNode, "delete");
  const focus = createLi("cm-fucus", i18n[locale].focus, "");
  const unfocus = createLi("cm-unfucus", i18n[locale].cancelFocus, "");
  const up = createLi("cm-up", i18n[locale].moveUp, "PgUp");
  const down = createLi("cm-down", i18n[locale].moveDown, "Pgdn");
  const link = createLi("cm-link", i18n[locale].link, "");
  const nodeLink = createLi("cm-nodelink", i18n[locale].nodeLink, "");
  const summary = createLi("cm-summary", i18n[locale].summary, "");
  const menuUl = document.createElement("ul");
  menuUl.className = "menu-list";
  menuUl.appendChild(add_child);
  menuUl.appendChild(add_parent);
  menuUl.appendChild(add_sibling);
  menuUl.appendChild(remove_child);
  if (!option || option.focus) {
    menuUl.appendChild(focus);
    menuUl.appendChild(unfocus);
  }
  menuUl.appendChild(up);
  menuUl.appendChild(down);
  if (!option || option.link) {
    menuUl.appendChild(link);
    menuUl.appendChild(nodeLink);
  }
  menuUl.appendChild(summary);
  if (option && option.extend) {
    for (let i = 0; i < option.extend.length; i++) {
      const item = option.extend[i];
      const dom = createLi(item.name, item.name, item.key || "");
      menuUl.appendChild(dom);
      dom.onclick = (e) => {
        item.onclick(e);
      };
    }
  }
  const menuContainer = document.createElement("cmenu");
  menuContainer.appendChild(menuUl);
  menuContainer.hidden = true;
  mind.container.append(menuContainer);
  let isRoot = true;
  mind.container.oncontextmenu = function(e) {
    e.preventDefault();
    if (!mind.editable)
      return;
    const target = e.target;
    if (target.tagName === "TPC") {
      if (target.parentElement.tagName === "ROOT") {
        isRoot = true;
      } else {
        isRoot = false;
      }
      if (isRoot) {
        focus.className = "disabled";
        up.className = "disabled";
        down.className = "disabled";
        add_sibling.className = "disabled";
        remove_child.className = "disabled";
      } else {
        focus.className = "";
        up.className = "";
        down.className = "";
        add_sibling.className = "";
        remove_child.className = "";
      }
      mind.selectNode(target);
      menuContainer.hidden = false;
      const height = menuUl.offsetHeight;
      const width = menuUl.offsetWidth;
      if (height + e.clientY > window.innerHeight) {
        menuUl.style.top = "";
        menuUl.style.bottom = "0px";
      } else {
        menuUl.style.bottom = "";
        menuUl.style.top = e.clientY + 15 + "px";
      }
      if (width + e.clientX > window.innerWidth) {
        menuUl.style.left = "";
        menuUl.style.right = "0px";
      } else {
        menuUl.style.right = "";
        menuUl.style.left = e.clientX + 10 + "px";
      }
    }
  };
  menuContainer.onclick = (e) => {
    if (e.target === menuContainer)
      menuContainer.hidden = true;
  };
  add_child.onclick = (e) => {
    mind.addChild();
    menuContainer.hidden = true;
  };
  summary.onclick = (e) => {
    mind.addSummary();
    menuContainer.hidden = true;
  };
  add_parent.onclick = (e) => {
    mind.insertParent();
    menuContainer.hidden = true;
  };
  add_sibling.onclick = (e) => {
    if (isRoot)
      return;
    mind.insertSibling();
    menuContainer.hidden = true;
  };
  remove_child.onclick = (e) => {
    if (isRoot)
      return;
    mind.removeNode();
    menuContainer.hidden = true;
  };
  focus.onclick = (e) => {
    if (isRoot)
      return;
    mind.focusNode(mind.currentNode);
    menuContainer.hidden = true;
  };
  unfocus.onclick = (e) => {
    mind.cancelFocus();
    menuContainer.hidden = true;
  };
  up.onclick = (e) => {
    if (isRoot)
      return;
    mind.moveUpNode();
    menuContainer.hidden = true;
  };
  down.onclick = (e) => {
    if (isRoot)
      return;
    mind.moveDownNode();
    menuContainer.hidden = true;
  };
  link.onclick = (e) => {
    menuContainer.hidden = true;
    const from = mind.currentNode;
    const tips = createTips(i18n[locale].clickTips);
    mind.container.appendChild(tips);
    mind.map.addEventListener("click", (e2) => {
      e2.preventDefault();
      tips.remove();
      if (e2.target.parentElement.nodeName === "T" || e2.target.parentElement.nodeName === "ROOT") {
        const to = mind.currentNode;
        mind.createLink(from, to);
      } else {
        console.log("\u53D6\u6D88\u8FDE\u63A5");
      }
    }, {
      once: true
    });
  };
  nodeLink.onclick = (e) => {
    menuContainer.hidden = true;
    const from = mind.currentNode;
    const tips = createTips(i18n[locale].clickTips);
    mind.container.appendChild(tips);
    mind.map.addEventListener("click", (e2) => {
      e2.preventDefault();
      tips.remove();
      if (e2.target.parentElement.nodeName === "T" || e2.target.parentElement.nodeName === "ROOT") {
        const to = mind.currentNode;
        if (!from.nodeObj.linkJump)
          from.nodeObj.linkJump = [];
        from.nodeObj.linkJump.push({
          toId: to.nodeObj.id,
          title: to.nodeObj.topic
        });
        mind.shapeTpc(from, from.nodeObj);
        mind.linkDiv();
      } else {
        console.log("\u53D6\u6D88\u8FDE\u63A5");
      }
    }, {
      once: true
    });
  };
}
const img = `<svg style="width: 1.3em;height: 1.3em;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3464"><path d="M909.061224 684.930612c-5.22449 0-10.44898-2.089796-14.628571-6.269388l-291.526531-291.52653c-4.179592-4.179592-10.971429-4.179592-14.628571 0l-143.673469 143.673469c-9.926531 9.926531-22.987755 15.15102-37.093878 15.151021s-27.167347-5.22449-37.093877-15.151021l-39.183674-39.183673c-4.179592-4.179592-10.971429-4.179592-14.628571 0l-187.036735 187.036734c-8.359184 8.359184-21.420408 8.359184-29.779592 0-8.359184-8.359184-8.359184-21.420408 0-29.779591l187.036735-187.036735c20.37551-20.37551 53.289796-20.37551 73.665306 0l39.183673 39.183673c2.612245 2.612245 5.746939 3.134694 7.314286 3.134694s4.702041-0.522449 7.314286-3.134694l143.673469-143.673469c20.37551-20.37551 53.289796-20.37551 73.665306 0l291.526531 291.526531c8.359184 8.359184 8.359184 21.420408 0 29.779591-3.657143 4.179592-8.881633 6.269388-14.106123 6.269388zM846.367347 867.265306H177.632653c-45.97551 0-83.591837-37.616327-83.591837-83.591837V240.326531c0-45.97551 37.616327-83.591837 83.591837-83.591837h668.734694c45.97551 0 83.591837 37.616327 83.591837 83.591837v543.346938c0 45.97551-37.616327 83.591837-83.591837 83.591837zM177.632653 198.530612c-22.987755 0-41.795918 18.808163-41.795918 41.795919v543.346938c0 22.987755 18.808163 41.795918 41.795918 41.795919h668.734694c22.987755 0 41.795918-18.808163 41.795918-41.795919V240.326531c0-22.987755-18.808163-41.795918-41.795918-41.795919H177.632653zM261.22449 303.020408m-52.244898 0a52.244898 52.244898 0 1 0 104.489796 0 52.244898 52.244898 0 1 0-104.489796 0ZM644.179592 768h-365.714286c-11.493878 0-20.897959-9.404082-20.897959-20.897959s9.404082-20.897959 20.897959-20.897959h365.714286c11.493878 0 20.897959 9.404082 20.897959 20.897959s-9.404082 20.897959-20.897959 20.897959zM461.322449 670.82449h-182.857143c-11.493878 0-20.897959-9.404082-20.897959-20.897959s9.404082-20.897959 20.897959-20.89796h182.857143c11.493878 0 20.897959 9.404082 20.897959 20.89796s-9.404082 20.897959-20.897959 20.897959z" p-id="3465"></path></svg>`;
function queryList(nodeData, cnt) {
  var _a;
  let res = "";
  for (let i = 0; i < ((_a = nodeData.children) == null ? void 0 : _a.length); i++) {
    res += `<li class="sidebar-links">${queryList(nodeData.children[i], cnt + 1)}</li>`;
  }
  if (!(nodeData == null ? void 0 : nodeData.children) || !nodeData.children.length) {
    return `<p class="sidebar-title" id="sidebar${nodeData.id}"><span class="arrow" ${nodeData.topic ? "" : 'style="margin-bottom:5px;"'}"></span><span>${nodeData.topic ? nodeData.topic : img}</span></p>`;
  } else {
    return `<p class="sidebar-title" id="sidebar${nodeData.id}"><span class="arrow ${cnt < 2 ? "down" : "right"}" ${nodeData.topic ? "" : 'style="margin-bottom:5px;"'}></span><span>${nodeData.topic ? nodeData.topic : img}</span></p><ul class="sidebar-heading open ${cnt < 2 ? "" : "hidden"}">${res}</ul>`;
  }
}
function updateSidebar(mind, sidebar2) {
  const nodeData = mind.nodeData;
  sidebar2.innerHTML = `${queryList(nodeData, 0)}`;
  sidebar2.querySelectorAll(".sidebar-title").forEach((e) => {
    e.onclick = () => {
      const down = e.querySelector(".down");
      const right = e.querySelector(".right");
      const curActive = mind.container.querySelector(".sidebar-title.active");
      curActive == null ? void 0 : curActive.classList.remove("active");
      if (down) {
        e.parentElement.querySelector("ul").classList.add("hidden");
        down.classList.replace("down", "right");
      } else if (right) {
        e.parentElement.querySelector("ul").classList.remove("hidden");
        right.classList.replace("right", "down");
      }
      e.classList.add("active");
      moveToNode.call(mind, e.id.replace("sidebar", ""));
    };
  });
}
function sidebar$1(mind) {
  const sidebar2 = document.createElement("sidebar");
  const nodeData = mind.nodeData;
  sidebar2.innerHTML = `${queryList(nodeData, 0)}`;
  mind.container.append(sidebar2);
}
const createButton = (id, name) => {
  const button = document.createElement("span");
  button.id = id;
  button.innerHTML = `<svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-${name}"></use>
  </svg>`;
  return button;
};
let timer = null;
function debounce(fun, wait) {
  return function() {
    const argu = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      fun.apply(this, argu);
    }, wait);
  };
}
function createToolBarRBContainer(mind) {
  var _a;
  const toolBarRBContainer = document.createElement("toolbar");
  const fc = createButton("fullscreen", "full");
  const gc = createButton("toCenter", "living");
  const zo = createButton("zoomout", "move");
  const zi = createButton("zoomin", "add");
  const numberSelection = document.createElement("input");
  numberSelection.className = "numberSelection";
  numberSelection.type = "number";
  numberSelection.min = "2";
  numberSelection.max = "100";
  numberSelection.step = "1";
  numberSelection.value = ((_a = mind == null ? void 0 : mind.expandDeep) == null ? void 0 : _a.toString()) || "2";
  numberSelection.oninput = debounce(() => {
    const data = mind.getAllDataWithAutoHide();
    expandNodeChild(data == null ? void 0 : data.nodeData);
    mind.layout();
    mind.linkDiv();
  }, 300);
  const percentage = document.createElement("span");
  percentage.innerText = "100%";
  toolBarRBContainer.appendChild(numberSelection);
  toolBarRBContainer.appendChild(fc);
  toolBarRBContainer.appendChild(gc);
  toolBarRBContainer.appendChild(zo);
  toolBarRBContainer.appendChild(zi);
  if (mind.uploadButton) {
    const uploadButton = createUploadButton(mind);
    toolBarRBContainer.appendChild(uploadButton);
  }
  toolBarRBContainer.className = "rb";
  fc.onclick = () => {
    mind.container.requestFullscreen();
  };
  gc.onclick = () => {
    mind.toTopLeft();
  };
  zo.onclick = () => {
    if (mind.scaleVal < 0.6)
      return;
    mind.scale(mind.scaleVal -= 0.2);
  };
  zi.onclick = () => {
    if (mind.scaleVal > 1.6)
      return;
    mind.scale(mind.scaleVal += 0.2);
  };
  mind.bus.addListener("wheel", (e) => {
    const viewBTop = e.pageY - e.clientY + document.documentElement.clientHeight;
    const mindBTop = mind.container.getBoundingClientRect().top + window.scrollY - mind.container.clientTop + mind.container.clientHeight;
    const offsetTop = mindBTop - viewBTop > 0 ? mindBTop - viewBTop : 0;
    const offset = offsetTop + toolBarRBContainer.clientHeight - 20;
    if (offset > 20 && offset < mind.container.clientHeight - toolBarRBContainer.clientHeight - 20)
      toolBarRBContainer.style.bottom = offset + "px";
  });
  return toolBarRBContainer;
}
function createToolBarLTContainer(mind) {
  const toolBarLTContainer = document.createElement("toolbar");
  const menu = createButton("sidebar", "menu");
  const l = createButton("tbltl", "left");
  const r = createButton("tbltr", "right");
  const s = createButton("tblts", "side");
  toolBarLTContainer.appendChild(menu);
  toolBarLTContainer.appendChild(l);
  toolBarLTContainer.appendChild(r);
  toolBarLTContainer.appendChild(s);
  toolBarLTContainer.className = "lt";
  menu.onclick = () => {
    const sidebar2 = document.querySelector("sidebar");
    updateSidebar(mind, sidebar2);
    if (sidebar2.classList.contains("selected")) {
      sidebar2.removeAttribute("class");
    } else {
      sidebar2.setAttribute("class", "selected");
    }
  };
  l.onclick = () => {
    mind.initLeft();
  };
  r.onclick = () => {
    mind.initRight();
  };
  s.onclick = () => {
    mind.initSide();
  };
  mind.bus.addListener("wheel", (e) => {
    const viewTop = e.pageY - e.clientY;
    const mindTop = mind.container.getBoundingClientRect().top + window.scrollY - mind.container.clientTop;
    const offset = viewTop - mindTop + 20;
    if (offset > 20 && offset < mind.container.clientHeight - toolBarLTContainer.clientHeight - 20)
      toolBarLTContainer.style.top = offset + "px";
  });
  return toolBarLTContainer;
}
function createCloseButton(mind) {
  const close = createButton("close", "close");
  close.onclick = () => {
    console.log("\u5173\u95ED");
    mind.bus.fire("close", {});
  };
  return close;
}
function createUploadButton(mind) {
  const button = document.createElement("span");
  button.innerHTML = `
  <form action="" enctype="multipart/form-data" method="post" class="fm">
    <input type="file" name="file" class="selectFile">
  </form>
  <svg t="1662362270319" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2591" width="200" height="200">
  <path d="M324.6592 352.13312c7.1168 0 13.34272-2.66752 18.688-8.00768l141.50656-141.51168v443.2128c0 15.12448 11.5712 26.70592 26.7008 26.70592s26.7008-11.58144 26.7008-26.70592V202.61376l141.50656 141.51168c5.34528 5.34016 12.4672 8.00768 18.688 8.00768 6.23616 0 13.35296-2.66752 18.69312-8.00768 10.68032-10.68032 10.68032-27.59168 0-37.38112l-186.9056-186.89536c-0.88576-0.89088-2.66752-2.66752-4.44416-3.5584-0.88576 0-1.77664-0.89088-1.77664-0.89088-0.896-0.88576-1.78688-0.88576-2.67776-1.77664-0.89088 0-1.77664-0.89088-2.66752-0.89088-0.896 0-1.77664-0.89088-2.66752-0.89088a21.67296 21.67296 0 0 0-10.68032 0c-0.89088 0-1.77664 0.89088-2.66752 0.89088-0.89088 0-1.78176 0.89088-2.67264 0.89088-0.89088 0-1.77664 0.89088-2.66752 1.77664-0.89088 0-1.77664 0.89088-1.77664 0.89088-1.78176 0.89088-2.66752 1.78176-4.4544 3.5584L304.18944 306.74432c-10.68032 10.68032-10.68032 27.59168 0 37.38112 7.1168 5.34016 13.34784 8.00768 20.46976 8.00768z" fill="#333333" p-id="2592"></path><path d="M929.84832 556.83072c-15.1296 0-26.7008 11.5712-26.7008 26.7008v206.47936c0 38.272-31.15008 69.42208-69.41696 69.42208H189.37856c-38.26688 0-69.41696-31.15008-69.41696-69.42208v-206.47936c0-15.1296-11.5712-26.7008-26.7008-26.7008s-26.69568 11.5712-26.69568 26.7008v206.47936c0 67.6352 55.17824 122.81856 122.81856 122.81856h645.23776c67.64544 0 122.82368-55.18336 122.82368-122.81856v-206.47936c-0.896-15.1296-12.4672-26.7008-27.5968-26.7008z" 
  fill="#333333" p-id="2593"></path>
  </svg>
  `;
  const fm = button.children[0];
  fm.addEventListener("change", (e) => {
    mind.bus.fire("upload", fm);
  });
  return button;
}
function toolBar$1(mind) {
  mind.container.append(createToolBarRBContainer(mind));
  mind.container.append(createToolBarLTContainer(mind));
  mind.closeButton && mind.container.append(createCloseButton(mind));
}
const createDiv = (id) => {
  const div = document.createElement("div");
  div.id = id;
  return div;
};
const colorList = [
  "#2c3e50",
  "#34495e",
  "#7f8c8d",
  "#94a5a6",
  "#bdc3c7",
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
function nodeMenu$1(mind) {
  const locale = i18n[mind.locale] ? mind.locale : "en";
  let bgOrFont;
  const styleDiv = createDiv("nm-style");
  const tagDiv = createDiv("nm-tag");
  const iconDiv = createDiv("nm-icon");
  const linkDiv2 = createDiv("nm-link");
  const remarkDiv = createDiv("nm-remark");
  styleDiv.innerHTML = `
      <div class="nm-fontsize-container">
        ${["15", "24", "32"].map((size) => {
    return `<div class="size"  data-size="${size}">
        <svg class="icon" style="width: ${size}px;height: ${size}px" aria-hidden="true">
          <use xlink:href="#icon-a"></use>
        </svg></div>`;
  }).join("")}<div class="bold"><svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-B"></use>
  </svg></div>
      </div>
      <div class="nm-fontcolor-container">
        ${colorList.map((color) => {
    return `<div class="split6"><div class="palette" data-color="${color}" style="background-color: ${color};"></div></div>`;
  }).join("")}
      </div>
      <div class="bof">
      <span class="font">${i18n[locale].font}</span>
      <span class="background">${i18n[locale].background}</span>
      </div>
  `;
  tagDiv.innerHTML = `${i18n[locale].tag}<input class="nm-tag" tabindex="-1" placeholder="${i18n[locale].tagsSeparate}" /><br>`;
  iconDiv.innerHTML = `${i18n[locale].icon}<input class="nm-icon" tabindex="-1" placeholder="${i18n[locale].iconsSeparate}" /><br>`;
  linkDiv2.innerHTML = `${i18n[locale].hyperlink}<input class="nm-link" tabindex="-1" placeholder="${i18n[locale].linkSeparate}" /><br>`;
  remarkDiv.innerHTML = `${i18n[locale].remark}<input class="nm-remark" tabindex="-1" placeholder="${i18n[locale].reamrkSeparate}" /><br>`;
  const menuContainer = document.createElement("nmenu");
  menuContainer.innerHTML = `
  <div class="button-container"><svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-close"></use>
  </svg></div>
  `;
  menuContainer.appendChild(styleDiv);
  menuContainer.appendChild(tagDiv);
  menuContainer.appendChild(iconDiv);
  menuContainer.appendChild(linkDiv2);
  menuContainer.appendChild(remarkDiv);
  menuContainer.hidden = true;
  function clearSelect(klass, remove) {
    var elems = mind.container.querySelectorAll(klass);
    [].forEach.call(elems, function(el) {
      el.classList.remove(remove);
    });
  }
  mind.container.append(menuContainer);
  const sizeSelector = menuContainer.querySelectorAll(".size");
  const bold = menuContainer.querySelector(".bold");
  const buttonContainer = menuContainer.querySelector(".button-container");
  const fontBtn = menuContainer.querySelector(".font");
  const tagInput = mind.container.querySelector(".nm-tag");
  const iconInput = mind.container.querySelector(".nm-icon");
  const linkInput = mind.container.querySelector(".nm-link");
  const remarkInput = mind.container.querySelector(".nm-remark");
  menuContainer.onclick = (e) => {
    if (!mind.currentNode)
      return;
    const nodeObj = mind.currentNode.nodeObj;
    const target = e.target;
    if (target.className === "palette") {
      if (!nodeObj.style)
        nodeObj.style = {};
      clearSelect(".palette", "nmenu-selected");
      target.className = "palette nmenu-selected";
      if (bgOrFont === "font") {
        nodeObj.style.color = target.dataset.color;
      } else if (bgOrFont === "background") {
        nodeObj.style.background = target.dataset.color;
      }
      mind.updateNodeStyle(nodeObj);
    } else if (target.className === "background") {
      clearSelect(".palette", "nmenu-selected");
      bgOrFont = "background";
      target.className = "background selected";
      target.previousElementSibling.className = "font";
      if (nodeObj.style && nodeObj.style.background) {
        menuContainer.querySelector('.palette[data-color="' + nodeObj.style.background + '"]').className = "palette nmenu-selected";
      }
    } else if (target.className === "font") {
      clearSelect(".palette", "nmenu-selected");
      bgOrFont = "font";
      target.className = "font selected";
      target.nextElementSibling.className = "background";
      if (nodeObj.style && nodeObj.style.color) {
        menuContainer.querySelector('.palette[data-color="' + nodeObj.style.color + '"]').className = "palette nmenu-selected";
      }
    }
  };
  Array.from(sizeSelector).map((dom) => {
    dom.onclick = (e) => {
      if (!mind.currentNode.nodeObj.style)
        mind.currentNode.nodeObj.style = {};
      clearSelect(".size", "size-selected");
      const size = e.currentTarget;
      mind.currentNode.nodeObj.style.fontSize = size.dataset.size;
      size.className = "size size-selected";
      mind.updateNodeStyle(mind.currentNode.nodeObj);
    };
  });
  bold.onclick = (e) => {
    if (!mind.currentNode.nodeObj.style)
      mind.currentNode.nodeObj.style = {};
    if (mind.currentNode.nodeObj.style.fontWeight === "bold") {
      delete mind.currentNode.nodeObj.style.fontWeight;
      e.currentTarget.className = "bold";
      mind.updateNodeStyle(mind.currentNode.nodeObj);
    } else {
      mind.currentNode.nodeObj.style.fontWeight = "bold";
      e.currentTarget.className = "bold size-selected";
      mind.updateNodeStyle(mind.currentNode.nodeObj);
    }
  };
  tagInput.onchange = (e) => {
    if (!mind.currentNode)
      return;
    if (e.target.value !== null || e.target.value !== void 0) {
      let newTags;
      if (e.target.value === "")
        newTags = [];
      else
        newTags = e.target.value.split(",");
      mind.updateNodeTags(mind.currentNode.nodeObj, newTags);
    }
  };
  iconInput.onchange = (e) => {
    if (!mind.currentNode)
      return;
    if (e.target.value !== null || e.target.value !== void 0) {
      const newIcons = e.target.value.split(",");
      mind.updateNodeIcons(mind.currentNode.nodeObj, newIcons);
    }
  };
  linkInput.onchange = (e) => {
    if (!mind.currentNode)
      return;
    if (e.target.value !== null || e.target.value !== void 0) {
      const link = e.target.value;
      mind.updateNodeHyperLink(mind.currentNode.nodeObj, link);
    }
  };
  remarkInput.onchange = (e) => {
    if (!mind.currentNode)
      return;
    if (e.target.value !== null || e.target.value !== void 0) {
      const input = e.target.value;
      mind.updateNodeRemark(mind.currentNode.nodeObj, input);
    }
  };
  let state = "open";
  buttonContainer.onclick = (e) => {
    if (state === "open") {
      state = "close";
      menuContainer.className = "close";
      buttonContainer.innerHTML = `<svg class="icon" aria-hidden="true"><use xlink:href="#icon-menu"></use></svg>`;
    } else {
      state = "open";
      menuContainer.className = "";
      buttonContainer.innerHTML = `<svg class="icon" aria-hidden="true"><use xlink:href="#icon-close"></use></svg>`;
    }
  };
  mind.bus.addListener("unselectNode", function() {
    menuContainer.hidden = true;
  });
  mind.bus.addListener("selectNode", function(nodeObj, clickEvent) {
    if (!clickEvent)
      return;
    menuContainer.hidden = false;
    clearSelect(".palette", "nmenu-selected");
    clearSelect(".size", "size-selected");
    clearSelect(".bold", "size-selected");
    bgOrFont = "font";
    fontBtn.className = "font selected";
    fontBtn.nextElementSibling.className = "background";
    if (nodeObj.style) {
      if (nodeObj.style.fontSize) {
        const dataSize = menuContainer.querySelector('.size[data-size="' + nodeObj.style.fontSize + '"]');
        if (dataSize)
          dataSize.className = "size size-selected";
      }
      if (nodeObj.style.fontWeight) {
        const dataWeight = menuContainer.querySelector(".bold");
        if (dataWeight)
          dataWeight.className = "bold size-selected";
      }
      if (nodeObj.style.color) {
        const dataColor = menuContainer.querySelector('.palette[data-color="' + nodeObj.style.color + '"]');
        if (dataColor)
          dataColor.className = "palette nmenu-selected";
      }
    }
    if (nodeObj.tags) {
      tagInput.value = nodeObj.tags.join(",");
    } else {
      tagInput.value = "";
    }
    if (nodeObj.icons) {
      iconInput.value = nodeObj.icons.join(",");
    } else {
      iconInput.value = "";
    }
    linkInput.value = "";
    if (nodeObj.hyperLink) {
      linkInput.value = nodeObj.hyperLink;
    }
    if (nodeObj.linkJump) {
      if (linkInput.value.length > 0)
        linkInput.value += ",";
      linkInput.value += nodeObj.linkJump.map((val) => val.title).reduce((preVal, curVal, index2) => preVal + (index2 ? "," : "") + curVal, "");
    }
    if (nodeObj.remark) {
      remarkInput.value = nodeObj.remark;
    } else {
      remarkInput.value = "";
    }
  });
}
const $d$1 = document;
const insertPreview = function(el, insertLocation) {
  if (!insertLocation) {
    clearPreview(el);
    return el;
  }
  const query = el.getElementsByClassName("insert-preview");
  const className = `insert-preview ${insertLocation} show`;
  if (query.length > 0) {
    query[0].className = className;
  } else {
    const insertPreviewEL = $d$1.createElement("div");
    insertPreviewEL.className = className;
    el.appendChild(insertPreviewEL);
  }
  return el;
};
const clearPreview = function(el) {
  if (!el)
    return;
  const query = el.getElementsByClassName("insert-preview");
  for (const queryElement of query || []) {
    queryElement.remove();
  }
};
const canPreview = function(el, dragged) {
  const isContain = dragged.parentNode.parentNode.contains(el);
  return el && el.tagName === "TPC" && el !== dragged && !isContain && el.nodeObj.root !== true;
};
function nodeDraggable(mind) {
  let dragged;
  let insertLocation;
  let meet;
  const threshold = 12;
  mind.map.addEventListener("dragstart", function(e) {
    dragged = e.target;
    dragged.parentNode.parentNode.style.opacity = "0.5";
    dragMoveHelper.clear();
  });
  mind.map.addEventListener("dragend", async function(e) {
    e.target.style.opacity = "";
    clearPreview(meet);
    const obj = dragged.nodeObj;
    switch (insertLocation) {
      case "before":
        mind.moveNodeBefore(dragged, meet);
        mind.selectNode(findEle(obj.id));
        break;
      case "after":
        mind.moveNodeAfter(dragged, meet);
        mind.selectNode(findEle(obj.id));
        break;
      case "in":
        mind.moveNode(dragged, meet);
        break;
    }
    dragged.parentNode.parentNode.style.opacity = "1";
    dragged = null;
  });
  mind.map.addEventListener("dragover", throttle(function(e) {
    clearPreview(meet);
    const topMeet = $d$1.elementFromPoint(e.clientX, e.clientY - threshold);
    if (canPreview(topMeet, dragged)) {
      meet = topMeet;
      const y = topMeet.getBoundingClientRect().y;
      if (e.clientY > y + topMeet.clientHeight) {
        insertLocation = "after";
      } else if (e.clientY > y + topMeet.clientHeight / 2) {
        insertLocation = "in";
      }
    } else {
      const bottomMeet = $d$1.elementFromPoint(e.clientX, e.clientY + threshold);
      if (canPreview(bottomMeet, dragged)) {
        meet = bottomMeet;
        const y = bottomMeet.getBoundingClientRect().y;
        if (e.clientY < y) {
          insertLocation = "before";
        } else if (e.clientY < y + bottomMeet.clientHeight / 2) {
          insertLocation = "in";
        }
      } else {
        insertLocation = meet = null;
      }
    }
    if (meet)
      insertPreview(meet, insertLocation);
  }, 200));
}
function keypress(mind) {
  const key2func = {
    13: () => {
      mind.insertSibling();
    },
    9: () => {
      mind.addChild();
    },
    17: (e) => {
      mind.ctrlRepeat = true;
      console.log("\u6309\u4E0Bcontroll");
    },
    91: (e) => {
      mind.ctrlRepeat = true;
      console.log("\u6309\u4E0Bcommand");
    },
    113: () => {
      mind.beginEdit();
    },
    38: () => {
      mind.selectPrevSibling();
    },
    40: () => {
      mind.selectNextSibling();
    },
    37: () => {
      if (!mind.currentNode)
        return;
      if (mind.currentNode.offsetParent.offsetParent.className === "rhs") {
        mind.selectParent();
      } else if (mind.currentNode.offsetParent.offsetParent.className === "lhs" || mind.currentNode.nodeObj.root) {
        mind.selectFirstChild();
      }
    },
    39: () => {
      if (!mind.currentNode)
        return;
      if (mind.currentNode.offsetParent.offsetParent.className === "rhs" || mind.currentNode.nodeObj.root) {
        mind.selectFirstChild();
      } else if (mind.currentNode.offsetParent.offsetParent.className === "lhs") {
        mind.selectParent();
      }
    },
    33() {
      mind.moveUpNode();
    },
    34() {
      mind.moveDownNode();
    },
    67(e) {
      if (e.metaKey || e.ctrlKey) {
        mind.waitCopy = mind.currentNode;
      }
    },
    86(e) {
      if (!mind.waitCopy)
        return;
      if (e.metaKey || e.ctrlKey) {
        mind.copyNode(mind.waitCopy, mind.currentNode);
        mind.waitCopy = null;
      }
    },
    90: (e) => {
      if (!mind.allowUndo)
        return;
      if (e.metaKey || e.ctrlKey)
        mind.undo();
    },
    187: (e) => {
      if (e.metaKey || e.ctrlKey) {
        if (mind.scaleVal > 1.6)
          return;
        mind.scale(mind.scaleVal += 0.2);
      }
    },
    189: (e) => {
      if (e.metaKey || e.ctrlKey) {
        if (mind.scaleVal < 0.6)
          return;
        mind.scale(mind.scaleVal -= 0.2);
      }
    }
  };
  mind.map.onkeydown = (e) => {
    if (!mind.editable)
      return;
    if (e.target !== e.currentTarget) {
      return;
    }
    if (e.keyCode === 8 || e.keyCode === 46) {
      if (mind.currentLink)
        mind.removeLink();
      else
        mind.removeNode();
    } else {
      key2func[e.keyCode] && key2func[e.keyCode](e);
    }
  };
  mind.map.onkeyup = (e) => {
    if (e.keyCode === 17 || e.keyCode === 91) {
      mind.ctrlRepeat = false;
    }
  };
}
function mobileMenu$1(mind, option) {
  const createLi = (id, name) => {
    const div = document.createElement("div");
    div.id = id;
    div.innerHTML = `<svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-${name}"></use>
  </svg>`;
    return div;
  };
  const add_child = createLi("cm-add_child", "zijiedian");
  const add_sibling = createLi("cm-add_sibling", "tongjijiedian-");
  const remove_child = createLi("cm-remove_child", "shanchu2");
  const up = createLi("cm-up", "rising");
  const down = createLi("cm-down", "falling");
  const edit = createLi("cm-edit", "edit");
  const menuUl = document.createElement("ul");
  menuUl.className = "menu-list";
  if (option && option.extend) {
    for (let i = 0; i < option.extend.length; i++) {
      const item = option.extend[i];
      const dom = createLi(item.name, item.name);
      menuUl.appendChild(dom);
      dom.onclick = (e) => {
        item.onclick(e);
      };
    }
  }
  const menuContainer = document.createElement("mmenu");
  menuContainer.appendChild(add_child);
  menuContainer.appendChild(add_sibling);
  menuContainer.appendChild(remove_child);
  menuContainer.appendChild(up);
  menuContainer.appendChild(down);
  menuContainer.appendChild(edit);
  menuContainer.hidden = true;
  mind.container.append(menuContainer);
  let isRoot = true;
  mind.bus.addListener("unselectNode", function() {
    menuContainer.hidden = true;
  });
  mind.bus.addListener("selectNode", function(nodeObj) {
    menuContainer.hidden = false;
    if (nodeObj.root) {
      isRoot = true;
    } else {
      isRoot = false;
    }
  });
  menuContainer.onclick = (e) => {
    if (e.target === menuContainer)
      menuContainer.hidden = true;
  };
  add_child.onclick = (e) => {
    mind.addChild();
  };
  add_sibling.onclick = (e) => {
    if (isRoot)
      return;
    mind.insertSibling();
  };
  remove_child.onclick = (e) => {
    if (isRoot)
      return;
    mind.removeNode();
  };
  up.onclick = (e) => {
    if (isRoot)
      return;
    mind.moveUpNode();
  };
  down.onclick = (e) => {
    if (isRoot)
      return;
    mind.moveDownNode();
  };
  edit.onclick = (e) => {
    mind.beginEdit();
  };
}
function Bus() {
  this.handlers = {};
}
Bus.prototype = {
  showHandler: function() {
    console.log(this.handlers);
  },
  addListener: function(type, handler) {
    if (this.handlers[type] === void 0)
      this.handlers[type] = [];
    this.handlers[type].push(handler);
  },
  fire: function(type, ...payload) {
    if (this.handlers[type] instanceof Array) {
      var handlers = this.handlers[type];
      for (var i = 0; i < handlers.length; i++) {
        handlers[i](...payload);
      }
    }
  },
  removeListener: function(type, handler) {
    if (!this.handlers[type])
      return;
    var handlers = this.handlers[type];
    if (!handler) {
      handlers.length = 0;
    } else if (handlers.length) {
      for (var i = 0; i < handlers.length; i++) {
        if (handlers[i] === handler) {
          this.handlers[type].splice(i, 1);
        }
      }
    }
  }
};
var index = /* @__PURE__ */ (() => ".mind-elixir{min-height:200px;line-height:initial;position:relative;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mind-elixir .hyper-link{text-decoration:none}.map-container{user-select:none;height:100%;width:100%;overflow:scroll;font-size:15px}.map-container::-webkit-scrollbar{width:0px;height:0px}.map-container .focus-mode{position:absolute;top:0;left:0;height:100%;width:100%;background:#fff}.map-container #close{position:absolute;right:35px;top:22px;cursor:pointer;opacity:.7}.map-container #close:hover{opacity:1}.map-container #close .icon:hover{color:#fff;background-color:#ed0a0a7c}.map-container .map-canvas{height:20000px;width:20000px;position:relative;user-select:text;transition:all .3s;transform:scale(1);background:#f6f6f6}.map-container .map-canvas .selected{outline:2px solid #4dc4ff}.map-container .map-canvas root{position:absolute}.map-container .map-canvas root tpc{display:block;color:#fff;padding:10px 15px;background-color:#0af;border-radius:5px;font-size:25px;white-space:pre-wrap;word-break:break-all}.map-container .map-canvas root tpc #input-box{padding:10px 15px}.map-container .mindbox>grp{position:absolute}.map-container .mindbox>grp>t>tpc{background-color:#fff;border:1px solid #444444;border-radius:5px;color:#735c45;padding:8px 10px;margin:0;white-space:pre-wrap;word-break:break-all}.map-container .mindbox>grp>t>tpc #input-box{padding:8px 10px}.map-container .mindbox .lhs{direction:rtl}.map-container .mindbox .lhs tpc{direction:ltr}.map-container .mindbox grp{display:block;pointer-events:none}.map-container .mindbox children,.map-container .mindbox t{display:inline-block;vertical-align:middle}.map-container .mindbox smychildren{display:inline-flex;flex-direction:column}.map-container .mindbox smychildren smy{position:relative;display:inline-block;vertical-align:middle}.map-container .mindbox smychildren smy>t{margin-left:10px}.map-container .mindbox t{display:inline-block;vertical-align:middle}.map-container .mindbox t{position:relative;cursor:pointer;padding:0 15px;margin-top:10px}.map-container .mindbox t tpc{position:relative;display:block;padding:5px;border-radius:3px;color:#666;pointer-events:all;max-width:1500px;white-space:pre-wrap;word-break:break-all;line-height:1}@keyframes blink{50%{border:2px solid #ff0000;border-radius:5px}}.map-container .mindbox t tpc.blink{animation:blink .5s step-end infinite alternate}.map-container .mindbox t tpc #input-box{padding:5px}.map-container .mindbox t tpc .width-controll-right{border:none;width:7px;height:29px;cursor:ew-resize;display:inline-block;position:absolute;right:-4px;top:1px}.map-container .mindbox t tpc .width-controll-left{border:none;width:7px;height:29px;cursor:ew-resize;display:inline-block;position:absolute;left:-4px;top:1px}.map-container .mindbox t tpc .tags{font-size:25px;direction:ltr}.map-container .mindbox t tpc .tags span{height:auto;display:inline-block;border-radius:3px;padding:2px 4px;background:#d6f0f8;color:#276f86;margin:2px 3px 0 0;font-size:12px;line-height:16px}.map-container .mindbox t tpc .hyper-link{font-size:25px;cursor:pointer}.map-container .mindbox t tpc .icons{display:inline-block;direction:ltr;margin-right:10px}.map-container .mindbox t tpc .insert-preview{position:absolute;width:100%;left:0px;z-index:9}.map-container .mindbox t tpc .before{height:14px;top:-14px}.map-container .mindbox t tpc .show{background:#7ad5ff;pointer-events:none;opacity:.7}.map-container .mindbox t tpc .in{height:100%;top:0px}.map-container .mindbox t tpc .after{height:14px;bottom:-14px}.map-container .mindbox t epd{position:absolute;height:12px;width:12px;line-height:10px;text-align:center;border-radius:50%;border:1px solid #4f4f4f;background-color:#fff;pointer-events:all;z-index:9}.map-container .mindbox t epd.minus{transition:all .3s}.map-container .mindbox t epd.minus:hover{opacity:1}.map-container .icon{width:1em;height:1em;vertical-align:-.15em;fill:currentColor;overflow:hidden}.map-container .remark{margin-left:3px;display:inline-block}.map-container .remark .content{user-select:text;cursor:text;padding:8px;background-color:beige;position:absolute;min-width:200px;z-index:10;margin-top:2px;box-shadow:var(--uk-popover-box-shadow, 0 12px 36px rgba(0, 0, 0, .3));border-radius:8px}.map-container .remark .content.hidden{display:none}.map-container .linkJump{margin-left:5px}.map-container .svg2nd,.map-container .svg3rd,.map-container .topiclinks,.map-container .linkcontroller{position:absolute;height:102%;width:100%;top:0;left:0}.map-container .topiclinks,.map-container .linkcontroller{pointer-events:none}.map-container .topiclinks g,.map-container .linkcontroller g{pointer-events:all}.map-container .svg2nd,.map-container .svg3rd{pointer-events:none;z-index:-1}.map-container .topiclinks *,.map-container .linkcontroller *{z-index:100}.map-container .topiclinks g{cursor:pointer}.down t,.down children{display:block!important}.down grp{display:inline-block!important}.circle{position:absolute;height:10px;width:10px;margin-top:-5px;margin-left:-5px;border-radius:100%;background:#aaa;cursor:pointer}#input-box{position:absolute;top:0;left:0;background-color:#fff;width:max-content;max-width:1200px;z-index:11;direction:ltr;user-select:auto}\n")();
var contextMenu = /* @__PURE__ */ (() => "cmenu{position:fixed;top:0;left:0;width:100%;height:100%;z-index:99}cmenu .menu-list{position:fixed;list-style:none;margin:0;padding:0;font:300 15px Roboto,sans-serif;color:#333;box-shadow:0 12px 15px #0003}cmenu .menu-list *{transition:color .4s,background-color .4s}cmenu .menu-list li{min-width:150px;overflow:hidden;white-space:nowrap;padding:6px 10px;background-color:#fff;border-bottom:1px solid #ecf0f1}cmenu .menu-list li a{color:#333;text-decoration:none}cmenu .menu-list li.disabled{color:#5e5e5e;background-color:#f7f7f7}cmenu .menu-list li.disabled:hover{cursor:default;background-color:#f7f7f7}cmenu .menu-list li:hover{cursor:pointer;background-color:#ecf0f1}cmenu .menu-list li:first-child{border-radius:5px 5px 0 0}cmenu .menu-list li:last-child{border-bottom:0;border-radius:0 0 5px 5px}cmenu .menu-list li span:last-child{float:right}\n")();
var toolBar = /* @__PURE__ */ (() => "toolbar{position:absolute;background:#fff;padding:10px;border-radius:5px;box-shadow:0 1px 2px #0003}toolbar span:active{opacity:.5}.rb{right:20px;bottom:20px;font-family:iconfont}.rb span+span{margin-left:10px}.rb .numberSelection{margin-bottom:0;margin-right:8px;width:32px;border-radius:.3rem;background-color:#fff;border-color:rgb(209 213 219 / var(--tw-border-opacity));--tw-border-opacity: 1;border-width:1px}.rb .fm{display:inline}.rb .selectFile{position:absolute;font-size:0;width:20px;height:23px;opacity:-6;z-index:99}.lt{font-size:20px;left:20px;top:20px;width:20px}.lt span{display:block}.lt span+span{margin-top:10px}\n")();
var nodeMenu = /* @__PURE__ */ (() => "nmenu{position:absolute;right:20px;top:20px;background:#fff;border-radius:5px;box-shadow:0 1px 2px #0003;width:240px;box-sizing:border-box;padding:0 15px 15px;transition:.3s all}nmenu.close{height:30px;width:46px;overflow:hidden}nmenu .button-container{padding:3px 0;direction:rtl}nmenu #nm-tag{margin-top:20px}nmenu .nm-fontsize-container{display:flex;justify-content:space-around;margin-bottom:20px}nmenu .nm-fontsize-container div{height:36px;width:36px;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 2px #0003;background-color:#fff;color:tomato;border-radius:100%}nmenu .nm-fontcolor-container{margin-bottom:10px}nmenu input{background:#f7f9fa;border:1px solid #dce2e6;border-radius:3px;padding:5px;margin:10px 0;width:100%;box-sizing:border-box}nmenu .split6{display:inline-block;width:16.66%;margin-bottom:5px}nmenu .palette{border-radius:100%;width:21px;height:21px;border:1px solid #edf1f2;margin:auto}nmenu .nmenu-selected,nmenu .palette:hover{box-shadow:tomato 0 0 0 2px;background-color:#c7e9fa}nmenu .size-selected{background-color:tomato!important;border-color:tomato;fill:#fff;color:#fff}nmenu .size-selected svg{color:#fff}nmenu .bof{text-align:center}nmenu .bof span{display:inline-block;font-size:14px;border-radius:4px;padding:2px 5px}nmenu .bof .selected{background-color:tomato;color:#fff}\n")();
var sidebar = /* @__PURE__ */ (() => 'sidebar{display:none;position:absolute;left:20px;top:195px;background:#fff;border-radius:5px;box-shadow:0 1px 2px #0003;width:20em;height:fit-content;max-height:70%;box-sizing:border-box;padding:0 8px 8px;transition:.3s all;overflow:scroll}sidebar ul{padding:0;margin:0;list-style-type:none}sidebar .sidebar-heading{color:#2c3e50;transition:color .15s ease;cursor:pointer;font-size:1em;font-weight:700;padding:.15rem .1rem .15rem .35rem;width:100%;box-sizing:border-box;margin:0;border-left:solid transparent}sidebar .sidebar-heading .sidebar-title{margin-block-start:.2em;margin-block-end:.2em;margin-inline-start:0px;margin-inline-end:0px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;height:18px}sidebar .sidebar-heading .sidebar-title:hover{background-color:#f7f8fa;border-radius:4px}sidebar .sidebar-heading .sidebar-title .arrow{margin-bottom:1px;margin-right:5px;position:relative;border-left:6px solid #ccc}sidebar .sidebar-heading .sidebar-title .arrow.down{border-left:4px solid transparent;border-right:4px solid transparent;border-top:6px solid #ccc}sidebar .sidebar-heading .sidebar-title .arrow.right{border-left:6px solid #ccc;border-top:4px solid transparent;border-bottom:4px solid transparent}sidebar .sidebar-heading .sidebar-title.active{color:#007fff}sidebar .sidebar-heading .sidebar-title.active:before{content:"";position:absolute;left:0;width:4px;height:16px;background:#1e80ff;border-radius:0 4px 4px 0}sidebar .sidebar-heading.open,sidebar .sidebar-heading:hover{color:inherit}sidebar .sidebar-links{font-weight:400;display:inline-block;color:#2c3e50;border-left:.25rem solid transparent;line-height:1.4;width:100%;box-sizing:border-box;transition:height .1s ease-out;font-size:.95em;overflow:hidden}.selected{display:block}.arrow{display:inline-block;width:0;height:0}ul ul{list-style-type:circle;margin-block-start:0px;margin-block-end:0px}ul{display:block;list-style-type:disc;margin-block-start:.2em;margin-block-end:.2em;margin-inline-start:0px;margin-inline-end:0px;padding-inline-start:20px}ul .hidden{display:none}li{text-align:-webkit-match-parent}\n')();
var mobileMenu = /* @__PURE__ */ (() => "mmenu{position:absolute;left:20px;bottom:70px;z-index:99;margin:0;padding:0;color:#333;border-radius:5px;box-shadow:0 12px 15px #0003;overflow:hidden}mmenu *{transition:color .4s,background-color .4s}mmenu div{float:left;text-align:center;width:30px;overflow:hidden;white-space:nowrap;padding:8px;background-color:#fff;border-bottom:1px solid #ecf0f1}mmenu div a{color:#333;text-decoration:none}mmenu div.disabled{color:#5e5e5e;background-color:#f7f7f7}mmenu div.disabled:hover{cursor:default;background-color:#f7f7f7}mmenu div:hover{cursor:pointer;background-color:#ecf0f1}\n")();
!function(t) {
  var c, l, a, e, o, i, n = '<svg><symbol id="icon-edit" viewBox="0 0 1024 1024"><path d="M423.765333 128a42.666667 42.666667 0 0 1 3.2 85.205333L423.765333 213.333333H234.666667a64 64 0 0 0-63.872 60.245334L170.666667 277.333333v512a64 64 0 0 0 60.245333 63.872L234.666667 853.333333h512a64 64 0 0 0 63.872-60.245333L810.666667 789.333333v-189.098666a42.666667 42.666667 0 0 1 85.205333-3.2l0.128 3.2V789.333333a149.333333 149.333333 0 0 1-144.213333 149.248L746.666667 938.666667h-512a149.333333 149.333333 0 0 1-149.248-144.213334L85.333333 789.333333v-512a149.333333 149.333333 0 0 1 144.213334-149.248L234.666667 128h189.098666z m324.949334-53.248a42.666667 42.666667 0 0 1 60.330666 0l150.869334 150.869333a42.666667 42.666667 0 0 1 0 60.330667l-329.386667 329.386667a42.666667 42.666667 0 0 1-29.44 12.458666l-153.386667 2.517334a42.666667 42.666667 0 0 1-43.349333-43.349334l2.56-153.386666a42.666667 42.666667 0 0 1 12.458667-29.44z m30.165333 90.496L491.946667 452.266667l-1.493334 91.989333 92.032-1.493333 286.976-286.976-90.538666-90.538667z"  ></path></symbol><symbol id="icon-rising" viewBox="0 0 1024 1024"><path d="M553.173333 803.84h-64l0.021334-474.581333-224.021334 224-45.269333-45.226667L521.6 206.293333l301.717333 301.696-45.269333 45.269334-224.853333-224.896v475.477333z"  ></path></symbol><symbol id="icon-falling" viewBox="0 0 1024 1024"><path d="M553.173333 238.314667h-64l0.021334 474.602666-224.021334-224-45.269333 45.226667L521.6 835.861333l301.717333-301.717333-45.269333-45.226667-224.853333 224.853334V238.336z"  ></path></symbol><symbol id="icon-shanchu2" viewBox="0 0 1024 1024"><path d="M516.60601807 107.93026734c-82.64382935 0-149.71865844 65.51751709-152.5729065 147.77160644H171.37136841c-21.40603638 0-38.92044068 17.38504028-38.92044068 38.92126465 0 21.40686036 17.38504028 38.92208862 38.92126466 38.92208862h42.94308471v435.40136719c0 81.73498536 55.39828492 148.55026245 123.90106201 148.55026245h348.99444581c68.37341309 0 123.90106201-66.42553711 123.901062-148.55026245V333.80477906h38.92126465c21.40686036 0 38.92126464-17.38586426 38.92126465-38.92208863 0-21.40686036-17.38504028-38.92126464-38.92126465-38.92126465H668.91854859C666.45321656 173.44860839 599.24902344 107.93109131 516.60601807 107.93109131z m-79.65939331 147.77160644c2.85424805-42.16442872 37.2354126-74.85809326 79.78875732-74.85809326s76.93450927 32.82302857 79.39984131 74.85809326H436.94662476z m-98.86047364 589.01165771c-24.2611084 0-50.98754883-31.13717651-50.98754883-75.76693725V333.80477906h450.97036744V769.33551026c0 44.50039673-26.72644043 75.76776123-50.98754884 75.76776122H338.08615112v-0.38973999z m0 0"  ></path><path d="M390.37063599 751.17263794c17.77313232 0 32.43411255-17.7739563 32.43411255-40.08883667V482.35504151c0-22.31488037-14.53079224-40.08966065-32.43411255-40.08966065-17.77478027 0-32.43493653 17.77478027-32.43493653 40.08966065v228.72875976c0 22.18469239 14.27124023 40.08883667 32.43493653 40.08883667z m117.41308594 0c17.7739563 0 32.43411255-17.7739563 32.43411255-40.08883667V482.35504151c0-22.31488037-14.53079224-40.08966065-32.43411255-40.08966065-17.7739563 0-32.43493653 17.77478027-32.43493653 40.08966065v228.72875976c0 22.18469239 14.66098023 40.08883667 32.43493653 40.08883667z m123.51049804 0c17.7739563 0 32.43493653-17.7739563 32.43493652-40.08883667V482.35504151c0-22.31488037-14.53079224-40.08966065-32.43493652-40.08966065-17.7739563 0-32.43411255 17.77478027-32.43411255 40.08966065v228.72875976c0 22.18469239 14.14105224 40.08883667 32.43411255 40.08883667z m0 0"  ></path></symbol><symbol id="icon-zijiedian" viewBox="0 0 1024 1024"><path d="M312.208 472c19.568-157.856 153.432-280 315.656-280 175.68 0 318.112 143.272 318.112 320S803.552 832 627.864 832c-162.224 0-296.08-122.144-315.656-280H120a40 40 0 0 1 0-80h192.208zM632 752c132.552 0 240-107.448 240-240 0-132.552-107.448-240-240-240-132.552 0-240 107.448-240 240 0 132.552 107.448 240 240 240z m-40-280v-80a40 40 0 0 1 80 0v80h80a40 40 0 0 1 0 80h-80v80a40 40 0 0 1-80 0v-80h-80a40 40 0 0 1 0-80h80z"  ></path></symbol><symbol id="icon-tongjijiedian-" viewBox="0 0 1024 1024"><path d="M803.84 131.626667H410.24A59.733333 59.733333 0 0 0 350.506667 192v45.226667H199.68a51.626667 51.626667 0 0 0-51.626667 51.626666v465.92a51.626667 51.626667 0 0 0 51.626667 51.626667h187.52v-55.466667h-162.133333a21.333333 21.333333 0 0 1-21.333334-21.333333V313.386667a21.333333 21.333333 0 0 1 21.333334-21.333334h125.653333v64a59.733333 59.733333 0 0 0 59.733333 59.733334h393.386667a59.733333 59.733333 0 0 0 59.733333-59.733334V192a59.733333 59.733333 0 0 0-59.733333-60.373333z m4.266667 224.64a4.266667 4.266667 0 0 1-4.266667 4.266666H410.24a4.266667 4.266667 0 0 1-4.266667-4.266666V192a4.266667 4.266667 0 0 1 4.266667-4.266667h393.6a4.266667 4.266667 0 0 1 4.266667 4.266667zM716.16 749.44h-81.28v-81.493333a27.733333 27.733333 0 0 0-55.466667 0v81.28h-81.493333a27.733333 27.733333 0 1 0 0 55.466666h81.28v81.28a27.733333 27.733333 0 1 0 55.466667 0v-81.066666h81.28a27.733333 27.733333 0 0 0 0-55.466667z"  ></path></symbol><symbol id="icon-close" viewBox="0 0 1024 1024"><path d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128L512.128 467.904l-263.04-263.84c-12.448-12.48-32.704-12.544-45.248-0.064-12.512 12.48-12.544 32.736-0.064 45.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248a31.937 31.937 0 0 0 22.688 9.44c8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408a31.94 31.94 0 0 0 22.592-9.344c12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z" fill="" ></path></symbol><symbol id="icon-menu" viewBox="0 0 1024 1024"><path d="M109.714 292.571h804.572c21.943 0 36.571-21.942 36.571-43.885 0-14.629-14.628-29.257-36.571-29.257H109.714c-21.943 0-36.571 14.628-36.571 36.571 0 14.629 14.628 36.571 36.571 36.571zM914.286 512H109.714c-21.943 0-36.571 14.629-36.571 36.571 0 14.629 14.628 36.572 36.571 36.572h804.572c21.943 0 36.571-21.943 36.571-43.886 0-14.628-14.628-29.257-36.571-29.257z m0 292.571H109.714c-21.943 0-36.571 14.629-36.571 36.572s14.628 36.571 36.571 36.571h804.572c21.943 0 36.571-21.943 36.571-36.571 0-21.943-14.628-36.572-36.571-36.572z"  ></path></symbol><symbol id="icon-right" viewBox="0 0 1024 1024"><path d="M385 560.69999999L385 738.9c0 36.90000001 26.4 68.5 61.3 68.5l150.2 0c1.5 0 3-0.1 4.5-0.3 10.2 38.7 45.5 67.3 87.5 67.3 50 0 90.5-40.5 90.5-90.5s-40.5-90.5-90.5-90.5c-42 0-77.3 28.6-87.5 67.39999999-1.4-0.3-2.9-0.4-4.5-0.39999999L446.3 760.4c-6.8 0-14.3-8.9-14.3-21.49999999l0-427.00000001c0-12.7 7.40000001-21.5 14.30000001-21.5l150.19999999 0c1.5 0 3-0.2 4.5-0.4 10.2 38.8 45.5 67.3 87.5 67.3 50 0 90.5-40.5 90.5-90.4 0-49.9-40.5-90.6-90.5-90.59999999-42 0-77.3 28.6-87.5 67.39999999-1.4-0.2-2.9-0.4-4.49999999-0.4L446.3 243.3c-34.80000001 0-61.3 31.6-61.3 68.50000001L385 513.7l-79.1 0c-10.4-38.5-45.49999999-67-87.4-67-50 0-90.5 40.5-90.5 90.5s40.5 90.5 90.5 90.5c41.79999999 0 77.00000001-28.4 87.4-67L385 560.69999999z" fill="#333333" ></path></symbol><symbol id="icon-left" viewBox="0 0 1024 1024"><path d="M639 463.30000001L639 285.1c0-36.90000001-26.4-68.5-61.3-68.5l-150.2 0c-1.5 0-3 0.1-4.5 0.3-10.2-38.7-45.5-67.3-87.5-67.3-50 0-90.5 40.5-90.5 90.5s40.5 90.5 90.5 90.5c42 0 77.3-28.6 87.5-67.39999999 1.4 0.3 2.9 0.4 4.5 0.39999999L577.7 263.6c6.8 0 14.3 8.9 14.3 21.49999999l0 427.00000001c0 12.7-7.40000001 21.5-14.30000001 21.5l-150.19999999 0c-1.5 0-3 0.2-4.5 0.4-10.2-38.8-45.5-67.3-87.5-67.3-50 0-90.5 40.5-90.5 90.4 0 49.9 40.5 90.6 90.5 90.59999999 42 0 77.3-28.6 87.5-67.39999999 1.4 0.2 2.9 0.4 4.49999999 0.4L577.7 780.7c34.80000001 0 61.3-31.6 61.3-68.50000001L639 510.3l79.1 0c10.4 38.5 45.49999999 67 87.4 67 50 0 90.5-40.5 90.5-90.5s-40.5-90.5-90.5-90.5c-41.79999999 0-77.00000001 28.4-87.4 67L639 463.30000001z" fill="#333333" ></path></symbol><symbol id="icon-side" viewBox="0 0 1024 1024"><path d="M851.91168 328.45312c-59.97056 0-108.6208 48.47104-108.91264 108.36992l-137.92768 38.4a109.14304 109.14304 0 0 0-63.46752-46.58688l1.39264-137.11872c47.29344-11.86816 82.31936-54.66624 82.31936-105.64096 0-60.15488-48.76288-108.91776-108.91776-108.91776s-108.91776 48.76288-108.91776 108.91776c0 49.18784 32.60928 90.75712 77.38368 104.27392l-1.41312 138.87488a109.19936 109.19936 0 0 0-63.50336 48.55808l-138.93632-39.48544 0.01024-0.72704c0-60.15488-48.76288-108.91776-108.91776-108.91776s-108.91776 48.75776-108.91776 108.91776c0 60.15488 48.76288 108.91264 108.91776 108.91264 39.3984 0 73.91232-20.92032 93.03552-52.2496l139.19232 39.552-0.00512 0.2304c0 25.8304 9.00096 49.5616 24.02816 68.23424l-90.14272 132.63872a108.7488 108.7488 0 0 0-34.2528-5.504c-60.15488 0-108.91776 48.768-108.91776 108.91776 0 60.16 48.76288 108.91776 108.91776 108.91776 60.16 0 108.92288-48.75776 108.92288-108.91776 0-27.14624-9.9328-51.968-26.36288-71.04l89.04704-131.03104a108.544 108.544 0 0 0 37.6832 6.70208 108.672 108.672 0 0 0 36.48512-6.272l93.13792 132.57216a108.48256 108.48256 0 0 0-24.69888 69.0688c0 60.16 48.768 108.92288 108.91776 108.92288 60.16 0 108.91776-48.76288 108.91776-108.92288 0-60.14976-48.75776-108.91776-108.91776-108.91776a108.80512 108.80512 0 0 0-36.69504 6.3488l-93.07136-132.48a108.48768 108.48768 0 0 0 24.79616-72.22784l136.09984-37.888c18.99008 31.93856 53.84192 53.3504 93.69088 53.3504 60.16 0 108.92288-48.75776 108.92288-108.91264-0.00512-60.15488-48.77312-108.92288-108.92288-108.92288z"  ></path></symbol><symbol id="icon-B" viewBox="0 0 1024 1024"><path d="M98.067692 65.457231H481.28c75.854769 0 132.411077 3.150769 169.668923 9.452307 37.336615 6.301538 70.656 19.534769 100.036923 39.620924 29.459692 20.007385 53.956923 46.710154 73.570462 80.029538 19.692308 33.398154 29.459692 70.734769 29.459692 112.167385 0 44.898462-12.130462 86.094769-36.233846 123.588923a224.886154 224.886154 0 0 1-98.461539 84.283077c58.368 17.092923 103.266462 46.08 134.695385 87.04 31.350154 40.96 47.025231 89.088 47.025231 144.462769 0 43.638154-10.082462 86.016-30.404923 127.212308-20.243692 41.196308-47.891692 74.043077-83.02277 98.697846-35.052308 24.654769-78.296615 39.778462-129.732923 45.449846-32.295385 3.465846-110.119385 5.671385-233.472 6.537846H98.067692V65.457231z m193.536 159.507692V446.621538h126.818462c75.460923 0 122.328615-1.024 140.603077-3.229538 33.083077-3.938462 59.155692-15.36 78.139077-34.343385 18.904615-18.904615 28.435692-43.874462 28.435692-74.830769 0-29.696-8.192-53.720615-24.497231-72.310154-16.384-18.510769-40.644923-29.696-72.940307-33.634461-19.140923-2.205538-74.279385-3.308308-165.415385-3.308308h-111.064615z m0 381.243077v256.315077h179.2c69.710769 0 113.979077-1.969231 132.726154-5.907692 28.750769-5.198769 52.145231-17.959385 70.262154-38.281847 18.116923-20.243692 27.096615-47.340308 27.096615-81.368615 0-28.750769-6.931692-53.169231-20.873846-73.255385a118.232615 118.232615 0 0 0-60.494769-43.795692c-26.387692-9.137231-83.574154-13.705846-171.638154-13.705846H291.603692z"  ></path></symbol><symbol id="icon-a" viewBox="0 0 1024 1024"><path d="M757.76 665.6q0 20.48 1.536 34.304t7.68 22.016 18.944 12.288 34.304 4.096q-3.072 25.6-15.36 44.032-11.264 16.384-33.28 29.696t-62.976 13.312q-11.264 0-20.48-0.512t-17.408-2.56l-6.144-2.048-1.024 0q-4.096-1.024-10.24-4.096-2.048-2.048-4.096-2.048-1.024-1.024-2.048-1.024-14.336-8.192-23.552-17.408t-14.336-17.408q-6.144-10.24-9.216-20.48-63.488 75.776-178.176 75.776-48.128 0-88.064-15.36t-69.12-44.032-45.056-68.096-15.872-88.576 16.896-89.088 47.616-67.584 74.24-42.496 96.768-14.848q48.128 0 88.576 17.408t66.048 49.152q0-8.192 0.512-16.384t0.512-15.36q0-71.68-39.936-104.448t-128-32.768q-43.008 0-84.992 6.656t-84.992 17.92q14.336-28.672 25.088-47.616t24.064-29.184q30.72-24.576 158.72-24.576 79.872 0 135.168 13.824t90.624 43.52 51.2 75.264 15.872 108.032l0 200.704zM487.424 743.424q50.176 0 79.872-33.28t29.696-95.744q0-61.44-28.672-93.696t-76.8-32.256q-52.224 0-82.944 33.28t-30.72 94.72q0 58.368 31.744 92.672t77.824 34.304z"  ></path></symbol><symbol id="icon-full" viewBox="0 0 1024 1024"><path d="M639.328 416c8.032 0 16.096-3.008 22.304-9.056l202.624-197.184-0.8 143.808c-0.096 17.696 14.144 32.096 31.808 32.192 0.064 0 0.128 0 0.192 0 17.6 0 31.904-14.208 32-31.808l1.248-222.208c0-0.672-0.352-1.248-0.384-1.92 0.032-0.512 0.288-0.896 0.288-1.408 0.032-17.664-14.272-32-31.968-32.032L671.552 96l-0.032 0c-17.664 0-31.968 14.304-32 31.968C639.488 145.632 653.824 160 671.488 160l151.872 0.224-206.368 200.8c-12.672 12.32-12.928 32.608-0.64 45.248C622.656 412.736 630.976 416 639.328 416z"  ></path><path d="M896.032 639.552 896.032 639.552c-17.696 0-32 14.304-32.032 31.968l-0.224 151.872-200.832-206.4c-12.32-12.64-32.576-12.96-45.248-0.64-12.672 12.352-12.928 32.608-0.64 45.248l197.184 202.624-143.808-0.8c-0.064 0-0.128 0-0.192 0-17.6 0-31.904 14.208-32 31.808-0.096 17.696 14.144 32.096 31.808 32.192l222.24 1.248c0.064 0 0.128 0 0.192 0 0.64 0 1.12-0.32 1.76-0.352 0.512 0.032 0.896 0.288 1.408 0.288l0.032 0c17.664 0 31.968-14.304 32-31.968L928 671.584C928.032 653.952 913.728 639.584 896.032 639.552z"  ></path><path d="M209.76 159.744l143.808 0.8c0.064 0 0.128 0 0.192 0 17.6 0 31.904-14.208 32-31.808 0.096-17.696-14.144-32.096-31.808-32.192L131.68 95.328c-0.064 0-0.128 0-0.192 0-0.672 0-1.248 0.352-1.888 0.384-0.448 0-0.8-0.256-1.248-0.256 0 0-0.032 0-0.032 0-17.664 0-31.968 14.304-32 31.968L96 352.448c-0.032 17.664 14.272 32 31.968 32.032 0 0 0.032 0 0.032 0 17.664 0 31.968-14.304 32-31.968l0.224-151.936 200.832 206.4c6.272 6.464 14.624 9.696 22.944 9.696 8.032 0 16.096-3.008 22.304-9.056 12.672-12.32 12.96-32.608 0.64-45.248L209.76 159.744z"  ></path><path d="M362.368 617.056l-202.624 197.184 0.8-143.808c0.096-17.696-14.144-32.096-31.808-32.192-0.064 0-0.128 0-0.192 0-17.6 0-31.904 14.208-32 31.808l-1.248 222.24c0 0.704 0.352 1.312 0.384 2.016 0 0.448-0.256 0.832-0.256 1.312-0.032 17.664 14.272 32 31.968 32.032L352.448 928c0 0 0.032 0 0.032 0 17.664 0 31.968-14.304 32-31.968s-14.272-32-31.968-32.032l-151.936-0.224 206.4-200.832c12.672-12.352 12.96-32.608 0.64-45.248S375.008 604.704 362.368 617.056z"  ></path></symbol><symbol id="icon-add" viewBox="0 0 1024 1024"><path d="M863.328 482.56l-317.344-1.12L545.984 162.816c0-17.664-14.336-32-32-32s-32 14.336-32 32l0 318.4L159.616 480.064c-0.032 0-0.064 0-0.096 0-17.632 0-31.936 14.24-32 31.904C127.424 529.632 141.728 544 159.392 544.064l322.592 1.152 0 319.168c0 17.696 14.336 32 32 32s32-14.304 32-32l0-318.944 317.088 1.12c0.064 0 0.096 0 0.128 0 17.632 0 31.936-14.24 32-31.904C895.264 496.992 880.96 482.624 863.328 482.56z"  ></path></symbol><symbol id="icon-move" viewBox="0 0 1024 1024"><path d="M863.744 544 163.424 544c-17.664 0-32-14.336-32-32s14.336-32 32-32l700.32 0c17.696 0 32 14.336 32 32S881.44 544 863.744 544z"  ></path></symbol><symbol id="icon-living" viewBox="0 0 1024 1024"><path d="M514.133333 488.533333m-106.666666 0a106.666667 106.666667 0 1 0 213.333333 0 106.666667 106.666667 0 1 0-213.333333 0Z" fill="#666666" ></path><path d="M512 64C264.533333 64 64 264.533333 64 512c0 236.8 183.466667 428.8 416 445.866667v-134.4c-53.333333-59.733333-200.533333-230.4-200.533333-334.933334 0-130.133333 104.533333-234.666667 234.666666-234.666666s234.666667 104.533333 234.666667 234.666666c0 61.866667-49.066667 153.6-145.066667 270.933334l-59.733333 68.266666V960C776.533333 942.933333 960 748.8 960 512c0-247.466667-200.533333-448-448-448z" fill="#666666" ></path></symbol></svg>', h = (h = document.getElementsByTagName("script"))[h.length - 1].getAttribute("data-injectcss");
  if (h && !t.__iconfont__svg__cssinject__) {
    t.__iconfont__svg__cssinject__ = true;
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (t2) {
      console && console.log(t2);
    }
  }
  function d() {
    o || (o = true, a());
  }
  c = function() {
    var t2, c2, l2, a2;
    (a2 = document.createElement("div")).innerHTML = n, n = null, (l2 = a2.getElementsByTagName("svg")[0]) && (l2.setAttribute("aria-hidden", "true"), l2.style.position = "absolute", l2.style.width = 0, l2.style.height = 0, l2.style.overflow = "hidden", t2 = l2, (c2 = document.body).firstChild ? (a2 = t2, (l2 = c2.firstChild).parentNode.insertBefore(a2, l2)) : c2.appendChild(t2));
  }, document.addEventListener ? ~["complete", "loaded", "interactive"].indexOf(document.readyState) ? setTimeout(c, 0) : (l = function() {
    document.removeEventListener("DOMContentLoaded", l, false), c();
  }, document.addEventListener("DOMContentLoaded", l, false)) : document.attachEvent && (a = c, e = t.document, o = false, (i = function() {
    try {
      e.documentElement.doScroll("left");
    } catch (t2) {
      return void setTimeout(i, 50);
    }
    d();
  })(), e.onreadystatechange = function() {
    e.readyState == "complete" && (e.onreadystatechange = null, d());
  });
}(window);
const E = findEle;
const $d = document;
function MindElixir({
  el,
  data,
  direction,
  locale,
  draggable,
  editable,
  contextMenu: contextMenu2,
  contextMenuOption,
  toolBar: toolBar2,
  nodeMenu: nodeMenu2,
  keypress: keypress2,
  before,
  newTopicName,
  allowUndo,
  primaryLinkStyle,
  overflowHidden,
  primaryNodeHorizontalGap,
  primaryNodeVerticalGap,
  mobileMenu: mobileMenu2,
  closeButton,
  widthControll,
  uploadButton,
  nodeDraggable: nodeDraggable2
}) {
  const box = document.getElementById(el);
  if (!box)
    return;
  this.mindElixirBox = box;
  this.before = before || {};
  this.nodeData = data.nodeData;
  this.linkData = data.linkData || {};
  this.expandDeep = data == null ? void 0 : data.expandDeep;
  this.locale = locale;
  this.contextMenuOption = contextMenuOption;
  this.contextMenu = contextMenu2 === void 0 ? true : contextMenu2;
  this.toolBar = toolBar2 === void 0 ? true : toolBar2;
  this.nodeMenu = nodeMenu2 === void 0 ? true : nodeMenu2;
  this.keypress = keypress2 === void 0 ? true : keypress2;
  this.closeButton = closeButton === void 0 ? false : closeButton;
  this.widthControll = widthControll === void 0 ? true : widthControll;
  this.mobileMenu = mobileMenu2;
  this.direction = data.direction !== void 0 ? data.direction : typeof direction === "number" ? direction : 1;
  this.draggable = draggable === void 0 ? true : draggable;
  this.newTopicName = newTopicName;
  this.editable = editable === void 0 ? true : editable;
  this.allowUndo = allowUndo === void 0 ? true : allowUndo;
  this.currentNode = null;
  this.currentLink = null;
  this.inputDiv = null;
  this.scaleVal = 1;
  this.tempDirection = null;
  this.primaryLinkStyle = primaryLinkStyle || 0;
  this.overflowHidden = overflowHidden;
  this.primaryNodeHorizontalGap = primaryNodeHorizontalGap;
  this.primaryNodeVerticalGap = primaryNodeVerticalGap;
  this.uploadButton = uploadButton === void 0 ? true : uploadButton;
  this.nodeDraggable = nodeDraggable2 === void 0 ? true : nodeDraggable2;
  this.bus = new Bus();
  this.bus.addListener("operation", (operation) => {
    if (this.isUndo) {
      this.isUndo = false;
      return;
    }
    if (["moveNode", "removeNode", "addChild", "finishEdit", "editStyle", "editTags", "editIcons"].includes(operation.name)) {
      this.history.push(operation);
    }
  });
  this.history = [];
  this.isUndo = false;
  this.undo = function() {
    const operation = this.history.pop();
    if (!operation)
      return;
    this.isUndo = true;
    if (operation.name === "moveNode") {
      this.moveNode(E(operation.obj.fromObj.id), E(operation.obj.originParentId));
    } else if (operation.name === "removeNode") {
      if (operation.originSiblingId) {
        this.insertBefore(E(operation.originSiblingId), operation.obj);
      } else {
        this.addChild(E(operation.originParentId), operation.obj);
      }
    } else if (operation.name === "addChild" || operation.name === "copyNode") {
      this.removeNode(E(operation.obj.id));
    } else if (operation.name === "finishEdit") {
      this.setNodeTopic(E(operation.obj.id), operation.origin);
    } else {
      this.isUndo = false;
    }
  };
}
function beforeHook(fn) {
  return async function(...args) {
    if (!this.before[fn.name] || await this.before[fn.name].apply(this, args)) {
      fn.apply(this, args);
    }
  };
}
MindElixir.prototype = {
  addParentLink,
  getObjById,
  generateNewObj,
  generateNewSummaryObj,
  insertSibling: beforeHook(insertSibling),
  insertBefore: beforeHook(insertBefore),
  insertParent: beforeHook(insertParent),
  addSummary: beforeHook(addSummary),
  addChild: beforeHook(addChild),
  copyNode: beforeHook(copyNode),
  moveNode: beforeHook(moveNode),
  removeNode: beforeHook(removeNode),
  moveUpNode: beforeHook(moveUpNode),
  moveDownNode: beforeHook(moveDownNode),
  beginEdit: beforeHook(beginEdit),
  moveNodeBefore: beforeHook(moveNodeBefore),
  moveNodeAfter: beforeHook(moveNodeAfter),
  updateNodeStyle,
  updateNodeTags,
  updateNodeIcons,
  updateNodeHyperLink,
  updateNodeRemark,
  processPrimaryNode,
  setNodeTopic,
  createLink,
  removeLink,
  selectLink,
  hideLinkController,
  showLinkController,
  layout,
  linkDiv,
  createInputDiv,
  shapeTpc,
  createChildren,
  createGroup,
  createTop,
  createTopic,
  createSummary,
  selectNode,
  unselectNode,
  selectNextSibling,
  selectPrevSibling,
  selectFirstChild,
  selectParent,
  getAllDataString,
  getAllData,
  getAllDataWithAutoHide,
  getAllDataMd,
  scale,
  toCenter,
  toTopLeft,
  focusNode,
  cancelFocus,
  initLeft,
  initRight,
  initSide,
  setLocale,
  enableEdit,
  disableEdit,
  expandNode,
  refresh,
  exportSvg,
  exportSvgDom,
  init: function(nodeData, expandDeep) {
    if (nodeData)
      this.nodeData = nodeData;
    if (expandDeep)
      this.expandDeep = expandDeep;
    addParentLink(this.nodeData);
    console.log("ME_version " + MindElixir.version);
    console.log(this);
    if (this.mindElixirBox.className.indexOf("mind-elixir") === -1)
      this.mindElixirBox.className += " mind-elixir";
    this.mindElixirBox.innerHTML = "";
    this.container = $d.createElement("div");
    this.container.className = "map-container";
    if (this.overflowHidden)
      this.container.style.overflow = "hidden";
    this.map = $d.createElement("div");
    this.map.className = "map-canvas";
    this.map.setAttribute("tabindex", "0");
    this.container.appendChild(this.map);
    this.mindElixirBox.appendChild(this.container);
    this.root = $d.createElement("root");
    this.box = $d.createElement("children");
    this.box.className = "mindbox";
    this.svg2nd = createLinkSvg("svg2nd");
    this.linkController = createLinkSvg("linkcontroller");
    this.P2 = $d.createElement("div");
    this.P3 = $d.createElement("div");
    this.P2.className = this.P3.className = "circle";
    this.line1 = createLine(0, 0, 0, 0);
    this.line2 = createLine(0, 0, 0, 0);
    this.linkController.appendChild(this.line1);
    this.linkController.appendChild(this.line2);
    this.linkSvgGroup = createLinkSvg("topiclinks");
    this.map.appendChild(this.root);
    this.map.appendChild(this.box);
    this.map.appendChild(this.svg2nd);
    this.map.appendChild(this.linkController);
    this.map.appendChild(this.linkSvgGroup);
    this.map.appendChild(this.P2);
    this.map.appendChild(this.P3);
    this.toolBar && toolBar$1(this);
    this.nodeMenu && nodeMenu$1(this);
    this.keypress && keypress(this);
    sidebar$1(this);
    if (isMobile() && this.mobileMenu) {
      mobileMenu$1(this);
    } else {
      this.contextMenu && contextMenu$1(this, this.contextMenuOption);
    }
    this.draggable && nodeDraggable(this);
    this.layout();
    this.linkDiv();
    this.toTopLeft();
    initMouseEvent(this);
  }
};
MindElixir.LEFT = LEFT;
MindElixir.RIGHT = RIGHT;
MindElixir.SIDE = SIDE;
MindElixir.version = "0.17.0";
MindElixir.E = findEle;
MindElixir.new = (topic) => ({
  nodeData: {
    id: generateUUID(),
    topic: topic || "new topic",
    root: true,
    style: {
      color: "#ffffff",
      background: "#00aaff"
    },
    children: []
  },
  linkData: {}
});
export { MindElixir as default };
//# sourceMappingURL=mind.es.js.map
