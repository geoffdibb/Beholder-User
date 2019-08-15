const isEmpty = require("./isempty.js");
const Validator = require("validator");

module.exports = function validateusername(User) {
    let errors = {};


    User.username = !isEmpty(User.username) ? User.username : "";

    if (!Validator.isAlphanumeric(User.username)) {
        errors.username = "username is invalid";
    }

    if (Validator.isEmpty(User.username)) {
        errors.username = "username is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
