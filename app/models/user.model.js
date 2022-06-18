module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
        firstname: {
      type: Sequelize.STRING
    },
        lastname: {
      type: Sequelize.STRING
    },
        position: {
      type: Sequelize.STRING
    },
        companyname: {
      type: Sequelize.STRING
    }
  });

  return User;
};

// CREATE TABLE `user` (
//   `userId` int NOT NULL AUTO_INCREMENT,
//   `password` varchar(20) NOT NULL,
//   `companyID` char(8) NOT NULL,
//   `firstName` varchar(45) NOT NULL,
//   `lastName` varchar(45) NOT NULL,
//   `role` int DEFAULT NULL,
//   `status` tinyint DEFAULT NULL,
//   `position` varchar(45) NOT NULL,
//   `userImg` text,
//   PRIMARY KEY (`userId`),
//   UNIQUE KEY `companyID_UNIQUE` (`companyID`),
//   KEY `role_idx` (`role`),
//   CONSTRAINT `role` FOREIGN KEY (`role`) REFERENCES `role` (`idrole`)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;