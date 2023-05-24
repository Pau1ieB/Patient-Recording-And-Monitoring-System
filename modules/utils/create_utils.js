export function CreateButton(data,...classes){
    const button={type:"div",attr:{id:data.id},classes:["button","mouse",...classes],button:data,content:[]}
    button.content.push({type:"div","classes":["button_image",data.icon]});
    button.content.push({"type":"div","classes":["display_inline","margin_left_half"],"text":data.text});
    return button;
}