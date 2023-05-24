import TherapyClass from "./therapy_class.js";
import Div from "./components/div.js";
import Select from "./components/select.js";
import IconButton from "./components/icon_button.js";
import {NotificationLayout} from "./data/notification_layout.js"
import {$} from "./utils/consts.js";

export class NotificationClass extends TherapyClass{
    constructor(name,layouts,therapy){
        super(name,layouts,therapy);
        this.current_remove="";
    }

    OpenPatientNotification(){
        if(this.therapy.name.length==0)return alert("You need to select a therapy");
        const buttons = this.therapy.data.reduce((arr,button)=>(button.active && button.notifications)? arr.concat({id:button.id,icon:button.icon,text:button.text,func:"ShowHiddenDiv",value:button.id+"_list",list_of_notifications:button.list_of_notifications}):arr,[]);
        if(buttons.length==0)return alert("You have made no suitable selections");
        NotificationLayout.content[0].content = buttons.map(button=>
            Div({id:button.id+"_notification_div",content:[
                IconButton(button),
                Div({id:button.value,classes:["width_sub","margin_left","hidden"],content:[
                ...button.list_of_notifications.map(entry=>this.AddNotification(button,entry)),
                Select({id:button.id+"_select",classes:["margin_top_double"],list:["Please select a time",...$.list_of_times]}),
                IconButton({id:button.id+"_accept",icon:"image_check",text:"Accept",func:"SelectNotificationToAdd",button:button}),
                
            ]})
        ]}));        
        this.AddLayout(NotificationLayout);
    }
    
    AddNotification(button,entry){
        let id = button.id+"_"+entry.split(":")[0];
        return Div({id:id+"_div",content:[
            IconButton({id:id,icon:"image_clock",text:entry,func:"SelectNotificationToRemove",value:id+"_remove"}),
            IconButton({id:id+"_remove",icon:"image_sub",text:"Remove",classes:["hidden"],func:"RemoveNotification",value:id+"_div",entry:entry,list:button.list_of_notifications})
        ]})
    }
    
    SelectNotificationToAdd(args){
        const select = document.getElementById(args.button.id+"_select");
        if(parseInt(select.value)==-1)return alert("Please make a valid selection");
        const text = select.options[select.selectedIndex].text;
        if(args.button.list_of_notifications.filter((time)=>time===text)[0])return alert("This time has already been added");
        args.button.list_of_notifications.push(text);
        if(args.button.list_of_notifications.length>1)args.button.list_of_notifications.sort((a,b)=>parseInt(a.substr(0,2)) > parseInt(b.substr(0,2))?true:false);
        const notify = this.AddNotification(args.button,text);
        this.InsertElement(notify,document.getElementById(args.button.id+"_list"),args.button.list_of_notifications.findIndex((obj)=>obj===text));
    }

    SelectNotificationToRemove(args){
        if(this.current_remove.length>0)document.getElementById(this.current_remove).classList.toggle("hidden");
        this.current_remove=(this.current_remove==args.value)?"":args.value;
        if(this.current_remove.length>0)document.getElementById(this.current_remove).classList.toggle("hidden");
    }
    
    RemoveNotification(args){
        if(!confirm("Do you want to remove this notification?"))return;
        document.getElementById(args.value).remove();
        let index = args.list.findIndex((obj)=>obj===args.entry);
        args.list.splice(index,1);
        this.current_remove="";
    }
    
    ExitRegistration(){
        if(this.therapy.name.length>0 && !confirm('This will take you back to the Main Dashboard. If you are trying to register a patient all information will be lost. Press "OK" to continue')) return false;
        this.ExitToMainDashboard();
    };
}    