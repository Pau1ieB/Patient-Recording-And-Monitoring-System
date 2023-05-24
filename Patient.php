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
    $ref=$_SESSION["name"];
    $stmt = $dbConn->prepare("SELECT therapy,medicines FROM patients WHERE (ref) = (?) LIMIT 1");
    $stmt->bind_param("s",$ref);
    $stmt->execute();            
    $stmt->bind_result($t,$m);
    $therapy=-1;
    $medicines;
    while($stmt->fetch()){
        $therapy=$t;
        $medicines = $m;
    }
?>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <meta name="viewport" content="width=device-width,height=device-height, initial-scale=1, maximum-scale=1, user-scalable=0">
        <link href = "./css/index.css" rel="stylesheet"/>
        <link href = "./css/buttons.css" rel="stylesheet"/>
        <script type="module" src="./modules/patient.js"></script>
    </head>
    <body>
        <input id="name" type="hidden" value=<?php echo $ref; ?>>
        <input id="therapy_name" type="hidden" value=<?php echo $therapy; ?>>
        <input id="therapy_data" type="hidden" value='<?php echo $medicines; ?>'>
    </body>
</html>