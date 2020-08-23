import config from 'config';
import ValidateExceptionns from '../exceptions/validate';

module.exports = (app) => {
  const services = app.services.login;
  const validations = app.validations.login;

  const baseURL = `${config.get('base_url')}`;

  const baseValidateAndControllerCall = async (serviceName, req, res) => {
    const errors = await validations[serviceName](req, res);
    if (errors.length === 0) {
      services[serviceName](req, res);
    } else {
      res.status(400).send(new ValidateExceptionns(400,
        'Erro ao processar solicitação!', req.url, errors));
    }
  };

  app.post(`${baseURL}/login`, (req, res) => {
    baseValidateAndControllerCall('login', req, res);
  });
};
