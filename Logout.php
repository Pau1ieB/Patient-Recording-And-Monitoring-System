<?php
/*
THIS WORK (SOFTWARE CODE AND CONCEPTS) WAS DEVELOPED BY 
AND IS THE SOLE PROPERTY OF PRADEEP PAUL BALI (THE OWNER).
THIS WORK IS PROTECTED BY COPYRIGHT AND OTHER APPLICABLE LAW. 
ALL USE OF THE WORK EXCEPT WITH THE OWNER'S EXPLICIT CONSENT
IS STRICTLY PROHIBITED.
*/
    session_start();

    if(!isset($_SESSION["accepted"])){
        header("location:index.php");
        die();
    }
    if(!isset($_SESSION["logged_in"])){
        header("location:Login.php");
        die();
    }
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $input = json_decode(file_get_contents('php://input'), true);
        if(!isset($input) || count($input)!=1){
            echo json_encode (array("ok"=>0,"message"=>"Logout Error 2"));
            die();
        }
        if($input[0]!=="logout")echo json_encode (array("ok"=>0,"message"=>"Logout Error 3"));
        else{
            unset($_SESSION["logged_in"]);
            unset($_SESSION["id"]);
            unset($_SESSION["name"]);
            unset($_SESSION["surgery"]);
            echo json_encode(array("ok"=>1));
        }    
    }
    else echo json_encode(array("ok"=>0,"message"=>"Logout Error 1"));
?>