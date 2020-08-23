import express from 'express';
import bodyParser from 'body-parser';
import config from 'config';
import consign from 'consign';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../api/controllers/swagger.json';

module.exports = () => {
  const app = express();

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || config.get('server.port'));

  // MIDDLEWARES
  app.use(bodyParser.json());

  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    exposedHeaders: 'X-Authorization',
  }));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.get('/api-docs', swaggerUi.setup(swaggerDocument));

  consign({ cwd: 'api' })
    .then('models')
    .then('services')
    .then('validations')
    .then('controllers')
    .into(app);

  return app;
};
