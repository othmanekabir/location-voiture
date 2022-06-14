<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once '../database.php';
    include_once '../services/Client.php';
    include_once '../services/ClientEntreprise.php';
    
    $database = new Database();
    $db = $database->getConnection();
    $items = new ClientEntreprise($db);
    $nomclientrequested = $_GET['nom'];
    $prenrequested = $_GET['pren'];
    $emailrequested = $_GET['email'];
    $adresserequested = $_GET['adresse'];
    $villerequested = $_GET['ville'];
    $cprequested = $_GET['cp'];
    $permisrequested = $_GET['permis'];
    $rsrequested = $_GET['rs'];
    $sarequested = $_GET['sa'];
    $sirenrequested = $_GET['siren'];

    $stmt = $items->addentreprise($nomclientrequested,  $prenrequested, $emailrequested, $adresserequested, $villerequested, $cprequested, $permisrequested, $rsrequested, $sarequested, $sirenrequested  );
    

    echo $stmt;
    
    
?>