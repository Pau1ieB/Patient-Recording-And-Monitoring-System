import {NotificationClass} from "./notification_class.js";
import {ContactLayout} from "./data/contact_layout.js";
import Div from"./components/div.js";
import Hr from"./components/hr.js";
import {FetchJson as Fetch} from "./utils/fetch_util.js";
import CreateContent from "./create_content.js";
import {$} from "./utils/consts.js";

export class ContactClass extends NotificationClass{
    constructor(name,type,layouts,therapy){
        super(name,layouts,therapy);
        this.message = {sender:name,recipient:"",type:type,count:0,cancel:-1};
    }
    
    OpenContactDashboard(args){
        ContactLayout.title=args.name;
        this.AddLayout(ContactLayout);
        this.message.count=0;
        this.GetMessage();
        this.message.cancel = setInterval(()=>this.GetMessage(),10000);
    }
    
    SendMessage(){
        const value = document.getElementById("input").value;
        if(value.length==0)return alert("There is nothing to send");
        const date = new Date();
        const d = date.toDateString().split(" ");
        const mess={value:value,sender:this.message.sender,recipient:this.message.recipient,type:this.message.type,date:$.Inflate(date.getHours())+":"+$.Inflate(date.getMinutes())+" "+d[0]+" "+d[1]+" "+$.AddDateSuffix(parseInt(d[2]))};
        Fetch({location:"SendMessage.php",params:[mess]}).then((result)=>{
            alert(result.message);
            if(result.ok==1){
                this.SetMessage(result.data);
                document.getElementById("input").value="";
            }
        });
    }
    
    GetMessage(){
        Fetch({location:"GetMessage.php",params:[this.message.recipient]}).then((result)=>{
            if(result.ok==1)this.SetMessage(result.data);
            else if(result.ok==0)alert(result.message);
        });
    }
    
    SetMessage(data){
        let content=[];
        for(let d of data.reverse()){
            if(message.count==d.count)break;
            const c = (this.message.type==d.type)?["text_align_left","blue"]:["text_align_right"];
            content.push(
                Div({classes:["margin_top_half",...c],text:d.value}),
                Div({classes:["margin_top_half",...c],text:d.sender}),
                Div({classes:["margin_top_quarter",...c],text:"On: "+d.date}),
                Hr({classes:["margin_top"]})
            );
        }
        CreateContent.GenerateContent(this,document.getElementById("message"),content,true);
    }
    
    ExitMessage(){
        clearInterval(this.message.cancel);
        this.message.cancel=-1;
        this.BackFromContact();
    }
}
