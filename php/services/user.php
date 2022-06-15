<?php
    class User{
        // Connection
        private $conn;
        // Table
        private $db_table = "utilisateur";
       
        
        // Db connection
        public function __construct($db){
            $this->conn = $db;
        }
        // GET ALL
        public function getUsers(){
            $sqlQuery = "SELECT * FROM " . $this->db_table . "";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

        // GET User By ID
        public function getUser($id){
            $sqlQuery = "SELECT * FROM " . $this->db_table . " where id=". $id;
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

        public function getUserbyemailandpassword($email, $password){
            $sqlQuery = "SELECT * FROM " . $this->db_table . " where email = '". $email."' and password = '".$password."'";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

        public function insertuser($nom, $prenom, $adresse, $ville, $codepostal, $email, $password){
            $sqlQuery = " INSERT INTO " . $this->db_table . " (nom, prenom, adresse, ville, codepostal, email, password) values ('".$nom."','".$prenom."','".$adresse."','".$ville."','".$codepostal."','".$email."','".$password."')";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }
    }
?>