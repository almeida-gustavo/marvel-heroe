import jwt from 'jsonwebtoken';

import User from '../models/User';

module.exports = () => {
  const controller = {};

  controller.login = async (req, res) => {
    const { email } = req.body;
    const { id } = await User.findOne({
      where: { email },
    });

    const token = jwt.sign({ userId: id }, process.env.SECRET, {
      expiresIn: process.env.EXPIRES_IN,
    });

    res.setHeader('X-Authorization', token);

    return res.status(201).send();
  };

  return controller;
};
