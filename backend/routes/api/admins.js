const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateAdminRegisterInput = require("../../validation/admin_register");
const validateAdminLoginInput = require("../../validation/admin_login");
// Load User model
let Admin = require("../../models/admin.model");



router.route('/').get((req,res)=>{
  Admin.find()                              //would return list of all users from DB
  .then(admins => res.json(admins))          //would return the response in json form
  .catch(err => res.status(400).json('Error: '+err))
});

router.route('/:idcardno').get((req,res)=>{
  Admin.findOne({'id_card_no': req.params.idcardno})
  .then(admins => res.json(admins))
  .catch(err => res.status(400).json('Error: '+err))
});

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
  const { errors, isValid } = validateAdminRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  Admin.findOne({ id_card_no: req.body.id_card_no }).then(admin => {
      if (admin) {
        return res.status(400).json({ id_card_no: "ID Card Number already exists" });
      } else {
        const newAdmin = new Admin({
          id_card_no: req.body.id_card_no,
          password: req.body.password,
          admin_name: req.body.admin_name,
          office_location: req.body.office_location,
          mobile_no: req.body.mobile_no
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) throw err;
            newAdmin.password = hash;
            newAdmin
              .save()
              .then(admin => res.json(admin))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });


  // @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateAdminLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const id_card_no = req.body.id_card_no;
    const password = req.body.password;
  // Find user by vehicle_no
    Admin.findOne({ id_card_no }).then(admin => {
      // Check if user exists
      if (!admin) {
        return res.status(404).json({ id_card_numbernotfound: "ID Card Number not found" });
      }
  // Check password
      bcrypt.compare(password, admin.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: admin.id,
            admin_name: admin.admin_name
          };
  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });


  module.exports = router;