-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: location_voiture
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `client_voiture_location`
--

DROP TABLE IF EXISTS `client_voiture_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client_voiture_location` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idclient` int NOT NULL,
  `idvoiture` int NOT NULL,
  `datedebutlocation` date NOT NULL,
  `datefinlocation` date NOT NULL,
  `descrip` varchar(100) DEFAULT NULL,
  `idpromo` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idvoiture` (`idvoiture`),
  KEY `location_idclient` (`idclient`),
  CONSTRAINT `client_voiture_location_ibfk_2` FOREIGN KEY (`idvoiture`) REFERENCES `voiture` (`id`),
  CONSTRAINT `location_idclient` FOREIGN KEY (`idclient`) REFERENCES `client` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_voiture_location`
--

LOCK TABLES `client_voiture_location` WRITE;
/*!40000 ALTER TABLE `client_voiture_location` DISABLE KEYS */;
INSERT INTO `client_voiture_location` VALUES (31,1,1,'2022-06-01','2022-06-09',NULL,NULL),(32,3,1,'2022-06-09','2022-06-15',NULL,NULL),(33,5,2,'2022-06-09','2022-06-16',NULL,NULL),(35,3,3,'2022-08-04','2022-09-09',NULL,NULL),(36,6,1,'2022-06-02','2022-06-16',NULL,NULL);
/*!40000 ALTER TABLE `client_voiture_location` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-08 20:40:09
