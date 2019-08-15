const isEmpty = require("./isempty.js");
const Validator = require("validator");

module.exports = function validateusername(Item) {
    let errors = {};


    Item.username = !isEmpty(Item.username) ? Item.username : "";

    if (!Validator.isAlphanumeric(Item.username)) {
        errors.username = "username is invalid";
    }

    if (Validator.isEmpty(Item.username)) {
        errors.username = "username is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
