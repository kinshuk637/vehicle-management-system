import React, { Component } from "react";
import axios from 'axios';
import queryString from 'querystring';
import {Link} from "react-router-dom";
import './dashboard.css';

class Totalfine extends Component {
    constructor(props){
        super(props);
        this.state = {
            total_fine_amount: 10

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
            total_fine_amount: response.data.total_fine_amount
        })
    })
    .catch((error) => {
        console.log(error);
    });
    }
    render(){
        return(
            <div>
            <div className="navbar">
            <div className="nav">
            <ul className="topnav">
                <li><a href={"/dashboard?vehicleregno="+this.state.vehicleregno}>MY DASHBOARD</a></li>
                <li><a href={"/dashboard/challans?vehicleregno="+this.state.vehicleregno}>CHALLANS</a></li>
                <li><a href={"/dashboard/total-fine?vehicleregno="+this.state.vehicleregno}>TOTAL FINE</a></li>
                <li className="topnav-right"><a>LOGOUT</a></li>
            </ul>
            </div>
            </div>
            <div className="total-fine-body">
                <h2>Total Fine Amount</h2>
                <h3>Rs. {this.state.total_fine_amount} </h3>
            </div>
            <div className="ftr">
              All Rights reserved
            </div>
            </div>
        );
    }
}

export default Totalfine;