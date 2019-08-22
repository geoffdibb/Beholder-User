
const passport = require("passport");
const User = require("../models/user");
const axios = require("axios");


module.exports = (app) => {
    app.get('/search/:username/:category/:searchTerm', (req, res, next) => {
        // app.get('/search/user5/name/Smith', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
            }
            console.log(user.username);
            console.log(req.params.username);
            if (info !== undefined) {
                console.log(info.message);
                res.status(401).send(info.message);
            } else if (user.username === req.params.username) {
                console.log("check happens");
                console.log(req.params.username + " " + req.params.category + " " + req.params.searchTerm + " test1")
                axios.get("http://localhost:8083/search/" + req.params.username + "/" + req.params.category + "/" + req.params.searchTerm)
                    .then(Response => {
                        //something to do with pushing data to the front end
                        console.log(req.params.username + " " + req.params.category + " " + req.params.searchTerm)
                        res.status(200).send('it worked!!!!!!!!');
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(501).send('cannot connect to api');
                    })
            } else {
                console.error('jwt id and username do not match');
                res.status(403).send('username and jwt token do not match');
            }
        })(req, res, next);
    });
};