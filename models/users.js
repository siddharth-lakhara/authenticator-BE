

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    user_name: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {});
  return users;
};
