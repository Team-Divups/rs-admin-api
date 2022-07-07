module.exports = (sequelize, Sequelize) => {
  const passwordReset = sequelize.define("passwordReset", {
    email: {
      type: Sequelize.STRING,
    },
    token: {
      type: Sequelize.STRING,
    },
  });

  return passwordReset;
};
