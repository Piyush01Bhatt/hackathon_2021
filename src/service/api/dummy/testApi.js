/* eslint-disable require-await */
// eslint-disable-next-line no-unused-vars
const test = (fastify) => async (req, reply) => {
  reply.code(200).send({
    test: 'Welcome to hackathon 2021',
  });
};

module.exports = {
  test,
};
