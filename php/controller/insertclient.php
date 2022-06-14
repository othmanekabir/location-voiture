<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once '../database.php';
    include_once '../services/client.php';
    $database = new Database();
    $db = $database->getConnection();
    $items = new Client($db);
    $nomclientrequested = $_GET['nom'];
    $prenrequested = $_GET['pren'];
    $emailrequested = $_GET['email'];
    $adresserequested = $_GET['adresse'];
    $villerequested = $_GET['ville'];
    $cprequested = $_GET['cp'];
    $permisrequested = $_GET['permis'];

    $stmt = $items->addclient($nomclientrequested,  $prenrequested, $emailrequested, $adresserequested, $villerequested, $cprequested, $permisrequested );
    

    echo $stmt;
    
    
?>