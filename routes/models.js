const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Item = require("./Schema/mongoschema.js");
const validateusername = require("./modelsvalidation");
const bcrypt = require("bcryptjs");



//create
router.post("/addItem", (req, res) => {
  const { errors, isValid } = validateusername(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  

  const item = new Item({
    username: req.body.username,
    password: req.body.password
  });
 bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(item.password, salt, (err, hash) => {
      if (err) throw err;
      item.password = hash;
      item.save().then(item => res.json(item))
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

  Item.findOne({ username: req.body.username})
    .then(items => {
      console.log(items);
      hashedpassword=items.password;
      console.log(password);
      console.log(hashedpassword);
      if (!items) {
        res.status(404).json(errors);
      }
bcrypt.compare(password, hashedpassword).then(isMatch => {
   if (isMatch) {
      res.status(200).json(isMatch);
    console.log("matchedpassword")
   }

    })
    .catch(err => res.status(404).json(err));
})});



module.exports = router;
