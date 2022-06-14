<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once '../database.php';
    include_once '../services/optionlocaction.php';
    $database = new Database();
    $db = $database->getConnection();
    $items = new OptionLocation($db);
    $idlrequested = $_GET['idl'];
    $idorequested = $_GET['ido'];
    $stmt = $items->addoptionlocation(intval($idlrequested),  intval($idorequested) );
    $itemCount = $stmt->rowCount();

   // echo ($stmt);
    if($itemCount > 0){
        echo json_encode(
            array("message" => $stmt)
        );
    }
    
?>