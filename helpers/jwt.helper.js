/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');

/**
 * private function generateToken
 * @param user
 * @param secretSignature
 * @param tokenLife
 */
const generateToken = (user, secretSignature, tokenLife) => new Promise((resolve, reject) => {
  // Định nghĩa những thông tin của user mà bạn muốn lưu vào token ở đây
  const userData = {
    _id: user._id,
    name: user.name,
    email: user.email
  };
  // Thực hiện ký và tạo token
  jwt.sign(
    { data: userData },
    secretSignature,
    {
      algorithm: 'HS256',
      expiresIn: tokenLife
    },
    (error, token) => {
      if (error) {
        return reject(error);
      }
      return resolve(token);
    }
  );
});


/**
 * This module used for verify jwt token
 * @param {*} token
 * @param {*} secretKey
 */
const verifyToken = (token, secretKey) => new Promise((resolve, reject) => {
  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      return reject(error);
    }
    return resolve(decoded);
  });
});


module.exports = {
  generateToken,
  verifyToken
};
