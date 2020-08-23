import User from '../models/User';
import UserFavoriteCharacter from '../models/UserFavoriteCharacter';

import FieldMessage from './helpers/fieldmessage';

const idValid = (id) => !(Number.isNaN(id)) && Number.isInteger(+id) && typeof id !== 'object';

module.exports = () => {
  const validations = {};

  validations.listFavoriteCharacters = async (req) => {
    const errors = [];
    const {
      page,
      per_page: perPage,
    } = req.query;
    const { userId } = req;

    const user = await User.findByPk(Number(userId));
    if (!user) {
      errors.push(new FieldMessage('userId', 'Non existing user'));
    }

    if (perPage && !idValid(perPage)) {
      errors.push(new FieldMessage('per_page', 'Parametro deve ser do tipo inteiro'));
    }

    if (page && !idValid(page)) {
      errors.push(new FieldMessage('page', 'Parametro deve ser do tipo inteiro'));
    }

    return errors;
  };

  validations.addFavoriteCharacter = async (req) => {
    const errors = [];

    const {
      characterId,
    } = req.params;

    const { userId } = req;

    const user = await User.findByPk(Number(userId));
    if (!user) {
      errors.push(new FieldMessage('userId', 'Non existing user'));
      return errors;
    }

    const existingCharacter = await UserFavoriteCharacter.findOne({
      where: { userId, characterId },
    });

    if (existingCharacter) {
      errors.push(new FieldMessage('characterId', 'You already favorited this character'));
    }

    return errors;
  };

  validations.removeFavoriteCharacter = async (req) => {
    const errors = [];

    const { userId } = req;
    const {
      characterId,
    } = req.params;

    const user = await User.findByPk(Number(userId));
    if (!user) {
      errors.push(new FieldMessage('id', 'Non existing user'));
      return errors;
    }

    const existingCharacter = await UserFavoriteCharacter.findOne({
      where: { userId, characterId },
    });

    if (!existingCharacter) {
      errors.push(new FieldMessage('characterId', 'You did not favored this character'));
    }

    return errors;
  };

  return validations;
};
