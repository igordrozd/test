export const sort = (list,usl) =>{
    
    try{
    if (usl==="start"){
        
        return (list.sort((date1, date2) => new Date(date1.start) - new Date(date2.start)))
    }

    if (usl==="update"){
        return (list.sort((date1, date2) => new Date(date1.updatedAt) - new Date(date2.updatedAt)))
    }

    if (usl==="create"){
        return (list.sort((date1, date2) => new Date(date1.createdAt) - new Date(date2.createdAt)))
    }

    if (usl==="id"){
        return (list.sort((date1, date2) => date1.id - date2.id))
    }

    if (usl==="color"){
        return (list.sort((date1, date2) => parseInt(date1.color.replace('#', ''),16) - parseInt(date2.color.replace('#', ''),16)))
    };
    if (usl==="title"){
        return list.sort((a, b) => a.title.localeCompare(b.title))
    }
    if (usl==="creator"){
        return list.sort((a, b) => a.creator.localeCompare(b.creator))
    }
    if (usl==="changer"){
        return list.sort((a, b) => a.changer.localeCompare(b.changer))
    }
    if (usl==="typetask"){
        return list.sort((a, b) => a.type.localeCompare(b.type))
    }
    }
    catch{return list}
    return list    
}
