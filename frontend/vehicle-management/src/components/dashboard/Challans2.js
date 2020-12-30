import React, { Component,useState,useEffect } from "react";
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
        <td>{props.challan.status}</td>
        <td>
        <Link className="details-link" to={"/dashboard/pay-challan?vehicleregno="+props.challan.vehicle_reg_no+"&challanid="+props.challan.challan_id}>
          DETAILS/PAY
        </Link>
        </td>
    </tr>
)

function MyComponent() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [challans, setItems] = useState([]);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const vehicleregno = urlParams.get('vehicleregno');
  
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
      fetch('http://localhost:5000/api/challans/'+vehicleregno)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
          <div>
              <div className="navbar">
            <div className="nav">
                <ul className="topnav">
                    <li><a href={"/dashboard?vehicleregno="+vehicleregno}>MY DASHBOARD</a></li>
                    <li><a href={"/dashboard/challans?vehicleregno="+vehicleregno}>CHALLANS</a></li>
                    <li><a href={"/dashboard/total-fine?vehicleregno="+vehicleregno}>TOTAL FINE</a></li>
                    <li className="topnav-right"><a>LOGOUT</a></li>
                </ul>
            </div>
            </div>
            <div>
            <div className="table-container">
                <h3>Challan List</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Challan_id</th>
                            <th>Rule_no</th>
                            <th>Traffic Rule Violation</th>
                            <th>Issue Date</th>
                            <th>Fine Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {challans.map(challan => <Challan challan={challan} key={challan._id} />)}
                    </tbody>
                </table>
                </div>
            </div>
            <div className="ftr">
              All Rights reserved
            </div>
          </div>
      );
    }
  }

  export default MyComponent;