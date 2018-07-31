import bcrypt from 'bcrypt';
import Joi from 'joi';
import createToken from '../utils/createToken';

const Models = require('../../models');

export default [{
  method: 'POST',
  path: '/login',
  config: {
    auth: false,
    validate: {
      payload: Joi.object({
        userName: Joi.string().min(1).max(10).required(),
        password: Joi.string().min(1).required(),
      }),
    },
  },
  handler: (req, reply) => {
    const { userName, password } = req.payload;
    return Models.users.findOne({ where: { user_name: userName } })
      .then((userDetails) => {
        if (userDetails) {
          const isCorrect = bcrypt.compareSync(password, userDetails.password);
          if (isCorrect) {
            const data = {
              token: createToken(userDetails),
            };
            return reply.response(data).code(200);
          }
          return reply.response({ message: 'Invalid Username or Password!' }).code(400);
        }
        return reply.response({ message: 'Invalid Username or Password!' }).code(400);
      });
  },
}];
