import React, { Component } from 'react';
import {Link} from "react-router-dom";

export default class Navbar extends Component{
    render(){
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Vehicle Management System</Link>
                <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/" className="nav-link">Dashboard</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/challans" className="nav-link">Challans</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/total-fine" className="nav-link">Total Fine</Link>
                    </li>
                </ul>
                </div>
            </nav>
        );
    }
}