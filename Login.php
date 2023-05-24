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
    if(isset($_SESSION["logged_in"])){
        if($_SESSION["logged_in"] == 1) header("location:patient.php");
        if($_SESSION["logged_in"] == 2) header("location:prescriber.php");
        die();
    }
?>

<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <meta name="viewport" content="width=device-width,height=device-height, initial-scale=1, maximum-scale=1, user-scalable=0">
        <link href = "./css/index.css" rel="stylesheet"/>
        <link href = "./css/buttons.css" rel="stylesheet"/>
        <script type="module" src="./modules/login.js"></script>
    </head>
    <body>
    </body>
</html>