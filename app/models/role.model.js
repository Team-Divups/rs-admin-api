module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("roles", {
    idrole: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roleName: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  });

  return Role;
};

// CREATE TABLE `role` (
//   `idrole` int NOT NULL AUTO_INCREMENT,
//   `roleName` varchar(45) NOT NULL,
//   `description` varchar(45) NOT NULL,
//   `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
//   PRIMARY KEY (`idrole`)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
