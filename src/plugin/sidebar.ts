import { NodeObj } from ".."
import { moveToNode } from "../utils/dom"

const img =`<svg style="width: 1.3em;height: 1.3em;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3464"><path d="M909.061224 684.930612c-5.22449 0-10.44898-2.089796-14.628571-6.269388l-291.526531-291.52653c-4.179592-4.179592-10.971429-4.179592-14.628571 0l-143.673469 143.673469c-9.926531 9.926531-22.987755 15.15102-37.093878 15.151021s-27.167347-5.22449-37.093877-15.151021l-39.183674-39.183673c-4.179592-4.179592-10.971429-4.179592-14.628571 0l-187.036735 187.036734c-8.359184 8.359184-21.420408 8.359184-29.779592 0-8.359184-8.359184-8.359184-21.420408 0-29.779591l187.036735-187.036735c20.37551-20.37551 53.289796-20.37551 73.665306 0l39.183673 39.183673c2.612245 2.612245 5.746939 3.134694 7.314286 3.134694s4.702041-0.522449 7.314286-3.134694l143.673469-143.673469c20.37551-20.37551 53.289796-20.37551 73.665306 0l291.526531 291.526531c8.359184 8.359184 8.359184 21.420408 0 29.779591-3.657143 4.179592-8.881633 6.269388-14.106123 6.269388zM846.367347 867.265306H177.632653c-45.97551 0-83.591837-37.616327-83.591837-83.591837V240.326531c0-45.97551 37.616327-83.591837 83.591837-83.591837h668.734694c45.97551 0 83.591837 37.616327 83.591837 83.591837v543.346938c0 45.97551-37.616327 83.591837-83.591837 83.591837zM177.632653 198.530612c-22.987755 0-41.795918 18.808163-41.795918 41.795919v543.346938c0 22.987755 18.808163 41.795918 41.795918 41.795919h668.734694c22.987755 0 41.795918-18.808163 41.795918-41.795919V240.326531c0-22.987755-18.808163-41.795918-41.795918-41.795919H177.632653zM261.22449 303.020408m-52.244898 0a52.244898 52.244898 0 1 0 104.489796 0 52.244898 52.244898 0 1 0-104.489796 0ZM644.179592 768h-365.714286c-11.493878 0-20.897959-9.404082-20.897959-20.897959s9.404082-20.897959 20.897959-20.897959h365.714286c11.493878 0 20.897959 9.404082 20.897959 20.897959s-9.404082 20.897959-20.897959 20.897959zM461.322449 670.82449h-182.857143c-11.493878 0-20.897959-9.404082-20.897959-20.897959s9.404082-20.897959 20.897959-20.89796h182.857143c11.493878 0 20.897959 9.404082 20.897959 20.89796s-9.404082 20.897959-20.897959 20.897959z" p-id="3465"></path></svg>`

function queryList(nodeData:NodeObj,cnt:number):string{
    let res:string=''
    for(let i =0;i<nodeData.children?.length;i++){
        // res+=queryList(nodeData.children[i])`
        res +=`<li class="sidebar-links">${queryList(nodeData.children[i],cnt+1)}</li>`
    }
    if(!nodeData?.children||!nodeData.children.length){
        return `<p class="sidebar-title" id="sidebar${nodeData.id}"><span class="arrow" ${nodeData.topic?'':'style="margin-bottom:5px;"'}"></span><span>${nodeData.topic?nodeData.topic:img}</span></p>`
    }else{
        return `<p class="sidebar-title" id="sidebar${nodeData.id}"><span class="arrow ${cnt<2?'down':'right'}" ${nodeData.topic?'':'style="margin-bottom:5px;"'}></span><span>${nodeData.topic?nodeData.topic:img}</span></p><ul class="sidebar-heading open ${cnt<2?'':'hidden'}">${res}</ul>`
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
