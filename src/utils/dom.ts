import { node } from 'canvg/dist/presets'
import { LEFT, RIGHT, SIDE } from '../const'
import MindElixir, { NodeObj } from '../index'
import { expandNodeChild, getHeightFromRootToAnotherNode, getWidthFromRootToAnotherNode } from '../interact'
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

function resizeNode(widthControll:HTMLElement,tpc:Topic,anotherWidthControll:HTMLElement){
  widthControll.onpointerdown=eDown=>{
    if(!tpc.classList.contains('selected')) return
    const startX=eDown.clientX
    const width=tpc.clientWidth-Number(getComputedStyle(tpc).paddingLeft.replace('px',''))-Number(getComputedStyle(tpc).paddingRight.replace('px',''))
    widthControll.onpointermove=eMove=>{
      const endX=eMove.clientX
      tpc.style.width=(width+endX-startX).toString()+'px'
      widthControll.style.height=anotherWidthControll.style.height=tpc.clientHeight.toString()+'px'
      //保存样式
      if(!tpc.nodeObj.style) tpc.nodeObj.style={}
      tpc.nodeObj.style.width=tpc.style.width
      //设置宽度控制条的高度
      tpc.nodeObj.style.controllWidth=widthControll.style.height
      //更新图片的宽度和高度 
      eMove.preventDefault()
    }
    widthControll.setPointerCapture(eDown.pointerId)
    eDown.preventDefault()
  }
  widthControll.onpointerup=eUp=>{
    widthControll.onpointermove=null
    widthControll.releasePointerCapture(eUp.pointerId)
    this?.linkDiv?.()
  }
}
export const shapeTpc = function(tpc: Topic, nodeObj: NodeObj) {
  
  const widthControllRight=$d.createElement('widthControllRight')
  const widthControllLeft=$d.createElement('widthControllLeft')

  tpc.textContent = nodeObj.topic
  //放在textContent之后，因为会清除子节点
  if(this?.widthControll){
    resizeNode.call(this,widthControllLeft,tpc,widthControllRight)
    resizeNode.call(this,widthControllRight,tpc,widthControllLeft)
    tpc.appendChild(widthControllRight)
    tpc.appendChild(widthControllLeft)
  }
  
  if (nodeObj.style) {
    tpc.style.color = nodeObj.style.color || '#2c3e50'
    tpc.style.background = nodeObj.style.background?nodeObj.style.background:nodeObj?.parent?.root?'#ffffff':'inherit'
    if(/[a-z]/i.test(nodeObj.style.fontSize))
      tpc.style.fontSize = nodeObj.style.fontSize
    else
      tpc.style.fontSize = nodeObj.style.fontSize + 'px'
    tpc.style.fontWeight = nodeObj.style.fontWeight || 'normal'
    tpc.style.width= nodeObj.style.width || 'fit-content'
    widthControllLeft.style.height=widthControllRight.style.height=nodeObj.style.controllWidth || '29px'
  }

  // TODO allow to add online image
  if (nodeObj.image) {
    const images=nodeObj.image
    images.forEach(val=>{
      const imgContainer = $d.createElement('img')
      imgContainer.className='image'
      imgContainer.src = val.url
      imgContainer.style.width = val.width + 'px'
      imgContainer.style.height = val.height + 'px'
      imgContainer.style.display = 'block'
      tpc.appendChild(imgContainer)
    })
  }
  
  if (nodeObj.hyperLink) {
    const linkContainer =$d.createElement('a')
    linkContainer.className = 'hyper-link'
    linkContainer.target = '_blank'
    // linkContainer.innerText = '🔗'
    linkContainer.innerHTML='<svg t="1662346495524" style="font-size:20px;margin-left: 3px" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2372" width="22" height="22"><path d="M573.44 640a187.68 187.68 0 0 1-132.8-55.36L416 560l45.28-45.28 24.64 24.64a124.32 124.32 0 0 0 170.08 5.76l1.44-1.28a49.44 49.44 0 0 0 4-3.84l101.28-101.28a124.16 124.16 0 0 0 0-176l-1.92-1.92a124.16 124.16 0 0 0-176 0l-51.68 51.68a49.44 49.44 0 0 0-3.84 4l-20 24.96-49.92-40L480 276.32a108.16 108.16 0 0 1 8.64-9.28l51.68-51.68a188.16 188.16 0 0 1 266.72 0l1.92 1.92a188.16 188.16 0 0 1 0 266.72l-101.28 101.28a112 112 0 0 1-8.48 7.84 190.24 190.24 0 0 1-125.28 48z" fill="#002fa7" p-id="2373"></path><path d="M350.72 864a187.36 187.36 0 0 1-133.28-55.36l-1.92-1.92a188.16 188.16 0 0 1 0-266.72l101.28-101.28a112 112 0 0 1 8.48-7.84 188.32 188.32 0 0 1 258.08 7.84L608 464l-45.28 45.28-24.64-24.64A124.32 124.32 0 0 0 368 478.88l-1.44 1.28a49.44 49.44 0 0 0-4 3.84l-101.28 101.28a124.16 124.16 0 0 0 0 176l1.92 1.92a124.16 124.16 0 0 0 176 0l51.68-51.68a49.44 49.44 0 0 0 3.84-4l20-24.96 50.08 40-20.8 25.12a108.16 108.16 0 0 1-8.64 9.28l-51.68 51.68A187.36 187.36 0 0 1 350.72 864z" fill="#002fa7" p-id="2374"></path></svg>'
    linkContainer.href = nodeObj.hyperLink
    tpc.appendChild(linkContainer)
  }
  if (nodeObj.remark) {
    const content=$d.createElement('div')
    content.className='content hidden'
    content.textContent=nodeObj.remark
    const remarkContainer = $d.createElement('div')
    remarkContainer.className = 'remark'
    remarkContainer.innerHTML = `<svg t="1659682144612" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2580" width="200" height="200"><path d="M625.728 57.472c19.264 0 34.688 6.848 48.128 20.16l208.96 207.04c14.272 13.12 21.568 29.568 21.568 49.28v504.576c0 71.808-56.256 127.744-128.576 127.744H252.16c-72.128 0-128.576-55.68-128.576-127.744V184.704c0-71.68 56.256-127.232 128.576-127.232z m-34.304 76.8H252.16c-30.144 0-51.776 21.376-51.776 50.432v653.824c0 29.44 21.888 50.944 51.776 50.944h523.648c30.016 0 51.84-21.632 51.84-50.944l-0.128-464.512H687.488A96 96 0 0 1 591.936 287.36l-0.448-9.216V134.208zM665.6 704a38.4 38.4 0 0 1 0 76.8H294.4a38.4 38.4 0 0 1 0-76.8h371.2z m0-192a38.4 38.4 0 0 1 0 76.8H294.4a38.4 38.4 0 0 1 0-76.8h371.2z m-192-192a38.4 38.4 0 1 1 0 76.8H294.4a38.4 38.4 0 1 1 0-76.8h179.2z m181.824-152.512v110.592a32 32 0 0 0 26.24 31.488l5.76 0.512h111.872L655.424 167.424z" p-id="2581"></path></svg>`
    let delayTask
    // 鼠标移入内容
    content.onmouseover=()=>{
      clearTimeout(delayTask)
    }
    //鼠标移入按钮
    remarkContainer.onmouseover=()=>{
      content.classList.remove('hidden')
    }
    //鼠标移出内容
    content.onmouseleave=()=>{
      delayTask=setTimeout(()=>{
        if(!content.classList.contains('hidden')){
          content.classList.add('hidden')
        }
      },300)
    }
    //鼠标移出按钮
    remarkContainer.onmouseleave=()=>{
      delayTask=setTimeout(()=>{
        if(!content.classList.contains('hidden')){
          content.classList.add('hidden')
        }
      },300)
    }
    remarkContainer.appendChild(content)
    tpc.appendChild(remarkContainer)
  }
  if (nodeObj.icons) {
    const iconsContainer = $d.createElement('span')
    iconsContainer.className = 'icons'
    iconsContainer.innerHTML = nodeObj.icons
    .filter(icon=> icon!=='').map(icon => `<span>${encodeHTML(icon)}</span>`)
      .join('')
    tpc.appendChild(iconsContainer)
  }

  if (nodeObj.linkJump) {
    nodeObj.linkJump.forEach(val => {
      const button = document.createElement('a')
      button.className="linkJump"
      button.title=val.title
      button.innerHTML='<svg t="1661493526135" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2220" width="16" height="16"><path d="M1001.175714 593.762001L700.806246 293.324796a76.091491 76.091491 0 0 0-107.566725 0 76.023754 76.023754 0 0 0 0 107.544146l171.713884 171.826779H152.653982v-115.288769a76.046333 76.046333 0 0 0-152.115245 0v152.092666c0 6.931777 2.145012 13.253918 3.951338 19.621218-1.806326 6.389879-3.951339 12.644283-3.951338 19.621218a76.068912 76.068912 0 0 0 76.046333 76.068912h686.020111L593.239521 894.131468a76.046333 76.046333 0 1 0 107.566725 107.566726L1001.175714 701.328726a76.091491 76.091491 0 0 0 0-107.566725z" fill="#1296db" p-id="2221"></path></svg>'
      button.onclick=()=>{  
        moveToNode.call(this,val.toId)
      }
      tpc.appendChild(button)
    });
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

export function moveToNode(id:string){
  let toNode=this.container.querySelector(`tpc[data-nodeid=me${id}]`)
  if(!toNode){
    findUnExpandedParent(this.nodeData,id)
    this.layout()
    this.linkDiv()
    toNode=this.container.querySelector(`tpc[data-nodeid=me${id}]`)
  }
  // this.container.scrollTo(
  //   10000 - this.container.offsetWidth / 2 + getWidthFromRootToAnotherNode(this.container,toNode),
  //   10000 - this.container.offsetHeight / 2 - getHeightFromRootToAnotherNode(this.container,toNode)
  // )
  toNode.scrollIntoView({block:'center',behavior:'smooth'})
  toNode.className='blink'
  setTimeout(() => {
    toNode.classList.remove('blink')
  }, 3000);
}

function findUnExpandedParent(node,toId){
  if(node.id===toId){
    return true
  }
  let flag=false
  for(const val of (node.children||[])){
    if(findUnExpandedParent(val,toId)) flag=true
  }
  if(flag) node.expanded=true
  return flag
}

export const createGroup = function(nodeObj: NodeObj, omitChildren?: boolean) {
  const grp: Group = $d.createElement('GRP')
  const top: Top = this.createTop(nodeObj)
  grp.appendChild(top)
  if (!omitChildren && nodeObj.children && nodeObj.children.length > 0) {
    top.appendChild(createExpander(nodeObj.expanded))
    if (nodeObj.expanded !== false) {
      const [children] = this.createChildren(nodeObj.children)
      grp.appendChild(children)
    }
  }
  return { grp, top }
}

export const createSummary = function(nodeObj: NodeObj, omitChildren?: boolean) {
  const smy:HTMLElement = $d.createElement('SMY')
  const top: Top = this.createTop(nodeObj)
  smy.appendChild(top)
  if (!omitChildren && nodeObj.children && nodeObj.children.length > 0) {
    top.appendChild(createExpander(nodeObj.expanded))
    if (nodeObj.expanded !== false) {
      const [children] = this.createChildren(nodeObj.children)
      smy.appendChild(children)
    }
  }
  return { smy, top }
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
  // div.innerHTML=origin.replace(/<div(([\s\S])*?)<\/div>/, '').replace('🔗','')
  div.contentEditable = 'true'
  div.spellcheck = false
  div.textContent = origin
  if(tpc.nodeObj.image){
    const images=tpc.nodeObj.image
    images.forEach(val=>{
      const imgContainer = $d.createElement('img')
      imgContainer.src = val.url
      imgContainer.style.width = val.width + 'px'
      imgContainer.style.display = 'block'
      div.appendChild(imgContainer)
    })
  }
  div.style.cssText = `min-width:${tpc.offsetWidth - 22}px;min-height:${tpc.clientHeight-16}px`
  if(tpc.nodeObj?.style?.width){
    div.style.width='auto'
  }
  if(tpc.nodeObj?.style?.color==='#ffffff'||(tpc.nodeObj?.id==='root'&&!tpc.nodeObj?.style?.color)){
    div.style.color='#2c3e50'
  }
  if (this.direction === LEFT) div.style.right = '0'
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
    //添加图片支持
    //去除节点缩放鼠标移动的监听
    node.image=[]
    div.childNodes.forEach((val)=>{
      if(val.nodeName==='IMG'){
          // console.log('宽度  ',div.clientWidth)
          node.image.push({
            url:(val as HTMLImageElement).src,
            width:(val as HTMLImageElement).width,
            height:(val as HTMLImageElement).height,
          })
      }
    })
    if (topic === '' && node.image.length===0) node.topic = origin
    else node.topic = topic
    div.remove()
    this.inputDiv = div = null
    // TODO 优化
    if (topic === origin && node.image.length===0) return // 没有修改不做处理
    tpc.childNodes[0].textContent = node.topic
    //更新宽度控制条的高度
    const widthControllLeft=tpc.querySelector('widthControllRight') as HTMLElement
    const widthControllRight=tpc.querySelector('widthControllRight') as HTMLElement
    if(!node.style) node.style={}
    node.style.controllWidth=widthControllLeft.style.height=widthControllRight.style.height=tpc.clientHeight.toString()+'px'
    //记录节点宽度
    // node.style.width=tpc.clientWidth-Number(getComputedStyle(tpc).paddingLeft.replace('px',''))-Number(getComputedStyle(tpc).paddingRight.replace('px',''))+1+'px'
    delete node.style.width

    this.shapeTpc(tpc,node)
    this.linkDiv()
    //时间分片，待优化
    updateLinkJumpTitle.call(this,this.nodeData,node.id,node.topic)
    this.bus.fire('operation', {
      name: 'finishEdit',
      obj: node,
      origin,
    })
  })
  console.timeEnd('createInputDiv')
}


function updateLinkJumpTitle(node:NodeObj,id,topic){
  node?.linkJump?.forEach(({toId},index)=>{
    if(toId===id){
      node.linkJump[index].title=topic
      const button=this.container.querySelector(`tpc[data-nodeid=me${node.id}] .linkJump`)
      button.title=topic
    }
  })
  for(const val of (node.children||[])){
    updateLinkJumpTitle.call(this,val,id,topic)
  }
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
  const smyArr=[]
  for (let i = 0; i < data.length; i++) {
    const nodeObj = data[i]
    if(nodeObj?.type==='summary'){
      smyArr.push(nodeObj)
      continue
    }
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
        const [children,smyChildArr] = this.createChildren(nodeObj.children)
        grp.appendChild(children)
        smyChildArr.forEach(v=>{
          const {smy}=this.createSummary(v)
          if(!grp.children?.[2]){
            grp.appendChild($d.createElement('smychildren'))
          }
          grp.children[2].appendChild(smy)
          // grp.appendChild(smy)
        })
      }
    } else {
      grp.appendChild(top)
    }
    chldr.appendChild(grp)
  }
  return [chldr,smyArr]
}

// Set primary nodes' direction and invoke createChildren()
export function layout() {
  console.time('layout')
  this.root.innerHTML = ''
  this.box.innerHTML = ''
  const tpc = this.createTopic(this.nodeData)
  shapeTpc.call(this,tpc, this.nodeData) // shape root tpc
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
