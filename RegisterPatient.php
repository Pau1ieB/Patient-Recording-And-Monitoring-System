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
        header("location:Login.php");
        die();
    }
    
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $input = json_decode(file_get_contents('php://input'), true);
        if(!isset($input) || count($input)!=3){
            echo json_encode (array("ok"=>0,"message"=>"Login error 2"));
            return;
        }
        $input = filter_var_array($input,FILTER_SANITIZE_STRING);
        $medicines_str = json_encode($input[1]);
        $contact = (strlen($input[2])==0)?0:1;
/*        if($contact==1){
//            $message = json_encode(new array("action"=>""))
            $stmt = $dbConn->prepare("INSERT INTO notifications (message) VALUES (?)");
            $stmt->bind_param("s", $message);
            $finished = $stmt->execute();
            $stmt->close();
            
        }
 */
        $surgery = $_SESSION["surgery"];
        $ref;
        do{
            $ref = RandomStringGenerator(5);
            $stmt = $dbConn->prepare("INSERT INTO patients (ref,surgery,therapy,medicines,contact) VALUES (?,?,?,?,?)");
            $stmt->bind_param("ssssi", $ref,$surgery,$input[0],$medicines_str,$contact);
            $finished = $stmt->execute();
            $stmt->close();
        }while(!$finished);
        echo json_encode (array("ok"=>1,"message"=>"Patient Registration Code: ".$ref));
    }
    else echo json_encode (array("ok"=>0,"message"=>"Patient Register error 1"));
    
    function RandomStringGenerator($length){
        $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $text="";
        for($xx=0;$xx<$length;$xx++)$text.= $chars{rand(0,25)};
        return $text;
    }
    
?>