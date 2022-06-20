import { NodeObj } from ".."

let cnt:number

function queryList(nodeData:NodeObj):string{
    cnt++
    let res:string=''
    if(cnt>2){
        
    }
    for(let i =0;i<nodeData.children?.length;i++){
        // res+=queryList(nodeData.children[i])`
        res +=`<li class="sidebar-links">${queryList(nodeData.children[i])}</li>`
    }
    if(!nodeData?.children||!nodeData.children.length){
        return `<p class="sidebar-title"><span>${nodeData.topic}</span></p>`
    }else{
        return `<ul class="sidebar-heading open"><p class="sidebar-title"><span>${nodeData.topic}</span> <span class="arrow down"></span></p>${res}</ul>`
    }
    
}

export default function(mind){
    cnt = 0
    const sidebar = document.createElement('sidebar')
    const nodeData=mind.nodeData
    sidebar.innerHTML = `
   ${queryList(nodeData)}
    `
    mind.container.append(sidebar)

}
