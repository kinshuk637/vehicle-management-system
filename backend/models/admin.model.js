const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    id_card_no: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    admin_name: {
        type: String,
        required: true,
    },
    office_location: {
        type: String,
        required: true
    },
    mobile_no: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const Admin = mongoose.model('Admin',adminSchema);

module.exports = Admin;