
import Sequelize from 'sequelize';

export default class Like extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        count: DataTypes.INTEGER
      },
      {
        tableName: 'likes',
        modelName: 'Like',
        sequelize
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Post, { foreignKey: 'postId' });
    this.belongsTo(models.User, { foreignKey: 'userId' });
  }
}
