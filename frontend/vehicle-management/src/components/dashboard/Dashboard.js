import React, { Component } from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import queryString from 'querystring';
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {Link} from "react-router-dom";
import './dashboard.css';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {users: []};
        this.state = {
            vehicle_reg_no: "",
            owner_name: "",
            dob: new Date(),
            address: "",
            mobile_no: "",
            email: "",
            total_fine_amount: 0

        }
        this.state = {
            queryString: window.location.search
        }
        this.state = {
            urlParams: new URLSearchParams(this.state.queryString)
        }
        this.state = {
            vehicleregno: this.state.urlParams.get('vehicleregno')
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/api/users/'+this.state.vehicleregno)
    .then(response => {
        this.setState({
            vehicle_reg_no: response.data.vehicle_reg_no,
            owner_name: response.data.owner_name,
            address: response.data.address,
            dob: response.data.dob,
            mobile_no: response.data.mobile_no,
            email: response.data.email,
            total_fine_amount: response.data.total_fine_amount
        })
    })
    .catch((error) => {
        console.log(error);
    });
    }

    onChangeVehicleRegNo(v){
        this.setState({vehicle_reg_no: v});
    }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
render() {
    const { user } = this.props.auth;
    /*var a=0;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const vehicleregno2 = urlParams.get('vehicleregno');
    if(a==0){
        this.setState({vehicleregno: vehicleregno2});
        a=1;
    }*/
    //this.setState({vehicleregno: vehicleregno2});
    //console.log(this.state.users);
    //let currentUser = this.state.users.find(el => el.vehicle_reg_no === vehicleregno);
    //this.setState({currentUser: this.state.users.find(el => el.vehicle_reg_no === vehicleregno)});
    /*const currentUser = axios.get('http://localhost:5000/api/users/'+vehicleregno)
    .then(response => {
        this.setState({
            vehicle_reg_no: response.data.vehicle_reg_no,
            owner_name: response.data.owner_name,
            address: response.data.address,
            dob: response.data.dob,
            mobile_no: response.data.mobile_no,
            email: response.data.email,
            total_fine_amount: response.data.total_fine_amount
        })
    })
    .catch((error) => {
        console.log(error);
    });*/
    //const currentUser2 = this.state.users.find(el => el.vehicle_reg_no === vehicleregno);
    //console.log(currentUser);
    //console.log(this.state.users);
    //console.log(this.state.owner_name);
return (
    <div>
    <div className="navbar">
    <div className="nav">
        <ul className="topnav">
            <li><a href="/dashboard">MY DASHBOARD</a></li>
            <li><a href="/dashboard/challans">CHALLANS</a></li>
            <li><a href="#home">TOTAL FINE</a></li>
            <li className="topnav-right"><a onClick={this.onLogoutClick}>LOGOUT</a></li>
        </ul>
    </div>
    </div>
    <div className="dashboard-body">
        <p>Vehicle Registration Number: {this.state.vehicle_reg_no}</p>
        <p>Owner's Name: {this.state.owner_name}</p>
        <p>Date of Birth: {this.state.dob}</p>
        <p>Address: {this.state.address}</p>
        <p>Mobile Number: {this.state.mobile_no}</p>
        <p>Email: {this.state.email}</p>
    </div>
  </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);