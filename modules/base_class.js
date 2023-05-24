import CreateContent from "./create_content.js";
import {dashboard} from "./data/dashboard.js";
import {Warning} from "./utils/warning.js";
import {FetchJson as Fetch} from "./utils/fetch_util.js";
import {FetchText} from "./utils/fetch_util.js";
import {$} from "./utils/consts.js";

export class BaseClass{
    constructor(name,layouts){
        this.name=name;
        this.layouts=layouts;
    }
    
    OpenMainDashboard(){this.AddLayout(this.layouts.main)}
    
    AddLayout(layout){
        dashboard.layout[0].content[4].content=layout.content;
        dashboard.layout[0].content[1].text=layout.title;
        if(layout.subtitle.length>0)dashboard.layout[0].content[2].text=layout.subtitle;
//        dashboard.buttons=[...layout.buttons,...layout.perm_buttons];
        CreateContent.GenerateContent(this,document.body,dashboard.layout,true);
//        CreateContent.SetButtonEvents(this,dashboard.buttons);
        if(layout.subtitle.length==0) document.getElementById("subtitle").classList.add("opacity_0");
        else if(layout.subtitle==="hide")document.getElementById("subtitle").classList.add("hidden");
        $.ClearOpenDiv();
    }
    
    AddTimeSelectOptions(layout){this.AddSelectOptions(layout,$.list_of_times,"Please Select a Time");}
    
    AddSelectOptions(layout,list,title){
        layout.content=[{type:"option",attr:{value:"fake"},text:title}];
        list.map((l)=>layout.content.push({type:"option",attr:{value:l},text:l}));
    }
    
    NumberOfWeeks(dates){
        const num=$.CountRows(dates.length,7,1);
        return (num<5)?num:4;
    }
    
    ShowHiddenDiv(args){
        if($.open_div.length>0)document.getElementById($.open_div).classList.toggle("hidden");
        if(args.value===$.open_div){
            $.open_div="";
            return;
        }
        let elem = document.getElementById(args.value);
        elem.classList.toggle("hidden");
        $.open_div = args.value;        
    }
    
    ResetHiddenDiv(){$.open_div="";}
    
    InsertElement(layout,parent,index){CreateContent.InsertContent(this,parent,index,layout);}
    
    AddButtonEvents(button){CreateContent.SetButtonEvents(this,[button]);}
    
    Warning(message,...ref){Warning(message,...ref)}
    
    Logout(){
        if(!confirm("Are you sure you want to Log Out?")) return;
        Fetch({location:"Logout.php",params:["logout"]}).then((result)=>(result.ok==1)?window.open("index.php","_self"):alert(result.message));
    }
}