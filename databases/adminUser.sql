CREATE TABLE `user` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `password` varchar(20) NOT NULL,
  `companyID` char(8) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `role` int DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `position` varchar(45) NOT NULL,
  `userImg` text,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `companyID_UNIQUE` (`companyID`),
  KEY `role_idx` (`role`),
  CONSTRAINT `role` FOREIGN KEY (`role`) REFERENCES `role` (`idrole`)
);

ALTER TABLE bsadmin.`user` ADD email varchar(100) NOT NULL;
ALTER TABLE bsadmin.`user` MODIFY COLUMN status varchar(10) NULL;
ALTER TABLE bsadmin.`user` MODIFY COLUMN status BOOL DEFAULT FALSE NULL;
