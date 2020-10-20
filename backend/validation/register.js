const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
data.vehicle_reg_no = !isEmpty(data.vehicle_reg_no) ? data.vehicle_reg_no : "";
  data.owner_name = !isEmpty(data.owner_name) ? data.owner_name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  //data.dob = !isEmpty(data.dob) ? data.dob : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.mobile_no = !isEmpty(data.mobile_no) ? data.mobile_no : "";
// Name checks
  if (Validator.isEmpty(data.owner_name)) {
    errors.owner_name = "Name field is required";
  }
// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
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

  if (Validator.isEmpty(data.vehicle_reg_no)) {
    errors.vehicle_reg_no = "Vehicle Registration No field is required";
  }
  if (Validator.isEmpty(data.address)) {
    errors.address = "Address field is required";
  }
  if (Validator.isEmpty(data.mobile_no)) {
    errors.mobile_no = "Mobile No field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};