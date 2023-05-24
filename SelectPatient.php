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
    if($_SESSION["logged_in"] != 2){
        header("location:index.php");
        die();
    }    
    
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $input = json_decode(file_get_contents('php://input'), true);
        if(!isset($input) || count($input)!=1){
            echo json_encode (array("ok"=>0,"message"=>"Select Patient error 2"));
            return;
        }
        $name = filter_var($input[0],FILTER_SANITIZE_STRING);
        $stmt = $dbConn->prepare("SELECT medicines FROM patients WHERE (ref,surgery) = (?,?) LIMIT 1");
        $stmt->bind_param("ss",$name,$_SESSION["surgery"]);
        $stmt->execute();            
        $stmt->bind_result($m);
        $medicines=-1;
        while($stmt->fetch()){$medicines=json_decode($m);}
        if($medicines==-1)echo json_encode (array("ok"=>0,"message"=>"Select Patient error 3"));
        else echo json_encode(array("ok"=>1,"data"=>$medicines));
    }
    else echo json_encode (array("ok"=>0,"message"=>"Select Patient error 1"));
    $therapy=$_SESSION["name"];
?>