import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./landing.css";
class Landing extends Component {
  render() {
    return (
      <div>
      <div className="landing-body">
      <div className="navbar">
      <div className="nav">
        <ul className="topnav">
            <li><a href="/">HOME</a></li>
            <li className="topnav-right"><a href="/login">LOGIN</a></li>
            <li className="topnav-right"><a href="/register">REGISTER</a></li>
        </ul>
      </div>
      </div>
      <div className="front-side">
        <h1>VEHICLE MANAGEMENT SYSTEM</h1>
        <div className="frnt-list">
          <li>Register with your vehicle registration number</li>
          <li>Keep a record of Challans issued against your vehicle</li>
          <li>Pay Fine in One Go!</li>
        </div>
      </div>
      <div className="ftr">
        All Rights reserved
      </div>
      </div>
      </div>
    );
  }
}
export default Landing;