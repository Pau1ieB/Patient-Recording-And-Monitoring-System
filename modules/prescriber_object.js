import {MonitoringClass} from "./monitoring_class.js";
import SetSelectOptions from "./components/set_select_options.js";
import IconButton from "./components/icon_button.js";
import {FetchJson as Fetch} from "./utils/fetch_util.js";
import {prescriber_layout} from "./data/prescriber_layout.js";
import {CreateButton} from "./utils/create_utils.js";
import {$} from "./utils/consts.js";

export class Prescriber extends MonitoringClass{
    constructor(name,list_of_therapies){
        super(name,2,prescriber_layout,{name:"",data:[]});
        this.list_of_therapies=list_of_therapies;
    }
    
    SetupPrescriber(){
        this.layouts.registration.content[1].content[0].content = SetSelectOptions({list:["Please select a therapy",...this.list_of_therapies.map(obj=>obj.name)]});
        this.layouts.monitoring.content[0].content = this.list_of_therapies.map(obj=>(IconButton({id:obj.type,icon:"image_user",text:obj.name,func:"OpenSelectPatientDashboard",therapy:obj.type})));
        this.OpenMainDashboard();
    }
        
    ExitToMainDashboard(){
        this.ResetTherapy();
        this.ResetPatient();
        this.OpenMainDashboard();
    }

    OpenPatientRegistration(){this.AddLayout(this.layouts.registration);}
    
    OpenTherapy(args){(this.therapy.name.length>0)?this.OpenTherapyWindow():this.ShowHiddenDiv({value:"select_therapy_div"});}

    OpenTherapyWindow(){
        this.AddLayout(this.layouts.therapy);
        for(let button of this.therapy.data) if(button.active)document.getElementById(button.id+"_check").classList.toggle("hidden");
    }
    
    SelectTherapy(args){
        const select = document.getElementById("select_therapy");
        const index = select.value;
        if(parseInt(index)==-1)return alert("Please make a valid selection");
        const value = select.options[select.selectedIndex].text;
        Fetch({location:"./modules/therapies/"+value+".json",params:[]}).then((result)=>{
            this.layouts.therapy.title=value;
            this.therapy.name=result.name;
            this.therapy.data=result.layout.map(data=>data.button);
            this.layouts.therapy.content[0].content=result.layout;
            this.OpenTherapyWindow();
        });
    }

    SelectTherapyMedicine(args){
        document.getElementById(args.id+"_check").classList.toggle("hidden");
        args.active=!args.active;
    }
        
    RegisterPatient(){
        if(this.therapy.name.length==0) return alert("You need to select a Therapy and Medicines");
        const medicines = this.therapy.data.flatMap(button=>(button.active)?button:[]);
        if(medicines.length==0) return alert("You need to select Medicines");
        if(!confirm('Please select "OK" to register this patient')) return;
        const date = new Date();
        for(let value of medicines){
            value.func="SelectMedicine";
            value.results=[{date:$.Inflate(date.getMonth()+1)+"-"+$.Inflate(date.getDate()),results:[]}];
        }
        Fetch({location:"RegisterPatient.php",params:[this.therapy.name,medicines,this.patient.contact]}).then(result=>{
            alert(result.message);
            if(result.ok)this.ExitToMainDashboard();
        });
    }
    
    SelectAWeek(args){this.ShowPatientResults(args);}
    
    BackFromResults(){this.OpenSelectedPatient({name:this.patient.name});}

    BackFromNotifications(){this.OpenPatientRegistration();}
    
    BackFromContact(args){this.OpenSelectedPatient({name:this.patient.name,therapy:this.therapy.name});}
}