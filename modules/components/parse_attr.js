export default function ParseAttr(obj){
    let elem=(obj.id==undefined)?{}:{id:obj.id};
    for (const [key, value] of Object.entries(obj)) {
        const split = key.split("_");
        if(split.length==2 && split[0]==="attr")elem[split[1]]=value;
    }
    return (elem.length==0)?undefined:elem;
}
