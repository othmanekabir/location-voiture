<?php
    class Client{
        // Connection
        protected  $conn;
        // Table
        protected  $db_table = "client";
      
        
        // Db connection
        public function __construct($db){
            $this->conn = $db;
        }
        // GET ALL
        public function getClients(){
            $sqlQuery = "SELECT * FROM " . $this->db_table . "";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

        public function getClientByEmail($email){
            $sqlQuery = "SELECT * FROM " . $this->db_table . " where email='".$email."'";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

        public function getClientnames(){
            $sqlQuery = "SELECT nom FROM " . $this->db_table . "";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

        public function getClientsByVille($ville){
            $sqlQuery = "SELECT nom, prenom FROM " . $this->db_table . " where ville = LOWER('".$ville."')"; 
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }
        
        public function addclient($nom,$prenom,$email, $adresse, $ville, $cp, $permis){
            $sqlQuery = " INSERT INTO " . $this->db_table . " (nom, prenom, email, adresse,ville, code_postale, permis_de_conduire) values ('".$nom."' , '".$prenom."' , '".$email."' , '".$adresse."', '".$ville."', '".$cp."' , '".$permis."')";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $this->conn->lastInsertId();

        }

        public function addentreprise($nom,$prenom,$email, $adresse, $ville, $cp, $permis, $siren, $raisonsocial, $secteuractivite) {;}
    }
?>