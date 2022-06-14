<?php
    class Clientvoiturelocation{
        // Connection
        private $conn;
        // Table
        private $db_table = "client_voiture_location";
      

        
        // Db connection
        public function __construct($db){
            $this->conn = $db;
        }
        // GET ALL
        public function getclientvoiturelocationsbycriterias($nom, $dated){
            $sqlQuery = "SELECT cvl.id, cvl.idclient, cvl.idvoiture, marque, nom, datedebutlocation, datefinlocation, model FROM " . $this->db_table . " cvl inner join voiture v 
            on v.id= cvl.idvoiture inner join client c on c.id=cvl.idclient where 1=1  ";
            if($nom!=""){
                $sqlQuery .=" and nom='".$nom."' ";
            }
            if($dated!=""){
                $sqlQuery .=" and cvl.datedebutlocation <= '".$dated."' and datefinlocation >='".$dated."'";
            }
            
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

        public function getclientvoiturelocations(){
            $sqlQuery = "SELECT cvl.id, cvl.idclient, cvl.idvoiture, marque, nom, datedebutlocation, datefinlocation, model FROM " . $this->db_table . " cvl inner join voiture v 
            on v.id= cvl.idvoiture inner join client c on c.id=cvl.idclient";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

        public function getrenthistorybyclient($nom){
            $sqlQuery = "SELECT cvl.id, cvl.idclient, cvl.idvoiture, marque, nom, datedebutlocation, datefinlocation, model FROM " . $this->db_table . " cvl inner join voiture v 
             on v.id= cvl.idvoiture inner join client c on c.id=cvl.idclient  where nom = '".$nom."'";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

        public function getvoiturelocationsdisponible($date1, $date2){
            $sqlQuery = "SELECT * FROM voiture where id not in ( select idvoiture from " . $this->db_table . " where datedebutlocation <= '".$date2. "' and datefinlocation >= '".$date2."' ) ";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

        public function isavalaible($idvoiture,$date1, $date2){
            $sqlQuery = "SELECT * FROM voiture where id=".$idvoiture." and id not in ( select idvoiture from " . $this->db_table . " where datedebutlocation <= '".$date2. "' and datefinlocation >= '".$date2."' ) ";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            if($stmt->rowCount()>0){
                return true;
            }
            return false;
        }
        
        public function updaterenthistory($id,$date1, $date2){
            //$check = $this->isavalaible($id,$date1, $date2);
            //if($check){
                $sqlQuery = "UPDATE  ". $this->db_table ." SET datedebutlocation = '".$date1. "' , datefinlocation = '".$date2."'  where id = ".$id." ";
                $stmt = $this->conn->prepare($sqlQuery);
                $stmt->execute();
                return $stmt;
            //}
            //return "";
            
        }

        public function deleterenthistory($id){
            $sqlQuery = "DELETE FROM  location_options  where idlocation = ".$id." ";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();

            $stmt = null;
            $sqlQuery = "DELETE FROM  ". $this->db_table ."  where id = ".$id." ";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

        public function getmonths(){
            $sqlQuery = "SELECT concat(month(datedebutlocation),'/', (year(datedebutlocation)) % 100) mois FROM location_voiture.client_voiture_location";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

        public function getca(){
            $sqlQuery = "SELECT sum(prix*DATEDIFF(datefinlocation, datedebutlocation)) ca, concat(month(datedebutlocation),'/', (year(datedebutlocation)) % 100) mois  FROM location_voiture.client_voiture_location cvl 
            inner join voiture v on v.id=cvl.idvoiture 
            group by mois";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

        public function gettopclient(){
            $sqlQuery = "SELECT sum(prix) ca, nom FROM location_voiture.client_voiture_location cvl 
            inner join voiture v on v.id=cvl.idvoiture
            inner join client c on c.id=cvl.idclient 
            group by nom 
            order by ca DESC LIMIT 7";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

        public function addlocation($idclient,$idvoiture,$dated,$datef){
            $sqlQuery = " INSERT INTO " . $this->db_table . " (idclient, idvoiture, datedebutlocation, datefinlocation) values (".intval($idclient)." , ".intval($idvoiture)." , '".$dated."' , '".$datef."')";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $this->conn->lastInsertId();

        }

       
    }
?>