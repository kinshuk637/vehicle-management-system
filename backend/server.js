const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const challans = require('./routes/api/challans');
const admins = require('./routes/api/admins');
const rules = require('./routes/api/rules');

const app = express();
const port = 5000 ;

app.use(cors());
app.use(express.json())
//BodyParser middleware
//app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json());

var db = mongoose.connect('mongodb://localhost/vehicle-management',{ useNewUrlParser: true });


// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/challans", challans);
app.use("/api/admins", admins);
app.use("/api/rules", rules);

app.listen(port, () => console.log(`Server is up and running on port ${port} !`));