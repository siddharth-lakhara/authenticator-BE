import bcrypt from 'bcrypt';
import createToken from '../utils/createToken';
import hashPassword from '../utils/hashPassword';

const Models = require('../../models');

export default [{
  method: 'POST',
  path: '/login',
  handler: (req, reply) => {
    const { userName, password } = req.payload;
    return Models.users.findOne({ where: { user_name: userName } })
      .then((userDetails) => {
        const isCorrect = bcrypt.compareSync(password, userDetails.password);
        if (isCorrect) {
          const data = {
            token: createToken(userDetails),
          };
          return reply.response(data).code(200);
        }
        return reply.response('Invalid Username or Password!').code(400);
      });
  },
}, {
  method: 'POST',
  path: '/register',
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
            .then(() => h.response('user successfully registered'));
        }
        const responseString = (userExists[0].user_name === userName) ? 'User Name already taken' : 'Email already registered';
        return h.response(responseString).code(400);
      });
    });
  },
}];
