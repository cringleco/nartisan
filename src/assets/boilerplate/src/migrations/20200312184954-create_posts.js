module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('posts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    body: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: true
    },
    userId: {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'users'
        },
        key: 'id'
      },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable("posts")
};
