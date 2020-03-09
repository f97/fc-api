const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../models/user');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
((email, password, cb) => User.findOne({ email, password })
  .then((user) => {
    if (!user) {
      return cb(null, false, { message: 'Incorrect email or password.' });
    }
    return cb(null, user, { message: 'Logged In Successfully' });
  })
  .catch((err) => cb(err))
)));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_SECRET || '',
  callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback'
},
(token, refreshToken, profile, done) => done(null, {
  profile,
  token
})));
