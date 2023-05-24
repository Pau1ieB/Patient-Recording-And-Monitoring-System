<?php
/*
THIS WORK (SOFTWARE CODE AND CONCEPTS) WAS DEVELOPED BY 
AND IS THE SOLE PROPERTY OF PRADEEP PAUL BALI (THE OWNER).
THIS WORK IS PROTECTED BY COPYRIGHT AND OTHER APPLICABLE LAW. 
ALL USE OF THE WORK EXCEPT WITH THE OWNER'S EXPLICIT CONSENT
IS STRICTLY PROHIBITED.
*/
    session_start();
    
    if(isset($_SESSION["accepted"])){
        if($_SESSION["logged_in"]==1) header("location:Patient.php");
        else if($_SESSION["logged_in"]==2) header("location:Prescriber.php");
        else header("location:Login.php");
    }
    else if($_SERVER["REQUEST_METHOD"] != "POST" && !isset($_SESSION["accepted"]))header("location:index.php");
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $input = json_decode(file_get_contents('php://input'), true);
        if(!isset($input) || count($input)!=1) echo json_encode (array("ok"=>0,"message"=>"Accept error 2"));
        if($input[0]==="conditions accepted"){
            $_SESSION["accepted"]=1;
            echo json_encode (array("ok"=>1));
        }    
        else echo json_encode (array("ok"=>0,"message"=>"Accept error 3"));
    }
    else echo json_encode (array("ok"=>0,"message"=>"Accept error 1"));
?>
