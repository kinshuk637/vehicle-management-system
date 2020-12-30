import React, { Component,useState,useEffect } from "react";
import axios from 'axios';
import queryString from 'querystring';
import {Link} from "react-router-dom";
import './dashboard.css';

const User = props => (
    <tr>
        <td>{props.user.vehicle_reg_no}</td>
        <td>{props.user.owner_name}</td>
        <td>{props.user.address}</td>
        <td>{props.user.mobile_no}</td>
        <td>{props.user.email}</td>
    </tr>
)

function AdminUsers() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setItems] = useState([]);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idcardno = urlParams.get('idcardno');
  
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
      fetch('http://localhost:5000/api/users')
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
                <li><a href={"/admin-dashboard?idcardno="+idcardno}>ADMIN DASHBOARD</a></li>
                <li><a href={"/admin-dashboard/users?idcardno="+idcardno}>USERS</a></li>
                <li><a href={"/admin-dashboard/rules?idcardno="+idcardno}>RULES</a></li>
                <li><a href={"/admin-dashboard/challans?idcardno="+idcardno}>CHALLANS</a></li>
                <li><a href={"/admin-portal"}>ISSUE CHALLANS</a></li>
                    <li className="topnav-right"><a>LOGOUT</a></li>
                </ul>
            </div>
            </div>
            <div>
              <div className="table-container">
                <h3>Users List</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Vehicle Reg No.</th>
                            <th>Owner's Name</th>
                            <th>Adress</th>
                            <th>Mobile Number</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => <User user={user} key={user._id} />)}
                    </tbody>
                </table>
              </div>
            </div>
          </div>
      );
    }
  }

  export default AdminUsers;