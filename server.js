const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

const user = require("./routes/user");

let opts ={useNewUrlParser: true};

const db = require("./config/keys").mongoURI;


mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use("", user);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));