import Sequelize, { Model } from 'sequelize';

class UserFavoriteComic extends Model {
  static init(sequelize) {
    super.init({
      comicId: Sequelize.STRING,
    }, {
      sequelize,
    });
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  }
}

export default UserFavoriteComic;
