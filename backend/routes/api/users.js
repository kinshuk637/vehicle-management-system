const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
let User = require("../../models/user.model");



router.route('/').get((req,res)=>{
  User.find()                              //would return list of all users from DB
  .then(users => res.json(users))          //would return the response in json form
  .catch(err => res.status(400).json('Error: '+err))
});

router.route('/:vehicleregno').get((req,res)=>{
  User.findOne({'vehicle_reg_no': req.params.vehicleregno})
  .then(users => res.json(users))
  .catch(err => res.status(400).json('Error: '+err))
});

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ vehicle_reg_no: req.body.vehicle_reg_no }).then(user => {
      if (user) {
        return res.status(400).json({ vehicle_reg_no: "Vehicle Registration Number already exists" });
      } else {
        const newUser = new User({
          vehicle_reg_no: req.body.vehicle_reg_no,
          password: req.body.password,
          owner_name: req.body.owner_name,
          dob: Date.parse(req.body.dob),
          address: req.body.address,
          mobile_no: req.body.mobile_no,
          email: req.body.email
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });


  router.post("/add-fine/:vehicleregno", (req, res) => {
    User.findOne({'vehicle_reg_no': req.params.vehicleregno})
    .then( user => {
      user.total_fine_amount = user.total_fine_amount + Number(req.body.fine_amount);

      user.save()
        .then(() => res.json('Fine Added!'))
        .catch(err => res.status(400).json('Error: '+err));
    })
  });

  router.post("/pay-fine/:vehicleregno", (req, res) => {
    User.findOne({'vehicle_reg_no': req.params.vehicleregno})
    .then( user => {
      user.total_fine_amount = user.total_fine_amount - Number(req.body.fine_amount);

      user.save()
        .then(() => res.json('Fine Payed!'))
        .catch(err => res.status(400).json('Error: '+err));
    })
  });


  // @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const vehicle_reg_no = req.body.vehicle_reg_no;
    const password = req.body.password;
  // Find user by vehicle_no
    User.findOne({ vehicle_reg_no }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ vehicle_reg_numbernotfound: "Vehicle Registration Number not found" });
      }
  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            owner_name: user.owner_name
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