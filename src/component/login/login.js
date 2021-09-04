import React, { Component } from 'react';
import { Row, Col, Input, Button, notification } from "antd";
import { Logsuccess, Logout } from "../../actions";
import { Link } from 'react-router-dom';
import "./style.css";
import axios from 'axios';

import { connect } from 'react-redux';
class login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
        }
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    send = () => {
        const { email, password } = this.state;
        this.props.Logsuccess(email, password, this.props.history);
    }
    render() {
        return (
            <div className="root">
                <div className="RightDiv">
                    <div className="Right-Container">
                        <div className="Log-Top">Log In To Your Account</div>
                        <div className="Log-Input">
                            <div className="Log-Input-Container">
                                <div className="email-content">
                                    E-Mail :
                                </div>
                                <div style={{ display: "flex" }}>
                                    <div className="email-icon">
                                        <i className="fa fa-envelope" style={{ color: "white" }} />
                                    </div>
                                    <div>
                                        <Input size="large" name="email" onChange={(e) => this.onChange(e)} placeholder="E-mail here........" className="email-input" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="email-content">PASSWORD :</div>
                                <div style={{ display: "flex" }}>
                                    <div className="email-icon">
                                        <i className="fa fa-lock" style={{ color: "white" }} />
                                    </div>
                                    <div>
                                        <Input size="large" type="password" name="password" onChange={(e) => this.onChange(e)} placeholder="Type your password..." className="email-input" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Login-Button" onClick={() => this.send()}>
                            <div>LOG IN</div>
                        </div>
                        <div className="Log-Bottom">
                            <Link to="/forgetpass"><div style={{ color: "#C90D08", marginBottom: "5px" }}>Forgot Password?</div></Link>
                            <div style={{ display: "flex" }}>Don't have account? <Link to="/register"><p style={{ marginLeft: "10px", fontWeight: "bold", color: "#C90D08", cursor: "pointer" }}>Register</p></Link></div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
const mapStateToProps = state => {
    return {};
};
export default connect(mapStateToProps, { Logout, Logsuccess })(login);
