const jwt = require('jsonwebtoken');

const secretKey = 'topSecretKey_ToBePutInFileInProductionEnv';

const createToken = user => jwt.sign({
  userId: user.id,
  userName: user.user_name,
}, secretKey, { expiresIn: '1h', algorithm: 'HS256' });

export default createToken;
