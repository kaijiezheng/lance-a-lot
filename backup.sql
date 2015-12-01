-- MySQL dump 10.13  Distrib 5.6.27, for osx10.11 (x86_64)
--
-- Host: localhost    Database: lancealot
-- ------------------------------------------------------
-- Server version	5.6.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `clients_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'Hack Reactor','54478 Shoshone Trail','351-(218)360-0367',NULL,NULL),(2,'Chatterbridge','7 Anderson Plaza','673-(170)634-5131',NULL,NULL),(3,'Fivebridge','5 Walton Parkway','62-(615)454-4356',NULL,NULL),(4,'Zoonder','9634 Morrow Court','62-(606)941-1990',NULL,NULL),(5,'Edgeblab','62 5th Hill','86-(319)143-6453',NULL,NULL),(6,'Linktype','99211 Pawling Point','53-(349)376-8180',NULL,NULL),(7,'Jaloo','0 Forest Dale Trail','236-(907)758-9616',NULL,NULL),(8,'Photobug','5537 Knutson Lane','63-(220)201-6620',NULL,NULL),(9,'Pixoboo','108 Hermina Parkway','590-(579)439-6828',NULL,NULL),(10,'Skiptube','71473 Hauk Center','62-(226)137-1864',NULL,NULL);
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `freelancers`
--

DROP TABLE IF EXISTS `freelancers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `freelancers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `freelancers_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `freelancers`
--

LOCK TABLES `freelancers` WRITE;
/*!40000 ALTER TABLE `freelancers` DISABLE KEYS */;
INSERT INTO `freelancers` VALUES (1,'kaijie@kaijie.com','$2a$10$piRFcJ1fYZNaviPlqodpEurOvXF6lRJ61jAbrhrFXyllaBYqHokRW','2015-11-30 16:51:48','2015-11-30 16:51:48');
/*!40000 ALTER TABLE `freelancers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `start` date DEFAULT NULL,
  `end` date DEFAULT NULL,
  `rate` decimal(8,2) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `freelancer_id` int(10) unsigned DEFAULT NULL,
  `client_id` int(10) unsigned DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_freelancer_id_foreign` (`freelancer_id`),
  KEY `jobs_client_id_foreign` (`client_id`),
  CONSTRAINT `jobs_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`),
  CONSTRAINT `jobs_freelancer_id_foreign` FOREIGN KEY (`freelancer_id`) REFERENCES `freelancers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (1,'2015-11-25','2015-12-23',1034.62,0,'natoque penatibus et magnis dis parturient',1,8,NULL,NULL),(2,'2015-11-25','2015-11-26',570.85,0,'mauris laoreet ut rhoncus aliquet pulvinar sed',1,1,NULL,NULL),(3,'2015-11-25','2015-11-28',334.32,0,'sapien sapien non mi',1,2,NULL,NULL),(4,'2015-11-24','2015-11-26',831.38,0,'et ultrices posuere cubilia',1,5,NULL,NULL),(5,'2015-11-24','2015-11-28',380.56,0,'diam neque vestibulum',1,5,NULL,NULL),(6,'2015-11-24','2015-12-18',307.05,0,'nunc donec quis',1,7,NULL,NULL),(7,'2015-11-24','2015-11-27',240.30,0,'turpis adipiscing lorem',1,7,NULL,NULL),(8,'2015-11-24','2015-12-05',939.53,0,'sed interdum venenatis',1,1,NULL,NULL),(9,'2015-11-24','2015-12-06',753.24,0,'aliquam quis turpis',1,9,NULL,NULL),(10,'2015-11-25','2015-11-26',1452.58,0,'sed vel enim',1,8,NULL,NULL),(11,'2015-11-24','2015-12-16',329.40,0,'duis bibendum morbi non',1,1,NULL,NULL),(12,'2015-11-25','2015-12-07',875.85,0,'mi nulla ac enim in',1,7,NULL,NULL),(13,'2015-11-24','2015-12-03',1072.04,0,'proin risus praesent',1,5,NULL,NULL),(14,'2015-11-25','2015-12-07',887.25,0,'feugiat non pretium quis lectus suspendisse',1,6,NULL,NULL),(15,'2015-11-25','2015-12-16',1252.17,0,'metus sapien ut nunc',1,8,NULL,NULL),(16,'2015-11-25','2015-12-04',946.32,0,'quis lectus suspendisse potenti in eleifend quam',1,2,NULL,NULL),(17,'2015-11-24','2015-12-21',224.00,0,'in congue etiam justo etiam pretium',1,1,NULL,NULL),(18,'2015-11-24','2015-12-17',541.30,0,'volutpat erat quisque',1,6,NULL,NULL),(19,'2015-11-24','2015-12-08',372.01,0,'aliquet maecenas leo odio condimentum id',1,1,NULL,NULL),(20,'2015-11-24','2015-12-09',235.17,0,'lectus in quam fringilla rhoncus mauris',1,8,NULL,NULL),(21,'2015-11-25','2015-12-11',924.25,0,'quis tortor id',1,9,NULL,NULL),(22,'2015-11-25','2015-12-14',711.35,0,'cursus vestibulum proin eu mi nulla',1,10,NULL,NULL),(23,'2015-11-24','2015-12-04',481.85,0,'curae nulla dapibus dolor vel est',1,4,NULL,NULL),(24,'2015-11-24','2015-12-06',377.83,0,'sit amet justo morbi ut odio',1,9,NULL,NULL),(25,'2015-11-25','2015-12-12',720.39,0,'proin eu mi nulla',1,1,NULL,NULL),(26,'2015-11-25','2015-12-07',938.73,0,'tellus nulla ut erat id mauris vulputate',1,10,NULL,NULL),(27,'2015-11-24','2015-12-07',1086.38,0,'aliquam quis turpis',1,4,NULL,NULL),(28,'2015-11-25','2015-11-26',356.04,0,'sagittis nam congue risus semper porta volutpat',1,3,NULL,NULL),(29,'2015-11-24','2015-12-20',205.61,0,'ligula nec sem',1,2,NULL,NULL),(30,'2015-11-25','2015-11-27',829.41,0,'posuere cubilia curae duis',1,9,NULL,NULL);
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `times`
--

DROP TABLE IF EXISTS `times`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `times` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `start` datetime DEFAULT NULL,
  `stop` datetime DEFAULT NULL,
  `total` decimal(8,2) DEFAULT NULL,
  `job_id` int(10) unsigned DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `times_job_id_foreign` (`job_id`),
  CONSTRAINT `times_job_id_foreign` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `times`
--

LOCK TABLES `times` WRITE;
/*!40000 ALTER TABLE `times` DISABLE KEYS */;
INSERT INTO `times` VALUES (1,'2015-11-26 21:31:52','2015-11-25 22:53:05',2.31,9,NULL,NULL),(2,'2015-11-26 08:56:58','2015-11-27 15:46:23',4.02,12,NULL,NULL),(3,'2015-11-27 01:59:35','2015-11-24 00:27:00',3.98,3,NULL,NULL),(4,'2015-11-25 09:18:00','2015-11-24 08:48:45',1.69,5,NULL,NULL),(5,'2015-11-29 07:48:49','2015-11-28 14:41:14',4.01,5,NULL,NULL),(6,'2015-11-25 03:44:04','2015-11-28 22:46:57',4.49,4,NULL,NULL),(7,'2015-11-29 07:12:58','2015-11-27 01:38:38',5.95,9,NULL,NULL),(8,'2015-11-26 11:02:17','2015-11-29 03:25:04',3.24,21,NULL,NULL),(9,'2015-11-24 21:22:01','2015-11-24 10:22:37',3.32,14,NULL,NULL),(10,'2015-11-29 22:54:55','2015-11-29 00:54:51',4.90,28,NULL,NULL),(11,'2015-11-28 06:46:54','2015-11-29 03:49:43',2.67,3,NULL,NULL),(12,'2015-11-27 07:20:07','2015-11-27 19:12:11',1.39,3,NULL,NULL),(13,'2015-11-25 05:53:32','2015-11-24 21:22:49',1.40,27,NULL,NULL),(14,'2015-11-25 19:23:04','2015-11-25 14:15:01',1.85,4,NULL,NULL),(15,'2015-11-25 08:03:49','2015-11-25 07:28:11',4.06,28,NULL,NULL),(16,'2015-11-25 21:54:45','2015-11-24 21:51:05',2.29,29,NULL,NULL),(17,'2015-11-26 00:41:42','2015-11-25 04:40:28',2.67,2,NULL,NULL),(18,'2015-11-29 05:18:02','2015-11-24 02:54:58',5.23,20,NULL,NULL),(19,'2015-11-24 09:11:19','2015-11-28 02:44:19',4.28,16,NULL,NULL),(20,'2015-11-29 08:09:40','2015-11-26 07:09:50',2.27,29,NULL,NULL),(21,'2015-11-25 13:13:37','2015-11-24 02:33:51',4.52,14,NULL,NULL),(22,'2015-11-27 03:11:00','2015-11-27 17:45:34',1.62,15,NULL,NULL),(23,'2015-11-25 11:40:42','2015-11-27 05:25:54',5.62,3,NULL,NULL),(24,'2015-11-28 11:22:46','2015-11-29 08:58:03',1.32,16,NULL,NULL),(25,'2015-11-29 17:52:11','2015-11-27 06:47:38',5.99,3,NULL,NULL),(26,'2015-11-26 20:53:26','2015-11-29 20:48:23',3.89,18,NULL,NULL),(27,'2015-11-25 18:44:49','2015-11-25 20:32:03',4.17,13,NULL,NULL),(28,'2015-11-28 21:50:18','2015-11-27 16:35:08',4.77,13,NULL,NULL),(29,'2015-11-24 18:58:22','2015-11-29 14:08:56',3.38,5,NULL,NULL),(30,'2015-11-27 10:46:46','2015-11-29 08:18:31',4.20,16,NULL,NULL);
/*!40000 ALTER TABLE `times` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-11-30 17:03:10
