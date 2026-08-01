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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `rid` int DEFAULT NULL,
  `uname` varchar(255) DEFAULT NULL,
  `password` varchar(10) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `cid` int DEFAULT NULL,
  `adharno` varchar(12) NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `adharno` (`adharno`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`),
  KEY `rid` (`rid`),
  KEY `cid` (`cid`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`rid`) REFERENCES `role` (`rid`),
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`cid`) REFERENCES `city` (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,2,'amit_sharma','Pass@123','amit.sharma@email.com','9876543210','Flat 401, Sapphire Heights, Andheri West',1,'123456789012',1),(2,2,'priya_patel','Priya#98','priya.patel@email.com','9812345678','House 12, Orchid Enclave, Koregaon Park',2,'234567890123',1),(3,3,'rahul_verma','Rahul$45','rahul.verma@email.com','9123456789','Room 102, Shanti Niwas, Karol Bagh',4,'345678901234',0),(4,3,'ananya_rao','Anan@887','ananya.rao@email.com','8765432109','Apt 5C, Green Glen Layout, Bellandur',3,'456789012345',0),(5,3,'vikram_santhanam','Vik!789','vikram.s@email.com','7654321098','Plot 45, Anna Nagar Third Street',5,'567890123456',0),(6,3,'lanlord1','123','lanlord@gmail.com','98987987','pune',2,'123456789987',0),(14,2,'ayush','ayush123','jogiayush2004@gmail.com','9881197785','Dr.radhakrishnan Colony Abhyankar Ward\nAbhyankar Ward, Warora, Dist. Chandrapur',2,'112233445566',1),(15,3,'chetan','chetan123','chetan12@gmail.com','7709968767','Dr. Radhakrishnan Colony, Abhyankar Ward, Warora , Dist. Chandrapur',1,'508973281234',0),(16,3,'Modi','modi123','modimeloni@gmail.com','9766509878','Prime Point Road, Manjari Bk',3,'112233998800',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-01 16:01:00
