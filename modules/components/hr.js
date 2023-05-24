import SetLayoutProperties from "./set_layout_properties.js";

export default function Hr(obj){
    const classes = (obj.classes==undefined)?[]:obj.classes;
    return SetLayoutProperties({type:"hr",classes:classes});
}