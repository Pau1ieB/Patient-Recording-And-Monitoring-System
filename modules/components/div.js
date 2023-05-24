import SetLayoutProperties from "./set_layout_properties.js";
import ParseAttr from "./parse_attr.js";

export default function Div(obj){
    const attr = ParseAttr(obj);
    return SetLayoutProperties({type:"div",attr:attr,...obj},);
}
    