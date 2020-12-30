const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateAdminRegisterInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
data.id_card_no = !isEmpty(data.id_card_no) ? data.id_card_no : "";
  data.admin_name = !isEmpty(data.admin_name) ? data.admin_name : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  //data.dob = !isEmpty(data.dob) ? data.dob : "";
  data.office_location = !isEmpty(data.office_location) ? data.office_location : "";
  data.mobile_no = !isEmpty(data.mobile_no) ? data.mobile_no : "";
// Name checks
  if (Validator.isEmpty(data.admin_name)) {
    errors.admin_name = "Name field is required";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  if (Validator.isEmpty(data.id_card_no)) {
    errors.id_card_no = "ID Card Number field is required";
  }
  if (Validator.isEmpty(data.office_location)) {
    errors.office_location = "Office Location field is required";
  }
  if (Validator.isEmpty(data.mobile_no)) {
    errors.mobile_no = "Mobile No field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};