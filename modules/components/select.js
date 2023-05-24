import SetLayoutProperties from "./set_layout_properties.js";
import ParseAttr from "./parse_attr.js";

export default function Select(obj){
    const attr = ParseAttr(obj);
    const classes = (obj.classes==undefined)?[]:obj.classes;
    return SetLayoutProperties({type:"select",attr:attr,classes:["width_full","height_2_5","font_inherit","background_white",...classes],content:obj.list.map((entry,index)=>SetLayoutProperties({type:"option",attr:{value:index-1},text:entry}))});
}