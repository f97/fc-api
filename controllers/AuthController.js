const jwtHelper = require('../helpers/jwt.helper');
const { User } = require('../models/user');

const tokenList = {};
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || '1h';
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'ACCESS_TOKEN_SECRET';
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || '3650d';
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'REFRESH_TOKEN_SECRET';

/**
 * controller register
 * @param {*} req
 * @param {*} res
 */
const register = async (req, res) => {
  try {
    const user = new User(req.body);
    return user.save().then((dbUser) => res.send({ message: 'Register success', data: dbUser }), (e) => res.status(400).send({ message: e.errmsg, code: e.code }));
  }
  catch (error) {
    return res.status(500).json(error);
  }
};

/**
 * controller login
 * @param {*} req
 * @param {*} res
 */
const login = async (req, res) => {
  try {
    const userFakeData = {
      _id: '1234-5678-910JQK-tqd',
      name: 'A A',
      email: req.body.email
    };

    const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);

    const refreshToken = await jwtHelper.generateToken(userFakeData, refreshTokenSecret, refreshTokenLife);
    tokenList[refreshToken] = { accessToken, refreshToken };

    return res.status(200).json({ accessToken, refreshToken });
  }
  catch (error) {
    return res.status(500).json(error);
  }
};

/**
 * controller refreshToken
 * @param {*} req
 * @param {*} res
 */
const refreshToken = async (req, res) => {
  const refreshTokenFromClient = req.body.refreshToken;
  if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
    try {
      const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
      const userFakeData = decoded.data;
      const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
      return res.status(200).json({ accessToken });
    }
    catch (error) {
      return res.status(403).json({
        message: 'Invalid refresh token.'
      });
    }
  }
  else {
    return res.status(403).send({
      message: 'No token provided.'
    });
  }
};

module.exports = {
  register,
  login,
  refreshToken
};
