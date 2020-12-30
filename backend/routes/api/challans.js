const express = require("express");
const router = express.Router();

let Challan = require('../../models/challan.model');

router.route('/').get((req,res)=>{
    Challan.find()                              //would return list of all users from DB
    .then(challans => res.json(challans))          //would return the response in json form
    .catch(err => res.status(400).json('Error: '+err))
  });

router.route('/:vehicleregno').get((req,res)=>{
    Challan.find({'vehicle_reg_no': req.params.vehicleregno})
    .then(challans => res.json(challans))
    .catch(err => res.status(400).json('Error: '+err))
  });

  router.route('/details/:challanid').get((req,res)=>{
    Challan.findOne({'challan_id': req.params.challanid})
    .then(challan => res.json(challan))
    .catch(err => res.status(400).json('Error: '+err))
  });


router.route('/add').post((req,res) => {
    const challan_id = req.body.challan_id;
    const status = req.body.status;
    const vehicle_reg_no = req.body.vehicle_reg_no;
    const owner_name = req.body.owner_name;
    const traffic_rule_violation = req.body.traffic_rule_violation;
    const rule_no = req.body.rule_no;
    const fine_amount = Number(req.body.fine_amount);
    const area = req.body.area;
    const issue_date = Date.parse(req.body.issue_date);
    const newChallan = new Challan({
        challan_id,
        status,
        vehicle_reg_no,
        owner_name,
        traffic_rule_violation,
        rule_no,
        fine_amount,
        area,
        issue_date
    });

    newChallan.save()       //new challan saved to DB
    .then( () => res.json('Challan Added!'))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/pay-challan/:challanid').post((req,res)=>{
  Challan.findOne({'challan_id': req.params.challanid})
  .then(challan => {
      challan.status = 'Paid',
      challan.payment_date = Date.parse(req.body.payment_date)

      challan.save()
      .then(() => res.json('Challan Payed!'))
      .catch(err => res.status(400).json('Error: '+err));
  })
  .catch(err => res.status(400).json('Error: '+err));
})


module.exports = router;