import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

require('dotenv').config();

export const setUserInfo = (req) => {
  const getUserInfo = {
    id: req.id,
    username: req.username,
    email: req.email,
    displayName: req.display_name,
  };

  return getUserInfo;
};

export const generateToken = (user) => {
  const timestamp = new Date().getTime();
  return jwt.sign({ sub: user.id, iat: timestamp }, process.env.JWT_SECRET, {
    expiresIn: 604800, // a week in seconds
  });
};

export const comparePassword = (userPassword, databasePassword) => (
  bcrypt.compareSync(userPassword, databasePassword)
);
