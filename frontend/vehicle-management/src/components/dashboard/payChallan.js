import React, { Component } from "react";
import axios from 'axios';
import queryString from 'querystring';
import {Link} from "react-router-dom";
import './dashboard.css';

class PayChallan extends Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {users: []};
        this.state = {
            queryString: window.location.search
        }
        this.state = {
            urlParams: new URLSearchParams(this.state.queryString)
        }
        this.state = {
            vehicleregno: this.state.urlParams.get('vehicleregno'),
            challanid: this.state.urlParams.get('challanid'),
            challan_id:'',
            vehicle_reg_no:'',
            rule_no: '',
            traffic_rule_violation: '',
            area: '',
            fine_amount:0,
            status:'',
            payment_date: new Date()
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/api/challans/details/'+this.state.challanid)
        .then(response => {
        this.setState({
            challan_id: response.data.challan_id,
            vehicle_reg_no:response.data.vehicle_reg_no,
            rule_no: response.data.rule_no,
            traffic_rule_violation: response.data.traffic_rule_violation,
            area: response.data.area,
            fine_amount: response.data.fine_amount,
            status: response.data.status,
            //payment_date: response.data.payment_date
        })
    })
    .catch((error) => {
        console.log(error);
    });
    }

    onChangeVehicleRegNo(v){
        this.setState({vehicle_reg_no: v});
    }
    onSubmit(e){
        e.preventDefault();
        const fine = {
            fine_amount: this.state.fine_amount,
            payment_date: this.state.payment_date
        }
        axios.post('http://localhost:5000/api/challans/pay-challan/'+this.state.challanid,fine)
        .then(res => console.log(res.data));
        axios.post('http://localhost:5000/api/users/pay-fine/'+this.state.vehicle_reg_no,fine)
        .then(res => console.log(res.data));
        window.location.reload();
    }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
render() {
return (
    (this.state.status=="Due")
    ?(
    <div>
    <div className="navbar">
    <div className="nav">
        <ul className="topnav">
            <li><a href={"/dashboard?vehicleregno="+this.state.vehicleregno}>MY DASHBOARD</a></li>
            <li><a href={"/dashboard/challans?vehicleregno="+this.state.vehicleregno}>CHALLANS</a></li>
            <li><a href={"/dashboard/total-fine?vehicleregno="+this.state.vehicleregno}>TOTAL FINE</a></li>
            <li className="topnav-right"><a onClick={this.onLogoutClick}>LOGOUT</a></li>
        </ul>
    </div>
    </div>
    <h4 className="details-hdng">Challan List | Pay Challan</h4>
    <div className="details-sctn">
        <p>Challan Id: {this.state.challanid}</p>
        <p>Vehicle Registration Number: {this.state.vehicle_reg_no}</p>
        <p>Rule Number: {this.state.rule_no} </p>
        <p>Traffic Rule Violation: {this.state.traffic_rule_violation}</p>
        <p>Area: {this.state.area}</p>
        <p>Fine Amount: {this.state.fine_amount}</p>
        <p>Status: {this.state.status}</p>
        <button className="btn btn-primary main-pay-btn" onClick={this.onSubmit}>PAY</button>
    </div>
    <div className="ftr">
        All Rights reserved
    </div>
  </div>
    )
    :(
        <div>
        <div className="navbar">
        <div className="nav">
            <ul className="topnav">
                <li><a href={"/dashboard?vehicleregno="+this.state.vehicleregno}>MY DASHBOARD</a></li>
                <li><a href={"/dashboard/challans?vehicleregno="+this.state.vehicleregno}>CHALLANS</a></li>
                <li><a href={"/dashboard/total-fine?vehicleregno="+this.state.vehicleregno}>TOTAL FINE</a></li>
                <li className="topnav-right"><a onClick={this.onLogoutClick}>LOGOUT</a></li>
            </ul>
        </div>
        </div>
        <h4 className="details-hdng">Challan List | Details</h4>
        <div className="details-sctn">
            <p>Challan Id: {this.state.challanid}</p>
            <p>Vehicle Registration Number: {this.state.vehicle_reg_no}</p>
            <p>Rule Number: {this.state.rule_no} </p>
            <p>Traffic Rule Violation: {this.state.traffic_rule_violation}</p>
            <p>Area: {this.state.area}</p>
            <p>Fine Amount: {this.state.fine_amount}</p>
            <p>Status: {this.state.status}</p>
            <button className="btn btn-primary main-pay-btn" onClick={this.onSubmit} disabled>PAID</button>
        </div>
        <div className="ftr">
            All Rights reserved
        </div>
      </div>
        )
    );
  }
}

export default PayChallan;

