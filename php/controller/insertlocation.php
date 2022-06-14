<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once '../database.php';
    include_once '../services/clientvoiturelocation.php';
    $database = new Database();
    $db = $database->getConnection();
    $items = new Clientvoiturelocation($db);
    $idclientrequested = $_GET['idc'];
    $idvoiturerequested = $_GET['idv'];
    $datedrequested = $_GET['dated'];
    $datefrequested = $_GET['datef'];
    $stmt = $items->addlocation(intval($idclientrequested),  intval($idvoiturerequested), $datedrequested, $datefrequested );
    

    echo $stmt;
    
    
?>