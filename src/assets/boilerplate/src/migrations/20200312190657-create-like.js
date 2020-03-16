module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("likes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      count: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "users"
          },
          key: "id"
        },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "posts"
          },
          key: "id"
        },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable("likes")
};
