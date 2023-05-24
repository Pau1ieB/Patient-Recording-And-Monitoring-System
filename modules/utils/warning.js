export function Warning(message,...elems){
    for(let elem of elems)elem.value="";
    if(message.length>0)alert(message);
}