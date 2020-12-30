const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ruleSchema = new Schema({
    rule_no: {
        type: String,
        unique: true,
        required: true
    },
    traffic_rule_violation: {
        type: String,
        required: true
    },
    fine_amount: {
        type: Number,
        required: true
    }
});

const Rule = mongoose.model('Rule',ruleSchema);

module.exports = Rule;