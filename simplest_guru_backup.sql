/*
SQLyog Community v13.3.0 (64 bit)
MySQL - 8.0.30 : Database - simplest_guru
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`simplest_guru` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `simplest_guru`;

/*Table structure for table `migrations` */

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `migrations` */

insert  into `migrations`(`id`,`timestamp`,`name`) values (1,1744919348676,'Init1744919348676');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `lastName` varchar(102) NOT NULL,
  `avatarUrl` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `isActive` tinyint NOT NULL DEFAULT '1',
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`lastName`,`avatarUrl`,`email`,`password`,`isActive`,`createdAt`,`updatedAt`,`deletedAt`) values (1,'John','Doe SMITH','https://example.com/avatar.jpg','jhondoe@gmail.com','$2b$10$dZ.5c9Zs5BinFXqRQ0OzCeIHf5Qt9P7.1H6wFvpWGoMmWZrjv.tW6',1,'2025-04-17 16:33:50.861379','2025-04-17 19:58:45.381779',NULL),(2,'Alice','Smith','https://randomuser.me/api/portraits/women/45.jpg','alice.smith@example.com','$2b$10$Tm6bJGs1zFuWo9vXjjDQce1LZnnraKvc30EXT3ry3oIYOkH.JzZCS',1,'2025-04-17 16:51:57.376172','2025-04-17 17:35:53.406498',NULL),(3,'Harold','Mosquera','https://ui-avatars.com/api/?name=Harol+Mosquera&background=random','harolmosquera@gmail.com','$2b$10$86ttmzTK492afOGy97P1OesWy2rHhGO32XfP83krF.UcYkAn.MEoe',1,'2025-04-17 19:27:25.429500','2025-04-17 19:27:25.429500',NULL),(4,'Daniela','Hernández','https://ui-avatars.com/api/?name=Daniela+Hernandez&background=random','daniela.hernandez@gmail.com','$2b$10$iBzf0l8llTKlVZDeBuINzOdxeLe9jgF8X5ZFHk0Q1mVIGkCYXWyuW',1,'2025-04-17 19:32:16.343849','2025-04-17 19:58:52.286090',NULL),(5,'Pedro','Ramírez','https://ui-avatars.com/api/?name=Carlos+Ramirez&background=random','carlos.ramirez@example.com','$2b$10$u9UbFzWHst6SkuQAIS2kPeJt7T1HUG.0nT2nTBXR7738jDIUumIyS',1,'2025-04-17 19:44:14.958520','2025-04-17 19:58:57.177462',NULL),(6,'Laura1','Gómez','https://ui-avatars.com/api/?name=Laura+Gómez&background=random','laura.gomez@example.com','$2b$10$dF/ZLFOLh6ivRx25ejtvfeUPkUuIO0YDjKc/bn7SqIV4peB3k17G2',1,'2025-04-17 20:02:25.426260','2025-04-17 20:07:42.000000',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
