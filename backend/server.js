const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');

const app = express();
const port = 5000 ;

app.use(cors());
//BodyParser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var db = mongoose.connect('mongodb://localhost/vehicle-management',{ useNewUrlParser: true });


// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);

app.listen(port, () => console.log(`Server is up and running on port ${port} !`));