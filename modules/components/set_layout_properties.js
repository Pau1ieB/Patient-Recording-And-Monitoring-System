export default function SetLayoutProperties(args){
    let layout = {type:args.type};
    if(args.attr!=undefined)layout.attr=args.attr;
    if(args.classes!=undefined)layout.classes=args.classes;
    if(args.button!=undefined)layout.button=args.button;
    if(args.text!=undefined)layout.text=args.text;
    if(args.content!=undefined)layout.content=args.content;
    return layout;
}