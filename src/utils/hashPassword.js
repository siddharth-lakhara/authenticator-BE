import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
  return hashedPassword;
};

export default hashPassword;
