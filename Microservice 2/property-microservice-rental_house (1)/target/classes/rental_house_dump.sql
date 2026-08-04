-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
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

CREATE DATABASE IF NOT EXISTS rental_house;
USE rental_house;

-- Table structure for table `city`
DROP TABLE IF EXISTS `city`;
CREATE TABLE `city` (
  `cid` int NOT NULL AUTO_INCREMENT,
  `cname` varchar(25) NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `city` VALUES (1,'Mumbai'),(2,'Pune'),(3,'Nagpur '),(4,'Nashik'),(5,'Wardha');

-- Table structure for table `property-type`
DROP TABLE IF EXISTS `property-type`;
CREATE TABLE `property-type` (
  `ptid` int NOT NULL AUTO_INCREMENT,
  `typename` varchar(50) NOT NULL,
  PRIMARY KEY (`ptid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `property-type` VALUES (1,'1 BHK Apartment'),(2,'2 BHK Apartment'),(3,'3 BHK Apartment'),(4,'Studio Apartment'),(5,'Independent Villa');

-- Table structure for table `role`
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `rid` int NOT NULL AUTO_INCREMENT,
  `rname` varchar(25) NOT NULL,
  PRIMARY KEY (`rid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `role` VALUES (1,'Admin'),(2,'Landlord'),(3,'Tenant');

-- Table structure for table `user`
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `rid` int DEFAULT NULL,
  `uname` varchar(25) NOT NULL,
  `password` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `address` varchar(100) NOT NULL,
  `cid` int DEFAULT NULL,
  `fname` varchar(25) NOT NULL,
  `lname` varchar(25) NOT NULL,
  `adhar no` varchar(12) NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `adhar no` (`adhar no`),
  KEY `rid` (`rid`),
  KEY `cid` (`cid`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`rid`) REFERENCES `role` (`rid`),
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`cid`) REFERENCES `city` (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `user` VALUES 
(1,2,'amit_sharma','Pass@123','amit.sharma@email.com','9876543210','Flat 401, Sapphire Heights, Andheri West',1,'Amit','Sharma','123456789012'),
(2,2,'priya_patel','Priya#98','priya.patel@email.com','9812345678','House 12, Orchid Enclave, Koregaon Park',2,'Priya','Patel','234567890123'),
(3,3,'rahul_verma','Rahul$45','rahul.verma@email.com','9123456789','Room 102, Shanti Niwas, Karol Bagh',4,'Rahul','Verma','345678901234'),
(4,3,'ananya_rao','Anan@887','ananya.rao@email.com','8765432109','Apt 5C, Green Glen Layout, Bellandur',3,'Ananya','Rao','456789012345'),
(5,3,'vikram_santhanam','Vik!789','vikram.s@email.com','7654321098','Plot 45, Anna Nagar Third Street',5,'Vikram','Santhanam','567890123456');

-- Table structure for table `property`
DROP TABLE IF EXISTS `property`;
CREATE TABLE `property` (
  `pid` int NOT NULL AUTO_INCREMENT,
  `landlord_id` int DEFAULT NULL,
  `address` varchar(100) NOT NULL,
  `cid` int DEFAULT NULL,
  `rent` decimal(10,2) NOT NULL,
  `ptid` int DEFAULT NULL,
  `status` varchar(10) NOT NULL,
  `description` text,
  `deposit` decimal(10,2) NOT NULL,
  `images` text NOT NULL,
  PRIMARY KEY (`pid`),
  KEY `landlord_id` (`landlord_id`),
  KEY `cid` (`cid`),
  KEY `ptid` (`ptid`),
  CONSTRAINT `property_ibfk_1` FOREIGN KEY (`landlord_id`) REFERENCES `user` (`uid`),
  CONSTRAINT `property_ibfk_2` FOREIGN KEY (`cid`) REFERENCES `city` (`cid`),
  CONSTRAINT `property_ibfk_3` FOREIGN KEY (`ptid`) REFERENCES `property-type` (`ptid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `property` VALUES 
(1,1,'Flat 401, Sapphire Heights, Andheri West',1,45000.00,2,'Available','Spacious 2 BHK with modular kitchen and sea view.',150000.00,'img_url_1.jpg, img_url_2.jpg'),
(2,2,'House 12, Orchid Enclave, Koregaon Park',2,85000.00,3,'Available','Fully furnished 3 BHK villa with private garden.',250000.00,'villa_1.jpg, villa_pool.jpg'),
(3,1,'Flat 102, Gokul Dham, Borivali East',1,22000.00,1,'Rented','Cozy 1 BHK near the railway station.',60000.00,'bhk1_main.jpg'),
(4,2,'Studio 14, Viman Nagar',2,18000.00,4,'Available','Perfect for students or working professionals.',40000.00,'studio_room.jpg'),
(5,1,'Flat 903, Sky Line Towers, Malad',1,50000.00,2,'Available','Modern 2 BHK apartment with club amenities.',120000.00,'skyline_2bhk.jpg');

-- Table structure for table `request-visit`
DROP TABLE IF EXISTS `request-visit`;
CREATE TABLE `request-visit` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `pid` int DEFAULT NULL,
  `visit_date` date NOT NULL,
  `visit_time` time NOT NULL,
  `uid` int DEFAULT NULL,
  PRIMARY KEY (`request_id`),
  KEY `pid` (`pid`),
  KEY `uid` (`uid`),
  CONSTRAINT `request-visit_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `property` (`pid`),
  CONSTRAINT `request-visit_ibfk_2` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `request-visit` VALUES 
(1,1,'2026-07-10','11:00:00',3),
(2,2,'2026-07-11','15:30:00',4),
(3,4,'2026-07-12','10:00:00',5),
(4,1,'2026-07-13','17:00:00',4),
(5,5,'2026-07-14','14:00:00',3);

-- Table structure for table `accept request`
DROP TABLE IF EXISTS `accept request`;
CREATE TABLE `accept request` (
  `accept_id` int NOT NULL AUTO_INCREMENT,
  `request_id` int DEFAULT NULL,
  `status` varchar(25) NOT NULL,
  `msg` text,
  PRIMARY KEY (`accept_id`),
  KEY `request_id` (`request_id`),
  CONSTRAINT `accept request_ibfk_1` FOREIGN KEY (`request_id`) REFERENCES `request-visit` (`request_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `accept request` VALUES 
(1,1,'Accepted','Please call when you reach the security gate.'),
(2,2,'Accepted','Please call when you reach at the property.'),
(3,3,'Accepted','Keys are with the caretaker. You can visit at 10 AM.'),
(4,4,'Rejected','The requested slot is already booked.'),
(5,5,'Accepted','Confirmed. Looking forward to meeting you.');

-- Table structure for table `contract`
DROP TABLE IF EXISTS `contract`;
CREATE TABLE `contract` (
  `contract_id` int NOT NULL AUTO_INCREMENT,
  `pid` int DEFAULT NULL,
  `uid` int DEFAULT NULL,
  `contract_date` date NOT NULL,
  `duration` varchar(30) NOT NULL,
  `deposite` decimal(10,2) NOT NULL,
  `rent` decimal(10,2) NOT NULL,
  PRIMARY KEY (`contract_id`),
  KEY `pid` (`pid`),
  KEY `uid` (`uid`),
  CONSTRAINT `contract_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `property` (`pid`),
  CONSTRAINT `contract_ibfk_2` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `contract` VALUES 
(1,3,3,'2026-06-01','11 Months',60000.00,22000.00),
(2,1,4,'2026-07-01','11 Months',150000.00,45000.00),
(3,4,5,'2026-07-02','6 Months',40000.00,18000.00),
(4,2,4,'2026-07-05','12 Months',250000.00,85000.00),
(5,5,3,'2026-07-10','11 Months',120000.00,50000.00);

-- Table structure for table `payment`
DROP TABLE IF EXISTS `payment`;
CREATE TABLE `payment` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `contract_id` int DEFAULT NULL,
  `deposit_amt` decimal(10,2) NOT NULL,
  `mode` varchar(20) NOT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `contract_id` (`contract_id`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`contract_id`) REFERENCES `contract` (`contract_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `payment` VALUES 
(1,1,60000.00,'UPI'),
(2,2,150000.00,'Net Banking'),
(3,3,40000.00,'UPI'),
(4,4,250000.00,'Cheque'),
(5,5,120000.00,'Net Banking');
