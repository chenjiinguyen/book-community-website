-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Máy chủ: book_mysql: 3306
-- Thời gian đã tạo: Th5 24, 2021 lúc 05:18 PM
-- Phiên bản máy phục vụ: 8.0.23
-- Phiên bản PHP: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `BOOKCOMMUNITY`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `BOOKS`
--

CREATE TABLE `BOOKS` (
  `IDBOOK` bigint NOT NULL,
  `TITLE` varchar(255) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `AUTHOR` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `UPLOADER` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `CATEGORY` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `POSTER` varchar(512) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `DESCRIPTION` text CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `STATUS` int NOT NULL DEFAULT '0',
  `VIEW` bigint NOT NULL DEFAULT '0',
  `CREATEDAT` datetime DEFAULT NULL,
  `UPDATEDAT` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `CATEGORY`
--

CREATE TABLE `CATEGORY` (
  `IDCATEGORY` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `CREATEDAT` datetime DEFAULT NULL,
  `UPDATEDAT` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `CATEGORY`
--

INSERT INTO `CATEGORY` (`IDCATEGORY`, `NAME`, `CREATEDAT`, `UPDATEDAT`) VALUES
('AUDIO', 'Truyện Audio', '2021-05-25 00:00:00', '2021-05-25 00:00:00'),
('IMAGE', 'Truyện Tranh', '2021-05-25 00:00:00', '2021-05-25 00:00:00'),
('TEXT', 'Truyện Chữ', '2021-05-25 00:00:00', '2021-05-25 00:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `COMMENTS`
--

CREATE TABLE `COMMENTS` (
  `IDCOMMENT` bigint NOT NULL,
  `IDUSER` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `IDBOOK` bigint NOT NULL,
  `PARENT` bigint DEFAULT NULL,
  `CONTENT` text CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `EPISODES`
--

CREATE TABLE `EPISODES` (
  `IDEPISODE` bigint NOT NULL,
  `IDBOOK` bigint NOT NULL,
  `INDEX` bigint NOT NULL,
  `NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `CONTENT` text CHARACTER SET utf8 COLLATE utf8_vietnamese_ci,
  `VIEW` int NOT NULL,
  `STATUS` int NOT NULL,
  `CREATEDAT` datetime NOT NULL,
  `UPDATEDAT` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `LIKES`
--

CREATE TABLE `LIKES` (
  `IDUSER` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `IDBOOK` bigint NOT NULL,
  `CREATEDAT` datetime DEFAULT NULL,
  `UPDATEDAT` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `MODERATION_BOOKS`
--

CREATE TABLE `MODERATION_BOOKS` (
  `IDBOOK` bigint NOT NULL,
  `MODERATOR` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `MODERATION` bigint NOT NULL,
  `CONTENT` text CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `CREATEDAT` datetime DEFAULT NULL,
  `UPDATEDAT` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `MODERATION_EPISODES`
--

CREATE TABLE `MODERATION_EPISODES` (
  `IDEPISODE` bigint NOT NULL,
  `MODERATOR` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `MODERATION` bigint NOT NULL,
  `CONTENT` text CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `CREATEDAT` datetime DEFAULT NULL,
  `UPDATEDAT` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `POINTS`
--

CREATE TABLE `POINTS` (
  `USERNAME` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `IDEPISODE` bigint NOT NULL,
  `CHARGE` bit(1) NOT NULL,
  `POINT` bigint NOT NULL,
  `CREATEDAT` datetime DEFAULT NULL,
  `UPDATEDAT` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ROLE`
--

CREATE TABLE `ROLE` (
  `IDROLE` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `CREATEDAT` datetime DEFAULT NULL,
  `UPDATEDAT` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `USERGROUP`
--

CREATE TABLE `USERGROUP` (
  `IDGROUP` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `CREATEDAT` datetime DEFAULT NULL,
  `UPDATEDAT` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `USERGROUP`
--

INSERT INTO `USERGROUP` (`IDGROUP`, `NAME`, `CREATEDAT`, `UPDATEDAT`) VALUES
('ADMIN', 'Admin', '2021-05-25 00:00:00', '2021-05-25 00:00:00'),
('MEMBER', 'Member', '2021-05-25 00:00:00', '2021-05-25 00:00:00'),
('MODERATOR', 'Moderator', '2021-05-25 00:00:00', '2021-05-25 00:00:00'),
('UPLOADER', 'Uploader', '2021-05-25 00:00:00', '2021-05-25 00:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `USERGROUP_ROLE`
--

CREATE TABLE `USERGROUP_ROLE` (
  `IDGROUP` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `IDROLE` varchar(50) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `CREATEDAT` datetime DEFAULT NULL,
  `UPDATEDAT` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `USERS`
--

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
  `UPDATEDAT` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `USERS`
--

INSERT INTO `USERS` (`USERNAME`, `EMAIL`, `PASSWORD`, `NAME`, `GENDER`, `USERGROUP`, `BIRTHDAY`, `AVATAR`, `POINT`, `CREATEDAT`, `UPDATEDAT`) VALUES
('chenjinguyen', 'duyntp2000@gmail.com', 'ngusaonoi', 'Nguyễn Duy', 'Nam', 'member', '2000-10-20', 'https://ui-avatars.com/api/?size=256&name=Nguyễn Duy', 0, '2021-05-24 17:14:28', '2021-05-24 17:14:28');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `BOOKS`
--
ALTER TABLE `BOOKS`
  ADD PRIMARY KEY (`IDBOOK`) USING BTREE,
  ADD KEY `UPLOADER` (`UPLOADER`),
  ADD KEY `CATEGORY` (`CATEGORY`),
  ADD KEY `AUTHOR` (`AUTHOR`);

--
-- Chỉ mục cho bảng `CATEGORY`
--
ALTER TABLE `CATEGORY`
  ADD PRIMARY KEY (`IDCATEGORY`) USING BTREE;

--
-- Chỉ mục cho bảng `COMMENTS`
--
ALTER TABLE `COMMENTS`
  ADD PRIMARY KEY (`IDCOMMENT`),
  ADD KEY `IDUSER` (`IDUSER`),
  ADD KEY `IDBOOK` (`IDBOOK`);

--
-- Chỉ mục cho bảng `EPISODES`
--
ALTER TABLE `EPISODES`
  ADD PRIMARY KEY (`IDEPISODE`),
  ADD KEY `IDBOOK` (`IDBOOK`);

--
-- Chỉ mục cho bảng `LIKES`
--
ALTER TABLE `LIKES`
  ADD PRIMARY KEY (`IDUSER`,`IDBOOK`),
  ADD KEY `IDBOOK` (`IDBOOK`);

--
-- Chỉ mục cho bảng `MODERATION_BOOKS`
--
ALTER TABLE `MODERATION_BOOKS`
  ADD PRIMARY KEY (`IDBOOK`),
  ADD KEY `MODERATOR` (`MODERATOR`);

--
-- Chỉ mục cho bảng `MODERATION_EPISODES`
--
ALTER TABLE `MODERATION_EPISODES`
  ADD PRIMARY KEY (`IDEPISODE`,`MODERATOR`) USING BTREE,
  ADD KEY `MODERATOR` (`MODERATOR`);

--
-- Chỉ mục cho bảng `POINTS`
--
ALTER TABLE `POINTS`
  ADD PRIMARY KEY (`USERNAME`,`IDEPISODE`) USING BTREE,
  ADD KEY `IDEPISODE` (`IDEPISODE`);

--
-- Chỉ mục cho bảng `ROLE`
--
ALTER TABLE `ROLE`
  ADD PRIMARY KEY (`IDROLE`);

--
-- Chỉ mục cho bảng `USERGROUP`
--
ALTER TABLE `USERGROUP`
  ADD PRIMARY KEY (`IDGROUP`);

--
-- Chỉ mục cho bảng `USERGROUP_ROLE`
--
ALTER TABLE `USERGROUP_ROLE`
  ADD PRIMARY KEY (`IDGROUP`,`IDROLE`),
  ADD KEY `IDROLE` (`IDROLE`);

--
-- Chỉ mục cho bảng `USERS`
--
ALTER TABLE `USERS`
  ADD PRIMARY KEY (`USERNAME`),
  ADD KEY `USERGROUP` (`USERGROUP`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `BOOKS`
--
ALTER TABLE `BOOKS`
  MODIFY `IDBOOK` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `COMMENTS`
--
ALTER TABLE `COMMENTS`
  MODIFY `IDCOMMENT` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `EPISODES`
--
ALTER TABLE `EPISODES`
  MODIFY `IDEPISODE` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `BOOKS`
--
ALTER TABLE `BOOKS`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`UPLOADER`) REFERENCES `USERS` (`USERNAME`),
  ADD CONSTRAINT `books_ibfk_2` FOREIGN KEY (`CATEGORY`) REFERENCES `CATEGORY` (`IDCATEGORY`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Các ràng buộc cho bảng `COMMENTS`
--
ALTER TABLE `COMMENTS`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`IDUSER`) REFERENCES `USERS` (`USERNAME`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`IDBOOK`) REFERENCES `BOOKS` (`IDBOOK`);

--
-- Các ràng buộc cho bảng `EPISODES`
--
ALTER TABLE `EPISODES`
  ADD CONSTRAINT `episodes_ibfk_1` FOREIGN KEY (`IDBOOK`) REFERENCES `BOOKS` (`IDBOOK`);

--
-- Các ràng buộc cho bảng `LIKES`
--
ALTER TABLE `LIKES`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`IDUSER`) REFERENCES `USERS` (`USERNAME`),
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`IDBOOK`) REFERENCES `BOOKS` (`IDBOOK`);

--
-- Các ràng buộc cho bảng `MODERATION_BOOKS`
--
ALTER TABLE `MODERATION_BOOKS`
  ADD CONSTRAINT `moderations_ibfk_1` FOREIGN KEY (`IDBOOK`) REFERENCES `BOOKS` (`IDBOOK`),
  ADD CONSTRAINT `moderations_ibfk_2` FOREIGN KEY (`MODERATOR`) REFERENCES `USERS` (`USERNAME`);

--
-- Các ràng buộc cho bảng `MODERATION_EPISODES`
--
ALTER TABLE `MODERATION_EPISODES`
  ADD CONSTRAINT `MODERATION_EPISODES_ibfk_1` FOREIGN KEY (`IDEPISODE`) REFERENCES `EPISODES` (`IDEPISODE`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `MODERATION_EPISODES_ibfk_2` FOREIGN KEY (`MODERATOR`) REFERENCES `USERS` (`USERNAME`);

--
-- Các ràng buộc cho bảng `POINTS`
--
ALTER TABLE `POINTS`
  ADD CONSTRAINT `POINTS_ibfk_1` FOREIGN KEY (`IDEPISODE`) REFERENCES `EPISODES` (`IDEPISODE`),
  ADD CONSTRAINT `POINTS_ibfk_2` FOREIGN KEY (`USERNAME`) REFERENCES `USERS` (`USERNAME`);

--
-- Các ràng buộc cho bảng `USERGROUP_ROLE`
--
ALTER TABLE `USERGROUP_ROLE`
  ADD CONSTRAINT `usergroup_role_ibfk_1` FOREIGN KEY (`IDGROUP`) REFERENCES `USERGROUP` (`IDGROUP`),
  ADD CONSTRAINT `usergroup_role_ibfk_2` FOREIGN KEY (`IDROLE`) REFERENCES `ROLE` (`IDROLE`);

--
-- Các ràng buộc cho bảng `USERS`
--
ALTER TABLE `USERS`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`USERGROUP`) REFERENCES `USERGROUP` (`IDGROUP`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
