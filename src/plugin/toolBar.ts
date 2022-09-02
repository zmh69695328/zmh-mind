import { expandNodeChild, getAllDataWithAutoHide } from "../interact"
import { updateSidebar } from "./sidebar"

const createButton = (id, name) => {
  const button = document.createElement('span')
  button.id = id
  button.innerHTML = `<svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-${name}"></use>
  </svg>`
  return button
}

let timer = null;
function debounce (fun,wait) {
  return function () {
  	const argu = arguments;
  	// 事件触发，如果之前有等待的事件，则清空计时，重新进行事件等待执行
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      fun.apply(this, argu);
    }, wait);
  }
}

function createToolBarRBContainer(mind) {
  const toolBarRBContainer = document.createElement('toolbar')
  const fc = createButton('fullscreen', 'full')
  const gc = createButton('toCenter', 'living')
  const zo = createButton('zoomout', 'move')
  const zi = createButton('zoomin', 'add')
  const numberSelection=document.createElement('input')
  numberSelection.className='numberSelection'
  numberSelection.type='number'
  numberSelection.min='2'
  numberSelection.max='100'
  numberSelection.step='1'
  numberSelection.value=mind?.expandDeep?.toString()||'2'
  numberSelection.oninput=debounce(()=>{
    const data=mind.getAllDataWithAutoHide()
    // mind.init(data?.nodeData,data?.expandDeep)
    expandNodeChild(data?.nodeData)
    mind.layout()
    mind.linkDiv()
  },500)

  
  const percentage = document.createElement('span')
  percentage.innerText = '100%'
  toolBarRBContainer.appendChild(numberSelection)
  toolBarRBContainer.appendChild(fc)
  toolBarRBContainer.appendChild(gc)
  toolBarRBContainer.appendChild(zo)
  toolBarRBContainer.appendChild(zi)
  
  // toolBarRBContainer.appendChild(percentage)
  toolBarRBContainer.className = 'rb'
  fc.onclick = () => {
    mind.container.requestFullscreen()
  }
  gc.onclick = () => {
    mind.toCenter()
  }
  zo.onclick = () => {
    if (mind.scaleVal < 0.6) return
    mind.scale((mind.scaleVal -= 0.2))
  }
  zi.onclick = () => {
    if (mind.scaleVal > 1.6) return
    mind.scale((mind.scaleVal += 0.2))
  }
  return toolBarRBContainer
}
function createToolBarLTContainer(mind) {
  const toolBarLTContainer = document.createElement('toolbar')
  const menu  = createButton('sidebar', 'menu')
  const l = createButton('tbltl', 'left')
  const r = createButton('tbltr', 'right')
  const s = createButton('tblts', 'side')
  toolBarLTContainer.appendChild(menu)
  toolBarLTContainer.appendChild(l)
  toolBarLTContainer.appendChild(r)
  toolBarLTContainer.appendChild(s)
  toolBarLTContainer.className = 'lt'

  
  menu.onclick=() => {
    const sidebar =document.querySelector('sidebar')
    updateSidebar(mind,sidebar as HTMLElement)
    if(sidebar.classList.contains('selected')){
      sidebar.removeAttribute('class')
    }else{
      sidebar.setAttribute('class','selected')
    }
  }
  l.onclick = () => {
    mind.initLeft()
  }
  r.onclick = () => {
    mind.initRight()
  }
  s.onclick = () => {
    mind.initSide()
  }
  return toolBarLTContainer
}

function createCloseButton(mind){
  const close = createButton('close','close')
  close.onclick=()=>{
    console.log('关闭')
    mind.bus.fire('close',{})
  }
  return close
}

export default function(mind) {
  mind.container.append(createToolBarRBContainer(mind))
  mind.container.append(createToolBarLTContainer(mind))
  mind.closeButton && mind.container.append(createCloseButton(mind))
}
