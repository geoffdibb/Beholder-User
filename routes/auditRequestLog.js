
const passport = require("passport");
const User = require("../models/user");
const axios = require("axios");


module.exports = (app) => {
    app.get('/getauditrequestlog/:username', (req, res, next) => {
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
                
                console.log(req.params.username )
                axios.get("http://localhost:8083/getAuditRequestLog/" + req.params.username)
                    .then(Response => {
                        //something to do with pushing data to the front end
                        
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