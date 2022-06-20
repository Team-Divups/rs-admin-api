module.exports = (sequelize, Sequelize) => {
  const Subscription = sequelize.define("subscription", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    subId: {
      type: Sequelize.CHAR(100),
    },
    name: {
      type: Sequelize.STRING,
    },
    appLogo: {
      type: Sequelize.STRING,
    },
    owner: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    WebsiteURL: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    contactNo: {
      type: Sequelize.STRING,
    },
    LinkedIn: {
      type: Sequelize.STRING,
    },
    facebook: {
      type: Sequelize.STRING,
    },
    Instagram: {
      type: Sequelize.STRING,
    },
    category: {
      type: Sequelize.ENUM,
      values: ["Platinum", "Gold", "Silver"],
      defaultValue: "Silver",
    },
    type: {
      type: Sequelize.STRING,
    },
    location: {
      type: Sequelize.STRING,
    },
  });

  return Subscription;
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
