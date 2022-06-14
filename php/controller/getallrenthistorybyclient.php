<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once '../database.php';
    include_once '../services/clientvoiturelocation.php';
    $database = new Database();
    $db = $database->getConnection();
    $items = new Clientvoiturelocation($db);
    $idrequested = $_GET['name'];
    $stmt = $items->getrenthistorybyclient($idrequested);
    $itemCount = $stmt->rowCount();

    echo json_encode($itemCount);
    if($itemCount > 0){
        //matricule, nom, datedebutlocation, datefinlocation
        $userArr = array();
        $userArr["body"] = array();
        $userArr["itemCount"] = $itemCount;
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $e = array(
                "id" => $id,
                "idclient" => $idclient,
                "idvoiture" => $idvoiture,
                "marque" => $marque,
                "nom" => $nom,
                "model" => $model,
                "datedebutlocation" => $datedebutlocation,
                "datefinlocation" => $datefinlocation,
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