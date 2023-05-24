import SetLayoutProperties from "./set_layout_properties.js";
import ParseAttr from "./parse_attr.js";

export default function Textfield(obj){
    const attr=ParseAttr(obj);
    const classes=(obj.classes==undefined)?[]:obj.classes;
    return SetLayoutProperties({type:"input",attr:attr,classes:["width_full","height_2_5","font_inherit","pad_h_half",...classes]});
}