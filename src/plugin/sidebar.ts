import { NodeObj } from ".."
import { moveToNode } from "../utils/dom"

function queryList(nodeData:NodeObj,cnt:number):string{
    let res:string=''
    for(let i =0;i<nodeData.children?.length;i++){
        // res+=queryList(nodeData.children[i])`
        res +=`<li class="sidebar-links">${queryList(nodeData.children[i],cnt+1)}</li>`
    }
    if(!nodeData?.children||!nodeData.children.length){
        return `<p class="sidebar-title" id="sidebar${nodeData.id}"><span class="arrow"></span><span>${nodeData.topic}</span></p>`
    }else{
        return `<p class="sidebar-title" id="sidebar${nodeData.id}"><span class="arrow ${cnt<2?'down':'right'}"></span><span>${nodeData.topic}</span></p><ul class="sidebar-heading open ${cnt<2?'':'hidden'}">${res}</ul>`
    }
    
}

export function updateSidebar(mind,sidebar:HTMLElement){
    const nodeData=mind.nodeData
    sidebar.innerHTML = `${queryList(nodeData,0)}`
    sidebar.querySelectorAll('.sidebar-title').forEach((e:HTMLElement)=>{
        e.onclick=()=>{
              const down = e.querySelector('.down')
              const right = e.querySelector('.right')
              const curActive=mind.container.querySelector('.sidebar-title.active')
              curActive?.classList.remove('active')
              if(down){
                e.parentElement.querySelector('ul').classList.add('hidden')
                down.classList.replace('down','right')
              }else if(right){
                e.parentElement.querySelector('ul').classList.remove('hidden')
                right.classList.replace('right','down')
              }
              e.classList.add('active')
              moveToNode.call(mind,e.id.replace('sidebar',''))
        }
    })
}

export default function(mind){
    const sidebar = document.createElement('sidebar')
    const nodeData=mind.nodeData
    sidebar.innerHTML = `${queryList(nodeData,0)}`
    mind.container.append(sidebar)
}
