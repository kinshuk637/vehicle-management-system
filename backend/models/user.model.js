const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    vehicle_reg_no: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    owner_name: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    mobile_no: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    total_fine_amount: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
});

const User = mongoose.model('User',userSchema);

module.exports = User;