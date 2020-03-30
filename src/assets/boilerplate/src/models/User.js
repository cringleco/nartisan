import Sequelize from "sequelize";

export default class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: { type: DataTypes.STRING, allowNull: true },
        googleId: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        refreshToken: {
          type: DataTypes.TEXT,
          allowNull: true
        }
      },
      {
        tableName: "users",
        modelName: "User",
        sequelize
      }
    );
  }

  static associate(models) {}
}
