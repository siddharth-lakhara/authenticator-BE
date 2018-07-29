const Models = require('../../models');

export default [{
  method: 'POST',
  path: '/info',
  config: {
    auth: 'jwt',
  },
  handler: (req) => {
    const id = req.auth.credentials.userId;
    return Models.users.findOne({ where: { id } })
      .then((searchResults) => {
        const {
          first_name, last_name, email, user_name,
        } = searchResults;
        return ({
          firstName: first_name,
          lastName: last_name,
          email,
          userName: user_name,
        });
      });
  },
}];
