<?php
    class Voiture{
        // Connection
        private $conn;
        // Table
        private $db_table = "voiture";
       
        
        
        // Db connection
        public function __construct($db){
            $this->conn = $db;
        }
        // GET ALL
        public function getvoitures(){
            $sqlQuery = "SELECT * FROM " . $this->db_table . "";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

        public function getvoiture($id){
            $sqlQuery = "SELECT * FROM " . $this->db_table . " where id = ".$id;
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

        public function getvoiturebypuissance(){
            $sqlQuery = "SELECT * FROM " . $this->db_table . " where puissance > 200";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

       
        // CREATE
          }
?>