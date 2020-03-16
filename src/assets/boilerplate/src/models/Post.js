import Sequelize from 'sequelize';

export default class Post extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        body: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        title: {
          type: DataTypes.STRING,
          allowNull: true
        }
      },
      {
        tableName: 'posts',
        modelName: 'Post',
        sequelize
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId' });
    this.hasMany(models.Like, { foreignKey: 'postId' });
  }
}
