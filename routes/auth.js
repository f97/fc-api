const express = require('express');
const passport = require('passport');

const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

router.get('/google', passport.authenticate('google', {
  session: false,
  scope:
    ['openid', 'profile', 'email']
}));

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  (req, res) => {
    AuthController.googleLogin(req, res);
  });

router.post('/refresh-token', AuthController.refreshToken);

module.exports = router;
