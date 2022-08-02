import { LEFT, RIGHT, SIDE } from '../const'
import MindElixir, { NodeObj } from '../index'
import { encodeHTML } from '../utils/index'
export type Top = HTMLElement
export type Group = HTMLElement

export interface Topic extends HTMLElement {
  nodeObj?: NodeObj
}

export interface Expander extends HTMLElement {
  expanded?: boolean
}

// DOM manipulation
const $d = document
export const findEle = (id: string, instance?) => {
  const scope = instance ? instance.mindElixirBox : $d
  return scope.querySelector(`[data-nodeid=me${id}]`)
}

function resizeNode(widthControl:HTMLElement,tpc:Topic){
  widthControl.onpointerdown=eDown=>{
    if(!tpc.classList.contains('selected')) return
    const startX=eDown.clientX
    const width=tpc.clientWidth-Number(getComputedStyle(tpc).paddingLeft.replace('px',''))-Number(getComputedStyle(tpc).paddingRight.replace('px',''))
    widthControl.onpointermove=eMove=>{
      const endX=eMove.clientX
      tpc.style.width=(width+endX-startX).toString()+'px'
      widthControl.style.height=tpc.clientHeight.toString()+'px'
      //保存样式
      if(!tpc.nodeObj.style) tpc.nodeObj.style={}
      tpc.nodeObj.style.width=tpc.style.width
      //设置宽度控制条的高度
      tpc.nodeObj.style.controllWidth=widthControl.style.height
      eMove.preventDefault()
    }
    widthControl.setPointerCapture(eDown.pointerId)
    eDown.preventDefault()
  }
  widthControl.onpointerup=eUp=>{
    widthControl.onpointermove=null
    widthControl.releasePointerCapture(eUp.pointerId)
    this.linkDiv?.()
  }
}
export const shapeTpc = function(tpc: Topic, nodeObj: NodeObj) {
  
  const widthControllRight=$d.createElement('widthControllRight')
  
  const widthControllLeft=$d.createElement('widthControllLeft')

  resizeNode.call(this,widthControllLeft,tpc)
  resizeNode.call(this,widthControllRight,tpc)
  tpc.textContent = nodeObj.topic
  //放在textContent之后，因为会清除子节点
  tpc.appendChild(widthControllRight)
  tpc.appendChild(widthControllLeft)
  if (nodeObj.style) {
    tpc.style.color = nodeObj.style.color || '#2c3e50'
    tpc.style.background = nodeObj.style.background?nodeObj.style.background:nodeObj?.parent?.root?'#ffffff':'inherit'
    tpc.style.fontSize = nodeObj.style.fontSize + 'px'
    tpc.style.fontWeight = nodeObj.style.fontWeight || 'normal'
    tpc.style.width= nodeObj.style.width || 'auto'
    widthControllLeft.style.height=widthControllRight.style.height=nodeObj.style.controllWidth || '29px'
  }

  // TODO allow to add online image
  if (nodeObj.image) {
    const images=nodeObj.image
    images.forEach(val=>{
      const imgContainer = $d.createElement('img')
      imgContainer.src = val.url
      imgContainer.style.width = val.width + 'px'
      tpc.appendChild(imgContainer)
    })
  }
  if (nodeObj.hyperLink) {
    const linkContainer =$d.createElement('a')
    linkContainer.className = 'hyper-link'
    linkContainer.target = '_blank'
    linkContainer.innerText = '🔗'
    linkContainer.href = nodeObj.hyperLink
    tpc.appendChild(linkContainer)
  }
  if (nodeObj.icons) {
    const iconsContainer = $d.createElement('span')
    iconsContainer.className = 'icons'
    iconsContainer.innerHTML = nodeObj.icons
    .filter(icon=> icon!=='').map(icon => `<span>${encodeHTML(icon)}</span>`)
      .join('')
    tpc.appendChild(iconsContainer)
  }
  if (nodeObj.tags) {
    const tagsContainer = $d.createElement('div')
    tagsContainer.className = 'tags'
    tagsContainer.innerHTML = nodeObj.tags
      .filter(tag=> tag!=='').map(tag => `<span>${encodeHTML(tag)}</span>`)
      .join('')
    tpc.appendChild(tagsContainer)
  }
}

export const createGroup = function(nodeObj: NodeObj, omitChildren?: boolean) {
  const grp: Group = $d.createElement('GRP')
  const top: Top = this.createTop(nodeObj)
  grp.appendChild(top)
  if (!omitChildren && nodeObj.children && nodeObj.children.length > 0) {
    top.appendChild(createExpander(nodeObj.expanded))
    if (nodeObj.expanded !== false) {
      const children = this.createChildren(nodeObj.children)
      grp.appendChild(children)
    }
  }
  return { grp, top }
}

export const createTop = function(nodeObj: NodeObj): Top {
  const top = $d.createElement('t')
  const tpc = this.createTopic(nodeObj)
  shapeTpc.call(this,tpc, nodeObj)
  top.appendChild(tpc)
  return top
}

export const createTopic = function(nodeObj: NodeObj): Topic {
  const topic: Topic = $d.createElement('tpc')
  topic.nodeObj = nodeObj
  topic.dataset.nodeid = 'me' + nodeObj.id
  topic.draggable = this.draggable
  return topic
}

export function selectText(div: HTMLElement) {
  const range = $d.createRange()
  range.selectNodeContents(div)
  const getSelection = window.getSelection()
  if (getSelection) {
    getSelection.removeAllRanges()
    getSelection.addRange(range)
  }
}


export function createInputDiv(tpc: Topic) {
  console.time('createInputDiv')
  if (!tpc) return
  let div = $d.createElement('div')
  const origin = tpc.childNodes[0].textContent as string
  tpc.appendChild(div)
  div.id = 'input-box'
  div.textContent = origin
  // div.innerHTML=origin.replace(/<div(([\s\S])*?)<\/div>/, '').replace('🔗','')
  div.contentEditable = 'true'
  div.spellcheck = false
  div.style.cssText = `min-width:${tpc.offsetWidth - 8}px;`
  if(tpc.nodeObj?.style?.color==='#ffffff'||(tpc.nodeObj?.id==='root'&&!tpc.nodeObj?.style?.color)){
    div.style.color='#2c3e50'
  }
  if (this.direction === LEFT) div.style.right = '0'
  // tpc.childNodes.forEach((child:ChildNode)=>{
  //   if(child.nodeName==='IMG'){
  //     div.appendChild(child)
  //   }
  //   //div.appendChild(child)
  // })
  div.focus()

  selectText(div)
  this.inputDiv = div

  this.bus.fire('operation', {
    name: 'beginEdit',
    obj: tpc.nodeObj,
  })

  div.addEventListener('keydown', e => {
    e.stopPropagation()
    const key = e.key
    // console.log(e, key)
    if (key === 'Enter' || key === 'Tab') {
      // keep wrap for shift enter
      if (e.shiftKey) return

      e.preventDefault()
      this.inputDiv.blur()
      this.map.focus()
    }
  })
  div.addEventListener('blur', () => {
    if (!div) return // 防止重复blur
    const node = tpc.nodeObj
    const topic = div.textContent!.trim()
    console.log(topic)
    if (topic === '') node.topic = origin
    else node.topic = topic
    //添加图片支持
    //去除节点缩放鼠标移动的监听
    div.childNodes.forEach((val)=>{
      if(val.nodeName==='IMG'){
          if(!node.image) node.image=[]
          node.image.push({
            url:(val as HTMLImageElement).src,
            width:(val as HTMLImageElement).width
          })
      }
    })
    div.remove()
    this.inputDiv = div = null
    // TODO 优化
    // if (topic === origin) return // 没有修改不做处理
    tpc.childNodes[0].textContent = node.topic
    this.shapeTpc(tpc,node)
    this.linkDiv()
    //更新宽度控制条的高度
    const widthControllLeft=tpc.querySelector('widthControllRight') as HTMLElement
    const widthControllRight=tpc.querySelector('widthControllRight') as HTMLElement
    if(!node.style) node.style={}
    node.style.controllWidth=widthControllLeft.style.height=widthControllRight.style.height=tpc.clientHeight.toString()+'px'
    //记录节点宽度
    node.style.width=tpc.clientWidth-Number(getComputedStyle(tpc).paddingLeft.replace('px',''))-Number(getComputedStyle(tpc).paddingRight.replace('px',''))+1+'px'
    this.bus.fire('operation', {
      name: 'finishEdit',
      obj: node,
      origin,
    })
  })
  console.timeEnd('createInputDiv')
}

export const createExpander = function(expanded: boolean | undefined): Expander {
  const expander: Expander = $d.createElement('epd')
  // 包含未定义 expanded 的情况，未定义视为展开
  expander.innerText = expanded !== false ? '-' : '+'
  expander.expanded = expanded !== false
  expander.className = expanded !== false ? 'minus' : ''
  return expander
}

/**
 * traversal data and generate dom structure of mind map
 * @ignore
 * @param {object} data node data object
 * @param {object} container node container(mostly primary node)
 * @param {number} direction primary node direction
 * @return {ChildrenElement} children element.
 */
export function createChildren(data: NodeObj[], container?: HTMLElement, direction?) {
  let chldr: HTMLElement
  if (container) {
    chldr = container
  } else {
    chldr = $d.createElement('children')
  }
  for (let i = 0; i < data.length; i++) {
    const nodeObj = data[i]
    const grp = $d.createElement('GRP')
    if (direction === LEFT) {
      grp.className = 'lhs'
    } else if (direction === RIGHT) {
      grp.className = 'rhs'
    } else if (direction === SIDE) {
      if (nodeObj.direction === LEFT) {
        grp.className = 'lhs'
      } else if (nodeObj.direction === RIGHT) {
        grp.className = 'rhs'
      }
    }
    const top = this.createTop(nodeObj)
    if (nodeObj.children && nodeObj.children.length > 0) {
      top.appendChild(createExpander(nodeObj.expanded))
      grp.appendChild(top)
      if (nodeObj.expanded !== false) {
        const children = this.createChildren(nodeObj.children)
        grp.appendChild(children)
      }
    } else {
      grp.appendChild(top)
    }
    chldr.appendChild(grp)
  }
  return chldr
}

// Set primary nodes' direction and invoke createChildren()
export function layout() {
  console.time('layout')
  this.root.innerHTML = ''
  this.box.innerHTML = ''
  const tpc = this.createTopic(this.nodeData)
  shapeTpc(tpc, this.nodeData) // shape root tpc
  tpc.draggable = false
  this.root.appendChild(tpc)

  const primaryNodes: NodeObj[] = this.nodeData.children
  if (!primaryNodes || primaryNodes.length === 0) return
  if (this.direction === SIDE) {
    // initiate direction of primary nodes
    let lcount = 0
    let rcount = 0
    primaryNodes.map(node => {
      if (node.direction === undefined) {
        if (lcount <= rcount) {
          node.direction = LEFT
          lcount += 1
        } else {
          node.direction = RIGHT
          rcount += 1
        }
      } else {
        if (node.direction === LEFT) {
          lcount += 1
        } else {
          rcount += 1
        }
      }
    })
  }
  this.createChildren(this.nodeData.children, this.box, this.direction)
  console.timeEnd('layout')
}
