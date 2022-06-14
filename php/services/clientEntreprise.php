<?php
    class ClientEntreprise extends Client{

        public function addentreprise($nom,$prenom,$email, $adresse, $ville, $cp, $permis, $siren, $raisonsocial, $secteuractivite){
            $sqlQuery = " INSERT INTO " . $this->db_table . " (nom, prenom, email, adresse,ville, code_postale, permis_de_conduire, raison_sociale, secteur_activite, siren) "
            ."values ('".$nom."' , '".$prenom."' , '".$email."' , '".$adresse."', '".$ville."', '".$cp."' , '".$permis."', '".$raisonsocial."', '".$secteuractivite."','".$siren."')";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $this->conn->lastInsertId();

        }
       
    }
?>