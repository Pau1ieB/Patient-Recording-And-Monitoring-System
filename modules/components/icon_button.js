import SetLayoutProperties from "./set_layout_properties.js";
import ParseAttr from "./parse_attr.js";

export default function IconButton(obj){
    const attr = ParseAttr(obj);
    const classes = (obj.classes!=undefined)?obj.classes:[];
    return SetLayoutProperties({type:"div",attr:attr,classes:["button","margin_top","mouse",...classes],button:obj,content:[
        SetLayoutProperties({type:"div",classes:["button_image",obj.icon]}),
        SetLayoutProperties({type:"div",classes:["display_inline","margin_left_half"],text:obj.text})
    ]});
}