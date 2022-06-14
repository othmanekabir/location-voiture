<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once '../database.php';
    include_once '../services/clientvoiturelocation.php';
    $database = new Database();
    $db = $database->getConnection();
    $items = new Clientvoiturelocation($db);
    $idrequested = $_GET['id'];
    $firstdaterequested = $_GET['dated'];
    $lastdaterequested = $_GET['datef'];
    $stmt = $items->updaterenthistory($idrequested,  $firstdaterequested, $lastdaterequested );
    if(empty($stmt)){
        echo "Error";
    }else{
        echo json_encode(
            array("message" => "Updated...")
        );
    }
    
    
?>