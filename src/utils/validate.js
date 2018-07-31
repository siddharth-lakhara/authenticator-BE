const Models = require('../../models');

const validate = async (decoded) => {
  const searchResults = await Models.users.findOne({ where: { id: decoded.userId } });
  if (Object.keys(searchResults).length) {
    return { isValid: true };
  }
  return { isValid: false };
};

export default validate;
