const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateAdminLoginInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.id_card_no = !isEmpty(data.id_card_no) ? data.id_card_no : "";
  data.password = !isEmpty(data.password) ? data.password : "";
// Email checks
  if (Validator.isEmpty(data.id_card_no)) {
    errors.id_card_no = "Id Card Number field is required";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};