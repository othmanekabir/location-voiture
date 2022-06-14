<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once '../database.php';
    include_once '../services/codepromo.php';

    $database = new Database();
    $db = $database->getConnection();
    $items = new Codepromo($db);
    $codepromorequested = $_GET['codepromo'];
    $stmt = $items->getcodepromosbyid($codepromorequested);
    $itemCount = $stmt->rowCount();

    echo json_encode($itemCount);
    if($itemCount > 0){
        
        $userArr = array();
        $userArr["body"] = array();
        $userArr["itemCount"] = $itemCount;
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $e = array(
                "id" => $id,
                "valeur" => $valeur,
                "date_debut" => $date_debut,
                "date_fin" => $date_fin,

            );
            array_push($userArr["body"], $e);
        }
        echo json_encode($userArr);
    }
    else{
        http_response_code(404);
        echo json_encode(
            array("message" => "No record found.")
        );
    }
?>