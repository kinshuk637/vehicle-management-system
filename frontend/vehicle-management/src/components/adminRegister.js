import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerAdmin } from "../actions/adminAuthActions";
import classnames from "classnames";

class adminRegister extends Component {
  constructor() {
    super();
    this.state = {
      id_card_no: "",
      admin_name: "",
      office_location: "",
      mobile_no: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAdminAuthenticated) {
      this.props.history.push("/admin-dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
const newAdmin = {
    id_card_no: this.state.id_card_no,
    admin_name: this.state.admin_name,
    office_location: this.state.office_location,
    mobile_no: this.state.mobile_no,
    password: this.state.password,
    password2: this.state.password2
};

this.props.registerAdmin(newAdmin, this.props.history); 
console.log(newAdmin);
  };
render() {
    const { errors } = this.state;
return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/admin-section" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register Admin</b>
              </h4>
              <p className="grey-text text-darken-1">
                Already have an admin account? <Link to="/admin-login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.id_card_no}
                  error={errors.id_card_no}
                  id="id_card_no"
                  type="text"
                />
                <label htmlFor="id_card_no">ID Card Number</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.admin_name}
                  error={errors.admin_name}
                  id="admin_name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.admin_name
                  })}
                />
                <label htmlFor="owner_name">Admin Name</label>
                <span className="red-text">{errors.admin_name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.office_location}
                  error={errors.office_location}
                  id="office_location"
                  type="text"
                />
                <label htmlFor="office_location">Office Location</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.mobile_no}
                  error={errors.mobile_no}
                  id="mobile_no"
                  type="text"
                />
                <label htmlFor="mobile_no">Mobile Number</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">New Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    backgroundColor: "brown"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

adminRegister.propTypes = {
  registerAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerAdmin }
)(withRouter(adminRegister));