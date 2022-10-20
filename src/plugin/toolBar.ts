import { expandNodeChild } from "../interact"
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
    expandNodeChild(data?.nodeData)
    mind.layout()
    mind.linkDiv()
  },300)

  
  const percentage = document.createElement('span')
  percentage.innerText = '100%'
  toolBarRBContainer.appendChild(numberSelection)
  toolBarRBContainer.appendChild(fc)
  toolBarRBContainer.appendChild(gc)
  toolBarRBContainer.appendChild(zo)
  toolBarRBContainer.appendChild(zi)
  if (mind.uploadButton) {
    const uploadButton = createUploadButton(mind)
    toolBarRBContainer.appendChild(uploadButton)
  }
  toolBarRBContainer.className = 'rb'
  fc.onclick = () => {
    mind.container.requestFullscreen()
  }
  gc.onclick = () => {
    mind.toTopLeft()
  }
  zo.onclick = () => {
    if (mind.scaleVal < 0.6) return
    mind.scale((mind.scaleVal -= 0.2))
  }
  zi.onclick = () => {
    if (mind.scaleVal > 1.6) return
    mind.scale((mind.scaleVal += 0.2))
  }
  const scrollContainer = mind.scrollContainer;
  const offsetRight=window.innerWidth-scrollContainer?.getBoundingClientRect().right+parseInt(scrollContainer&&getComputedStyle(scrollContainer).paddingRight)
  scrollContainer?.addEventListener('scroll',e=>{
    const viewTop=scrollContainer.scrollTop
    const viewBottom=viewTop+scrollContainer.clientHeight
    const mindTop = mind.mindElixirBox.offsetTop
    const mindBottom = mind.mindElixirBox.offsetTop+mind.mindElixirBox.clientHeight
    const mindHeight=mind.mindElixirBox.clientHeight
    // const toolbarBottom=mindTop+mindHeight-toolBarRBContainer.clientHeight-40
    // console.log(mindTop+toolBarRBContainer.clientHeight+40,viewBottom)
    if(viewBottom<mindTop+toolBarRBContainer.clientHeight+40){
      toolBarRBContainer.style.position='absolute'
      toolBarRBContainer.style.bottom=mindHeight-20-toolBarRBContainer.clientHeight+'px'
    }else if(viewBottom<=mindBottom){
      toolBarRBContainer.style.position='fixed'
      toolBarRBContainer.style.bottom='20px'
      toolBarRBContainer.style.right=offsetRight+20+'px'
    } else if(viewBottom>mindBottom){
      toolBarRBContainer.style.position='absolute'
      toolBarRBContainer.style.bottom='20px'
    } 
  })
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
  const scrollContainer:HTMLElement= mind.scrollContainer
  const offsetLeft=scrollContainer?.getBoundingClientRect().left+parseInt(scrollContainer&&getComputedStyle(scrollContainer).paddingLeft)
  scrollContainer?.addEventListener('scroll',e=>{
    const viewTop=scrollContainer.scrollTop
    const mindTop = mind.mindElixirBox.offsetTop
    const mindHeight=mind.mindElixirBox.clientHeight
    const toolbarBottom=mindTop+mindHeight-toolBarLTContainer.clientHeight-40
    if(viewTop>toolbarBottom){
      toolBarLTContainer.style.position='absolute'
      toolBarLTContainer.style.top=toolbarBottom-mindTop+20+'px'
    }else if(viewTop>=mindTop){
      toolBarLTContainer.style.position='fixed'
      toolBarLTContainer.style.top='20px'
      toolBarLTContainer.style.left=offsetLeft+20+'px'
    } else if(viewTop<mindTop){
      toolBarLTContainer.style.position='absolute'
      toolBarLTContainer.style.top='20px'
    } 
  },
  )
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

function createUploadButton(mind){
  const button = document.createElement('span')
  button.innerHTML = `
  <form action="" enctype="multipart/form-data" method="post" class="fm">
    <input type="file" name="file" class="selectFile">
  </form>
  <svg t="1662362270319" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2591" width="200" height="200">
  <path d="M324.6592 352.13312c7.1168 0 13.34272-2.66752 18.688-8.00768l141.50656-141.51168v443.2128c0 15.12448 11.5712 26.70592 26.7008 26.70592s26.7008-11.58144 26.7008-26.70592V202.61376l141.50656 141.51168c5.34528 5.34016 12.4672 8.00768 18.688 8.00768 6.23616 0 13.35296-2.66752 18.69312-8.00768 10.68032-10.68032 10.68032-27.59168 0-37.38112l-186.9056-186.89536c-0.88576-0.89088-2.66752-2.66752-4.44416-3.5584-0.88576 0-1.77664-0.89088-1.77664-0.89088-0.896-0.88576-1.78688-0.88576-2.67776-1.77664-0.89088 0-1.77664-0.89088-2.66752-0.89088-0.896 0-1.77664-0.89088-2.66752-0.89088a21.67296 21.67296 0 0 0-10.68032 0c-0.89088 0-1.77664 0.89088-2.66752 0.89088-0.89088 0-1.78176 0.89088-2.67264 0.89088-0.89088 0-1.77664 0.89088-2.66752 1.77664-0.89088 0-1.77664 0.89088-1.77664 0.89088-1.78176 0.89088-2.66752 1.78176-4.4544 3.5584L304.18944 306.74432c-10.68032 10.68032-10.68032 27.59168 0 37.38112 7.1168 5.34016 13.34784 8.00768 20.46976 8.00768z" fill="#333333" p-id="2592"></path><path d="M929.84832 556.83072c-15.1296 0-26.7008 11.5712-26.7008 26.7008v206.47936c0 38.272-31.15008 69.42208-69.41696 69.42208H189.37856c-38.26688 0-69.41696-31.15008-69.41696-69.42208v-206.47936c0-15.1296-11.5712-26.7008-26.7008-26.7008s-26.69568 11.5712-26.69568 26.7008v206.47936c0 67.6352 55.17824 122.81856 122.81856 122.81856h645.23776c67.64544 0 122.82368-55.18336 122.82368-122.81856v-206.47936c-0.896-15.1296-12.4672-26.7008-27.5968-26.7008z" 
  fill="#333333" p-id="2593"></path>
  </svg>
  `
  const fm = button.children[0];
  fm.addEventListener("change", e => {
    mind.bus.fire('upload', fm)
  })
  return button
}


export default function(mind) {
  mind.mindElixirBox.append(createToolBarLTContainer(mind))
  mind.container.append(createToolBarRBContainer(mind))
  mind.closeButton && mind.container.append(createCloseButton(mind))
}
