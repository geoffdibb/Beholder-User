const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const Cors = require("cors");
const logger = require("morgan");
const passport = require("passport");

require("./config/passport");

let opts ={useNewUrlParser: true};

const db = require("./config/keys").mongoURI;

app.use(Cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(passport.initialize());

require('./routes/loginUser')(app);
require('./routes/registerUser')(app);
require('./routes/findUsers')(app);
require('./routes/search')(app);
require('./routes/auditSearchLog')(app);
require('./routes/auditUserAccessLog')(app);
require('./routes/auditRequestlog')(app);

mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());



const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`server running on port ${port}`));

module.exports = app;