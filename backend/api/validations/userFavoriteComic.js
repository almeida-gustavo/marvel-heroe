import User from '../models/User';
import UserFavoriteComic from '../models/UserFavoriteComic';

import FieldMessage from './helpers/fieldmessage';

const idValid = (id) => !(Number.isNaN(id)) && Number.isInteger(+id) && typeof id !== 'object';

module.exports = () => {
  const validations = {};

  validations.listFavoriteComics = async (req) => {
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

  validations.addFavoriteComic = async (req) => {
    const errors = [];

    const {
      comicId,
    } = req.params;

    const { userId } = req;

    const user = await User.findByPk(Number(userId));
    if (!user) {
      errors.push(new FieldMessage('userId', 'Non existing user'));
      return errors;
    }

    const existingComic = await UserFavoriteComic.findOne({
      where: { userId, comicId },
    });

    if (existingComic) {
      errors.push(new FieldMessage('comicId', 'You already favorited this Comic'));
    }

    return errors;
  };

  validations.removeFavoriteComic = async (req) => {
    const errors = [];

    const { userId } = req;
    const {
      comicId,
    } = req.params;

    const user = await User.findByPk(Number(userId));
    if (!user) {
      errors.push(new FieldMessage('id', 'Non existing user'));
      return errors;
    }

    const existingComic = await UserFavoriteComic.findOne({
      where: { userId, comicId },
    });

    if (!existingComic) {
      errors.push(new FieldMessage('ComicId', 'You already did not favored this Comic'));
    }

    return errors;
  };

  return validations;
};
