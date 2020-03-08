const jwtHelper = require('../helpers/jwt.helper');

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'khoan-dep-trai-nhat-qua-dat';

/**
 * Middleware: Authorization user by Token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

const isAuth = async (req, res, next) => {
  const tokenFromClient = req.body.token || req.query.token || req.headers['x-access-token'];
  if (tokenFromClient) {
    try {
      const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
      req.jwtDecoded = decoded;
      next();
      return true;
    }
    catch (error) {
      return res.status(401).json({
        message: 'Unauthorized.'
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
  isAuth
};
