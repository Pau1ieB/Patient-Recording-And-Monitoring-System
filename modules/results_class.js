import {ContactClass} from "./contact_class.js";
import {results_layout} from "./data/results_layout.js";
import IconButton from "./components/icon_button.js";

export class ResultsClass extends ContactClass{
    constructor(name,type,layouts,therapy){super(name,type,layouts,therapy);}
    
    SetupResults(){
        const weeks = this.NumberOfWeeks(this.therapy.data[0].results.map(results=>results.date));
        let count=1;
        this.ResetResults()
        while(count<=weeks)results_layout.select_week.content[0].content.push(IconButton({id:"week_"+count,icon:"image_calender",text:"Week "+count,week:count++,func:"SelectAWeek",value:""}));
    }
    
    SelectMedicine(args){
        results_layout.select_week.title=args.text;
        results_layout.select_week.content[0].content.map(obj=>{
            obj.button.value={text:args.text,results:args.results};
            return obj;
        });
        this.SelectWeekLayout();
    }
    
    SelectWeekLayout(){this.AddLayout(results_layout.select_week);}
    
    SelectWeek(args){
        results_layout.select_day.title=args.value.text;
        let end = args.week*7;
        let start = end-7;
        end=(end<args.value.results.length)?end:args.value.results.length;
        results_layout.select_day.content[0].content=[];
        while(end>start){
            const date = args.value.results[start].date.split("-");
            results_layout.select_day.content[0].content.push(IconButton({id:args.value.results[start].date,text:date[1]+"-"+date[0],icon:"image_calender",func:"ShowResults",value:{text:args.value.text,results:args.value.results[start++]},classes:["margin_top"]}));
        };
        this.SelectDayLayout();
    }
    
    SelectDayLayout(){this.AddLayout(results_layout.select_day);}
    
    ResetResults(){results_layout.select_week.content[0].content=[];}
}