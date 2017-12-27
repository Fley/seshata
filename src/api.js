import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import errorhandler from 'errorhandler';
import uuidv4 from 'uuid/v4';
import Joi from 'joi';
import logger from './logger';
import { UNSUPPORTED_MEDIA_TYPE, BAD_REQUEST } from './errors';
import { scoreGames } from './scoring';
import { gameSchema } from './cardSchema';

const validateBody = (schema) => (req, res, next) => Joi.validate(req.body, schema, (err) => {
  if (err) {
    throw BAD_REQUEST(err.details.map(d => { return { key: d.context.key, message: d.message }; }));
  }
  next && next();
});


const HEADER_REQUEST_ID = 'X-REQUEST-ID';

const api = () => {
  const app = express();

  app.use((req, res, next) => {
    res.header(HEADER_REQUEST_ID, uuidv4());
    next();
  });
  app.use(bodyParser.json());
  app.use(morgan('combined', { stream: logger.stream }));

  app.get('/', (req, res) => res.send('Welcome to Seshata API'));
  app.post('/game', validateBody(Joi.array().items(gameSchema)), (req, res) => {
    if (req.is('json')) {
      return res.json(scoreGames(req.body));
    } else if (req.is('multipart/form-data')) {
      throw UNSUPPORTED_MEDIA_TYPE(['application/json', 'multipart/form-data'], req.get('content-type'));
    } else {
      throw UNSUPPORTED_MEDIA_TYPE(['application/json', 'multipart/form-data'], req.get('content-type'));
    }
  });

  app.use(errorhandler({
    log: (error, str, req = {}) =>
      logger.error(str + ' - requestId:' + (req.res && req.res.get(HEADER_REQUEST_ID)))
  }));

  app.listen(3000, () => logger.info('Example app listening on port 3000!'));
};

export default api;