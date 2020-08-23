import config from 'config';
import ValidateExceptionns from '../exceptions/validate';
import authMiddleware from '../middlewares/auth';

module.exports = (app) => {
  const services = app.services.userFavoriteComic;
  const validations = app.validations.userFavoriteComic;

  const baseURL = `${config.get('base_url')}/user-favorite-comics`;

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
    baseValidateAndControllerCall('listFavoriteComics', req, res);
  });

  app.post(`${baseURL}/:comicId`, authMiddleware, async (req, res) => {
    baseValidateAndControllerCall('addFavoriteComic', req, res);
  });

  app.delete(`${baseURL}/:comicId`, authMiddleware, async (req, res) => {
    baseValidateAndControllerCall('removeFavoriteComic', req, res);
  });
};
