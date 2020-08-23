import Sequelize, { Model } from 'sequelize';

class UserFavoriteCharacter extends Model {
  static init(sequelize) {
    super.init({
      characterId: Sequelize.STRING,
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

export default UserFavoriteCharacter;
