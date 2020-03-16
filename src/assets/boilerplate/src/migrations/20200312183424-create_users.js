module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: { type: Sequelize.STRING, allowNull: true },
    googleId: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    refreshToken: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: new Date()
    }
  }),
  // eslint-disable-next-line
  down: (queryInterface, Sequelize) => queryInterface.dropTable("users")
};
