const passport = require("passport");
const User = require("../models/user");
const axios = require("axios");

module.exports = (app) => {
    app.get('/user/search/:username/:category/:searchTerm', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
            }
            if (info !== undefined) {
                res.status(401).send(info.message);
            } else if (user.username === req.params.username) {
                axios.get("http://core:8083/beholder/search/" + req.params.username + "/" + req.params.category + "/" + req.params.searchTerm)
                    .then(response => {
                        res.status(200).send(response.data);
                    })
                    .catch(err => {
                        res.status(501).send('Unable to connect to Beholder Search API'+ err);
                    })
            } else {
                console.error('Username and jwt token do not match');
                res.status(403).send('Username and jwt token do not match');
            }
        })(req, res, next);
    });
};
