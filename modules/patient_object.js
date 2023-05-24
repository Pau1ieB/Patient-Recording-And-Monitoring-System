import {ResultsClass} from "./results_class.js";
import {patient_layout} from "./data/patient_layout.js";
import Div from "./components/div.js";
import IconButton from "./components/icon_button.js";
import SetSelectOptions from "./components/set_select_options.js";
import {NewResultLayout} from"./data/new_result_layout.js";
import {FetchJson as Fetch} from "./utils/fetch_util.js";
import {IsANumber} from "./utils/is_a_number.js";
import {$} from "./utils/consts.js";
import {DateClass} from "./utils/date_util.js";

//NTUJF
export class Patient extends ResultsClass{
    constructor(name,therapy_name,therapy_data){super(name,1,patient_layout,{name:therapy_name,data:JSON.parse(therapy_data)});}
    
    SetupPatient(){
        this.layouts.main.content[0].content=this.therapy.data.map(data=>IconButton(data));
        let dates = new DateClass().InflateDate(this.therapy.data[0].results);
        if(dates.length>0)for(let value of this.therapy.data)for(let date of dates)value.results.push({date:date,results:[]});
        this.SetupResults();
        this.layouts.enter_results.content[1].content=SetSelectOptions({list:["Please Select a Time",...$.list_of_times]});
        this.message.sender=this.message.recipient=this.name;
        this.OpenMainDashboard();
    }
    
    SelectAWeek(args){this.SelectWeek(args);}
    
    ShowResults(args){
        this.layouts.enter_results.title=args.value.text;
        this.layouts.enter_results.subtitle=args.text;
        this.layouts.enter_results.content[0].content = args.value.results.results.map((result,index)=>{
            const id=result.time.split(":")[0];;
            return Div({id:id+"_result_div",classes:["display_flex","flex_col","width_full"],content:[
                IconButton({id:id,icon:"image_clock",text:result.time+": "+result.results,func:"ShowHiddenDiv",value:id+"_remove",classes:["margin_top"]}),
                IconButton({id:id+"_remove",ref:id+"_result_div",icon:"image_sub",text:"remove",func:"RemoveResult",remove:args.value.results.results[index],data:args.value.results.results,classes:["margin_top_half","width_sub","margin_left","hidden"]})
            ]})
        });
        this.layouts.enter_results.content[this.layouts.enter_results.content.length-3].button.value=args.value.results.results;
        this.layouts.enter_results.content[this.layouts.enter_results.content.length-3].button.value=args.value.results.results;
        this.AddLayout(this.layouts.enter_results);
    }
    
    AddSingleResult(args){
        const select = document.getElementById("select_time")
        if(parseInt(select.value)==-1)return alert("Please select a valid Time");
        const time = select.options[select.selectedIndex].text;
        if(args.value.filter((value)=>value.time===time)[0])return alert("This time has already been added");
        const input = document.getElementById("enter_result").value;
        if(input.length==0 || !IsANumber(input,true,false))return alert("Please enter a valid Result");
        const result = {time:time,results:input};
        args.value.push(result);
        if(args.value.length>1)args.value.sort((a,b)=>parseInt(a.time.substr(0,2)) > parseInt(b.time.substr(0,2))?true:false);
        let index = args.value.findIndex((obj)=>obj.time===time);
        const id = time.split(":")[0];
        const layout = Div({id:id+"_result_div",classes:[],content:[
            IconButton({id:id,icon:"image_clock",text:time+": "+input,func:"ShowHiddenDiv",value:id+"_remove"}),
            IconButton({id:id+"_remove",icon:"image_sub",text:"remove",ref:id+"_result_div",classes:["width_sub","margin_left","hidden"],func:"RemoveResult",remove:result,data:args.value})
        ]})
        this.InsertElement(layout,document.getElementById("results"),index);
        document.getElementById("select_time").value="-1";
        document.getElementById("enter_result").value="";
    }
    
    RemoveResult(args){
        if(!confirm("Are you sure you want to delete this entry?"))return;
        args.data.splice(args.data.findIndex((obj)=>obj.time===args.remove.time),1);
        document.getElementById(args.ref).remove();
        this.ResetHiddenDiv();        
    }
    
    UpdateResults(){Fetch({location:"./PatientUpdateResults.php",params:[this.therapy.data]}).then((result)=>alert(result.message));}
    
    BackFromResults(){this.OpenMainDashboard();}
    
    BackFromNotifications(){this.OpenMainDashboard();}
    
    BackFromContact(){this.OpenMainDashboard();}
}