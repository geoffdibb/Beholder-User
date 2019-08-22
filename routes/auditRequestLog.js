
const passport = require("passport");
const User = require("../models/user");
const axios = require("axios");


module.exports = (app) => {
    app.get('/getauditrequestlog/:username', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (user, info) => {
            if (info !== undefined) {
                res.status(401).send(info.message);
            } else if (user.username === req.params.username) {
                axios.get("http://localhost:8083/beholder/getAuditRequestLog/" + req.params.username)
                    .then(response => {
                        res.status(200).send(response.data);
                    })
                    .catch(err => {
                        res.status(501).send('cannot connect to api');
                    })
            } else {
                console.error('username and jwt token do not match');
                res.status(403).send('username and jwt token do not match');
            }
        })(req, res, next);
    });
};