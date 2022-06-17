module.exports = (sequelize, Sequelize) => {
      const Site = sequelize.define("site", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    cateogry: {
        type: Sequelize.STRING
    }
  });

  return Site;
};

// CREATE TABLE `site` (
//   `idsite` int NOT NULL AUTO_INCREMENT,
//   `name` varchar(45) NOT NULL,
//   `description` varchar(200) DEFAULT NULL,
//   `idSubscription` int DEFAULT NULL,
//   `cateogry` varchar(45) NOT NULL,
//   PRIMARY KEY (`idsite`),
//   UNIQUE KEY `description_UNIQUE` (`description`),
//   KEY `subId_idx` (`idSubscription`),
//   CONSTRAINT `idSubscription` FOREIGN KEY (`idSubscription`) REFERENCES `subscription` (`idSubscription`)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;