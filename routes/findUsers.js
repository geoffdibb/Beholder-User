
const passport = require("passport");
const User = require("../models/user");

module.exports = (app) => {
  app.get('/findUser/:username', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (info !== undefined) {
        res.status(401).send(info.message);
      } else if (user.username === req.params.username) {
        User.findOne({ username: req.params.username }).then((userInfo) => {
          if (userInfo != null) {
            res.status(200).send({
              auth: true,
              username: userInfo.username,
              password: userInfo.password,
              message: 'User found',
            });
          } else {
            console.error('User does not exist with that username');
            res.status(401).send('User does not exist with that username');
          }
        });
      } else {
        console.error('Username and jwt token do not match');
        res.status(403).send('Username and jwt token do not match');
      }
    })(req, res, next);
  });
};