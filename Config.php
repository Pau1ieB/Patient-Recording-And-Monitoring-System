<?php
    $dbUser = "";
    $dbPass = "";
    $dbDatabase = "";
    $dbHost = "";
    $dbConn = new mysqli($dbHost, $dbUser, $dbPass, $dbDatabase);
    
    mysqli_set_charset($dbConn, "utf-8");  
    if($dbConn->connect_error){
        die("database connection error: (".$dbConn->errno.")".$dbConn->error);
    }
?>

