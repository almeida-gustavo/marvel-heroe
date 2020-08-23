import { Sequelize, Op } from 'sequelize';

import User from '../models/User';

import paginationFormatter from './paginationFormatter';

module.exports = () => {
  const service = {};

  service.listUsers = async (req, res) => {
    let {
      page = 1,
      per_page: perPage = 10,
    } = req.query;
    if (Number(page) <= 0) page = 1;
    if (Number(perPage) < 0) perPage = 10;
    const {
      name, email,
    } = req.query;

    const whereItems = [];
    if (name && name.trim().length > 0) {
      whereItems.push(
        Sequelize.literal(`LOWER("User"."name") LIKE '%${name.toLowerCase()}%'`),
      );
    }

    if (email && email.trim().length > 0) {
      whereItems.push(
        Sequelize.literal(`LOWER("User"."email") LIKE '%${email.toLowerCase()}%'`),
      );
    }

    const where = { [Op.and]: whereItems };

    const users = await User.findAndCountAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password_hash'],
      },
      order: [['name', 'ASC']],
      where,
      limit: perPage,
      offset: (page - 1) * perPage,
    });

    const paginatedResults = paginationFormatter(
      users,
      page,
      perPage,
      users.count,
    );

    return res.status(200).send(paginatedResults);
  };

  service.findOneUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password_hash'],
      },
    });

    return res.status(200).send(user);
  };

  service.createUser = async (req, res) => {
    await User.create({ ...req.body });

    return res.status(201).send();
  };

  service.updateUser = async (req, res) => {
    const { userId } = req;

    const user = await User.findByPk(userId);

    user.update(req.body);

    return res.status(200).send();
  };

  return service;
};
