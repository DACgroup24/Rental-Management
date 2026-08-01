-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: rental_house
-- ------------------------------------------------------
-- Server version	8.2.0

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
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property` (
  `pid` int NOT NULL AUTO_INCREMENT,
  `landlord_id` int DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `cid` int DEFAULT NULL,
  `rent` double DEFAULT NULL,
  `ptid` int DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `deposit` double DEFAULT NULL,
  `images` blob,
  `aid` int DEFAULT NULL,
  PRIMARY KEY (`pid`),
  KEY `landlord_id` (`landlord_id`),
  KEY `cid` (`cid`),
  KEY `ptid` (`ptid`),
  KEY `fk_aid_idx` (`aid`),
  CONSTRAINT `fk_aid` FOREIGN KEY (`aid`) REFERENCES `area` (`aid`),
  CONSTRAINT `property_ibfk_1` FOREIGN KEY (`landlord_id`) REFERENCES `user` (`uid`),
  CONSTRAINT `property_ibfk_2` FOREIGN KEY (`cid`) REFERENCES `city` (`cid`),
  CONSTRAINT `property_ibfk_3` FOREIGN KEY (`ptid`) REFERENCES `property-type` (`ptid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property`
--

LOCK TABLES `property` WRITE;
/*!40000 ALTER TABLE `property` DISABLE KEYS */;
INSERT INTO `property` VALUES (1,1,'Flat 401, Sapphire Heights, Andheri West',2,45000,2,'Available','Spacious 2 BHK with modular kitchen and sea view.',150000,_binary 'img_url_1.jpg, img_url_2.jpg',NULL),(2,2,'House 12, Orchid Enclave, Koregaon Park',1,85000,3,'Available','Fully furnished 3 BHK villa with private garden.',250000,_binary 'villa_1.jpg, villa_pool.jpg',NULL),(3,3,'Flat 102, Gokul Dham, Borivali East',2,22000,1,'Rented','Cozy 1 BHK near the railway station.',60000,_binary 'bhk1_main.jpg',NULL),(4,3,'Studio 14, Viman Nagar',1,18000,4,'Available','Perfect for students or working professionals.',40000,_binary 'studio_room.jpg',NULL),(5,3,'Flat 903, Sky Line Towers, Malad',2,50000,2,'Available','Modern 2 BHK apartment with club amenities.',120000,_binary 'skyline_2bhk.jpg',NULL),(6,2,'Iyer House, Bangalore',3,25000,2,'Available','The house Iyer and Babita used to live',75000,_binary 'iiyer_123.jpg',NULL),(7,2,'PanchMukhi hanuman mandir, Gokhalenagar,',1,10000,6,'Available','Best PG for boys and girls',15000,_binary 'pg1.jpg,pg2.jpg',NULL),(8,16,'gokhalenagar',1,24000,1,'Available','best house in gokhalenagar pune',100000,_binary 'home1.jpg , home2.jpg',NULL),(9,16,'wiman nagar',1,30000,2,'Available','best house in wiman nagar',60000,_binary 'homeee1.jpg, homeee2.jpg',NULL),(10,3,'Kharghar',2,50000,4,'Available','best studio in Kharghar',200000,_binary 'studio1.jpg, studio2.jpg, studio3.jpg',NULL),(11,16,'pimpri',1,30000,3,'Available','best 3bhk flat in pimpri\n',1000000,_binary 'pimpri1.jpg, pimpri2.jpg',NULL);
/*!40000 ALTER TABLE `property` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-01 16:01:01
