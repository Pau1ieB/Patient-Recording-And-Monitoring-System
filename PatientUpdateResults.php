<?php
/*
THIS WORK (SOFTWARE CODE AND CONCEPTS) WAS DEVELOPED BY 
AND IS THE SOLE PROPERTY OF PRADEEP PAUL BALI (THE OWNER).
THIS WORK IS PROTECTED BY COPYRIGHT AND OTHER APPLICABLE LAW. 
ALL USE OF THE WORK EXCEPT WITH THE OWNER'S EXPLICIT CONSENT
IS STRICTLY PROHIBITED.
*/
    session_start();
    require("Config.php");
    
    if(!isset($_SESSION["accepted"])){
        header("location:index.php");
        die();
    }    
    if($_SESSION["logged_in"] != 1){
        header("location:Login.php");
        die();
    }
    
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $input = json_decode(file_get_contents('php://input'), true);
        if(!isset($input) || count($input)!=1)echo json_encode (array("ok"=>0,"message"=>"Patient Update Results error 2"));
        $results = json_encode(filter_var_array($input[0],FILTER_SANITIZE_STRING));
        $stmt = $dbConn->prepare("UPDATE patients SET medicines = ? WHERE ref = ?");
            $stmt->bind_param('ss',$results,$_SESSION["name"]);
            $finished = $stmt->execute(); 
            $stmt->close();
            if($finished==1)echo json_encode(array("ok"=>1,"message"=>"Patient Results Updated"));
            else echo json_encode(array("ok"=>0,"message"=>"Patient Update Results error 3"));

        }
    else echo json_encode (array("ok"=>0,"message"=>"Patient Update Results error 1"));
?>