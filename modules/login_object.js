import {BaseClass} from "./base_class.js";
import {login_layout} from "./data/login_layout.js";
import {FetchJson as Fetch} from "./utils/fetch_util.js";
//import {FetchText as Fetch} from "./utils/fetch_util.js";

export class Login extends BaseClass{
    constructor(){super("",login_layout);}
    
    Login(event){
        const patient=document.getElementById("patient");
        const prescriber=document.getElementById("prescriber");
        const surgery=document.getElementById("surgery");
        const password=document.getElementById("password");
        const pat_val=patient.value;
        const pre_val=prescriber.value;
        const sur_val=surgery.value;
        const pass_val=password.value;
        if(pat_val.length>0 && (pre_val.length>0 || sur_val.length>0 || pass_val.length>0))return this.Warning("You can only complete one section",patient,prescriber,surgery,password);
        if(pat_val.length==0 && (pre_val.length==0 || sur_val.length==0 || pass_val.length==0))return this.Warning("Please complete one section");
        const args = (pat_val.length>0)?{location:"PatientLogin.php",params:[pat_val]}:{location:"PrescriberLogin.php",params:[pre_val,sur_val,pass_val]};
//        Fetch(args).then((result)=>console.log(result));
        Fetch(args).then((result)=>(result.ok==1)?window.open(result.dest,"_self"):alert(result.message));
    }
    
    Clear(event){this.Warning("",document.getElementById("patient"),document.getElementById("prescriber"),document.getElementById("surgery"),document.getElementById("password"))};
}

