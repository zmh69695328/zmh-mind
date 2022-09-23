import { createPath, createMainPath, createLinkSvg, createSvgPath } from './utils/svg'
import { findEle, Expander } from './utils/dom'
import {
  SIDE,
  GAP,
  TURNPOINT_R,
  PRIMARY_NODE_HORIZONTAL_GAP,
  PRIMARY_NODE_VERTICAL_GAP,
} from './const'
import { NodeObj } from '.'
import { node } from 'canvg/dist/presets'

interface rangeMapI{
  [propName: string]: boolean;
}
/**
 * Link nodes with svg,
 * only link specific node if `primaryNode` is present
 *
 * procedure:
 * 1. calculate position of primary nodes
 * 2. layout primary node, generate primary link
 * 3. generate links inside primary node
 * 4. generate custom link
 * @param {object} primaryNode process the specific primary node only
 */
export default function linkDiv(primaryNode) {
  var primaryNodeHorizontalGap = this.primaryNodeHorizontalGap || PRIMARY_NODE_HORIZONTAL_GAP
  var primaryNodeVerticalGap = this.primaryNodeVerticalGap || PRIMARY_NODE_VERTICAL_GAP
  console.time('linkDiv')
  const root = this.root
  root.style.cssText = `top:${10000 - root.offsetHeight / 2}px;left:${10000 - root.offsetWidth / 2}px;`
  const primaryNodeList = this.box.children
  this.svg2nd.innerHTML = ''

  // 1. calculate position of primary nodes
  let totalHeight = 0
  let shortSide: string // l or r
  let shortSideGap = 0 // balance heigt of two side
  let currentOffsetL = 0 // left side total offset
  let currentOffsetR = 0 // right side total offset
  let totalHeightL = 0
  let totalHeightR = 0
  let base: number

  if (this.direction === SIDE) {
    let countL = 0
    let countR = 0
    let totalHeightLWithoutGap = 0
    let totalHeightRWithoutGap = 0
    for (let i = 0; i < primaryNodeList.length; i++) {
      const el = primaryNodeList[i]
      if (el.className === 'lhs') {
        totalHeightL += el.offsetHeight + primaryNodeVerticalGap
        totalHeightLWithoutGap += el.offsetHeight
        countL += 1
      } else {
        totalHeightR += el.offsetHeight + primaryNodeVerticalGap
        totalHeightRWithoutGap += el.offsetHeight
        countR += 1
      }
    }
    if (totalHeightL > totalHeightR) {
      base = 10000 - Math.max(totalHeightL) / 2
      shortSide = 'r'
      shortSideGap = (totalHeightL - totalHeightRWithoutGap) / (countR - 1)
    } else {
      base = 10000 - Math.max(totalHeightR) / 2
      shortSide = 'l'
      shortSideGap = (totalHeightR - totalHeightLWithoutGap) / (countL - 1)
    }
  } else {
    for (let i = 0; i < primaryNodeList.length; i++) {
      const el = primaryNodeList[i]
      totalHeight += el.offsetHeight + primaryNodeVerticalGap
    }
    base = 10000 - totalHeight / 2
  }

  // 2. layout primary node, generate primary link
  let primaryPath = ''
  const alignRight = 10000 - root.offsetWidth / 2 - primaryNodeHorizontalGap+60
  const alignLeft = 10000 + root.offsetWidth / 2 + primaryNodeHorizontalGap-60
  for (let i = 0; i < primaryNodeList.length; i++) {
    let x2, y2
    const el = primaryNodeList[i]
    const elOffsetH = el.offsetHeight
    let xMiddle=root.offsetLeft-10
    if (el.className === 'lhs') {
      el.style.top = base + currentOffsetL + 'px'
      el.style.left = alignRight - el.offsetWidth + 'px'
      x2 = alignRight - 15 // padding
      y2 = base + currentOffsetL + elOffsetH / 2

      // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#path_commands
      let LEFT = 10000
      if (this.primaryLinkStyle === 2) {
        if (this.direction === SIDE) {
          LEFT = 10000 - root.offsetWidth / 6
        }
        if (y2 < 10000) {
          primaryPath += `M ${LEFT} 10000 V ${y2 + 20} C ${LEFT} ${y2} ${LEFT} ${y2} ${LEFT - 20} ${y2} H ${x2}`
        } else {
          primaryPath += `M ${LEFT} 10000 V ${y2 - 20} C ${LEFT} ${y2} ${LEFT} ${y2} ${LEFT - 20} ${y2} H ${x2}`
        }
      } else {
        primaryPath += `M 10000 10000 H ${xMiddle} V ${y2} H ${x2}`
      }

      if (shortSide === 'l') {
        currentOffsetL += elOffsetH + shortSideGap
      } else {
        currentOffsetL += elOffsetH + primaryNodeVerticalGap
      }
    } else {
      xMiddle=root.offsetLeft+root.offsetWidth+10
      el.style.top = base + currentOffsetR + 'px'
      el.style.left = alignLeft + 'px'
      x2 = alignLeft + 15 // padding
      y2 = base + currentOffsetR + elOffsetH / 2

      let LEFT = 10000
      if (this.primaryLinkStyle === 2) {
        if (this.direction === SIDE) {
          LEFT = 10000 + root.offsetWidth / 6
        }
        if (y2 < 10000) {
          primaryPath += `M ${LEFT} 10000 V ${y2 + 20} C ${LEFT} ${y2} ${LEFT} ${y2} ${LEFT + 20} ${y2} H ${x2}`
        } else {
          primaryPath += `M ${LEFT} 10000 V ${y2 - 20} C ${LEFT} ${y2} ${LEFT} ${y2} ${LEFT + 20} ${y2} H ${x2}`
        }
      } else {
        primaryPath += `M 10000 10000 H ${xMiddle} V ${y2} H ${x2}`
      }
      if (shortSide === 'r') {
        currentOffsetR += elOffsetH + shortSideGap
      } else {
        currentOffsetR += elOffsetH + primaryNodeVerticalGap
      }
    }
    // set position of expander
    const expander = el.children[0].children[1]
    if (expander) {
      expander.style.top =
        (expander.parentNode.offsetHeight - expander.offsetHeight) / 2 + 'px'
      if (el.className === 'lhs') {
        expander.style.left = -10 + 'px'
      } else {
        expander.style.left = expander.parentNode.offsetWidth - 10 + 'px'
      }
    }
  }
  this.svg2nd.appendChild(createMainPath(primaryPath))

  // 3. generate link inside primary node
  for (let i = 0; i < primaryNodeList.length; i++) {
    const el = primaryNodeList[i]
    if (primaryNode && primaryNode !== primaryNodeList[i]) {
      continue
    }
    if (el.childElementCount) {
      const svg = createLinkSvg('svg3rd')
      const svgSMY = createLinkSvg('svg3rd')
      // svg tag name is lower case
      // if (el.lastChild.tagName === 'svg') el.lastChild.remove()
      el.querySelectorAll('.svg3rd').forEach(val => {
        val.remove()
      });
      el.appendChild(svg)     
      const parent = el.children[0]
      let children
      if(el.children?.[2]?.tagName==='SMYCHILDREN'){
        children = [...el.children[1].children,...el.children[2].children]
      }   
      else
        children = el.children[1].children
      path = ''
      smypath = ''
      loopChildren(children, parent,this.nodeData.children[i],true)
      svg.appendChild(createPath(path))
      if(smypath.length>0){
        el.appendChild(svgSMY)
        svgSMY.appendChild(createSvgPath(smypath))
      }  
    }
  }

  // 4. generate custom link
  this.linkSvgGroup.innerHTML = ''
  for (const prop in this.linkData) {
    const link = this.linkData[prop]
    if (typeof link.from === 'string') {
      this.createLink(findEle(link.from), findEle(link.to), true, link)
    } else {
      this.createLink(
        findEle(link.from.nodeObj.id),
        findEle(link.to.nodeObj.id),
        true,
        link
      )
    }
  }
  console.timeEnd('linkDiv')
}

let path = ''
let smypath = ''

function loopChildren(children: HTMLElement[], parent: HTMLElement,nodeData:NodeObj,first?: boolean) {
  let parentOT = parent.offsetTop
  let parentOL = parent.offsetLeft
  let parentOW = parent.offsetWidth
  let parentOH = parent.offsetHeight
  let isSmyChild=false
  if(parent.offsetParent.tagName==='SMY'){
    isSmyChild=true
    parentOT+=(parent.offsetParent as HTMLElement).offsetTop
    parentOL+=(parent.offsetParent as HTMLElement).offsetLeft
    // parentOW+=(parent.offsetParent as HTMLElement).offsetWidth
    // parentOH+=(parent.offsetParent as HTMLElement).offsetHeight
  }
  for (let i = 0; i < children.length; i++) {
    const child: HTMLElement = children[i] as HTMLElement
    if(child?.tagName==='SMY'){
      let firstEl=children[0] as HTMLElement
      let lastEl=children[i-1] as HTMLElement

      const rangeMap:rangeMapI={}
      nodeData.children[i].summary.range.forEach(val=>{
        rangeMap[val]=true
      })
      let flag=true
      for(let j=0;j<i;j++){
          const key=children[j].children[0].children[0].getAttribute('data-nodeid').slice(2)
          if(rangeMap[key]){
            if(flag){
              flag=false
              firstEl=children[j]
            }
            lastEl=children[j]
          }
      }
      const xfirst=firstEl.offsetLeft+firstEl.offsetWidth+8
      const yfirst=firstEl.offsetTop+15
      const ylast=lastEl.offsetTop+lastEl.offsetHeight-5
      const xlast=lastEl.offsetLeft+lastEl.offsetWidth+8
      const y=child.offsetTop+(child.children[0] as HTMLElement).offsetTop+(child.children[0] as HTMLElement).offsetHeight
      let top=child.style.top??0
      if(typeof top ==='string') top=Number(top.replace('px',''))
      child.style.top=top+(ylast+yfirst+20)/2-y+'px'
      smypath+=`M ${xfirst} ${yfirst} H ${xfirst+10} V ${ylast} H${xlast}`
    }
    const childT: HTMLElement = child.children[0] as HTMLElement // t tag inside the child dom
    let childTOT = childT.offsetTop
    let childTOH = childT.offsetHeight
    if(isSmyChild){
      childTOT+=(childT.offsetParent as HTMLElement).offsetTop
      // childTOH=(childT.offsetParent as HTMLElement).offsetHeight
    }
    let y1: number
    if (first||isSmyChild) {
      y1 = parentOT + parentOH / 2
    } else {
      y1 = parentOT + parentOH
    }
    const y2 = childTOT + childTOH
    let x1: number, x2: number, xMiddle: number
    const direction = child.offsetParent.className||(child.offsetParent as HTMLElement).offsetParent.className
    if (direction === 'lhs'&&child?.tagName!=='SMY') {
      x1 = parentOL + GAP
      xMiddle = parentOL
      x2 = parentOL - childT.offsetWidth
      if (
        childTOT + childTOH < parentOT + parentOH / 2 + 50 &&
        childTOT + childTOH > parentOT + parentOH / 2 - 50
      ) {
        // 相差+-50内直接直线
        path += `M ${x1} ${y1} H ${xMiddle} V ${y2} H ${x2}`
      } else if (childTOT + childTOH >= parentOT + parentOH / 2) {
        // 子底部低于父中点
        path += `M ${x1} ${y1} H ${xMiddle} V ${y2 } H ${x2}`
      } else {
        // 子底部高于父中点
        path += `M ${x1} ${y1} H ${xMiddle} V ${y2 } H ${x2}`
      }
    } else if (direction === 'rhs'&&child?.tagName!=='SMY') {
      x1 = parentOL + parentOW - GAP
      if(isSmyChild) x1+=GAP
      xMiddle = parentOL + parentOW
      x2 = parentOL + parentOW + childT.offsetWidth
      if (
        childTOT + childTOH < parentOT + parentOH / 2 + 50 &&
        childTOT + childTOH > parentOT + parentOH / 2 - 50
      ) {
        path += `M ${x1} ${y1} H ${xMiddle} V ${y2} H ${x2}`
        
      } else if (childTOT + childTOH >= parentOT + parentOH / 2) {
        path += `M ${x1} ${y1} H ${xMiddle} V ${y2 } H ${x2}`
      } else {
        path += `M ${x1} ${y1} H ${xMiddle} V ${y2 } H ${x2}`
      }
    }

    const expander = childT.children[1] as Expander
    if (expander) {
      expander.style.top =
        (childT.offsetHeight - expander.offsetHeight) / 2 + 'px'
      if (direction === 'lhs') {
        expander.style.left = -10 + 'px'
      } else if (direction === 'rhs') {
        expander.style.left = childT.offsetWidth - 10 + 'px'
      }
      // this property is added in the layout phase
      if (!expander.expanded) continue
    } else {
      // expander not exist
      continue
    }
    // traversal
    let nextChildren
    if(child.children?.[2]?.tagName==='SMYCHILDREN'){
      nextChildren=[...child.children[1].children,...child.children[2].children]
    }else{
      nextChildren=[...child.children[1].children]
    }
    if (nextChildren.length > 0) loopChildren(nextChildren, childT,nodeData.children[i])
  }
}
