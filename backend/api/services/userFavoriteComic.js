import User from '../models/User';
import UserFavoriteComic from '../models/UserFavoriteComic';

import paginationFormatter from './paginationFormatter';

module.exports = () => {
  const service = {};

  service.listFavoriteComics = async (req, res) => {
    let {
      page = 1,
      per_page: perPage = 10,
    } = req.query;
    if (Number(page) <= 0) page = 1;
    if (Number(perPage) < 0) perPage = 10;

    const { userId } = req;

    const favoriteComics = await UserFavoriteComic.findAndCountAll({
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
      favoriteComics,
      page,
      perPage,
      favoriteComics.count,
    );

    return res.status(200).send(paginatedResults);
  };

  service.addFavoriteComic = async (req, res) => {
    const { userId } = req;
    const { comicId } = req.params;
    await UserFavoriteComic.create({ userId, comicId });

    return res.status(201).send();
  };

  service.removeFavoriteComic = async (req, res) => {
    const { userId } = req;
    const { comicId } = req.params;
    await UserFavoriteComic.destroy({
      where: {
        userId, comicId,
      },
    });

    return res.status(204).send();
  };

  return service;
};
