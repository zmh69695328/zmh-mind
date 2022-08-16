import './style.css'
import MindElixir from './index'
import data from './examples/data.json'
let mind = new MindElixir({
  el: 'map',
  direction: MindElixir.RIGHT,
  // create new map data
  data:data,
  // data: MindElixir.new('new topic'), 
  // or set as data that is return from `.getAllData()`
  // data: {...},
  draggable: true, // default true
  contextMenu: true, // default true
  toolBar: true, // default true
  nodeMenu: true, // default true
  keypress: true, // default true
  locale: 'zh_CN',
  // primaryLinkStyle:2
})
mind.init()
window.mind=mind
console.log(mind)

const haha=document.querySelector('#btn-haha')

haha?.addEventListener('click',e=>{
    const data=mind.getAllDataWithAutoHide()
    console.log('更新',data)
    mind =new MindElixir({
      el: 'map',
      direction: MindElixir.LEFT,
      // create new map data
      data: data ,
      // or set as data that is return from `.getAllData()`
      // data: {...},
      draggable: true, // default true
      contextMenu: true, // default true
      toolBar: true, // default true
      nodeMenu: true, // default true
      keypress: true, // default true
      locale: 'zh_CN'
    })

    mind.init()
    // const svgDiv=document.querySelector('#haha')
    // svgDiv.appendChild(mind.exportSvgDom())
})


const haha2=document.querySelector('#btn-export')

haha2?.addEventListener('click',e=>{
  const map2=document.querySelector('#map2')
  map2.textContent=''
  map2.appendChild(mind.exportSvgDom())
})