export default class CreateContent{
        
    static GenerateContent(obj,parent,data,clear){
        if(clear)while(parent.lastChild!=null) parent.removeChild(parent.lastChild);
        const buttons=[];
        this.ParseContent(parent,data,buttons);
        if(buttons.length>0)this.SetButtonEvents(obj,buttons);
    }
    
    static InsertContent(obj,parent,index,data){
        const buttons=[];
        let ref = this.Create(data,buttons);
        this.ParseContent(ref,data.content,buttons);
        parent.insertBefore(ref,parent.childNodes[index]);
        if(buttons.length>0)this.SetButtonEvents(obj,buttons);
    }
    
    static ParseContent(parent,data,buttons){
        for(let content of data){
            let elem = CreateContent.Create(content,buttons);
            parent.appendChild(elem);
            if(content.content!=undefined)this.ParseContent(elem,content.content,buttons);
        }
    }
    
    static Create(data,buttons){
        let elem = document.createElement(data.type);
        if(data.classes!=undefined)elem.classList.add(...data.classes);
        if(data.attr!=undefined)Object.entries(data.attr).forEach(([key, value]) => elem.setAttribute(key,value)); 
        if(data.text!=undefined)elem.textContent = data.text;
        if(data.button!=undefined)buttons.push(data.button);
        return elem;
    }
    
    static SetButtonEvents(obj,buttons){buttons.map(button=>document.getElementById(button.id).addEventListener("click",()=>obj[button.func].bind(obj)(button)));}
}