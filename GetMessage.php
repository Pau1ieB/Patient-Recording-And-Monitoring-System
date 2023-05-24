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
    if($_SESSION["logged_in"] < 1 || $_SESSION["logged_in"] > 2){
        header("location:Login.php");
        die();
    }    
    
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $input = json_decode(file_get_contents('php://input'), true);
        if(!isset($input) || count($input)!=1){
            echo json_encode (array("ok"=>0,"message"=>"Get Message error 2"));
            die();
        }
        $name = filter_var($input[0],FILTER_SANITIZE_STRING);
        $stmt = $dbConn->prepare("SELECT surgery,messages FROM patients WHERE (ref) = (?) LIMIT 1");
        $stmt->bind_param("s",$name);
        $stmt->execute();            
        $stmt->bind_result($s,$m);
        $surgery="fail";
        $message_list;
        while($stmt->fetch()){
            $surgery=$s;
            if($m==="")$message_list="fail";
            else $message_list=json_decode($m);
        }
        if($message_list==="fail"){
            echo json_encode (array("ok"=>2));
            die();
        }
        if($surgery!==$_SESSION["surgery"]){
            echo json_encode (array("ok"=>0,"message"=>"Get Message error 3"));
            die();
        }
        else echo json_encode(array("ok"=>1,"data"=>$message_list));
    }
    else echo json_encode (array("ok"=>0,"message"=>"Get Message error 1"));
?>