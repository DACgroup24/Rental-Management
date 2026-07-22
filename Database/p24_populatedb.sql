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
-- Dumping data for table `accept request`
--

LOCK TABLES `accept request` WRITE;
/*!40000 ALTER TABLE `accept request` DISABLE KEYS */;
INSERT INTO `accept request` VALUES (1,1,'Accepted','Please call when you reach the security gate.'),(2,2,'Accepted','Please call when you reach at the property.'),(3,3,'Accepted','Keys are with the caretaker. You can visit at 10 AM.'),(4,4,'Rejected','The requested slot is already booked.'),(5,5,'Accepted','Confirmed. Looking forward to meeting you.');
/*!40000 ALTER TABLE `accept request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,1,'Mumbai'),(2,1,'Pune'),(3,2,'Bengaluru'),(4,3,'New Delhi'),(5,4,'Chennai');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `contract`
--

LOCK TABLES `contract` WRITE;
/*!40000 ALTER TABLE `contract` DISABLE KEYS */;
INSERT INTO `contract` VALUES (1,3,3,'2026-06-01','11 Months',60000.00,22000.00),(2,1,4,'2026-07-01','11 Months',150000.00,45000.00),(3,4,5,'2026-07-02','6 Months',40000.00,18000.00),(4,2,4,'2026-07-05','12 Months',250000.00,85000.00),(5,5,3,'2026-07-10','11 Months',120000.00,50000.00);
/*!40000 ALTER TABLE `contract` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,1,60000.00,'UPI'),(2,2,150000.00,'Net Banking'),(3,3,40000.00,'UPI'),(4,4,250000.00,'Cheque'),(5,5,120000.00,'Net Banking');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `property`
--

LOCK TABLES `property` WRITE;
/*!40000 ALTER TABLE `property` DISABLE KEYS */;
INSERT INTO `property` VALUES (1,1,'Flat 401, Sapphire Heights, Andheri West',1,45000.00,2,'Available','Spacious 2 BHK with modular kitchen and sea view.',150000.00,'img_url_1.jpg, img_url_2.jpg'),(2,2,'House 12, Orchid Enclave, Koregaon Park',2,85000.00,3,'Available','Fully furnished 3 BHK villa with private garden.',250000.00,'villa_1.jpg, villa_pool.jpg'),(3,1,'Flat 102, Gokul Dham, Borivali East',1,22000.00,1,'Rented','Cozy 1 BHK near the railway station.',60000.00,'bhk1_main.jpg'),(4,2,'Studio 14, Viman Nagar',2,18000.00,4,'Available','Perfect for students or working professionals.',40000.00,'studio_room.jpg'),(5,1,'Flat 903, Sky Line Towers, Malad',1,50000.00,2,'Available','Modern 2 BHK apartment with club amenities.',120000.00,'skyline_2bhk.jpg');
/*!40000 ALTER TABLE `property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `property-type`
--

LOCK TABLES `property-type` WRITE;
/*!40000 ALTER TABLE `property-type` DISABLE KEYS */;
INSERT INTO `property-type` VALUES (1,'1 BHK Apartment'),(2,'2 BHK Apartment'),(3,'3 BHK Apartment'),(4,'Studio Apartment'),(5,'Independent Villa');
/*!40000 ALTER TABLE `property-type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `request-visit`
--

LOCK TABLES `request-visit` WRITE;
/*!40000 ALTER TABLE `request-visit` DISABLE KEYS */;
INSERT INTO `request-visit` VALUES (1,1,'2026-07-10','11:00:00',3),(2,2,'2026-07-11','15:30:00',4),(3,4,'2026-07-12','10:00:00',5),(4,1,'2026-07-13','17:00:00',4),(5,5,'2026-07-14','14:00:00',3);
/*!40000 ALTER TABLE `request-visit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Admin'),(2,'Landlord'),(3,'Tenant');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
INSERT INTO `state` VALUES (1,'Maharashtra'),(2,'Karnataka'),(3,'Delhi'),(4,'Tamil Nadu'),(5,'Telangana');
/*!40000 ALTER TABLE `state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,2,'amit_sharma','Pass@123','amit.sharma@email.com','9876543210','Flat 401, Sapphire Heights, Andheri West',1,'Amit','Sharma','123456789012'),(2,2,'priya_patel','Priya#98','priya.patel@email.com','9812345678','House 12, Orchid Enclave, Koregaon Park',2,'Priya','Patel','234567890123'),(3,3,'rahul_verma','Rahul$45','rahul.verma@email.com','9123456789','Room 102, Shanti Niwas, Karol Bagh',4,'Rahul','Verma','345678901234'),(4,3,'ananya_rao','Anan@887','ananya.rao@email.com','8765432109','Apt 5C, Green Glen Layout, Bellandur',3,'Ananya','Rao','456789012345'),(5,3,'vikram_santhanam','Vik!789','vikram.s@email.com','7654321098','Plot 45, Anna Nagar Third Street',5,'Vikram','Santhanam','567890123456');
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

-- Dump completed on 2026-07-08 13:46:22
