import {$} from "./consts.js";

export class DateClass{
    constructor(){
        this.months=[0,31,28,31,30,31,30,31,31,30,31,30,31];
    }
    
    InflateDate(data){
       let first = data[data.length-1].date.split("-");
        first[0]=parseInt(first[0]);
        first[1]=parseInt(first[1]);
        let date = new Date();
        let second = [parseInt($.Inflate(date.getMonth()+1)),parseInt($.Inflate(date.getDate()))];
        let list=[];
        while(first[1]!=second[1] || first[0]!=second[0]){
            first[1]++;
            if(first[1]>this.months[first[0]]){
                first[1]=1;
                first[0] = (first[0]==12)?1:first[0]+1;
            }
            list.push($.Inflate(first[0])+"-"+$.Inflate(first[1]));
        }
        return list;
    }
}
