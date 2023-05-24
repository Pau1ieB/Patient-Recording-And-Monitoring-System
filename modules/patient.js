import {Patient} from "./patient_object.js";

window.addEventListener("load", function(){
    new Patient(document.getElementById("name").value,document.getElementById("therapy_name").value,document.getElementById("therapy_data").value).SetupPatient();
});