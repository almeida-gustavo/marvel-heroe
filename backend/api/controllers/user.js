import config from 'config';
import ValidateExceptionns from '../exceptions/validate';
import authMiddleware from '../middlewares/auth';

module.exports = (app) => {
  const services = app.services.user;
  const validations = app.validations.user;

  const baseURL = `${config.get('base_url')}/users`;

  const baseValidateAndControllerCall = async (serviceName, req, res) => {
    const errors = await validations[serviceName](req, res);
    if (errors.length === 0) {
      services[serviceName](req, res);
    } else {
      res.status(400).send(new ValidateExceptionns(400,
        'Erro ao processar solicitação!', req.url, errors));
    }
  };

  app.get(baseURL, (req, res) => {
    baseValidateAndControllerCall('listUsers', req, res);
  });

  app.get(`${baseURL}/:id`, async (req, res) => {
    baseValidateAndControllerCall('findOneUser', req, res);
  });

  app.post(`${baseURL}`, async (req, res) => {
    baseValidateAndControllerCall('createUser', req, res);
  });

  app.put(`${baseURL}`, authMiddleware, async (req, res) => {
    baseValidateAndControllerCall('updateUser', req, res);
  });
};
