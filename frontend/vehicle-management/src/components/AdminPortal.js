import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import queryString from 'querystring';
import axios from 'axios';

export default class AdminPortal extends Component{
    constructor(props){
        super(props);

        this.onChangechallan_id = this.onChangechallan_id.bind(this);
        this.onChangevehicle_reg_no = this.onChangevehicle_reg_no.bind(this);
        this.onChangeowner_name = this.onChangeowner_name.bind(this);
        this.onChangetraffic_rule_violation = this.onChangetraffic_rule_violation.bind(this);
        this.onChangerule_no = this.onChangerule_no.bind(this);
        this.onChangefine_amount = this.onChangefine_amount.bind(this);
        this.onChangearea = this.onChangearea.bind(this);
        this.onChangeissue_date = this.onChangeissue_date.bind(this);
        this.onFetchRule = this.onFetchRule.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            challan_id: '',
            vehicle_reg_no: '',
            owner_name: '',
            traffic_rule_violation:'',
            rule_no:'',
            area:'',
            status: 'Due',
            issue_date: new Date(),
            fine_amount: 0,
            rules: []
        }
    }

    // componentDidMount(){
    //     axios.get('http://localhost:5000/api/rules')
    //     .then(response => {
    //         if(response.data.length > 0){
    //             this.setState({
    //                 rules: response.data.map(rule => rule.traffic_rule_violation)
    //             })
    //         }
    //     })
    // }
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
    onChangefine_amount(e){
        this.setState({
            fine_amount: e.target.value
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
    onFetchRule(){
        axios.get('http://localhost:5000/api/rules/'+this.state.rule_no)
        .then( res => {
            console.log(res.data.traffic_rule_violation);
            this.setState({
                traffic_rule_violation: res.data.traffic_rule_violation,
                fine_amount: res.data.fine_amount
            })
        })
    }
    onSubmit(e){
        e.preventDefault();
        // axios.get('http://localhost:5000/api/rules/'+this.state.rule_no)
        // .then( res => {
        //     console.log(res.data.traffic_rule_violation);
        //     this.setState({
        //         traffic_rule_violation: res.data.traffic_rule_violation,
        //         fine_amount: res.data.fine_amount
        //     })
        // })
        const fine = {
            fine_amount: this.state.fine_amount
        }
        const challan = {
            challan_id: this.state.challan_id,
            vehicle_reg_no: this.state.vehicle_reg_no,
            owner_name: this.state.owner_name,
            traffic_rule_violation: this.state.traffic_rule_violation,
            rule_no: this.state.rule_no,
            fine_amount: this.state.fine_amount,
            area: this.state.area,
            status: this.state.status,
            issue_date: this.state.issue_date
        }
        console.log(challan);
        axios.post('http://localhost:5000/api/challans/add',challan)
        .then(res => console.log(res.data));
        axios.post('http://localhost:5000/api/users/add-fine/'+this.state.vehicle_reg_no,fine)
        .then(res => console.log(res.data));
        window.location = '/admin-portal';
    }
    render(){
        console.log(this.state.rules);
        return(
            <div>
                <div className="navbar">
                <div className="nav">
                    <ul className="topnav">
                        <li><a href={"/admin-dashboard?idcardno="+this.state.idcardno}>ADMIN DASHBOARD</a></li>
                        <li><a href={"/admin-dashboard/users?idcardno="+this.state.idcardno}>USERS</a></li>
                        <li><a href={"/admin-dashboard/rules?idcardno="+this.state.idcardno}>RULES</a></li>
                        <li><a href={"/admin-dashboard/challans?idcardno="+this.state.idcardno}>CHALLANS</a></li>
                        <li><a href={"/admin-portal?idcardno="+this.state.idcardno}>ISSUE CHALLANS</a></li>
                        <li className="topnav-right"><a onClick={this.onLogoutClick}>LOGOUT</a></li>
                    </ul>
                </div>
                </div>
                <div className="issue-challan-section">
                <h3>Online Challan Submission</h3>
                <form className="issue-frm" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Challan ID: </label>
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
                        <label>Rule Number: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.rule_no}
                            onChange={this.onChangerule_no}
                        />
                        <button onClick={this.onFetchRule}>Fetch Rule</button>
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
                        <label>Fine Amount: </label>
                        <input type="number"
                            required
                            className="form-control"
                            value={this.state.fine_amount}
                            onChange={this.onChangefine_amount}
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
            </div>
        );
    }
}