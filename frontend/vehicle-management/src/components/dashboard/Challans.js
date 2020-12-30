import React, { Component } from "react";
import axios from 'axios';
import queryString from 'querystring';
import {Link} from "react-router-dom";
import './dashboard.css';

const Challan = props => (
    <tr>
        <td>{props.challan.challan_id}</td>
        <td>{props.challan.rule_no}</td>
        <td>{props.challan.traffic_rule_violation}</td>
        <td>{props.challan.issue_date.substring(0,10)}</td>
        <td>{props.challan.fine_amount}</td>
        <td>
            <button>PAY</button>
        </td>
    </tr>
)

class Challans extends Component{
    constructor(props){
        super(props);
        this.state = {
            challans:[]
        };
        this.state = {
            queryString: window.location.search
        };
        this.state = {
            urlParams: new URLSearchParams(this.state.queryString)
        };
        this.state = {
            vehicleregno: this.state.urlParams.get('vehicleregno')
        };
    }
    componentDidMount(){
        axios.get('http://localhost:5000/api/challans/'+this.state.vehicleregno)
        .then(response => {
            this.setState({
                challans: response.data
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }
    challanList(){
        return this.state.challans.map(currentchallan => {
            return <Challan challan={currentchallan} key={currentchallan._id} />;
        })
    }
    render(){
        console.log(this.state.challans);
        console.log(this.state.vehicleregno);
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
            <div>
                <h3>Challan List</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Challan_id</th>
                            <th>Rule_no</th>
                            <th>Traffic Rule Violation</th>
                            <th>Issue Date</th>
                            <th>Fine Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.challanList()}
                    </tbody>
                </table>
            </div>
            </div>
        );
    }
}

export default Challans;