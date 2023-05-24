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
            echo json_encode (array("ok"=>0,"message"=>"Fetch Patient List error 2"));
            return;
        }
        $therapy = filter_var($input[0],FILTER_SANITIZE_STRING);
        $stmt = $dbConn->prepare("SELECT ref FROM patients WHERE (therapy,surgery) = (?,?)");
        $stmt->bind_param("ss",$therapy,$_SESSION["surgery"]);
        $stmt->execute();            
        $stmt->bind_result($n);
        $list=array();
        while($stmt->fetch()){array_push($list,$n);}
        if(count($list)==0)echo json_encode (array("ok"=>0,"message"=>"There are no current ".$therapy." patients"));
        else echo json_encode (array("ok"=>1,"data"=>$list));
    }
    else echo json_encode (array("ok"=>0,"message"=>"Fetch Patient List error 1"));
    $therapy=$_SESSION["name"];
?>