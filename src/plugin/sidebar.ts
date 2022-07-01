import { NodeObj } from ".."

function queryList(nodeData:NodeObj,cnt:number):string{
    let res:string=''
    for(let i =0;i<nodeData.children?.length;i++){
        // res+=queryList(nodeData.children[i])`
        res +=`<li class="sidebar-links">${queryList(nodeData.children[i],cnt+1)}</li>`
    }
    if(!nodeData?.children||!nodeData.children.length){
        return `<p class="sidebar-title"><span>${nodeData.topic}</span></p>`
    }else{
        return `<ul class="sidebar-heading open"><p class="sidebar-title"><span>${nodeData.topic}</span> <span class="arrow ${cnt<2?'down':'right'}"></span></p>${res}</ul>`
    }
    
}

export default function(mind){
    const sidebar = document.createElement('sidebar')
    const nodeData=mind.nodeData
    sidebar.innerHTML = `${queryList(nodeData,0)}`
    mind.container.append(sidebar)
}
