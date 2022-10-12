import { E } from "../index.lite"

const $d = document
const svgNS = 'http://www.w3.org/2000/svg'
export const createMainPath = function(d: string) {
  const path = $d.createElementNS(svgNS, 'path')
  path.setAttribute('d', d)
  path.setAttribute('stroke', '#555')
  path.setAttribute('fill', 'none')
  path.setAttribute('stroke-width', '1')
  path.setAttribute('stroke-linecap', 'square')
  path.setAttribute('transform', 'translate(0.5,-0.5)')
  return path
}

export const createLinkSvg = function(klass: string) {
  const svg = $d.createElementNS(svgNS, 'svg')
  svg.setAttribute('class', klass)
  return svg
}

export const createSvgPath = function(d: string) {
  const path = $d.createElementNS(svgNS, 'path')
  path.setAttribute('d', d)
  path.setAttribute('fill', 'none')
  path.setAttribute('stroke-linecap', 'square')
  path.setAttribute('stroke', '#F6A04D')
  path.setAttribute('stroke-width', '3')
  path.setAttribute('transform', 'translate(0.5,-0.5)')
  return path
}

export const createLine = function(x1: number, y1: number, x2: number, y2: number) {
  const line = $d.createElementNS(svgNS, 'line')
  line.setAttribute('x1', x1.toString())
  line.setAttribute('y1', y1.toString())
  line.setAttribute('x2', x2.toString())
  line.setAttribute('y2', y2.toString())
  line.setAttribute('stroke', '#bbb')
  line.setAttribute('fill', 'none')
  line.setAttribute('stroke-width', '2')
  return line
}

export const createPath = function(d: string) {
  const path = $d.createElementNS(svgNS, 'path')
  path.setAttribute('d', d)
  path.setAttribute('stroke', '#555')
  path.setAttribute('fill', 'none')
  path.setAttribute('stroke-linecap', 'square')
  path.setAttribute('stroke-width', '1')
  path.setAttribute('transform', 'translate(0.5,-0.5)')
  // adding translate(0.5,-0.5) can fix render error on windows, but i still dunno why
  return path
}

export const createWidthControll = function(d: string) {
  const g = $d.createElementNS(svgNS, 'g')
  const left =$d.createElementNS(svgNS, 'rect')
  const right =$d.createElementNS(svgNS, 'rect')
  left.setAttribute('width','7')
  left.setAttribute('height','30')
  left.setAttribute('opacity','0')
  left.setAttribute('style','cursor: ew-resize;')
  left.setAttribute('x','22')
  g.appendChild(right)
  g.appendChild(left)
  // adding translate(0.5,-0.5) can fix render error on windows, but i still dunno why
  return g
}
interface CustomSvg extends SVGElement{
  linkObj?:object
}
export const createSvgGroup = function(d: string, arrowd: string):CustomSvg {
  const g = $d.createElementNS(svgNS, 'g')
  const path = $d.createElementNS(svgNS, 'path')
  const arrow = $d.createElementNS(svgNS, 'path')
  arrow.setAttribute('d', arrowd)
  arrow.setAttribute('stroke', 'rgb(235, 95, 82)')
  arrow.setAttribute('fill', 'none')
  arrow.setAttribute('stroke-linecap', 'cap')
  arrow.setAttribute('stroke-width', '2')
  path.setAttribute('d', d)
  path.setAttribute('stroke', 'rgb(235, 95, 82)')
  path.setAttribute('fill', 'none')
  path.setAttribute('stroke-linecap', 'cap')
  path.setAttribute('stroke-width', '2')
  g.appendChild(path)
  g.appendChild(arrow)
  return g
}

export const createFrameselection = function(width=10,height=10,img:HTMLElement) {
  const svg = $d.createElementNS(svgNS, 'svg')
  const g = $d.createElementNS(svgNS, 'g')
  const rect =$d.createElementNS(svgNS, 'rect')
  rect.setAttribute('width',width.toString())
  rect.setAttribute('height',height.toString())
  rect.setAttribute('stroke','#2ebdff')
  rect.setAttribute('stroke-width','2')
  rect.setAttribute('fill','none')
  svg.setAttribute('class','line')
  rect.setAttribute('x','1')
  rect.setAttribute('y','1')
  g.appendChild(rect)
  const resize =$d.createElementNS(svgNS, 'rect')
  resize.setAttribute('width','6')
  resize.setAttribute('height','6')
  // resize.setAttribute('opacity','0')
  resize.setAttribute('stroke','#2ebdff')
  resize.setAttribute('stroke-width','2')
  resize.setAttribute('fill','white')
  resize.setAttribute('x',(width-3).toString())
  resize.setAttribute('y',(height-3).toString())
  resize.setAttribute('class','resize')
  g.appendChild(resize)
  svg.appendChild(g)
  svg.style.width=img.clientWidth+5+'px'
  svg.style.height=img.clientHeight+5+'px'
  resize.onpointerdown = function(event) {
    const startX=Number(rect.getAttribute('width'))
    const startY=Number(rect.getAttribute('height'))
    console.log(startX,startY)
    let shiftX = event.clientX 
    let shiftY = event.clientY 
  
    // ball.style.position = 'absolute';
    // ball.style.zIndex = 1000;
    // document.body.append(ball);
  
    moveAt(event.pageX, event.pageY);
  
    // 移动现在位于坐标 (pageX, pageY) 上的球
    // 将初始的偏移考虑在内
    function moveAt(pageX, pageY) {
      const offsetX=startX+pageX - shiftX
      const offsetY=startY+pageY - shiftY
      rect.setAttribute('width', offsetX.toString())
      rect.setAttribute('height',offsetY.toString())
      resize.setAttribute('x',(offsetX-3).toString())
      resize.setAttribute('y',(offsetY-3).toString())
      svg.style.width=offsetX+5+'px'
      svg.style.height=offsetY+5+'px'
      img.style.width=offsetX+'px'
      img.style.height=offsetY+'px'
    }
  
    function onMouseMove(event) {
      console.log(event.pageX, event.pageY,shiftX,shiftY)
      moveAt(event.pageX, event.pageY);
    }
    resize.onpointermove=onMouseMove
    // 在 mousemove 事件上移动球
    // document.addEventListener('mousemove', onMouseMove);
    
    // 放下球，并移除不需要的处理程序
    resize.onpointerup = function(event) {
      resize.onpointermove=null
      resize.onpointerup = null;
      resize.releasePointerCapture(event.pointerId)
    };
    event.stopPropagation()
    event.preventDefault()
    resize.setPointerCapture(event.pointerId)
  };
  
  resize.ondragstart = function() {
    return false;
  };
  

  // adding translate(0.5,-0.5) can fix render error on windows, but i still dunno why
  return svg
}