import * as Yup from 'yup';
import FieldMessage from './helpers/fieldmessage';
import User from '../models/User';

module.exports = () => {
  const validations = {};

  validations.login = async (req) => {
    const errors = [];

    const schema = Yup.object().shape({
      email: Yup.string().required('Required Field').email('Invalid format'),
      password: Yup.string()
        .required('Required Field')
        .min(8, 'Min of 8 characters'),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      err.inner.forEach((error) => {
        errors.push(new FieldMessage(error.path, error.message));
      });
      return errors;
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      errors.push(new FieldMessage('login', 'E-mail or password invalid'));
      return errors;
    }

    if (!(await user.checkPassword(password))) {
      errors.push(new FieldMessage('login', 'E-mail or password invalid'));
    }

    return errors;
  };

  return validations;
};
