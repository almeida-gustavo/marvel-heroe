import * as Yup from 'yup';

import User from '../models/User';

import FieldMessage from './helpers/fieldmessage';

const idValid = (id) => !(Number.isNaN(id)) && Number.isInteger(+id) && typeof id !== 'object';

const passwordRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';

module.exports = () => {
  const validations = {};

  validations.listUsers = async (req) => {
    const errors = [];
    const {
      page,
      per_page: perPage,
    } = req.query;

    if (perPage && !idValid(perPage)) {
      errors.push(new FieldMessage('per_page', 'Parameter must be integer'));
    }

    if (page && !idValid(page)) {
      errors.push(new FieldMessage('page', 'Parameter must be integer'));
    }

    return errors;
  };

  validations.findOneUser = async (req) => {
    const errors = [];

    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      errors.push(new FieldMessage('id', 'Non existing user'));
    }

    return errors;
  };

  validations.createUser = async (req) => {
    const errors = [];

    const {
      email, password,
    } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().strict().required('Required Field').test('name', 'Name can not have only blank spaces', (val) => val.trim().length !== 0),
      email: Yup.string().email('Invalid email format').strict()
        .required('Required Field'),
      password: Yup.string().strict().required('Required Field'),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      err.inner.forEach((error) => {
        errors.push(new FieldMessage(error.path, error.message));
      });
      return errors;
    }

    if (!password.match(passwordRegex)) {
      errors.push(new FieldMessage('password', 'Incorect Value, it has to have at least eight characters, at least one uppercase letter, one lowercase letter and one number'));
    }

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      errors.push(new FieldMessage('email', 'There is already a user with this email'));
    }

    return errors;
  };

  validations.updateUser = async (req) => {
    const errors = [];

    const { userId } = req;
    const {
      password, email,
    } = req.body;

    const user = await User.findByPk(Number(userId));
    if (!user) {
      errors.push(new FieldMessage('id', 'No user with this id'));
    }

    const schema = Yup.object().shape({
      name: Yup.string().strict().test('name', 'Name can not have only blank spaces', (val) => val && val.trim().length !== 0),
      email: Yup.string().email('Invalid email format').strict(),
      password: Yup.string().strict(),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      err.inner.forEach((error) => {
        errors.push(new FieldMessage(error.path, error.message));
      });
      return errors;
    }

    if (password) {
      if (!password.match(passwordRegex)) {
        errors.push(new FieldMessage('password', 'Incorect Value, it has to have at least eight characters, at least one uppercase letter, one lowercase letter and one number'));
      }
    }

    if (email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser && Number(userId) !== existingUser.id) {
        errors.push(new FieldMessage('email', 'There is already a user with this email'));
        return errors;
      }
    }

    return errors;
  };

  return validations;
};
