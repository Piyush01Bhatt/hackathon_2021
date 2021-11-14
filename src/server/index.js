require('dotenv').config();
require('make-promises-safe');
const CORS = require('fastify-cors');
const config = require('../plugins/config');
const api = require('../service/api');

// eslint-disable-next-line no-process-env
const PORT = process.env.PORT || 5000;

const create = () => {
  // eslint-disable-next-line global-require
  const fastify = require('fastify')({
    logger: true,
  });
  fastify.register(config);
  fastify.register(CORS, {
    origin: true,
  });
  // eslint-disable-next-line global-require
  fastify.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
      info: { title: 'hackathon_2021' },
    },
  });

  fastify.register(api);
  return fastify;
};

const start = async (fastify, options) => {
  await fastify.ready();
  const {
    port = fastify.config.PORT || 5000,
    host = fastify.config.host || '127.0.0.1',
  } = options;
  try {
    await fastify.listen(port, host);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

const fastify = create();
start(fastify, { port: PORT });

module.exports = {
  start,
  create,
};
