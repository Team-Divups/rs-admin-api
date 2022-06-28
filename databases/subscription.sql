CREATE TABLE `subscription` (
  `idSubscription` int NOT NULL AUTO_INCREMENT,
  `subId` char(8) NOT NULL,
  `name` varchar(45) NOT NULL,
  `appLogo` text,
  `owner` varchar(45) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `type` varchar(45) NOT NULL,
  `category` varchar(45) NOT NULL,
  `WebsiteURL` varchar(500) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `contactNo` varchar(45) DEFAULT NULL,
  `LinkedIn` varchar(500) DEFAULT NULL,
  `facebook` varchar(500) DEFAULT NULL,
  `Instagram` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`idSubscription`),
) ;

COLLATE='utf8mb3_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=7
;

ALTER TABLE bsadmin.subscription CHANGE idSubscription id int auto_increment NOT NULL;
