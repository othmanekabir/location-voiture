<?php
    class OptionLocation{
        // Connection
        private $conn;
        // Table
        private $db_table = "location_options";
     
        
        // Db connection
        public function __construct($db){
            $this->conn = $db;
        }
        // GET ALL
        public function getoptions(){
            $sqlQuery = "SELECT * FROM " . $this->db_table . "";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }
        

        public function addoptionlocation($idl,$ido){
            $sqlQuery = " INSERT INTO " . $this->db_table . " (idoption, idlocation) values (".intval($ido)." , ".intval($idl).")";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $this->conn->lastInsertId();

        }
    }
?>