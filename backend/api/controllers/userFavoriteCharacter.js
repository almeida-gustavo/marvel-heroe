import config from 'config';
import ValidateExceptionns from '../exceptions/validate';
import authMiddleware from '../middlewares/auth';

module.exports = (app) => {
  const services = app.services.userFavoriteCharacter;
  const validations = app.validations.userFavoriteCharacter;

  const baseURL = `${config.get('base_url')}/user-favorite-characters`;

  const baseValidateAndControllerCall = async (serviceName, req, res) => {
    const errors = await validations[serviceName](req, res);
    if (errors.length === 0) {
      services[serviceName](req, res);
    } else {
      res.status(400).send(new ValidateExceptionns(400,
        'Erro ao processar solicitação!', req.url, errors));
    }
  };

  app.get(baseURL, authMiddleware, (req, res) => {
    baseValidateAndControllerCall('listFavoriteCharacters', req, res);
  });

  app.post(`${baseURL}/:characterId`, authMiddleware, async (req, res) => {
    baseValidateAndControllerCall('addFavoriteCharacter', req, res);
  });

  app.delete(`${baseURL}/:characterId`, authMiddleware, async (req, res) => {
    baseValidateAndControllerCall('removeFavoriteCharacter', req, res);
  });
};
