-- MySQL dump 10.16  Distrib 10.1.48-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: mysqldb    Database: BOOKCOMMUNITY
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `BOOKS`
--

DROP TABLE IF EXISTS `BOOKS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BOOKS` (
  `IDBOOK` bigint NOT NULL AUTO_INCREMENT,
  `TITLE` varchar(255) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `AUTHOR` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `UPLOADER` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `CATEGORY` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `POSTER` varchar(512) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `DESCRIPTION` text CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `STATUS` int NOT NULL DEFAULT '0',
  `VIEW` bigint NOT NULL DEFAULT '0',
  `CREATEDAT` datetime DEFAULT NULL,
  `UPDATEDAT` datetime DEFAULT NULL,
  PRIMARY KEY (`IDBOOK`) USING BTREE,
  KEY `UPLOADER` (`UPLOADER`),
  KEY `CATEGORY` (`CATEGORY`),
  KEY `AUTHOR` (`AUTHOR`),
  CONSTRAINT `books_ibfk_1` FOREIGN KEY (`UPLOADER`) REFERENCES `USERS` (`USERNAME`),
  CONSTRAINT `books_ibfk_2` FOREIGN KEY (`CATEGORY`) REFERENCES `CATEGORY` (`IDCATEGORY`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BOOKS`
--

LOCK TABLES `BOOKS` WRITE;
/*!40000 ALTER TABLE `BOOKS` DISABLE KEYS */;
/*!40000 ALTER TABLE `BOOKS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CATEGORY`
--

DROP TABLE IF EXISTS `CATEGORY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CATEGORY` (
  `IDCATEGORY` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `CREATEDAT` datetime DEFAULT NULL,
  `UPDATEDAT` datetime DEFAULT NULL,
  PRIMARY KEY (`IDCATEGORY`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CATEGORY`
--

LOCK TABLES `CATEGORY` WRITE;
/*!40000 ALTER TABLE `CATEGORY` DISABLE KEYS */;
INSERT INTO `CATEGORY` VALUES ('AUDIO','Truyện Audio','2021-05-25 00:00:00','2021-05-25 00:00:00'),('IMAGE','Truyện Tranh','2021-05-25 00:00:00','2021-05-25 00:00:00'),('TEXT','Truyện Chữ','2021-05-25 00:00:00','2021-05-25 00:00:00');
/*!40000 ALTER TABLE `CATEGORY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `COMMENTS`
--

DROP TABLE IF EXISTS `COMMENTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `COMMENTS` (
  `IDCOMMENT` bigint NOT NULL AUTO_INCREMENT,
  `IDUSER` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `IDBOOK` bigint NOT NULL,
  `PARENT` bigint DEFAULT NULL,
  `CONTENT` text CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  PRIMARY KEY (`IDCOMMENT`),
  KEY `IDUSER` (`IDUSER`),
  KEY `IDBOOK` (`IDBOOK`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`IDUSER`) REFERENCES `USERS` (`USERNAME`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`IDBOOK`) REFERENCES `BOOKS` (`IDBOOK`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COMMENTS`
--

LOCK TABLES `COMMENTS` WRITE;
/*!40000 ALTER TABLE `COMMENTS` DISABLE KEYS */;
/*!40000 ALTER TABLE `COMMENTS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EPISODES`
--

DROP TABLE IF EXISTS `EPISODES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `EPISODES` (
  `IDEPISODE` bigint NOT NULL AUTO_INCREMENT,
  `IDBOOK` bigint NOT NULL,
  `INDEX` bigint NOT NULL,
  `NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `CONTENT` text CHARACTER SET utf8 COLLATE utf8_vietnamese_ci,
  `VIEW` int NOT NULL,
  `STATUS` int NOT NULL,
  `CREATEDAT` datetime NOT NULL,
  `UPDATEDAT` datetime NOT NULL,
  PRIMARY KEY (`IDEPISODE`),
  KEY `IDBOOK` (`IDBOOK`),
  CONSTRAINT `episodes_ibfk_1` FOREIGN KEY (`IDBOOK`) REFERENCES `BOOKS` (`IDBOOK`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EPISODES`
--

LOCK TABLES `EPISODES` WRITE;
/*!40000 ALTER TABLE `EPISODES` DISABLE KEYS */;
/*!40000 ALTER TABLE `EPISODES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LIKES`
--

DROP TABLE IF EXISTS `LIKES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LIKES` (
  `IDUSER` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `IDBOOK` bigint NOT NULL,
  `CREATEDAT` datetime DEFAULT NULL,
  `UPDATEDAT` datetime DEFAULT NULL,
  PRIMARY KEY (`IDUSER`,`IDBOOK`),
  KEY `IDBOOK` (`IDBOOK`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`IDUSER`) REFERENCES `USERS` (`USERNAME`),
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`IDBOOK`) REFERENCES `BOOKS` (`IDBOOK`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LIKES`
--

LOCK TABLES `LIKES` WRITE;
/*!40000 ALTER TABLE `LIKES` DISABLE KEYS */;
/*!40000 ALTER TABLE `LIKES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MODERATION_BOOKS`
--

DROP TABLE IF EXISTS `MODERATION_BOOKS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MODERATION_BOOKS` (
  `IDBOOK` bigint NOT NULL,
  `MODERATOR` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `MODERATION` bigint NOT NULL,
  `CONTENT` text CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `CREATEDAT` datetime DEFAULT NULL,
  `UPDATEDAT` datetime DEFAULT NULL,
  PRIMARY KEY (`IDBOOK`),
  KEY `MODERATOR` (`MODERATOR`),
  CONSTRAINT `moderations_ibfk_1` FOREIGN KEY (`IDBOOK`) REFERENCES `BOOKS` (`IDBOOK`),
  CONSTRAINT `moderations_ibfk_2` FOREIGN KEY (`MODERATOR`) REFERENCES `USERS` (`USERNAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MODERATION_BOOKS`
--

LOCK TABLES `MODERATION_BOOKS` WRITE;
/*!40000 ALTER TABLE `MODERATION_BOOKS` DISABLE KEYS */;
/*!40000 ALTER TABLE `MODERATION_BOOKS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MODERATION_EPISODES`
--

DROP TABLE IF EXISTS `MODERATION_EPISODES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MODERATION_EPISODES` (
  `IDEPISODE` bigint NOT NULL,
  `MODERATOR` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `MODERATION` bigint NOT NULL,
  `CONTENT` text CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `CREATEDAT` datetime DEFAULT NULL,
  `UPDATEDAT` datetime DEFAULT NULL,
  PRIMARY KEY (`IDEPISODE`,`MODERATOR`) USING BTREE,
  KEY `MODERATOR` (`MODERATOR`),
  CONSTRAINT `MODERATION_EPISODES_ibfk_1` FOREIGN KEY (`IDEPISODE`) REFERENCES `EPISODES` (`IDEPISODE`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `MODERATION_EPISODES_ibfk_2` FOREIGN KEY (`MODERATOR`) REFERENCES `USERS` (`USERNAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MODERATION_EPISODES`
--

LOCK TABLES `MODERATION_EPISODES` WRITE;
/*!40000 ALTER TABLE `MODERATION_EPISODES` DISABLE KEYS */;
/*!40000 ALTER TABLE `MODERATION_EPISODES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `POINTS`
--

DROP TABLE IF EXISTS `POINTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `POINTS` (
  `USERNAME` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `IDEPISODE` bigint NOT NULL,
  `CHARGE` bit(1) NOT NULL,
  `POINT` bigint NOT NULL,
  `CREATEDAT` datetime DEFAULT NULL,
  `UPDATEDAT` datetime DEFAULT NULL,
  PRIMARY KEY (`USERNAME`,`IDEPISODE`) USING BTREE,
  KEY `IDEPISODE` (`IDEPISODE`),
  CONSTRAINT `POINTS_ibfk_1` FOREIGN KEY (`IDEPISODE`) REFERENCES `EPISODES` (`IDEPISODE`),
  CONSTRAINT `POINTS_ibfk_2` FOREIGN KEY (`USERNAME`) REFERENCES `USERS` (`USERNAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `POINTS`
--

LOCK TABLES `POINTS` WRITE;
/*!40000 ALTER TABLE `POINTS` DISABLE KEYS */;
/*!40000 ALTER TABLE `POINTS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ROLE`
--

DROP TABLE IF EXISTS `ROLE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ROLE` (
  `IDROLE` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `CREATEDAT` datetime DEFAULT NULL,
  `UPDATEDAT` datetime DEFAULT NULL,
  PRIMARY KEY (`IDROLE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ROLE`
--

LOCK TABLES `ROLE` WRITE;
/*!40000 ALTER TABLE `ROLE` DISABLE KEYS */;
/*!40000 ALTER TABLE `ROLE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USERGROUP`
--

DROP TABLE IF EXISTS `USERGROUP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USERGROUP` (
  `IDGROUP` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `CREATEDAT` datetime DEFAULT NULL,
  `UPDATEDAT` datetime DEFAULT NULL,
  PRIMARY KEY (`IDGROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USERGROUP`
--

LOCK TABLES `USERGROUP` WRITE;
/*!40000 ALTER TABLE `USERGROUP` DISABLE KEYS */;
INSERT INTO `USERGROUP` VALUES ('ADMIN','Admin','2021-05-25 00:00:00','2021-05-25 00:00:00'),('MEMBER','Member','2021-05-25 00:00:00','2021-05-25 00:00:00'),('MODERATOR','Moderator','2021-05-25 00:00:00','2021-05-25 00:00:00'),('UPLOADER','Uploader','2021-05-25 00:00:00','2021-05-25 00:00:00');
/*!40000 ALTER TABLE `USERGROUP` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USERGROUP_ROLE`
--

DROP TABLE IF EXISTS `USERGROUP_ROLE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USERGROUP_ROLE` (
  `IDGROUP` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `IDROLE` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `CREATEDAT` datetime DEFAULT NULL,
  `UPDATEDAT` datetime DEFAULT NULL,
  PRIMARY KEY (`IDGROUP`,`IDROLE`),
  KEY `IDROLE` (`IDROLE`),
  CONSTRAINT `usergroup_role_ibfk_1` FOREIGN KEY (`IDGROUP`) REFERENCES `USERGROUP` (`IDGROUP`),
  CONSTRAINT `usergroup_role_ibfk_2` FOREIGN KEY (`IDROLE`) REFERENCES `ROLE` (`IDROLE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USERGROUP_ROLE`
--

LOCK TABLES `USERGROUP_ROLE` WRITE;
/*!40000 ALTER TABLE `USERGROUP_ROLE` DISABLE KEYS */;
/*!40000 ALTER TABLE `USERGROUP_ROLE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USERS`
--

DROP TABLE IF EXISTS `USERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USERS` (
  `USERNAME` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `EMAIL` varchar(255) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `PASSWORD` varchar(1024) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `GENDER` varchar(255) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `USERGROUP` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `BIRTHDAY` date NOT NULL,
  `AVATAR` varchar(512) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `POINT` bigint NOT NULL DEFAULT '0',
  `CREATEDAT` datetime NOT NULL,
  `UPDATEDAT` datetime NOT NULL,
  PRIMARY KEY (`USERNAME`),
  KEY `USERGROUP` (`USERGROUP`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`USERGROUP`) REFERENCES `USERGROUP` (`IDGROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USERS`
--

LOCK TABLES `USERS` WRITE;
/*!40000 ALTER TABLE `USERS` DISABLE KEYS */;
INSERT INTO `USERS` VALUES ('nhuquynhnt0711','nhuquynhnt0711@gmail.com','$2b$10$syi0GRZOLa9UH2Mxqp/TTeSVLuwluCyp/eE4//n4tWkVF4laQjvZi','Như Quỳnh','Nữ','member','2000-11-07','https://ui-avatars.com/api/?size=256&name=Như Quỳnh',0,'2021-05-25 11:43:25','2021-05-25 11:43:25');
/*!40000 ALTER TABLE `USERS` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-25 11:52:30
