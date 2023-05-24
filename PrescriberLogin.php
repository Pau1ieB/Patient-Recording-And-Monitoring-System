<?php
/*
THIS WORK (SOFTWARE CODE AND CONCEPTS) WAS DEVELOPED BY 
AND IS THE SOLE PROPERTY OF PRADEEP PAUL BALI (THE OWNER).
THIS WORK IS PROTECTED BY COPYRIGHT AND OTHER APPLICABLE LAW. 
ALL USE OF THE WORK EXCEPT WITH THE OWNER'S EXPLICIT CONSENT
IS STRICTLY PROHIBITED.
*/
    session_start();
    require "Config.php";
    if(!isset($_SESSION["accepted"])){
        header("location:index.php");
        die();
    }
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $input = json_decode(file_get_contents('php://input'), true);
        if(!isset($input) || count($input)!=3){
            echo json_encode (array("ok"=>0,"message"=>"Login error 1"));
            return;
        }
        $name=trim($input[0]);
        $surgery=trim($input[1]);
        $pass=trim($input[2]);
        if(empty($name) || empty($pass))echo json_encode (array("ok"=>0,"message"=>"Login error 2"));
        else{
            $stmt = $dbConn->prepare("SELECT id,password FROM prescribers WHERE (name) = (?) and (surgery) = (?) LIMIT 1");
            $stmt->bind_param("ss",$name,$surgery);
            $stmt->execute();            
            $stmt->bind_result($i,$p);
            $id=-1;
            $pass_check;
            while($stmt->fetch()){
                $id=$i;
                $pass_check=$p;
            }
            if($id==-1)echo json_encode (array("ok"=>0,"message"=>"Login error 3"));
            else{
                if($pass_check!==$pass)echo json_encode (array("ok"=>0,"message"=>"Login error 4"));
                else{
                    $_SESSION["id"] = $id;
                    $_SESSION["name"] = $name;
                    $_SESSION["surgery"] = $surgery;
                    $_SESSION["logged_in"] = 2;
                    echo json_encode (array("ok"=>1,"dest"=>"Prescriber.php"));
                }
            }
        }
    }
    else echo json_encode (array("ok"=>0,"message"=>"Login error 5"));
?>