import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import setAdminAuthToken from "./utils/setAdminAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Challans from "./components/dashboard/Challans";
import Totalfine from "./components/dashboard/Totalfine";
import MyComponent from "./components/dashboard/Challans2";
import AdminPortal from "./components/AdminPortal";
import adminLogin from "./components/adminLogin";
import adminRegister from "./components/adminRegister";
import adminDashboard from "./components/dashboard/adminDashboard";
import AdminPrivateRoute from "./components/private-route/adminPrivateRoute";
import { setCurrentAdmin,logoutAdmin } from "./actions/adminAuthActions";
import AdminChallans from "./components/dashboard/adminChallans";
import AdminUsers from "./components/dashboard/adminUsers";
import AdminIssueChallans from "./components/dashboard/adminIssueChallans";
import AdminRules from "./components/dashboard/adminRules";
import PayChallan from "./components/dashboard/payChallan";
import AdminSection from "./components/AdminSection";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
if (localStorage.adminjwtToken) {
  // Set auth token header auth
  const admin_token = localStorage.adminjwtToken;
  setAdminAuthToken(admin_token);
  // Decode token and get user info and exp
  const admin_decoded = jwt_decode(admin_token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentAdmin(admin_decoded));
// Check for expired token
  const admin_currentTime = Date.now() / 1000; // to get in milliseconds
  if (admin_decoded.exp < admin_currentTime) {
    // Logout user
    store.dispatch(logoutAdmin());
    // Redirect to login
    window.location.href = "./admin-login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/admin-register" component={adminRegister} />
            <Route exact path="/admin-login" component={adminLogin} />
            <Route exact path="/admin-portal" component={AdminPortal} />
            <Route exact path="/admin-section" component={AdminSection} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/dashboard/challans" component={MyComponent} />
              <PrivateRoute exact path="/dashboard/total-fine" component={Totalfine} />
              <PrivateRoute exact path="/dashboard/pay-challan" component={PayChallan} />
              <AdminPrivateRoute exact path="/admin-dashboard" component={adminDashboard} />
              <AdminPrivateRoute exact path="/admin-dashboard/challans" component={AdminChallans} />
              <AdminPrivateRoute exact path="/admin-dashboard/users" component={AdminUsers} />
              <AdminPrivateRoute exact path="/admin-dashboard/issue-challans" component={AdminIssueChallans} />
              <AdminPrivateRoute exact path="/admin-dashboard/rules" component={AdminRules} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;