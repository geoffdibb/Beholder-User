const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

const item = require("./routes/models");


let uri = 'mongodb://localhost:27017/example';
let opts ={useNewUrlParser: true};


mongoose.connect(uri, opts).then(
    () => { console.log("works")},
    (err) => { console.log(err) }
)


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use("/routes/models", item);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));