const { test } = require('./testApi');

// eslint-disable-next-line require-await
module.exports = async (fastify) => {
  const testService = test(fastify);
  fastify.get('/', testService);
};
