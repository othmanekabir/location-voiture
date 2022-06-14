<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once '../database.php';
    include_once '../services/clientvoitureaccident.php';
    $database = new Database();
    $db = $database->getConnection();
    $items = new Clientvoitureaccident($db);
    $idclientrequested = $_GET['idc'];
    $idvoiturerequested = $_GET['idv'];
    $dateaccidentrequested = $_GET['datea'];
    $descriprequested = $_GET['desc'];
    $stmt = $items->addaccident(intval($idclientrequested),  intval($idvoiturerequested), $dateaccidentrequested, $descriprequested );
    $itemCount = $stmt->rowCount();

   // echo ($stmt);
    if($itemCount > 0){
        echo json_encode(
            array("message" => $stmt)
        );
    }
    
?>