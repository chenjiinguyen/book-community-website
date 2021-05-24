/*
 Navicat Premium Data Transfer

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : localhost:3306
 Source Schema         : BOOKCOMMUNITY

 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001

 Date: 24/05/2021 22:51:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for BOOKS
-- ----------------------------
DROP TABLE IF EXISTS `BOOKS`;
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

-- ----------------------------
-- Table structure for CATEGORY
-- ----------------------------
DROP TABLE IF EXISTS `CATEGORY`;
CREATE TABLE `CATEGORY` (
  `IDCATEGORY` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `CREATEDAT` datetime DEFAULT NULL,
  `UPDATEDAT` datetime DEFAULT NULL,
  PRIMARY KEY (`IDCATEGORY`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- ----------------------------
-- Table structure for COMMENTS
-- ----------------------------
DROP TABLE IF EXISTS `COMMENTS`;
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

-- ----------------------------
-- Table structure for EPISODES
-- ----------------------------
DROP TABLE IF EXISTS `EPISODES`;
CREATE TABLE `EPISODES` (
  `IDEPISODE` bigint NOT NULL AUTO_INCREMENT,
  `IDBOOK` bigint NOT NULL,
  `INDEX` bigint NOT NULL,
  `NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `CONTENT` text COLLATE utf8_vietnamese_ci,
  `VIEW` int NOT NULL,
  `STATUS` int NOT NULL,
  `CREATEDAT` datetime NOT NULL,
  `UPDATEDAT` datetime NOT NULL,
  PRIMARY KEY (`IDEPISODE`),
  KEY `IDBOOK` (`IDBOOK`),
  CONSTRAINT `episodes_ibfk_1` FOREIGN KEY (`IDBOOK`) REFERENCES `BOOKS` (`IDBOOK`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- ----------------------------
-- Table structure for LIKES
-- ----------------------------
DROP TABLE IF EXISTS `LIKES`;
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

-- ----------------------------
-- Table structure for MODERATION_BOOKS
-- ----------------------------
DROP TABLE IF EXISTS `MODERATION_BOOKS`;
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

-- ----------------------------
-- Table structure for MODERATION_EPISODES
-- ----------------------------
DROP TABLE IF EXISTS `MODERATION_EPISODES`;
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

-- ----------------------------
-- Table structure for POINTS
-- ----------------------------
DROP TABLE IF EXISTS `POINTS`;
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

-- ----------------------------
-- Table structure for ROLE
-- ----------------------------
DROP TABLE IF EXISTS `ROLE`;
CREATE TABLE `ROLE` (
  `IDROLE` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `CREATEDAT` datetime DEFAULT NULL,
  `UPDATEDAT` datetime DEFAULT NULL,
  PRIMARY KEY (`IDROLE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- ----------------------------
-- Table structure for USERGROUP
-- ----------------------------
DROP TABLE IF EXISTS `USERGROUP`;
CREATE TABLE `USERGROUP` (
  `IDGROUP` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `CREATEDAT` datetime DEFAULT NULL,
  `UPDATEDAT` datetime DEFAULT NULL,
  PRIMARY KEY (`IDGROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- ----------------------------
-- Table structure for USERGROUP_ROLE
-- ----------------------------
DROP TABLE IF EXISTS `USERGROUP_ROLE`;
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

-- ----------------------------
-- Table structure for USERS
-- ----------------------------
DROP TABLE IF EXISTS `USERS`;
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

SET FOREIGN_KEY_CHECKS = 1;
