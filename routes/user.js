const express = require("express");
const router = express.Router();
const _ = require("lodash");
const User = require("../models/user.js");
const validateusername = require("../validation/user");
const bcrypt = require("bcryptjs");



//create
router.post("/addUser", (req, res) => {
  const { errors, isValid } = validateusername(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
 bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      user.save().then(user => res.json(user))
      .catch(err => console.log(err));
   });

  });
});



// @route   GET item/username
// @desc    Get all items from one username
// @access  Public
router.post("/username", (req, res) => {
  const errors = {};
  const password = req.body.password;
      let hashedpassword;

  User.findOne({ username: req.body.username})
    .then(users => {
      hashedpassword=users.password;
      if (!users) {
        res.status(404).json(errors);
      }
bcrypt.compare(password, hashedpassword).then(isMatch => {
   if (isMatch) {
      res.status(200).json(isMatch);
        }
        else {
          res.status(404).send("Incorrect details")
        }
      })
        .catch(err => res.status(404).send("Incorrect details"));

    }).catch(err => res.status(404).send("Incorrect details"));
});



module.exports = router;
