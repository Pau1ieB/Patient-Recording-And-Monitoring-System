import SetLayoutProperties from "./set_layout_properties.js";

export default function SetSelectOptions(obj){
    return obj.list.map((entry,index)=>SetLayoutProperties({type:"option",attr:{value:index-1},text:entry}));
}