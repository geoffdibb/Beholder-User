const jwt = require("jsonwebtoken");
const passport = require("passport");
const jwtSecret = require("../config/jwtConfig");
const User = require("../models/user");
const axios = require("axios");

module.exports = app => {
    app.post('/loginUser', (req, res, next) => {
        axios.post("http://core:8083/beholder/userLogin", req.body)
            .then(response => {
            })
            .catch(error => {
                console.log(error);
            })
        passport.authenticate('login', (err, users, info) => {
            if (err) {
                console.error(`Error: ${err}`);
            }
            if (info !== undefined) {
                console.error(info.message);
                if (info.message === 'Wrong username') {
                    res.status(401).send(info.message);
                } else {
                    res.status(403).send(info.message);
                }
            } else {
                req.logIn(users, () => {
                    User.findOne({ username: req.body.username }).then(user => {
                        const token = jwt.sign({ id: user._id }, jwtSecret.secret, {
                            expiresIn: 60 * 60,
                        });
                        res.status(200).send({
                            auth: true,
                            token,
                            message: 'User authenticated and logged in',
                        });
                    });
                });
            }
        })(req, res, next);
    });
};
