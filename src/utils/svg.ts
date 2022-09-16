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
