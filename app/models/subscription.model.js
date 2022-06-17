module.exports = (sequelize, Sequelize) => {
  const subscription = sequelize.define("subscription", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    subscription: {
      type: Sequelize.STRING
    },
    category: {
      type: Sequelize.ENUM,
      values: ['platinum','gold','silver'],
      defaultValue: 'silver'
    },
    type: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    }
  });

  return subscription;
};

// CREATE TABLE `subscription` (
//   `idSubscription` int NOT NULL AUTO_INCREMENT,
//   `subId` char(8) NOT NULL,
//   `name` varchar(45) NOT NULL,
//   `appLogo` text,
//   `owner` varchar(45) NOT NULL,
//   `description` varchar(200) DEFAULT NULL,
//   `location` varchar(45) DEFAULT NULL,
//   `type` varchar(45) NOT NULL,
//   `category` varchar(45) NOT NULL,
//   `WebsiteURL` varchar(500) DEFAULT NULL,
//   `email` varchar(45) DEFAULT NULL,
//   `contactNo` varchar(45) DEFAULT NULL,
//   `LinkedIn` varchar(500) DEFAULT NULL,
//   `facebook` varchar(500) DEFAULT NULL,
//   `Instagram` varchar(500) DEFAULT NULL,
//   PRIMARY KEY (`idSubscription`),
//   UNIQUE KEY `subId_UNIQUE` (`subId`)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
