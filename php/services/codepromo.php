<?php
    class Codepromo{
        // Connection
        private $conn;
        // Table
        private $db_table = "codepromo";
       
        
        // Db connection
        public function __construct($db){
            $this->conn = $db;
        }
        // GET ALL
        public function getcodepromos(){
            $sqlQuery = "SELECT * FROM " . $this->db_table . "";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }
        
        public function getcodepromosbyid($id){
            $sqlQuery = "SELECT * FROM " . $this->db_table . " where id=".$id;
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }
    }
?>