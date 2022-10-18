import { LEFT, RIGHT, SIDE } from './const'
import {
  isMobile,
  addParentLink,
  getObjById,
  generateUUID,
  generateNewObj,
  generateNewSummaryObj,
} from './utils/index'
import { findEle, createInputDiv, layout, Topic, createChildren, createGroup, createTop, createTopic, shapeTpc, createSummary } from './utils/dom'
import { createLinkSvg, createLine } from './utils/svg'
import {
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
  toTopLeft,
  autoHide,
} from './interact'
import {
  insertSibling,
  insertBefore,
  insertParent,
  addChild,
  copyNode,
  moveNode,
  removeNode,
  moveUpNode,
  moveDownNode,
  beginEdit,
  updateNodeStyle,
  updateNodeTags,
  updateNodeIcons,
  updateNodeHyperLink,
  updateNodeRemark,
  // updateNodeImage,
  processPrimaryNode,
  setNodeTopic,
  moveNodeBefore,
  moveNodeAfter,
  addSummary,
} from './nodeOperation'
import {
  createLink,
  removeLink,
  selectLink,
  hideLinkController,
  showLinkController,
} from './customLink'
import linkDiv from './linkDiv'
import initMouseEvent from './mouse'

import contextMenu from './plugin/contextMenu'
import toolBar from './plugin/toolBar'
import nodeMenu from './plugin/nodeMenu'
import sidebar from './plugin/sidebar'
import nodeDraggable from './plugin/nodeDraggable'
import keypress from './plugin/keypress'
import mobileMenu from './plugin/mobileMenu'

import Bus from './utils/pubsub'

import './index.less'
import './plugin/contextMenu.less'
import './plugin/toolBar.less'
import './plugin/nodeMenu.less'
import './plugin/sidebar.less'
import './plugin/mobileMenu.less'

import { exportSvg, exportSvgDom } from '../painter/index.foreignObject'

import './iconfont/iconfont.js'
import { node } from 'canvg/dist/presets'

// TODO show up animation
const E = findEle
type LinkObj = object
type operation = {
  name: string
}
export interface NodeObj {
  topic: string,
  id: string,
  style?: {
    fontSize?: string,
    color?: string,
    background?: string,
    fontWeight?: string,
    width?:string,
    controllWidth?:string
  },
  parent?: NodeObj,
  children?: NodeObj[],
  tags?: string[],
  icons?: string[],
  hyperLink?: string,
  remark?:string,
  image?:{
    url:string,
    width:number,
    height?:number,
  }[],
  linkJump?:{
    toId:string,
    title:string
  }[]
  expanded?: boolean,
  direction?: number,
  root?: boolean,
  type?:string
  summary?:{
    range:string [],
    topicId:string
  }
}

export interface NodeElement extends HTMLElement {
  nodeObj:Object
}
export interface MindElixirData {
  nodeData: NodeObj,
  linkData?: LinkObj,
  expandDeep?:number|null
  direction?:number
}
export interface MindElixirInstance {
  mindElixirBox: HTMLElement,
  nodeData: NodeObj,
  linkData: LinkObj,
  expandDeep:number|null
  currentNode: Topic | null,
  currentLink: SVGElement | null,
  inputDiv: HTMLElement | null,
  scaleVal: number,
  tempDirection: number | null,
  bus: object, // wip

  // wip
  history: operation[],
  isUndo: boolean,
  undo: () => void,

  direction: number,
  locale: string,
  draggable: boolean,
  editable: boolean,
  contextMenu: boolean,
  contextMenuOption: object,
  toolBar: boolean,
  nodeMenu: boolean,
  keypress: boolean,
  before: object,
  newTopicName: string,
  allowUndo: boolean,
  overflowHidden: boolean,
  primaryLinkStyle: number,
  primaryNodeHorizontalGap: number,
  primaryNodeVerticalGap: number,
  mobileMenu: boolean,
  closeButton:boolean,
  widthControll:boolean,
  uploadButton:boolean,
  nodeDraggable:boolean,
  scrollContainer:HTMLElement
}
export interface Options {
  el: string,
  data: MindElixirData,
  direction?: number,
  locale?: string,
  draggable?: boolean,
  editable?: boolean,
  contextMenu?: boolean,
  contextMenuOption?: object,
  toolBar?: boolean,
  nodeMenu?: boolean,
  keypress?: boolean,
  before?: object,
  newTopicName?: string,
  allowUndo?: boolean,
  overflowHidden?: boolean,
  primaryLinkStyle?: number,
  primaryNodeHorizontalGap?: number,
  primaryNodeVerticalGap?: number,
  mobileMenu?: boolean,
  closeButton?:boolean,
  //节点宽度调整
  widthControll?:boolean,
  //导入XMind文件
  uploadButton?:boolean,
  //配置节点拖拽
  nodeDraggable?:boolean
  //工具栏固钉
  scrollContainer?:HTMLElement
}
const $d = document
/**
 * @export MindElixir
 * @example
 * let mind = new MindElixir({
  el: '#map',
  direction: 2,
  data: data,
  draggable: true,
  editable: true,
  contextMenu: true,
  toolBar: true,
  nodeMenu: true,
  keypress: true,
})
mind.init()
 *
 */
function MindElixir(this: MindElixirInstance, {
  el,
  data,
  direction,
  locale,
  draggable,
  editable,
  contextMenu,
  contextMenuOption,
  toolBar,
  nodeMenu,
  keypress,
  before,
  newTopicName,
  allowUndo,
  primaryLinkStyle,
  overflowHidden,
  primaryNodeHorizontalGap,
  primaryNodeVerticalGap,
  mobileMenu,
  closeButton,
  widthControll,
  uploadButton,
  nodeDraggable,
  scrollContainer
}: Options) {
  const box = document.getElementById(el) as HTMLElement
  if (!box) return
  this.mindElixirBox = box
  this.before = before || {}
  this.nodeData = data.nodeData
  this.linkData = data.linkData || {}
  this.expandDeep=data?.expandDeep
  this.locale = locale
  this.contextMenuOption = contextMenuOption
  this.contextMenu = contextMenu === undefined ? true : contextMenu
  this.toolBar = toolBar === undefined ? true : toolBar
  this.nodeMenu = nodeMenu === undefined ? true : nodeMenu
  this.keypress = keypress === undefined ? true : keypress
  this.closeButton = closeButton === undefined ? false : closeButton
  this.widthControll = widthControll === undefined ? true : widthControll
  this.mobileMenu = mobileMenu
  // record the direction before enter focus mode, must true in focus mode, reset to null after exit focus
  // todo move direction to data
  this.direction = data.direction!==undefined?data.direction:(typeof direction === 'number' ? direction : 1)
  this.draggable = draggable === undefined ? true : draggable
  this.newTopicName = newTopicName
  this.editable = editable === undefined ? true : editable
  this.allowUndo = allowUndo === undefined ? true : allowUndo
  // this.parentMap = {} // deal with large amount of nodes
  this.currentNode = null // the selected <tpc/> element
  this.currentLink = null // the selected link svg element
  this.inputDiv = null // editor
  this.scaleVal = 1
  this.tempDirection = null
  this.primaryLinkStyle = primaryLinkStyle || 0
  this.overflowHidden = overflowHidden
  this.primaryNodeHorizontalGap = primaryNodeHorizontalGap
  this.primaryNodeVerticalGap = primaryNodeVerticalGap
  this.uploadButton = uploadButton === undefined ? true : uploadButton
  this.nodeDraggable = nodeDraggable === undefined ? true : nodeDraggable
  this.scrollContainer=scrollContainer
  this.bus = new Bus()
  ;(this.bus as any).addListener('operation', (operation: operation) => {
    if (this.isUndo) {
      this.isUndo = false
      return
    }
    if (['moveNode', 'removeNode', 'addChild', 'finishEdit', 'editStyle', 'editTags', 'editIcons'].includes(
      operation.name
    )) {
      this.history.push(operation)
      // console.log(operation, this.history)
    }
  })

  this.history = [] // TODO
  this.isUndo = false
  this.undo = function() {
    const operation = this.history.pop()
    if (!operation) return
    this.isUndo = true
    if (operation.name === 'moveNode') {
      this.moveNode(
        E(operation.obj.fromObj.id),
        E(operation.obj.originParentId)
      )
    } else if (operation.name === 'removeNode') {
      if (operation.originSiblingId) {
        this.insertBefore(E(operation.originSiblingId), operation.obj)
      } else {
        this.addChild(E(operation.originParentId), operation.obj)
      }
    } else if (operation.name === 'addChild' || operation.name === 'copyNode') {
      this.removeNode(E(operation.obj.id))
    } else if (operation.name === 'finishEdit') {
      this.setNodeTopic(E(operation.obj.id), operation.origin)
    } else {
      this.isUndo = false
    }
  }
}

function beforeHook(fn:(el:any, node?:any)=>void) {
  return async function(...args:unknown[]) {
    if (
      !this.before[fn.name] ||
      (await this.before[fn.name].apply(this, args))
    ) {
      fn.apply(this, args)
    }
  }
}

MindElixir.prototype = {
  addParentLink,
  getObjById,
  generateNewObj,
  generateNewSummaryObj,
  // node operation
  insertSibling: beforeHook(insertSibling),
  insertBefore: beforeHook(insertBefore),
  insertParent: beforeHook(insertParent),
  addSummary:beforeHook(addSummary),
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
  // updateNodeImage,
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
  createChildren, createGroup, createTop, createTopic,createSummary,

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
  init: function(nodeData?:NodeObj,expandDeep?:number) {
    /**
     * @function
     * @global
     * @name E
     * @param {string} id Node id.
     * @return {TargetElement} Target element.
     * @example
     * E('bd4313fbac40284b')
     */  
    if(nodeData) this.nodeData=nodeData
    if(expandDeep)this.expandDeep=expandDeep
    addParentLink(this.nodeData)
    console.log('ME_version ' + MindElixir.version)
    console.log(this)
    if(this.mindElixirBox.className.indexOf('mind-elixir')===-1)
      this.mindElixirBox.className += 'mind-elixir'
    this.mindElixirBox.innerHTML = ''

    this.container = $d.createElement('div') // map container
    this.container.className = 'map-container'

    if (this.overflowHidden) this.container.style.overflow = 'hidden'
    this.map = $d.createElement('div') // map-canvas Element
    this.map.className = 'map-canvas'
    this.map.setAttribute('tabindex', '0')
    this.container.appendChild(this.map)
    this.mindElixirBox.appendChild(this.container)
    this.root = $d.createElement('root')

    this.box = $d.createElement('children')
    this.box.className = 'mindbox'

    // infrastructure

    this.svg2nd = createLinkSvg('svg2nd') // main link container

    this.linkController = createLinkSvg('linkcontroller') // bezier controller container
    this.P2 = $d.createElement('div') // bezier P2
    this.P3 = $d.createElement('div') // bezier P3
    this.P2.className = this.P3.className = 'circle'
    this.line1 = createLine(0, 0, 0, 0) // bezier auxiliary line1
    this.line2 = createLine(0, 0, 0, 0) // bezier auxiliary line2
    this.linkController.appendChild(this.line1)
    this.linkController.appendChild(this.line2)

    this.linkSvgGroup = createLinkSvg('topiclinks') // storage user custom link svg

    this.map.appendChild(this.root)
    this.map.appendChild(this.box)
    this.map.appendChild(this.svg2nd)
    this.map.appendChild(this.linkController)
    this.map.appendChild(this.linkSvgGroup)
    this.map.appendChild(this.P2)
    this.map.appendChild(this.P3)

    // plugin
    this.toolBar && toolBar(this)
    this.nodeMenu && nodeMenu(this)
    this.keypress && keypress(this)
    sidebar(this)
    if (isMobile() && this.mobileMenu) {
      mobileMenu(this)
    } else {
      this.contextMenu && contextMenu(this, this.contextMenuOption)
    }
    this.draggable && nodeDraggable(this)

    // 为了兼容从xmind导入的导图在一开始没有
    autoHide(this.nodeData,0,this.expandDeep||2)
    this.layout()
    this.linkDiv()
    this.toTopLeft()
    // if (!this.overflowHidden) initMouseEvent(this)
    initMouseEvent(this)
  },
}

MindElixir.LEFT = LEFT
MindElixir.RIGHT = RIGHT
MindElixir.SIDE = SIDE
/**
 * @memberof MindElixir
 * @static
 */
MindElixir.version = '0.17.0'
MindElixir.E = findEle

/**
 * @function new
 * @memberof MindElixir
 * @static
 * @param {String} topic root topic
 */
MindElixir.new = (topic: string): MindElixirData => ({
  nodeData: {
    id: generateUUID(),
    topic: topic || 'new topic',
    root: true,
    style: {
      color: "#ffffff",
      background: "#00aaff"
    },
    children: [],
  },
  linkData: {},
})

export default MindElixir

// export {exportSvg,exportPng} something wrong comes with the rollup