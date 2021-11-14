const test = require('./dummy');

// eslint-disable-next-line require-await
module.exports = async (fastify) => {
  fastify.register(test, { prefix: '/v1/test' });
};
