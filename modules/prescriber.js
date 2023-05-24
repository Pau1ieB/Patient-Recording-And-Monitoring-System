import {Prescriber} from "./prescriber_object.js";

window.addEventListener("load", function(){
    new Prescriber(document.getElementById("prescriber").value,JSON.parse(document.getElementById("therapies").value)).SetupPrescriber();
});