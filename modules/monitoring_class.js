import {ResultsClass} from "./results_class.js";
import Div from "./components/div.js";
import IconButton from "./components/icon_button.js";
import {FetchJson as Fetch} from "./utils/fetch_util.js";
import CreateContent from "./create_content.js";
import {CreateButton} from "./utils/create_utils.js";

export class MonitoringClass extends ResultsClass{
    constructor(name,type,layouts,therapy){
        super(name,type,layouts,therapy);
        this.patient={name:"",list:[]};
    }
    
    OpenPatientMonitoring(){this.AddLayout(this.layouts.monitoring);}
    
    OpenSelectPatientDashboard(args){
        if(this.therapy.name.length==0 || this.therapy.name!==args.therapy){
           Fetch({location:"./FetchPatientList.php",params:[args.therapy]}).then(result=>{
                if(result.ok){
                    this.SetTherapyName(args.therapy);
                    this.patient.list=result.data;
                    this.layouts.monitoring_patient_select.title=args.therapy;
                    this.layouts.monitoring_patient_select.content[0].content=result.data.map(id=>IconButton({id:id,icon:"image_user",text:id,func:"OpenSelectedPatient",name:id}));
                    this.AddLayout(this.layouts.monitoring_patient_select);
                }    
            });
        }
        else this.AddLayout(this.layouts.monitoring_patient_select);
    }
    
    OpenSelectedPatient(args){
        if(this.patient.name!==args.name){
            Fetch({location:"./SelectPatient.php",params:[args.name]}).then(result=>{
                if(result.ok){
                    this.patient.name=this.message.recipient=args.name;
                    this.SetTherapyData(result.data);
                    this.layouts.selected_patient.title=args.name;
                    this.SetupResults();
                    this.SetUpSelectedPatient();
                }
                else alert(result.message);
            });
        }
        else this.SetUpSelectedPatient();
    }
    
    SetUpSelectedPatient(){
        this.layouts.selected_patient.content[0].content=this.therapy.data.map((value,key)=>IconButton({id:value.id,icon:value.icon,text:value.text,func:"SelectMonitoredMedicine",results:this.therapy.data[key]}));
        this.layouts.selected_patient.content[2].button.name=this.patient.name;
        this.layouts.selected_patient.content[3].button.name=this.patient.name;
        this.layouts.selected_patient.content[5].button.therapy=this.therapy.name;
        this.AddLayout(this.layouts.selected_patient);
    }
    
    SelectMonitoredMedicine(args){this.SelectMedicine(args);}
    
    ShowPatientResults(args){
        this.layouts.selected_medicine.title=args.value.text;
        this.layouts.selected_medicine.subtitle="Week: "+args.week;
        let end=args.week*7
        let start = end-7;
        end = (end<args.value.results.results.length)?end:args.value.results.results.length;
        this.layouts.selected_medicine.content[0].content=[...args.value.results.results.map(entry=>{
            const date = entry.date.split("-")
            return [
                Div({classes:["text_align_centre","pad_v_half","background_orange"],text:date[1]+"-"+date[0]}),
                ...entry.results.map(data=>
                    Div({classes:["results_grid"],content:[
                        Div({classes:["results_icon","button_image","image_chart"]}),
                        Div({classes:["results_time","display_inline","margin_left_half","place_self"],text:data.time}),
                        Div({classes:["results_data","display_inline","margin_left_half","place_self"],text:data.results})
                    ]})
                ).flat()
            ]
        }).flat()];
        this.AddLayout(this.layouts.selected_medicine);
    }
    
    ResetPatient(){
        this.patient.name="";
        this.patient.list=[];
        this.ResetResults();
    }
}