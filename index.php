<?php
/*
THIS WORK (SOFTWARE CODE AND CONCEPTS) WAS DEVELOPED BY 
AND IS THE SOLE PROPERTY OF PRADEEP PAUL BALI (THE OWNER).
THIS WORK IS PROTECTED BY COPYRIGHT AND OTHER APPLICABLE LAW. 
ALL USE OF THE WORK EXCEPT WITH THE OWNER'S EXPLICIT CONSENT
IS STRICTLY PROHIBITED.
*/
    session_start();
    
    if(isset($_SESSION["accepted"])){
        if($_SESSION["logged_in"]==1) header("location:Patient.php");
        else if($_SESSION["logged_in"]==2) header("location:Prescriber.php");
        else header("location:Login.php");
    }
?>

<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <meta name="viewport" content="width=device-width,height=device-height, initial-scale=1, maximum-scale=1, user-scalable=0">
        <link href = "./css/index.css" rel="stylesheet"/>
        <link href = "./css/buttons.css" rel="stylesheet"/>
    </head>
    <body>
        <div class="width_main display_flex flex_col">
            <h3 class="text_align_centre margin_top">
                THIS WORK (SOFTWARE CODE AND CONCEPTS) WAS DEVELOPED BY 
                AND IS THE SOLE PROPERTY OF PRADEEP PAUL BALI (THE OWNER).
                THIS WORK IS PROTECTED BY COPYRIGHT AND OTHER APPLICABLE LAW. 
                ALL USE OF THE WORK EXCEPT WITH THE OWNER'S EXPLICIT CONSENT
                IS STRICTLY PROHIBITED.
            </h3>
            <div id="accept" class="button margin_top mouse">
                <div class="button_image image_check"></div>
                <div class="display_inline margin_left_half">Accept</div>
            </div>
        </div>
        <script type="module" src="./modules/accept.js"></script>
    </body>
</html>