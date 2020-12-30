import React, { Component } from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import queryString from 'querystring';
import { connect } from "react-redux";
import { logoutAdmin } from "../../actions/adminAuthActions";
import {Link} from "react-router-dom";
import './dashboard.css';

class adminDashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            id_card_no: "",
            admin_name: "",
            office_location: "",
            mobile_no: ""

        }
        this.state = {
            queryString: window.location.search
        }
        this.state = {
            urlParams: new URLSearchParams(this.state.queryString)
        }
        this.state = {
            idcardno: this.state.urlParams.get('idcardno')
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/api/admins/'+this.state.idcardno)
    .then(response => {
        this.setState({
            id_card_no: response.data.id_card_no,
            admin_name: response.data.admin_name,
            office_location: response.data.office_location,
            mobile_no: response.data.mobile_no
        })
    })
    .catch((error) => {
        console.log(error);
    });
    }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutAdmin();
  };
render() {
return (
    <div>
    <div className="navbar">
    <div className="nav">
        <ul className="topnav">
            <li><a href={"/admin-dashboard?idcardno="+this.state.idcardno}>ADMIN DASHBOARD</a></li>
            <li><a href={"/admin-dashboard/users?idcardno="+this.state.idcardno}>USERS</a></li>
            <li><a href={"/admin-dashboard/rules?idcardno="+this.state.idcardno}>RULES</a></li>
            <li><a href={"/admin-dashboard/challans?idcardno="+this.state.idcardno}>CHALLANS</a></li>
            <li><a href={"/admin-portal?idcardno="+this.state.idcardno}>ISSUE CHALLANS</a></li>
            <li className="topnav-right"><a onClick={this.onLogoutClick}>LOGOUT</a></li>
        </ul>
    </div>
    </div>
    <div className="dashboard-body">
        <p>ID Card Number: {this.state.id_card_no}</p>
        <p>Admin Name: {this.state.admin_name}</p>
        <p>Office Location: {this.state.office_location}</p>
        <p>Mobile Number: {this.state.mobile_no}</p>
    </div>
  </div>
    );
  }
}
adminDashboard.propTypes = {
  logoutAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutAdmin }
)(adminDashboard);