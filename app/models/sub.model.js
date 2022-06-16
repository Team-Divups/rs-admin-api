module.exports = (sequelize, Sequelize) => {
  const Sub = sequelize.define("subs", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    descriptions: {
        type: Sequelize.STRING
    }
  });

  return Sub;
};
