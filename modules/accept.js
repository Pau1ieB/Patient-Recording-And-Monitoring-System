import {FetchJson as Fetch} from "./utils/fetch_util.js";
import {FetchText} from "./utils/fetch_util.js";

window.addEventListener("load", function(){
    document.getElementById("accept").addEventListener("click",()=>{
        if(!confirm('By clicking "OK" you are confirming you have read and accepted the text above')) return;
        FetchText({location:"./Accept.php",params:["conditions accepted"]}).then((result)=>{
            window.open("Login.php","_self")
        });
    });
});