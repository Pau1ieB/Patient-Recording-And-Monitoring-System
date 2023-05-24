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
    $stmt = $dbConn->prepare("SELECT id,name,type FROM therapies");
    $stmt->execute();            
    $stmt->bind_result($i,$n,$t);
    $therapies=array();
    while($stmt->fetch()){
        array_push($therapies,(object)["id"=>$i,"name"=>$n,"type"=>$t]);
    }
    $therapies= json_encode($therapies);
?>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <meta name="viewport" content="width=device-width,height=device-height, initial-scale=1, maximum-scale=1, user-scalable=0">
        <link href = "./css/index.css" rel="stylesheet"/>
        <link href = "./css/buttons.css" rel="stylesheet"/>
        <script type="module" src="./modules/prescriber.js"></script>
    </head>
    <body>
       <input id="prescriber" type="hidden" value=<?php echo $_SESSION["name"]; ?>>
       <input id="therapies" type="hidden" value='<?php echo $therapies; ?>'>
    </body>
</html>