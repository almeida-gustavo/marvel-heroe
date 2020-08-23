import User from '../models/User';
import UserFavoriteCharacter from '../models/UserFavoriteCharacter';

import paginationFormatter from './paginationFormatter';

module.exports = () => {
  const service = {};

  service.listFavoriteCharacters = async (req, res) => {
    let {
      page = 1,
      per_page: perPage = 10,
    } = req.query;
    if (Number(page) <= 0) page = 1;
    if (Number(perPage) < 0) perPage = 10;

    const { userId } = req;

    const favoriteCharacters = await UserFavoriteCharacter.findAndCountAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password_hash'],
          },
          where: { id: userId },
        },
      ],
      limit: perPage,
      offset: (page - 1) * perPage,
    });

    const paginatedResults = paginationFormatter(
      favoriteCharacters,
      page,
      perPage,
      favoriteCharacters.count,
    );

    return res.status(200).send(paginatedResults);
  };

  service.addFavoriteCharacter = async (req, res) => {
    const { userId } = req;
    const { characterId } = req.params;
    await UserFavoriteCharacter.create({ userId, characterId });

    return res.status(201).send();
  };

  service.removeFavoriteCharacter = async (req, res) => {
    const { userId } = req;
    const { characterId } = req.params;
    await UserFavoriteCharacter.destroy({
      where: {
        userId, characterId,
      },
    });

    return res.status(204).send();
  };

  return service;
};
