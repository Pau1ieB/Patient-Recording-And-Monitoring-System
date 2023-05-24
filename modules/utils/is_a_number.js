export function IsANumber(value,is_int,neg){
    if(typeof value!=="string") return false;
    value.trim();
    if(value.length==0)return false;
    if(value.charCodeAt(0)==45){
        if(neg)value=value.substring(1,value.length);
        else return false;
    }    
    let dot=0;
    for(let xx=0; xx<value.length; xx++){
        let c = value.charCodeAt(xx);
        if(c==46) {if(is_int || ++dot==2)return false;}
        else if(c<48 || c>57) return false;
    }
    return true;
}