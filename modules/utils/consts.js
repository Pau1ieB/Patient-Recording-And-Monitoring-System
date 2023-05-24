export const $={
    list_of_times:["06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","00:00","01:00","02:00","03:00","04:00","05:00"],
    open_div:"",
    ClearOpenDiv:function(){this.open_div=""},
    CountRows:function(num,max,count){return (num>max)?this.CountRows(num-max,max,++count):count;},
    Inflate:(num)=>(num<10)?"0"+num:num,
    AddDateSuffix:(num)=>(num==1 || num==21 || num==31)?num+"st":(num==2 || num==22)?num+"nd":(num==3 || num==23)?num+"rd":num+"th"
};