-- This dump includes data from migrations 00-04
-- It should have 19 notes total. 
-- 1 test note, 3 default prompts, and 15 responses to the prompts


-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: hic_project
-- ------------------------------------------------------
-- Server version	8.0.41

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
INSERT INTO `_yoyo_log` VALUES ('175c7b1f-1cc5-11f0-9fe9-e86538932a2d','0c0c753e86a0b372bd72293cfa92e3b379233713901da646c6d069e128a0af40','02-adding-test-data','apply','Jack','DESKTOP-5C0RT28',NULL,'2025-04-19 06:22:07'),('3d91215b-17e7-11f0-902b-107c61b5aecd','0c0c753e86a0b372bd72293cfa92e3b379233713901da646c6d069e128a0af40','02-adding-test-data','apply','Jack','DESKTOP-5C0RT28',NULL,'2025-04-13 01:44:00'),('41376edc-1803-11f0-957a-107c61b5aecd','0c0c753e86a0b372bd72293cfa92e3b379233713901da646c6d069e128a0af40','02-adding-test-data','rollback','Jack','DESKTOP-5C0RT28',NULL,'2025-04-13 05:04:32'),('4491d670-1cc5-11f0-a7b8-e86538932a2d','ddaed99b33d2a335babe87866a391c8056f55b3396c2a1bf46bfbd3b1b04bafe','03-adding-test-default-prompts','rollback','Jack','DESKTOP-5C0RT28',NULL,'2025-04-19 06:23:23'),('4decf221-1cc5-11f0-ac7a-e86538932a2d','ddaed99b33d2a335babe87866a391c8056f55b3396c2a1bf46bfbd3b1b04bafe','03-adding-test-default-prompts','apply','Jack','DESKTOP-5C0RT28',NULL,'2025-04-19 06:23:39'),('9e19143a-1805-11f0-9f89-107c61b5aecd','ddaed99b33d2a335babe87866a391c8056f55b3396c2a1bf46bfbd3b1b04bafe','03-adding-test-default-prompts','apply','Jack','DESKTOP-5C0RT28',NULL,'2025-04-13 05:21:26'),('d4760f64-1cc5-11f0-9eb1-e86538932a2d','ddff0b867b29673b76367ee79c8e51ffe844bf7087ed75d8d6a3bd812bee852e','04-adding-supplemental-data','apply','Jack','DESKTOP-5C0RT28',NULL,'2025-04-19 06:27:25'),('e8e0d270-1360-11f0-8533-e86538932a2d','90099e49a2186509641b80969c001aacc7328df90a7c8c45dc6ba589cb98184c','00-initial-schema','apply','Jack','DESKTOP-5C0RT28',NULL,'2025-04-07 07:32:19'),('e8e91c9b-1360-11f0-9df1-e86538932a2d','868532a6b5377b649dc62a459d9c6d2fc590350b61b4fd5b000563d727d451c7','01-initial-indexes','apply','Jack','DESKTOP-5C0RT28',NULL,'2025-04-07 07:32:19');
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
INSERT INTO `_yoyo_migration` VALUES ('0c0c753e86a0b372bd72293cfa92e3b379233713901da646c6d069e128a0af40','02-adding-test-data','2025-04-19 06:22:07'),('868532a6b5377b649dc62a459d9c6d2fc590350b61b4fd5b000563d727d451c7','01-initial-indexes','2025-04-07 07:32:19'),('90099e49a2186509641b80969c001aacc7328df90a7c8c45dc6ba589cb98184c','00-initial-schema','2025-04-07 07:32:19'),('ddaed99b33d2a335babe87866a391c8056f55b3396c2a1bf46bfbd3b1b04bafe','03-adding-test-default-prompts','2025-04-19 06:23:39'),('ddff0b867b29673b76367ee79c8e51ffe844bf7087ed75d8d6a3bd812bee852e','04-adding-supplemental-data','2025-04-19 06:27:25');
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
INSERT INTO `_yoyo_version` VALUES (2,'2025-04-07 07:31:55');
/*!40000 ALTER TABLE `_yoyo_version` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `note_states`
--

DROP TABLE IF EXISTS `note_states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `note_states` (
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
  CONSTRAINT `note_states_ibfk_1` FOREIGN KEY (`note_id`) REFERENCES `notes` (`note_id`) ON DELETE CASCADE,
  CONSTRAINT `note_states_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `note_states`
--

LOCK TABLES `note_states` WRITE;
/*!40000 ALTER TABLE `note_states` DISABLE KEYS */;
INSERT INTO `note_states` VALUES (105,105,'public',NULL,0.4,0.6,'2025-04-19 02:22:07',0,0,1.5),(106,106,'public',NULL,0.2,0.15,'2025-04-19 02:23:38',0,1,0),(107,107,'public',NULL,0.4,0.15,'2025-04-19 02:23:38',0,1,-1),(108,108,'public',NULL,0.6,0.15,'2025-04-19 02:23:38',0,1,2),(109,111,'public',NULL,0.47,0.35,'2025-04-19 02:27:24',0,1,5),(110,110,'public',NULL,0.7,0.76,'2025-04-19 02:27:24',0,1,1),(111,109,'public',NULL,0.66,0.71,'2025-04-19 02:27:24',0,1,-2.1),(112,114,'public',NULL,0.43,0.4,'2025-04-19 02:27:24',0,1,1.4),(113,113,'public',NULL,0.65,0.6,'2025-04-19 02:27:24',0,1,-0.4),(114,112,'public',NULL,0.74,0.66,'2025-04-19 02:27:24',0,1,1.4),(115,117,'public',NULL,0.39,0.83,'2025-04-19 02:27:24',0,1,-1.5),(116,116,'public',NULL,0.19,0.6,'2025-04-19 02:27:24',0,1,-3.6),(117,115,'public',NULL,0.26,0.66,'2025-04-19 02:27:24',0,1,-1.2),(118,120,'public',NULL,0.19,0.54,'2025-04-19 02:27:24',0,1,1.8),(119,119,'public',NULL,0.26,0.87,'2025-04-19 02:27:24',0,1,-3.3),(120,118,'public',NULL,0.11,0.62,'2025-04-19 02:27:24',0,1,1.3),(121,123,'public',NULL,0.54,0.82,'2025-04-19 02:27:24',0,1,1.8),(122,122,'public',NULL,0.72,0.83,'2025-04-19 02:27:24',0,1,-4.7),(123,121,'public',NULL,0.54,0.68,'2025-04-19 02:27:24',0,1,0.3);
/*!40000 ALTER TABLE `note_states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notes` (
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
  CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`prompt_id`) REFERENCES `notes` (`note_id`) ON DELETE SET NULL,
  CONSTRAINT `notes_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notes`
--

LOCK TABLES `notes` WRITE;
/*!40000 ALTER TABLE `notes` DISABLE KEYS */;
INSERT INTO `notes` VALUES (105,'This is a test sticky note!','#FEFF9C','text','2025-04-19 02:22:07','2025-04-20 02:22:07','sticky',0,NULL,'user-test-1',0),(106,'What’s on your mind today?','#FFFFF3','text','2025-04-19 02:23:38','2025-04-20 02:23:38','poster',1,NULL,'user-test-1',1),(107,'Write the world a story!','#FFFFF3','text','2025-04-19 02:23:38','2025-04-20 02:23:38','poster',1,NULL,'user-test-1',1),(108,'Share a random thought.','#FFFFF3','text','2025-04-19 02:23:38','2025-04-20 02:23:38','poster',1,NULL,'user-test-1',1),(109,'Feeling pretty good today, thanks for asking.','#FF7EB9','text','2025-04-19 02:27:24','2025-04-20 02:27:24','sticky',0,106,'user-2',0),(110,'There once was a cat who ruled the moon.','#7AFCFF','text','2025-04-19 02:27:24','2025-04-20 02:27:24','sticky',0,107,'user-2',0),(111,'Pineapple does belong on pizza.','#7AFF7D','text','2025-04-19 02:27:24','2025-04-20 02:27:24','sticky',0,108,'user-2',0),(112,'Feeling overwhelmed, but hopeful.','#FF7EB9','text','2025-04-19 02:27:24','2025-04-20 02:27:24','sticky',0,106,'user-3',0),(113,'A robot woke up and asked: \"What is love?\"','#7AFCFF','text','2025-04-19 02:27:24','2025-04-20 02:27:24','sticky',0,107,'user-3',0),(114,'One of my socks vanished again...','#7AFF7D','text','2025-04-19 02:27:24','2025-04-20 02:27:24','sticky',0,108,'user-3',0),(115,'Today is just... quiet.','#FF7EB9','text','2025-04-19 02:27:24','2025-04-20 02:27:24','sticky',0,106,'user-4',0),(116,'The tree whispered secrets to the wind.','#7AFCFF','text','2025-04-19 02:27:24','2025-04-20 02:27:24','sticky',0,107,'user-4',0),(117,'Sometimes I wish the sky was green.','#7AFF7D','text','2025-04-19 02:27:24','2025-04-20 02:27:24','sticky',0,108,'user-4',0),(118,'Just grateful to be here.','#FF7EB9','text','2025-04-19 02:27:24','2025-04-20 02:27:24','sticky',0,106,'user-5',0),(119,'\"She opened the journal, and it blinked.\"','#7AFCFF','text','2025-04-19 02:27:24','2025-04-20 02:27:24','sticky',0,107,'user-5',0),(120,'Bananas and ketchup are surprisingly good.','#7AFF7D','text','2025-04-19 02:27:24','2025-04-20 02:27:24','sticky',0,108,'user-5',0),(121,'Honestly, I needed this prompt today.','#FF7EB9','text','2025-04-19 02:27:24','2025-04-20 02:27:24','sticky',0,106,'user-6',0),(122,'In a world without stars, she lit a candle.','#7AFCFF','text','2025-04-19 02:27:24','2025-04-20 02:27:24','sticky',0,107,'user-6',0),(123,'I forgot what I was doing halfway through.','#7AFF7D','text','2025-04-19 02:27:24','2025-04-20 02:27:24','sticky',0,108,'user-6',0);
/*!40000 ALTER TABLE `notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
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
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('user-2','token-2','2025-04-19 02:27:24','2025-04-19 02:27:24','Mozilla/5.0','536f1bf1f85cd42c27b830dcd2d1e87556ef3544b43e74d464f102d51d380c26','default','default_corkboard.jpg'),('user-3','token-3','2025-04-19 02:27:24','2025-04-19 02:27:24','Mozilla/5.0','3fbd83a8354d192c96e3576120c638d973ed8b2278274f83f087ba8f30a91492','default','default_corkboard.jpg'),('user-4','token-4','2025-04-19 02:27:24','2025-04-19 02:27:24','Mozilla/5.0','fda571205baed9625f1ceb9ae76e086e7809b1d67a8a408063ab3eba932bfeab','default','default_corkboard.jpg'),('user-5','token-5','2025-04-19 02:27:24','2025-04-19 02:27:24','Mozilla/5.0','09bf09ae4eaa5996a357cba8ae0289852770f9fe9c426cbf942a78224a98935a','default','default_corkboard.jpg'),('user-6','token-6','2025-04-19 02:27:24','2025-04-19 02:27:24','Mozilla/5.0','2657f32a50fe53485b1211ee39e1a490d2f357aa1a174c2dbc2a25c9f8f38657','default','default_corkboard.jpg'),('user-test-1','session-token-123','2025-04-19 02:22:07','2025-04-19 02:22:07','Mozilla/5.0','12ca17b49af2289436f303e0166030a21e525d266e209267433801a8fd4071a0','default','default_corkboard.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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

-- Dump completed on 2025-04-18 22:56:23
