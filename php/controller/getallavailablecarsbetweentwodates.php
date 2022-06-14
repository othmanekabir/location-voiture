<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once '../database.php';
    include_once '../services/clientvoiturelocation.php';
    
    $database = new Database();
    $db = $database->getConnection();
    $items = new Clientvoiturelocation($db);
    $dated = $_GET['dated'];
    $datef = $_GET['datef'];
    $stmt = $items->getvoiturelocationsdisponible($dated, $datef);
    $itemCount = $stmt->rowCount();

    echo json_encode($itemCount);
    if($itemCount > 0){
        
        $userArr = array();
        $userArr["body"] = array();
        $userArr["itemCount"] = $itemCount;
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $e = array(
                'id' => $id,
                'marque' => $marque,
                'model' => $model,
                'couleur' => $couleur,
                'puissance' => $puissance,
                'carburant' => $carburant,
                'prix' => $prix
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