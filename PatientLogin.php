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
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $input = json_decode(file_get_contents('php://input'), true);
        if(!isset($input) || count($input)!=1)echo json_encode (array("ok"=>0,"message"=>"Login error 1"));
        $name=filter_var(trim($input[0]),FILTER_SANITIZE_STRING);
        if(empty($name))echo json_encode (array("ok"=>0,"message"=>"Login error 2"));
        if(strlen($name)!=5)echo json_encode (array("ok"=>0,"message"=>"Login error 3"));
        else{
            $stmt = $dbConn->prepare("SELECT id,surgery FROM patients WHERE (ref) = (?) LIMIT 1");
            $stmt->bind_param("s",$name);
            $exists=0;
            $stmt->execute();            
            $stmt->bind_result($i,$s);
            $id=-1;
            $surgery;
            while($stmt->fetch()){
                $id=$i;
                $surgery=$s;
            }
            if($id==-1)echo json_encode (array("ok"=>0,"message"=>"Login error 4"));
            else{
                $_SESSION["id"] = $id;
                $_SESSION["name"]=$name;
                $_SESSION["surgery"]=$surgery;
                $_SESSION["logged_in"] = 1;
                echo json_encode(array("ok"=>1,"dest"=>"Patient.php"));
            }
        }
    }
    else echo json_encode (array("ok"=>0,"message"=>"Login error 5"));
?>