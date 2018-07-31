import Joi from 'joi';
import hashPassword from '../utils/hashPassword';

const Models = require('../../models');

export default [{
  method: 'POST',
  path: '/register',
  config: {
    auth: false,
    validate: {
      payload: Joi.object({
        firstName: Joi.string().min(1).max(10),
        lastName: Joi.string().min(1).max(10),
        email: Joi.string().email().required().required(),
        userName: Joi.string().min(1).max(10).required(),
        password: Joi.string().min(1).required(),
      }),
    },
  },
  handler: (req, h) => {
    const {
      firstName, lastName, email, userName, password,
    } = req.payload;
    return hashPassword(password).then((passwordHash) => {
      const insertIntoDB = {
        first_name: firstName,
        last_name: lastName,
        email,
        user_name: userName,
        password: passwordHash,
      };
      return Models.users.findAll({
        where: {
          $or: [
            { email: { $eq: email } },
            { user_name: { $eq: userName } },
          ],
        },
      }).then((userExists) => {
        if (userExists.length === 0) {
          return Models.users.create(insertIntoDB)
            .then(() => h.response({ message: 'user successfully registered' }));
        }
        const responseString = (userExists[0].user_name === userName) ? 'User Name already taken' : 'Email already registered';
        return h.response({ message: responseString }).code(400);
      });
    });
  },
}];
