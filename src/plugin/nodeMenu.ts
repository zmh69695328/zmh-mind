import { ImageElement } from 'canvg'
import i18n from '../i18n'

const createDiv = (id?:string) => {
  const div = document.createElement('div')
  if(id) div.id = id
  return div
}

const colorList = [
  '#000000',
  // '#2c3e50',
  '#34495e',
  '#7f8c8d',
  '#94a5a6',
  //'#bdc3c7',
  '#f6f6f6',
  '#ffffff',
  '#8e44ad',
  '#9b59b6',
  '#2980b9',
  '#3298db',
  '#c0392c',
  '#e74c3c',
  '#d35400',
  '#f39c11',
  '#f1c40e',
  '#17a085',
  '#27ae61',
  '#2ecc71',
]

export default function(mind) {
  const locale = i18n[mind.locale] ? mind.locale : 'en'
  let bgOrFont
  const styleDiv = createDiv('nm-style')
  const tagDiv = createDiv('nm-tag')
  const iconDiv = createDiv('nm-icon')
  //different from "linkDiv" which is aims to link nodes with svg,
  const linkDiv = createDiv('nm-link')
  const remarkDiv = createDiv('nm-remark')
  styleDiv.innerHTML = `
      <div class="nm-fontsize-container">
        ${['15', '24', '32']
    .map(size => {
      return `<div class="size"  data-size="${size}">
        <svg class="icon" style="width: ${size}px;height: ${size}px" aria-hidden="true">
          <use xlink:href="#icon-a"></use>
        </svg></div>`
    })
    .join('')}<div class="bold"><svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-B"></use>
  </svg></div>
      </div>
      <div class="nm-fontcolor-container">
        ${colorList
    .map(color => {
      let dataColor = color;
      if (color === '#f6f6f6') {
        // #f6f6f6 为恢复画布背景颜色
        dataColor = '';
      }
      return `<div class="split6"><div class="palette" data-color="${dataColor}" style="background-color: ${color};"></div></div>`
    })
    .join('')}
      </div>
      <div class="bof">
      <span class="font">${i18n[locale].font}</span>
      <span class="background">${i18n[locale].background}</span>
      </div>
  `
  tagDiv.innerHTML = `${i18n[locale].tag}<textarea class="nm-tag" tabindex="-1" placeholder="${i18n[locale].tagsSeparate}" /><br>`
  iconDiv.innerHTML = `${i18n[locale].icon}<div class="nm-icon" contenteditable="true" spellcheck="false" placeholder="${i18n[locale].iconsSeparate}" ></div>`
  linkDiv.innerHTML = `${i18n[locale].hyperlink}<textarea class="nm-link" tabindex="-1" placeholder="${i18n[locale].linkSeparate}" /><br>`
  remarkDiv.innerHTML = `${i18n[locale].remark}<textarea class="nm-remark" tabindex="-1" placeholder="${i18n[locale].reamrkSeparate}" /><br>`

  const iconPicker=createDiv()
  iconPicker.className='picker'
  iconPicker.style.display='none'
  // const imglist=createDiv()
  iconPicker.innerHTML=`<div class="header"></div><div class="list"></div>`
  // iconPicker.children[0].children[0].appendChild(img)
  // iconPicker.appendChild(imglist)
  // const imgList=['flag','number','other','portrait','star']
  // const imgListLength=[4,8,17,2,3]
  // for(let i=0;i<imgList.length;i++){
  //   for(let j=0;j<imgListLength[i])
  // }
  const headerList=['全部','旗杆','数字','其他','人像','星星']
  headerList.forEach((val,i)=>{
    
    const box=createDiv()
    box.className='box'
    if(i===0){
      box.className='box active'
    }
    box.innerText=val
    iconPicker.children[0].appendChild(box)
  })
  const imgList={
    flag:4,number:8,other:17,portrait:2,star:3
  }
  Object.keys(imgList).forEach(val => {
    for(let i=1;i<=imgList[val];i++){
      const img =document.createElement('img')
      const list=createDiv()
      list.className='item'
      img.style.width='100%'
      img.style.height='100%'
      img.src=new URL(`../iconfont/icon/${val}/${val+i}.webp`, import.meta.url).href
      list.appendChild(img)
      iconPicker.children[1].appendChild(list)
    }
    (iconPicker.children[1] as HTMLElement).onclick=(e:MouseEvent & { target:HTMLElement})=>{
      if(e.target.nodeName==='IMG'){
        const item =createDiv()
        item.className='divItem'
        item.appendChild(e.target.cloneNode())
        iconInput.appendChild(item)
        mind.updateNodeIcons(mind.currentNode.nodeObj, iconInput.innerHTML)
        e.stopPropagation()
      }
      console.log(e)
    }
  });
  
  iconDiv.appendChild(iconPicker)
  function addDropTextarea(xxxdiv:HTMLElement){
    xxxdiv.ondblclick=(e)=>{
      const textarea=document.createElement('textarea')
      const preTextarea=xxxdiv.children[0] as HTMLTextAreaElement
      const maxHeight=mind.container.offsetHeight-xxxdiv.offsetTop-60
      const minHeight=30
      const getHeight=(curHeight:number)=>{
        if(curHeight<minHeight){
          return minHeight
        }else if(curHeight>maxHeight){
          return maxHeight
        }else{
          return curHeight
        }
      }
      textarea.value=preTextarea.value
      textarea.style.position='absolute'
      textarea.style.left=preTextarea.offsetLeft+'px'
      textarea.style.top=preTextarea.offsetTop-10+'px'
      textarea.style.height=getHeight(preTextarea.scrollHeight) + 'px'
      textarea.style.width=preTextarea.offsetWidth+'px'
      textarea.oninput=(e:Event&{target:HTMLTextAreaElement})=>{
        let height=e.target.scrollHeight
        textarea.style.height =getHeight(height) + 'px';
      }
      textarea.onblur=e=>{
        preTextarea.value=textarea.value
        preTextarea.dispatchEvent(new CustomEvent('change'));
        textarea.remove()
      }
      xxxdiv.appendChild(textarea)
      textarea.focus()
    }
  }
  addDropTextarea(tagDiv)
  // addDropTextarea(iconDiv)
  addDropTextarea(linkDiv)
  addDropTextarea(remarkDiv)
  const menuContainer = document.createElement('nmenu')
  menuContainer.innerHTML = `
  <div class="button-container"><svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-close"></use>
  </svg></div>
  `
  menuContainer.appendChild(styleDiv)
  menuContainer.appendChild(tagDiv)
  menuContainer.appendChild(iconDiv)
  menuContainer.appendChild(linkDiv) 
  menuContainer.appendChild(remarkDiv)
  menuContainer.hidden = true

  function clearSelect(klass, remove) {
    var elems = mind.container.querySelectorAll(klass)
    ;[].forEach.call(elems, function(el) {
      el.classList.remove(remove)
    })
  }

  mind.container.append(menuContainer)
  const sizeSelector = menuContainer.querySelectorAll('.size')
  const bold:HTMLElement = menuContainer.querySelector('.bold')
  const buttonContainer:HTMLElement = menuContainer.querySelector('.button-container')
  const fontBtn:HTMLElement = menuContainer.querySelector('.font')
  const tagInput:HTMLInputElement = mind.container.querySelector('.nm-tag')
  const iconInput:HTMLInputElement = mind.container.querySelector('.nm-icon')
  const linkInput:HTMLInputElement = mind.container.querySelector('.nm-link')
  const remarkInput:HTMLInputElement = mind.container.querySelector('.nm-remark')
  menuContainer.onclick = e => {
    if (!mind.currentNode) return
    const nodeObj = mind.currentNode.nodeObj
    const target = e.target as HTMLElement
    if (target.className === 'palette') {
      if (!nodeObj.style) nodeObj.style = {}
      clearSelect('.palette', 'nmenu-selected')
      target.className = 'palette nmenu-selected'
      if (bgOrFont === 'font') {
        nodeObj.style.color = target.dataset.color
      } else if (bgOrFont === 'background') {
        nodeObj.style.background = target.dataset.color
      }
      mind.updateNodeStyle(nodeObj)
    } else if (target.className === 'background') {
      clearSelect('.palette', 'nmenu-selected')
      bgOrFont = 'background'
      target.className = 'background selected'
      target.previousElementSibling.className = 'font'
      if (nodeObj.style && nodeObj.style.background) {
        menuContainer.querySelector(
          '.palette[data-color="' + nodeObj.style.background + '"]'
        ).className = 'palette nmenu-selected'
      }
    } else if (target.className === 'font') {
      clearSelect('.palette', 'nmenu-selected')
      bgOrFont = 'font'
      target.className = 'font selected'
      target.nextElementSibling.className = 'background'
      if (nodeObj.style && nodeObj.style.color) {
        menuContainer.querySelector(
          '.palette[data-color="' + nodeObj.style.color + '"]'
        ).className = 'palette nmenu-selected'
      }
    }
    if(target.className!=='picker'&&target.className!=='header'&&target.className!=='item'&&target.className!=='list'&&target.className!=='box')
      iconPicker.style.display='none'
  }
  Array.from(sizeSelector).map(
    dom => {
      (dom as HTMLElement).onclick = e => {
        if (!mind.currentNode.nodeObj.style) mind.currentNode.nodeObj.style = {}
        clearSelect('.size', 'size-selected')
        const size = e.currentTarget as HTMLElement
        mind.currentNode.nodeObj.style.fontSize = size.dataset.size
        size.className = 'size size-selected'
        mind.updateNodeStyle(mind.currentNode.nodeObj)
      }
    }
  )
  bold.onclick = (e:MouseEvent & { currentTarget: Element}) => {
    if (!mind.currentNode.nodeObj.style) mind.currentNode.nodeObj.style = {}
    if (mind.currentNode.nodeObj.style.fontWeight === 'bold') {
      delete mind.currentNode.nodeObj.style.fontWeight
      e.currentTarget.className = 'bold'
      mind.updateNodeStyle(mind.currentNode.nodeObj)
    } else {
      mind.currentNode.nodeObj.style.fontWeight = 'bold'
      e.currentTarget.className = 'bold size-selected'
      mind.updateNodeStyle(mind.currentNode.nodeObj)
    }
  }
  tagInput.onchange = (e:InputEvent & { target: HTMLInputElement}) => {
    if (!mind.currentNode) return
    if (e.target.value!==null||e.target.value!==undefined) {
      let newTags
      if(e.target.value==='')
        newTags=[]
      else
        newTags = e.target.value.split(',')
      mind.updateNodeTags(mind.currentNode.nodeObj, newTags)
    }
  }
  // iconInput.webkitEditableContentChanged = (e:InputEvent & { target: HTMLInputElement}) => {
  //   if (!mind.currentNode) return
  //   if (e.target.value!==null||e.target.value!==undefined) {
  //     const newIcons = e.target.value.split(',')
  //     mind.updateNodeIcons(mind.currentNode.nodeObj, newIcons)
  //   }
  // }
  iconInput.addEventListener('input',(e:InputEvent & { target: HTMLInputElement}) => {
    if (!mind.currentNode) return
    if (e.target.innerText!==null||e.target.innerText!==undefined) {
      const newIcons = e.target.innerText.split(',')
      mind.updateNodeIcons(mind.currentNode.nodeObj, newIcons)
    }
  })
  iconInput.onclick=e=>{
    iconPicker.style.display=''
    e.stopPropagation()
  }
  linkInput.onchange = (e:InputEvent & { target: HTMLInputElement}) => {
    if (!mind.currentNode) return
    if (e.target.value!==null||e.target.value!==undefined) {
      const link = e.target.value
      mind.updateNodeHyperLink(mind.currentNode.nodeObj, link)
    }
  }
  remarkInput.onchange = (e:InputEvent & { target: HTMLInputElement}) => {
    if (!mind.currentNode) return
    if (e.target.value!==null||e.target.value!==undefined) {
      const input = e.target.value
      mind.updateNodeRemark(mind.currentNode.nodeObj, input)
    }
  }
  let state = 'open'
  buttonContainer.onclick = e => {
    if (state === 'open') {
      state = 'close'
      menuContainer.className = 'close'
      buttonContainer.innerHTML = `<svg class="icon" aria-hidden="true"><use xlink:href="#icon-menu"></use></svg>`
    } else {
      state = 'open'
      menuContainer.className = ''
      buttonContainer.innerHTML = `<svg class="icon" aria-hidden="true"><use xlink:href="#icon-close"></use></svg>`
    }
  }
  mind.bus.addListener('unselectNode', function() {
    menuContainer.hidden = true
  })
  mind.bus.addListener('selectNode', function(nodeObj, clickEvent) {
    if (!clickEvent) return
    menuContainer.hidden = false
    clearSelect('.palette', 'nmenu-selected')
    clearSelect('.size', 'size-selected')
    clearSelect('.bold', 'size-selected')
    bgOrFont = 'font'
    fontBtn.className = 'font selected'
    fontBtn.nextElementSibling.className = 'background'
    if (nodeObj.style) {
      if (nodeObj.style.fontSize) {
        const dataSize = menuContainer.querySelector(
          '.size[data-size="' + nodeObj.style.fontSize + '"]'
        )
        if(dataSize) dataSize.className = 'size size-selected'
      }
      if (nodeObj.style.fontWeight) { 
        const dataWeight = menuContainer.querySelector('.bold')
        if(dataWeight) dataWeight.className = 'bold size-selected' 
      }
      if (nodeObj.style.color) {
        const dataColor=menuContainer.querySelector(
          '.palette[data-color="' + nodeObj.style.color + '"]'
        )
        if(dataColor) dataColor.className = 'palette nmenu-selected'
      }
    }
    if (nodeObj.tags) {
      tagInput.value = nodeObj.tags.join(',')
    } else {
      tagInput.value = '' 
    }
    if (nodeObj.icons) {
      iconInput.innerHTML = nodeObj.icons
    } else {
      iconInput.innerText = ''
    }
    linkInput.value=''
    if (nodeObj.hyperLink) {
      linkInput.value = nodeObj.hyperLink
    } 
    if(nodeObj.linkJump){
      if(linkInput.value.length>0) linkInput.value+=','
      linkInput.value += nodeObj.linkJump.map(val=>val.title).reduce((preVal,curVal,index)=>preVal+(index?',':'')+curVal,'')
    }
    if (nodeObj.remark) {
      remarkInput.value = nodeObj.remark
    } else {
      remarkInput.value = ''
    }
    iconPicker.style.display='none'
  })
  
}
