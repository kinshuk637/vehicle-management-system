import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
//import './dashboard.css';

export default class AdminIssueChallans extends Component{
    constructor(props){
        super(props);

        this.onChangechallan_id = this.onChangechallan_id.bind(this);
        this.onChangevehicle_reg_no = this.onChangevehicle_reg_no.bind(this);
        this.onChangeowner_name = this.onChangeowner_name.bind(this);
        this.onChangetraffic_rule_violation = this.onChangetraffic_rule_violation.bind(this);
        this.onChangerule_no = this.onChangerule_no.bind(this);
        this.onChangearea = this.onChangearea.bind(this);
        this.onChangeissue_date = this.onChangeissue_date.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            challan_id: '',
            vehicle_reg_no: '',
            owner_name: '',
            traffic_rule_violation:'',
            rule_no:'',
            area:'',
            status: 'due',
            issue_date: new Date(),
            users: []
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
    onChangechallan_id(e){
        this.setState({
            challan_id: e.target.value
        });
    }
    onChangevehicle_reg_no(e){
        this.setState({
            vehicle_reg_no: e.target.value
        });
    }
    onChangeowner_name(e){
        this.setState({
            owner_name: e.target.value
        });
    }
    onChangetraffic_rule_violation(e){
        this.setState({
            traffic_rule_violation: e.target.value
        });
    }
    onChangerule_no(e){
        this.setState({
            rule_no: e.target.value
        });
    }
    onChangearea(e){
        this.setState({
            area: e.target.value
        });
    }
    onChangeissue_date(date){
        this.setState({
            issue_date: date
        });
    }
    onSubmit(e){
        e.preventDefault();
        const challan = {
            challan_id: this.state.challan_id,
            vehicle_reg_no: this.state.vehicle_reg_no,
            owner_name: this.state.owner_name,
            traffic_rule_violation: this.state.traffic_rule_violation,
            rule_no: this.state.rule_no,
            area: this.state.area,
            status: this.state.status,
            issue_date: this.state.issue_date
        }
        console.log(challan);
        axios.post('http://localhost:5000/api/challans/add',challan)
        .then(res => console.log(res.data));
        window.location = "/admin-dashboard/issue-challans?idcardno="+this.state.idcardno;
    }
    render(){
        return(
            <div>
                <div className="navbar">
                <div className="nav">
                    <ul className="topnav">
                        <li><a href={"/admin-dashboard?idcardno="+this.state.idcardno}>ADMIN DASHBOARD</a></li>
                        <li><a href={"/admin-dashboard/users?idcardno="+this.state.idcardno}>USERS</a></li>
                        <li><a href={"/admin-dashboard/challans?idcardno="+this.state.idcardno}>CHALLANS</a></li>
                        <li><a href={"/admin-dashboard/issue-challans?idcardno="+this.state.idcardno}>ISSUE CHALLANS</a></li>
                        <li className="topnav-right"><a onClick={this.onLogoutClick}>LOGOUT</a></li>
                    </ul>
                </div>
                </div>
                <h3>Online Challan Submission</h3>
                <form className="challan-form" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Challan_id: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.challan_id}
                            onChange={this.onChangechallan_id}
                        />
                    </div>
                    <div className="form-group">
                        <label>Vehicle Registration Number: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.vehicle_reg_no}
                            onChange={this.onChangevehicle_reg_no}
                        />
                    </div>
                    <div className="form-group">
                        <label>Owner's Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.owner_name}
                            onChange={this.onChangeowner_name}
                        />
                    </div>
                    <div className="form-group">
                        <label>Traffic Rule Violation: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.traffic_rule_violation}
                            onChange={this.onChangetraffic_rule_violation}
                        />
                    </div>
                    <div className="form-group">
                        <label>Rule Number: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.rule_no}
                            onChange={this.onChangerule_no}
                        />
                    </div>
                    <div className="form-group">
                        <label>Area: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.area}
                            onChange={this.onChangearea}
                        />
                    </div>
                    <div className="form-group">
                        <label>Issue Date: </label>
                        <div>
                        <DatePicker
                            selected={this.state.issue_date}
                            onChange={this.onChangeissue_date}
                        />
                        </div> 
                    </div>
                    <div className="form-group">
                        <input type="submit" value="SUBMIT CHALLAN" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}