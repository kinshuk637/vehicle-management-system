import React, { Component } from "react";
import { Link } from "react-router-dom";
class AdminSection extends Component {
  render() {
    return (
      <div className="admin-section">
        <h1>VEHICLE MANAGEMENT SYSTEM | ADMIN SECTION</h1>
        <p><Link to="/admin-login">ADMIN LOGIN</Link></p>
        <p><Link to="/admin-register">ADMIN REGISTER</Link></p>
      </div>
    );
  }
}
export default AdminSection;