const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const challanSchema = new Schema({
    challan_id: {
        type: String,
        unique: true,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    vehicle_reg_no: {
        type: String,
        required: true
    },
    owner_name: {
        type: String,
        required: true
    },
    traffic_rule_violation: {
        type: String,
        //required: true
    },
    rule_no: {
        type: String,
        required: true
    },
    fine_amount: {
        type: Number,
        //required: true
    },
    area: {
        type: String,
        required: true
    },
    issue_date: {
        type: Date,
        required: true,
    },
    payment_date: {
        type: Date
    }
},
{
    timestamps: true
});

const Challan = mongoose.model('Challan',challanSchema);

module.exports = Challan;