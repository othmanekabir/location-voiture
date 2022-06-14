<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once '../database.php';
    include_once '../services/clientvoiturelocation.php';
    $database = new Database();
    $db = $database->getConnection();
    $items = new Clientvoiturelocation($db);
    $idrequested = $_GET['id'];
    $stmt = $items->deleterenthistory($idrequested );
    $itemCount = $stmt->rowCount();
    
    echo json_encode($itemCount);
    if($itemCount > 0){
        echo json_encode(
            array("message" => "Updated...")
        );
    }
    
?>