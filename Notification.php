<?php
/*
THIS WORK (SOFTWARE CODE AND CONCEPTS) WAS DEVELOPED BY 
AND IS THE SOLE PROPERTY OF PRADEEP PAUL BALI (THE OWNER).
THIS WORK IS PROTECTED BY COPYRIGHT AND OTHER APPLICABLE LAW. 
ALL USE OF THE WORK EXCEPT WITH THE OWNER'S EXPLICIT CONSENT
IS STRICTLY PROHIBITED.
*/
    echo "moody";
    die();
    require("Config.php");
    
    if(!isset($_SESSION["accepted"])){
        header("location:index.php");
        die();
    }    
    if($_SESSION["logged_in"] != 2){
        header("location:Login.php");
        die();
    }
    
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $input = json_decode(file_get_contents('php://input'), true);
        print_r($input);
    }
?>