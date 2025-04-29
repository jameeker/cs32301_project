-- MySQL dump 10.13  Distrib 9.3.0, for macos15.2 (arm64)
--
-- Host: localhost    Database: hic_project
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_yoyo_log`
--

DROP TABLE IF EXISTS `_yoyo_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_yoyo_log` (
  `id` varchar(36) NOT NULL,
  `migration_hash` varchar(64) DEFAULT NULL,
  `migration_id` varchar(255) DEFAULT NULL,
  `operation` varchar(10) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `hostname` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `created_at_utc` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_yoyo_log`
--

LOCK TABLES `_yoyo_log` WRITE;
/*!40000 ALTER TABLE `_yoyo_log` DISABLE KEYS */;
INSERT INTO `_yoyo_log` VALUES ('4107f160-11cb-11f0-b988-daf05158ddc4','90099e49a2186509641b80969c001aacc7328df90a7c8c45dc6ba589cb98184c','00-initial-schema','apply','jaime','Jaime\'sMacBook',NULL,'2025-04-05 07:08:32'),('41643b64-11cb-11f0-b988-daf05158ddc4','868532a6b5377b649dc62a459d9c6d2fc590350b61b4fd5b000563d727d451c7','01-initial-indexes','apply','jaime','Jaime\'sMacBook',NULL,'2025-04-05 07:08:32'),('4e30fe58-204f-11f0-be89-daf05158ddc6','0c0c753e86a0b372bd72293cfa92e3b379233713901da646c6d069e128a0af40','02-adding-test-data','apply','jaime','Jaime\'sMacBook',NULL,'2025-04-23 18:29:04'),('4e614e5a-204f-11f0-be89-daf05158ddc6','ddaed99b33d2a335babe87866a391c8056f55b3396c2a1bf46bfbd3b1b04bafe','03-adding-test-default-prompts','apply','jaime','Jaime\'sMacBook',NULL,'2025-04-23 18:29:04'),('58eaa7ce-2395-11f0-8a33-daf05158ddc4','ddff0b867b29673b76367ee79c8e51ffe844bf7087ed75d8d6a3bd812bee852e','04-adding-supplemental-data','apply','jaime','Jaime\'sMacBook',NULL,'2025-04-27 22:28:00');
/*!40000 ALTER TABLE `_yoyo_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_yoyo_migration`
--

DROP TABLE IF EXISTS `_yoyo_migration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_yoyo_migration` (
  `migration_hash` varchar(64) NOT NULL,
  `migration_id` varchar(255) DEFAULT NULL,
  `applied_at_utc` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`migration_hash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_yoyo_migration`
--

LOCK TABLES `_yoyo_migration` WRITE;
/*!40000 ALTER TABLE `_yoyo_migration` DISABLE KEYS */;
INSERT INTO `_yoyo_migration` VALUES ('0c0c753e86a0b372bd72293cfa92e3b379233713901da646c6d069e128a0af40','02-adding-test-data','2025-04-23 18:29:04'),('868532a6b5377b649dc62a459d9c6d2fc590350b61b4fd5b000563d727d451c7','01-initial-indexes','2025-04-05 07:08:32'),('90099e49a2186509641b80969c001aacc7328df90a7c8c45dc6ba589cb98184c','00-initial-schema','2025-04-05 07:08:32'),('ddaed99b33d2a335babe87866a391c8056f55b3396c2a1bf46bfbd3b1b04bafe','03-adding-test-default-prompts','2025-04-23 18:29:04'),('ddff0b867b29673b76367ee79c8e51ffe844bf7087ed75d8d6a3bd812bee852e','04-adding-supplemental-data','2025-04-27 22:28:00');
/*!40000 ALTER TABLE `_yoyo_migration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_yoyo_version`
--

DROP TABLE IF EXISTS `_yoyo_version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_yoyo_version` (
  `version` int NOT NULL,
  `installed_at_utc` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_yoyo_version`
--

LOCK TABLES `_yoyo_version` WRITE;
/*!40000 ALTER TABLE `_yoyo_version` DISABLE KEYS */;
INSERT INTO `_yoyo_version` VALUES (2,'2025-04-05 05:35:13');
/*!40000 ALTER TABLE `_yoyo_version` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Note_States`
--

DROP TABLE IF EXISTS `Note_States`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Note_States` (
  `state_id` int NOT NULL AUTO_INCREMENT,
  `note_id` int NOT NULL,
  `state` enum('public','personal','trash','archived') NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `position_x` float DEFAULT '0.5',
  `position_y` float DEFAULT '0.5',
  `added_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `weather_level` int NOT NULL DEFAULT '0',
  `z_index` int DEFAULT '0',
  `rotation` float DEFAULT '0',
  PRIMARY KEY (`state_id`),
  UNIQUE KEY `unique_note_state_user` (`note_id`,`state`,`user_id`),
  KEY `index_note_states_user_state` (`user_id`,`state`),
  KEY `index_note_states_note_id` (`note_id`),
  CONSTRAINT `note_states_ibfk_1` FOREIGN KEY (`note_id`) REFERENCES `Notes` (`note_id`) ON DELETE CASCADE,
  CONSTRAINT `note_states_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Note_States`
--

LOCK TABLES `Note_States` WRITE;
/*!40000 ALTER TABLE `Note_States` DISABLE KEYS */;
INSERT INTO `Note_States` VALUES (1,1,'public',NULL,0.4,0.6,'2025-04-23 14:29:03',0,0,1.5),(2,2,'public',NULL,0.2,0.15,'2025-04-23 14:29:03',0,1,0),(3,3,'public',NULL,0.4,0.15,'2025-04-23 14:29:03',0,1,-1),(4,4,'public',NULL,0.6,0.15,'2025-04-23 14:29:03',0,1,2),(65,65,'public',NULL,0.52,0.85,'2025-04-23 19:32:02',0,0,3.1),(66,66,'personal','SEED-TEST-DATA-USER-001',0.36,0.23,'2025-04-23 19:32:02',0,10,7.1),(67,67,'personal','SEED-TEST-DATA-USER-001',0.43,0.17,'2025-04-23 19:32:02',0,4,-5.9),(68,68,'trash','SEED-TEST-DATA-USER-001',0.35,0.59,'2025-04-23 19:32:02',0,0,9.4),(69,69,'public',NULL,0.15,0.51,'2025-04-23 19:32:02',0,2,6.9),(70,70,'public',NULL,0.15,0.83,'2025-04-23 19:32:02',0,1,7.8),(71,71,'trash','SEED-TEST-DATA-USER-001',0.45,0.35,'2025-04-23 19:32:02',0,4,5.2),(72,72,'public',NULL,0.34,0.31,'2025-04-23 19:32:02',0,4,4.1),(73,73,'public',NULL,0.19,0.17,'2025-04-23 19:32:02',0,8,0.7),(74,74,'public',NULL,0.86,0.25,'2025-04-23 19:32:02',0,1,8.9),(75,75,'personal','SEED-TEST-DATA-USER-001',0.64,0.53,'2025-04-23 19:32:02',0,10,3.1),(76,76,'personal','SEED-TEST-DATA-USER-001',0.82,0.85,'2025-04-23 19:32:02',0,0,6.8),(77,77,'trash','SEED-TEST-DATA-USER-001',0.7,0.44,'2025-04-23 19:32:02',0,7,-0.3),(78,78,'public',NULL,0.69,0.79,'2025-04-23 19:32:02',0,10,-3.4),(79,79,'personal','SEED-TEST-DATA-USER-001',0.13,0.44,'2025-04-23 19:32:02',0,10,7.4),(80,80,'personal','SEED-TEST-DATA-USER-001',0.61,0.23,'2025-04-23 19:32:02',0,6,6.2),(81,81,'public',NULL,0.51,0.59,'2025-04-23 19:32:02',0,9,-8.5),(82,82,'public',NULL,0.37,0.81,'2025-04-23 19:32:02',0,10,-3.5),(83,83,'personal','SEED-TEST-DATA-USER-001',0.79,0.35,'2025-04-23 19:32:02',0,10,-7.3),(84,84,'public',NULL,0.76,0.53,'2025-04-23 19:32:02',0,5,-0.2),(85,85,'personal','SEED-TEST-DATA-USER-001',0.22,0.74,'2025-04-27 04:47:53',0,4,-1.3),(86,86,'personal','SEED-TEST-DATA-USER-001',0.29,0.64,'2025-04-27 04:47:53',0,10,5.1),(87,87,'public',NULL,0.76,0.34,'2025-04-27 04:47:53',0,2,-9.9),(88,88,'trash','SEED-TEST-DATA-USER-001',0.33,0.36,'2025-04-27 04:47:53',0,10,6.8),(89,89,'public',NULL,0.66,0.43,'2025-04-27 04:47:53',0,1,-4.3),(90,90,'personal','SEED-TEST-DATA-USER-001',0.75,0.63,'2025-04-27 04:47:53',0,3,2.1),(91,91,'public',NULL,0.71,0.73,'2025-04-27 04:47:53',0,0,6.5),(92,92,'public',NULL,0.47,0.54,'2025-04-27 04:47:53',0,7,7.2),(93,93,'public',NULL,0.59,0.64,'2025-04-27 04:47:53',0,10,-5.7),(94,94,'personal','SEED-TEST-DATA-USER-001',0.42,0.83,'2025-04-27 04:47:53',0,1,0.4),(95,95,'public',NULL,0.14,0.39,'2025-04-27 04:47:53',0,5,-6),(96,96,'public',NULL,0.34,0.73,'2025-04-27 04:47:53',0,2,0.8),(97,97,'public',NULL,0.54,0.13,'2025-04-27 04:47:53',0,8,-2.2),(98,98,'public',NULL,0.13,0.22,'2025-04-27 04:47:53',0,6,9.5),(99,99,'public',NULL,0.68,0.26,'2025-04-27 04:47:53',0,5,9.1),(100,100,'personal','SEED-TEST-DATA-USER-001',0.5,0.39,'2025-04-27 04:47:53',0,4,-6.8),(101,101,'trash','SEED-TEST-DATA-USER-001',0.8,0.73,'2025-04-27 04:47:53',0,5,-9.5),(102,102,'trash','SEED-TEST-DATA-USER-001',0.31,0.19,'2025-04-27 04:47:53',0,3,-3),(103,103,'trash','SEED-TEST-DATA-USER-001',0.12,0.6,'2025-04-27 04:47:53',0,0,9.4),(104,104,'personal','SEED-TEST-DATA-USER-001',0.79,0.23,'2025-04-27 04:47:53',0,8,-6.4),(105,115,'public',NULL,0.63,0.71,'2025-04-27 18:27:59',0,1,-1),(106,114,'public',NULL,0.86,0.62,'2025-04-27 18:27:59',0,1,3.6),(107,113,'public',NULL,0.65,0.82,'2025-04-27 18:27:59',0,1,-2.5),(108,118,'public',NULL,0.64,0.67,'2025-04-27 18:27:59',0,1,-4.6),(109,117,'public',NULL,0.4,0.75,'2025-04-27 18:27:59',0,1,1.5),(110,116,'public',NULL,0.88,0.84,'2025-04-27 18:27:59',0,1,1.2),(111,121,'public',NULL,0.42,0.38,'2025-04-27 18:27:59',0,1,-0.3),(112,120,'public',NULL,0.86,0.5,'2025-04-27 18:27:59',0,1,3.3),(113,119,'public',NULL,0.21,0.42,'2025-04-27 18:27:59',0,1,0.8),(114,124,'public',NULL,0.34,0.76,'2025-04-27 18:27:59',0,1,4),(115,123,'public',NULL,0.29,0.59,'2025-04-27 18:27:59',0,1,2),(116,122,'public',NULL,0.15,0.41,'2025-04-27 18:27:59',0,1,2.2),(117,127,'public',NULL,0.15,0.4,'2025-04-27 18:27:59',0,1,1.3),(118,126,'public',NULL,0.64,0.59,'2025-04-27 18:27:59',0,1,-1.4),(119,125,'public',NULL,0.38,0.7,'2025-04-27 18:27:59',0,1,-1.9),(120,133,'public',NULL,0.437996,0.2,'2025-04-27 22:52:02',0,0,0),(121,134,'public',NULL,0.3062,0.127632,'2025-04-27 22:52:05',0,0,0),(122,135,'public',NULL,0.0977235,0.730263,'2025-04-27 22:52:10',0,0,0),(123,136,'public',NULL,0.800967,0.208115,'2025-04-27 23:22:44',0,0,0),(124,137,'public',NULL,0.117211,0.0759162,'2025-04-27 23:22:49',0,0,0),(134,97,'personal','system_user',0.54,0.13,'2025-04-27 23:39:24',0,0,0),(136,133,'personal','system_user',0.437996,0.2,'2025-04-27 23:39:33',0,0,0),(137,121,'personal','system_user',0.42,0.38,'2025-04-27 23:39:35',0,0,0),(142,137,'personal','system_user',0.117211,0.0759162,'2025-04-27 23:41:31',0,0,0),(143,99,'personal','system_user',0.68,0.26,'2025-04-27 23:41:35',0,0,0),(144,138,'public',NULL,0.76329,0.0994764,'2025-04-28 03:18:59',0,0,0),(145,139,'public',NULL,0.0743753,0.628272,'2025-04-28 03:19:05',0,0,0),(146,139,'personal','system_user',0.0743753,0.628272,'2025-04-28 03:19:08',0,0,0),(148,135,'personal','system_user',0.0977235,0.730263,'2025-04-28 03:19:20',0,0,0),(149,140,'public',NULL,0.474492,0.104712,'2025-04-28 04:43:34',0,0,0),(151,141,'public',NULL,0.630122,0.274869,'2025-04-28 04:53:58',0,0,0),(152,141,'personal','system_user',0.630122,0.274869,'2025-04-28 04:54:02',0,0,0),(153,138,'personal','system_user',0.76329,0.0994764,'2025-04-28 05:01:51',0,0,0),(161,126,'personal','system_user',0.64,0.59,'2025-04-28 05:05:32',0,0,0),(162,115,'personal','system_user',0.63,0.71,'2025-04-28 05:11:27',0,0,0),(163,142,'public',NULL,0.560806,0.570905,'2025-04-28 05:20:40',0,0,0),(164,142,'personal','system_user',0.560806,0.570905,'2025-04-28 05:20:53',0,0,0),(166,145,'public',NULL,0.727348,0.496333,'2025-04-28 06:33:25',0,0,0),(170,119,'personal','system_user',0.21,0.42,'2025-04-28 06:34:22',0,0,0),(171,146,'public',NULL,0.647072,0.101467,'2025-04-28 06:34:50',0,0,0),(172,146,'personal','system_user',0.647072,0.101467,'2025-04-28 06:34:52',0,0,0),(173,147,'public',NULL,0.5,0.5,'2025-04-28 06:42:34',0,0,0),(174,148,'public',NULL,0.5,0.5,'2025-04-28 06:44:00',0,0,0),(175,149,'public',NULL,0.5,0.5,'2025-04-28 06:44:13',0,0,0),(176,150,'public',NULL,0.334357,0.348411,'2025-04-28 07:06:17',0,0,0),(177,150,'personal','system_user',0.334357,0.348411,'2025-04-28 07:06:19',0,0,0),(178,151,'public',NULL,0.5,0.5,'2025-04-28 07:17:17',0,0,0),(179,151,'personal','system_user',0.74532,0.700489,'2025-04-28 07:17:17',0,0,0),(183,152,'public',NULL,0.5,0.5,'2025-04-28 07:42:12',0,0,0),(184,152,'personal','system_user',0.297813,0.709046,'2025-04-28 07:42:12',0,0,0),(185,1,'trash','system_user',0.5,0.5,'2025-04-28 07:53:09',0,0,0);
/*!40000 ALTER TABLE `Note_States` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Notes`
--

DROP TABLE IF EXISTS `Notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Notes` (
  `note_id` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `color` varchar(20) NOT NULL DEFAULT 'yellow',
  `format` varchar(20) DEFAULT 'text',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expires_at` timestamp NOT NULL,
  `type` enum('sticky','poster') NOT NULL DEFAULT 'sticky',
  `is_prompt` tinyint(1) NOT NULL DEFAULT '0',
  `prompt_id` int DEFAULT NULL,
  `created_by` varchar(255) NOT NULL,
  `is_auto_generated` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`note_id`),
  KEY `created_by` (`created_by`),
  KEY `index_notes_prompt_id` (`prompt_id`),
  KEY `index_notes_created_at` (`created_at`),
  CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`prompt_id`) REFERENCES `Notes` (`note_id`) ON DELETE SET NULL,
  CONSTRAINT `notes_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notes`
--

LOCK TABLES `Notes` WRITE;
/*!40000 ALTER TABLE `Notes` DISABLE KEYS */;
INSERT INTO `Notes` VALUES (1,'This is a test sticky note!','#FEFF9C','text','2025-04-23 14:29:03','2025-04-24 14:29:03','sticky',0,NULL,'user-test-1',0),(2,'What’s on your mind today?','#FFFFF3','text','2025-04-23 14:29:03','2025-04-24 14:29:03','poster',1,NULL,'user-test-1',1),(3,'Write the world a story!','#FFFFF3','text','2025-04-23 14:29:03','2025-04-24 14:29:03','poster',1,NULL,'user-test-1',1),(4,'Share a random thought.','#FFFFF3','text','2025-04-23 14:29:03','2025-04-24 14:29:03','poster',1,NULL,'user-test-1',1),(65,'Prompt #1: t HCmoQBQFs1T61Q5Kn4QaCtZTKJAW','#7AFF7D','text','2025-04-23 19:32:02','2025-04-24 19:32:02','sticky',1,NULL,'SEED-TEST-DATA-USER-001',0),(66,'Prompt #2: dxUIku1f2N7ftiWDOEN6UeH j4I mY','#7AFCFF','text','2025-04-23 19:32:02','2025-04-24 19:32:02','sticky',1,NULL,'SEED-TEST-DATA-USER-001',0),(67,'Prompt #3: wlF71i6AlbudC3GDiYvqYKoMPddbY5','#FF7EB9','text','2025-04-23 19:32:02','2025-04-24 19:32:02','sticky',1,NULL,'SEED-TEST-DATA-USER-001',0),(68,'Prompt #4: sJWHIw23OUMD3WN ngi4BD5CQBIf4t','#FF7EB9','text','2025-04-23 19:32:02','2025-04-24 19:32:02','sticky',1,NULL,'SEED-TEST-DATA-USER-001',0),(69,'Prompt #5: CzEHDDg0hyKuHgj2yJlLPUekxHUFZ6','#7AFCFF','text','2025-04-23 19:32:02','2025-04-24 19:32:02','sticky',1,NULL,'SEED-TEST-DATA-USER-001',0),(70,'Note #6: VpsfZ58jrfkt6c4PdSMmhfnAJF0 zP','#7AFCFF','text','2025-04-23 19:32:02','2025-04-24 19:32:02','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(71,'Note #7: BwU61Q5Cps39C08kBr5GynN0sV6a1L','#7AFF7D','text','2025-04-23 19:32:02','2025-04-24 19:32:02','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(72,'Note #8: oN4 PLAl4eWhSFy3CevCkerPmdDg9c','#7AFF7D','text','2025-04-23 19:32:02','2025-04-24 19:32:02','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(73,'Note #9: Hj6nE n6Q9FRiWxAwhyMILJ7PGp6CR','#FF7EB9','text','2025-04-23 19:32:02','2025-04-24 19:32:02','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(74,'Note #10: AaBT6ze3tn9eKC1SVwOifnpgEi4 Te','#7AFF7D','text','2025-04-23 19:32:02','2025-04-24 19:32:02','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(75,'Note #11: JiPRYV8A Qcys8AKkcaoM5IY5C7bQo','#FEFF9C','text','2025-04-23 19:32:02','2025-04-24 19:32:02','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(76,'Note #12: E5BD4ZJzdv6V7cYqTk6J9V8n7jwlL7','#7AFF7D','text','2025-04-23 19:32:02','2025-04-24 19:32:02','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(77,'Note #13: 9YJusljvI5SYfzG4uAPmHCYsaRxsXO','#FF7EB9','text','2025-04-23 19:32:02','2025-04-24 19:32:02','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(78,'Note #14: CembyT366CwZ9PBEG4lBtXYY9QVEsB','#FEFF9C','text','2025-04-23 19:32:02','2025-04-24 19:32:02','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(79,'Note #15: eGhUJkCRp9D YYvOsMPNuuE6Ko3wvv','#7AFF7D','text','2025-04-23 19:32:02','2025-04-24 19:32:02','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(80,'Note #16: oeKCF6b4ePHbT3awjQJtWbIFXtnl0U','#7AFCFF','text','2025-04-23 19:32:02','2025-04-24 19:32:02','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(81,'Note #17: LmoqR2Vw77m3kbJbKRVNv31kdxE8dN','#FEFF9C','text','2025-04-23 19:32:02','2025-04-24 19:32:02','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(82,'Note #18: xTY81xjJM5zJxwbonrK2GV8DBmNYly','#FEFF9C','text','2025-04-23 19:32:02','2025-04-24 19:32:02','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(83,'Note #19: MRkonL3KQnDT8Dx86vTtKDssFNYhG3','#7AFCFF','text','2025-04-23 19:32:02','2025-04-24 19:32:02','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(84,'Note #20: KHL6U4ETwFiWjcl8xGOjsbKy5fuZQC','#FEFF9C','text','2025-04-23 19:32:02','2025-04-24 19:32:02','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(85,'Prompt #1: rV5C9I4p10Ivlo0ucRmeG7kCBPm4aS','#7AFF7D','text','2025-04-27 04:47:53','2025-04-28 04:47:53','sticky',1,NULL,'SEED-TEST-DATA-USER-001',0),(86,'Prompt #2: cJCVkl42VygQnKmb5h6pREoh90xrpD','#FF7EB9','text','2025-04-27 04:47:53','2025-04-28 04:47:53','sticky',1,NULL,'SEED-TEST-DATA-USER-001',0),(87,'Prompt #3: zfhxw3zyEa0MF8qR ZkELC sTS8iVR','#7AFF7D','text','2025-04-27 04:47:53','2025-04-28 04:47:53','sticky',1,NULL,'SEED-TEST-DATA-USER-001',0),(88,'Prompt #4: mu634pKazWAZPShl0BdJpfTgDBSMSK','#7AFCFF','text','2025-04-27 04:47:53','2025-04-28 04:47:53','sticky',1,NULL,'SEED-TEST-DATA-USER-001',0),(89,'Prompt #5: Qz3eVg1dMMC4d4PMPqX8NrDOcZP6mW','#FEFF9C','text','2025-04-27 04:47:53','2025-04-28 04:47:53','sticky',1,NULL,'SEED-TEST-DATA-USER-001',0),(90,'Note #6: p5wbyi3TG t5oSkFelS3VyMmpephV4','#FF7EB9','text','2025-04-27 04:47:53','2025-04-28 04:47:53','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(91,'Note #7: JA6njYR355DE h SQLKKfYlMS8WT J','#7AFCFF','text','2025-04-27 04:47:53','2025-04-28 04:47:53','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(92,'Note #8: 6kbIyXBw7b KpjBKqCjvQUVJIB0uIX','#7AFF7D','text','2025-04-27 04:47:53','2025-04-28 04:47:53','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(93,'Note #9: gSmwTO11k2TZAppggvLfYMkfsfS9g0','#FF7EB9','text','2025-04-27 04:47:53','2025-04-28 04:47:53','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(94,'Note #10: ezQ1qolnYM0NdtBbE8pzpHK6NNbFz0','#FF7EB9','text','2025-04-27 04:47:53','2025-04-28 04:47:53','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(95,'Note #11: O8dNUiGykvjemAYiHMtjAC2zzBiU9Z','#7AFF7D','text','2025-04-27 04:47:53','2025-04-28 04:47:53','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(96,'Note #12: LeM8GefJRdHw4cMMlGBKwNHEqUKXSW','#FF7EB9','text','2025-04-27 04:47:53','2025-04-28 04:47:53','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(97,'Note #13: kMzWtPIlLPE9OE64BxKyfvYa85Cz C','#FF7EB9','text','2025-04-27 04:47:53','2025-04-28 04:47:53','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(98,'Note #14: 7XCH7GXYvlbR7yyjpD0lpEUdYJxUVx','#FEFF9C','text','2025-04-27 04:47:53','2025-04-28 04:47:53','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(99,'Note #15: VlIGqxPrnHreosruwdpLRo2PoLyHAj','#FF7EB9','text','2025-04-27 04:47:53','2025-04-28 04:47:53','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(100,'Note #16: n0daCqyThVcs9BzWSa2LGtNlp zsnl','#FF7EB9','text','2025-04-27 04:47:53','2025-04-28 04:47:53','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(101,'Note #17: BU3WPvs8qnMELLRKaKXwShBaZxPZ06','#7AFCFF','text','2025-04-27 04:47:53','2025-04-28 04:47:53','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(102,'Note #18: jhZXTtPSLBlUF7ONjwmeJ00lYiH4SO','#FF7EB9','text','2025-04-27 04:47:53','2025-04-28 04:47:53','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(103,'Note #19: 3IdUZbSW7BrNDiP27hqmChU8HaFIWp','#7AFCFF','text','2025-04-27 04:47:53','2025-04-28 04:47:53','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(104,'Note #20: dtLS9535jEPP7TP bxt7XV3uqzYN3t','#FF7EB9','text','2025-04-27 04:47:53','2025-04-28 04:47:53','sticky',0,NULL,'SEED-TEST-DATA-USER-001',0),(113,'Feeling pretty good today, thanks for asking.','#FF7EB9','text','2025-04-27 18:27:59','2025-04-28 18:27:59','sticky',0,2,'user-2',0),(114,'There once was a cat who ruled the moon.','#7AFCFF','text','2025-04-27 18:27:59','2025-04-28 18:27:59','sticky',0,3,'user-2',0),(115,'Pineapple does belong on pizza.','#7AFF7D','text','2025-04-27 18:27:59','2025-04-28 18:27:59','sticky',0,4,'user-2',0),(116,'Feeling overwhelmed, but hopeful.','#FF7EB9','text','2025-04-27 18:27:59','2025-04-28 18:27:59','sticky',0,2,'user-3',0),(117,'A robot woke up and asked: \"What is love?\"','#7AFCFF','text','2025-04-27 18:27:59','2025-04-28 18:27:59','sticky',0,3,'user-3',0),(118,'One of my socks vanished again...','#7AFF7D','text','2025-04-27 18:27:59','2025-04-28 18:27:59','sticky',0,4,'user-3',0),(119,'Today is just... quiet.','#FF7EB9','text','2025-04-27 18:27:59','2025-04-28 18:27:59','sticky',0,2,'user-4',0),(120,'The tree whispered secrets to the wind.','#7AFCFF','text','2025-04-27 18:27:59','2025-04-28 18:27:59','sticky',0,3,'user-4',0),(121,'Sometimes I wish the sky was green.','#7AFF7D','text','2025-04-27 18:27:59','2025-04-28 18:27:59','sticky',0,4,'user-4',0),(122,'Just grateful to be here.','#FF7EB9','text','2025-04-27 18:27:59','2025-04-28 18:27:59','sticky',0,2,'user-5',0),(123,'\"She opened the journal, and it blinked.\"','#7AFCFF','text','2025-04-27 18:27:59','2025-04-28 18:27:59','sticky',0,3,'user-5',0),(124,'Bananas and ketchup are surprisingly good.','#7AFF7D','text','2025-04-27 18:27:59','2025-04-28 18:27:59','sticky',0,4,'user-5',0),(125,'Honestly, I needed this prompt today.','#FF7EB9','text','2025-04-27 18:27:59','2025-04-28 18:27:59','sticky',0,2,'user-6',0),(126,'In a world without stars, she lit a candle.','#7AFCFF','text','2025-04-27 18:27:59','2025-04-28 18:27:59','sticky',0,3,'user-6',0),(127,'I forgot what I was doing halfway through.','#7AFF7D','text','2025-04-27 18:27:59','2025-04-28 18:27:59','sticky',0,4,'user-6',0),(133,'asdasd\n\nasdasd','#ffffcc','text','2025-04-27 22:52:02','2025-04-28 22:52:02','sticky',0,NULL,'system_user',0),(134,'asdasd\n\nasdasd','#ffffcc','text','2025-04-27 22:52:05','2025-04-28 22:52:05','sticky',0,NULL,'system_user',0),(135,'Test\n\nasdasdasdasd','#ccffcc','text','2025-04-27 22:52:10','2025-04-28 22:52:10','sticky',0,NULL,'system_user',0),(136,'asdasd\n\nasd','#ffffcc','text','2025-04-27 23:22:44','2025-04-28 23:22:44','sticky',0,NULL,'system_user',0),(137,'t\n\nttt','#ffccff','text','2025-04-27 23:22:49','2025-04-28 23:22:49','sticky',0,NULL,'system_user',0),(138,'test\n\ntetst','#ffffcc','text','2025-04-28 03:18:59','2025-04-29 03:18:59','sticky',0,NULL,'system_user',0),(139,'tetst\n\ntetet','#ffccff','text','2025-04-28 03:19:05','2025-04-29 03:19:05','sticky',0,NULL,'system_user',0),(140,'asdasd\n\nasd','#ffffcc','text','2025-04-28 04:43:34','2025-04-29 04:43:34','sticky',0,NULL,'system_user',0),(141,'asdasdasd\n\nasdasd','#ffffcc','text','2025-04-28 04:53:58','2025-04-29 04:53:58','sticky',0,NULL,'system_user',0),(142,'Test note\n\nasdiashdiashdciachscd','#ffccff','text','2025-04-28 05:20:40','2025-04-29 05:20:40','sticky',0,NULL,'system_user',0),(145,'ssssss\n\nssssssss','#ffffcc','text','2025-04-28 06:33:25','2025-04-29 06:33:25','sticky',0,NULL,'system_user',0),(146,'TEST ARCHIVE\n\nthis note is to test we can archive from the bulletin board','#ccffff','text','2025-04-28 06:34:50','2025-04-29 06:34:50','sticky',0,NULL,'system_user',0),(147,'Test note from Postman','#ffffcc','text','2025-04-28 06:42:34','2025-04-29 06:42:34','sticky',0,NULL,'system_user',0),(148,'Postman Prompt note created','#FFFFF3','text','2025-04-28 06:44:00','2025-04-29 06:44:00','sticky',1,NULL,'system_user',0),(149,'Postman Prompt note created','#FFFFF3','text','2025-04-28 06:44:13','2025-04-29 06:44:13','sticky',1,NULL,'system_user',0),(150,'tttesst\n\n','#ffccff','text','2025-04-28 07:06:17','2025-04-29 07:06:17','sticky',0,NULL,'system_user',0),(151,'bb\n\nbbb','#ccffff','text','2025-04-28 07:17:17','2025-04-29 07:17:17','sticky',0,NULL,'system_user',0),(152,'asd\n\nasdasd','#ffffcc','text','2025-04-28 07:42:12','2025-04-29 07:42:12','sticky',0,NULL,'system_user',0);
/*!40000 ALTER TABLE `Notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `user_id` varchar(255) NOT NULL,
  `session_token` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_active` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_agent` varchar(255) DEFAULT NULL,
  `ip_hash` varchar(64) DEFAULT NULL,
  `theme_preference` varchar(50) DEFAULT 'default',
  `board_background` varchar(255) DEFAULT 'default_corkboard.jpg',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `session_token` (`session_token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES ('SEED-TEST-DATA-USER-001','test-session-token','2025-04-23 19:32:02','2025-04-23 19:32:02','Python/3.x','dummyhash123','default','default_corkboard.jpg'),('system_user','system-token','2025-04-27 22:50:42','2025-04-28 07:42:12','System User','system','default','default_corkboard.jpg'),('user-2','token-2','2025-04-27 18:27:59','2025-04-27 18:27:59','Mozilla/5.0','536f1bf1f85cd42c27b830dcd2d1e87556ef3544b43e74d464f102d51d380c26','default','default_corkboard.jpg'),('user-3','token-3','2025-04-27 18:27:59','2025-04-27 18:27:59','Mozilla/5.0','3fbd83a8354d192c96e3576120c638d973ed8b2278274f83f087ba8f30a91492','default','default_corkboard.jpg'),('user-4','token-4','2025-04-27 18:27:59','2025-04-27 18:27:59','Mozilla/5.0','fda571205baed9625f1ceb9ae76e086e7809b1d67a8a408063ab3eba932bfeab','default','default_corkboard.jpg'),('user-5','token-5','2025-04-27 18:27:59','2025-04-27 18:27:59','Mozilla/5.0','09bf09ae4eaa5996a357cba8ae0289852770f9fe9c426cbf942a78224a98935a','default','default_corkboard.jpg'),('user-6','token-6','2025-04-27 18:27:59','2025-04-27 18:27:59','Mozilla/5.0','2657f32a50fe53485b1211ee39e1a490d2f357aa1a174c2dbc2a25c9f8f38657','default','default_corkboard.jpg'),('user-test-1','session-token-123','2025-04-23 14:29:03','2025-04-23 14:29:03','Mozilla/5.0','12ca17b49af2289436f303e0166030a21e525d266e209267433801a8fd4071a0','default','default_corkboard.jpg');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `yoyo_lock`
--

DROP TABLE IF EXISTS `yoyo_lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `yoyo_lock` (
  `locked` int NOT NULL DEFAULT '1',
  `ctime` timestamp NULL DEFAULT NULL,
  `pid` int NOT NULL,
  PRIMARY KEY (`locked`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `yoyo_lock`
--

LOCK TABLES `yoyo_lock` WRITE;
/*!40000 ALTER TABLE `yoyo_lock` DISABLE KEYS */;
/*!40000 ALTER TABLE `yoyo_lock` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-28  1:38:43
