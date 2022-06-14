<?php
    class Clientvoitureaccident{
        // Connection
        private $conn;
        // Table
        private $db_table = "client_voiture_accident";
  
        
        // Db connection
        public function __construct($db){
            $this->conn = $db;
        }
        // GET ALL
        public function getclientvoitureaccidents(){
            $sqlQuery = "SELECT * FROM " . $this->db_table . "";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

        public function addaccident($idclient,$idvoiture,$dateacc,$desc){
            $sqlQuery = " INSERT INTO " . $this->db_table . " (idclient, idvoiture, dateaccident, descrip) values (".intval($idclient)." , ".intval($idvoiture)." , '".$dateacc."' , '".$desc."')";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;

        }

        public function getaccidentsforstatistiques(){
            $sqlQuery = "SELECT count(*) cnt, concat(marque,'-',model) voiture FROM location_voiture.client_voiture_accident cva 
            inner join voiture v on v.id=cva.idvoiture 
            group by voiture";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

        // CREATE
          }
?>