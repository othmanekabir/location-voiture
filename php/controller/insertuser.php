<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once '../database.php';
    include_once '../services/user.php';
    $database = new Database();
    $db = $database->getConnection();
    $items = new User($db);
    $nom = $_GET['nom'];
    $prenom = $_GET['prenom'];
    $adresse = $_GET['adresse'];
    $ville = $_GET['ville'];
    $codepostal = $_GET['codepostal'];
    $email = $_GET['email'];
    $password = $_GET['password'];
    $stmt = $items->insertuser($nom, $prenom, $adresse, $ville, $codepostal, $email, $password);
    $itemCount = $stmt->rowCount();

   // echo ($stmt);
    if($itemCount > 0){
        echo json_encode(
            array("message" => $stmt)
        );
    }
    
?>