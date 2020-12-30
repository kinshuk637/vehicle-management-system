const express = require("express");
const router = express.Router();

let Rule = require('../../models/rule.model');

router.route('/').get((req,res)=>{
    Rule.find()                              //would return list of all users from DB
    .then(rules => res.json(rules))          //would return the response in json form
    .catch(err => res.status(400).json('Error: '+err))
  });

router.route('/:ruleno').get((req,res)=>{
    Rule.findOne({'rule_no': req.params.ruleno})
    .then(rules => res.json(rules))
    .catch(err => res.status(400).json('Error: '+err))
  });


router.route('/add').post((req,res) => {
    const rule_no = req.body.rule_no;
    const traffic_rule_violation = req.body.traffic_rule_violation;
    const fine_amount = Number(req.body.fine_amount);
    const newRule = new Rule({
        rule_no,
        traffic_rule_violation,
        fine_amount
    });

    newRule.save()       //new challan saved to DB
    .then( () => res.json('Rule Added!'))
    .catch(err => res.status(400).json('Error: '+err));
});


module.exports = router;