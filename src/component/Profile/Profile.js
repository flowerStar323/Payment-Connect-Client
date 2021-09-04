import { Card, notification, Input } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from "../layout/Header";
import { editprofile } from "../../actions";
const jwt = require("jsonwebtoken");

class index extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            oldpassword: "",
            newpass: "",
            conpass: "",
            countANDpay: []
        }
    }
    componentDidMount() {
        var tokeninfor = jwt.decode(localStorage.getItem("token"));
        console.log(tokeninfor);
        this.setState({
            name: tokeninfor.name,
            email: tokeninfor.email,
            oldpassword: tokeninfor.pass,
            countANDpay: tokeninfor.countANDpay
        });
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    save = () => {
        const { name, email, password, newpass, conpass, oldpassword } = this.state;
        if (oldpassword !== password) {
            notification.warning({
                message: "Warning!",
                description: "old password is wrong!"
            })
            return;
        }
        else if (newpass !== conpass) {
            notification.warning({
                message: "Warning!",
                description: "confirm password is wrong!"
            })
            return;
        } else if (newpass === conpass) {
            this.props.editprofile(name, email, newpass);
        }
    }
    render() {

        return (

            <div style={{ gap: "15px", height: "90vh", width: "100vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div className="user-header-text">
                    Personal Information
                </div>
                        <div className="profile_Right-Container">
                            <div className="profile_Log-Input">
                                <div className="profile_Log-Input-Container">
                                    <div className="profile_email-content">
                                        NAME :
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <div className="profile_email-icon">
                                            <i className="fa fa-user" style={{ color: "white" }} />
                                        </div>
                                            <Input size="large" name="name" value={this.state.name} onChange={(e) => this.onChange(e)} placeholder="Name here........" className="profile_email-input" />
                                    </div>
                                </div>
                                <div className="profile_Log-Input-Container">
                                    <div className="profile_email-content">
                                        E-Mail :
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <div className="profile_email-icon">
                                            <i className="fa fa-envelope" style={{ color: "white" }} />
                                        </div>
                                            <Input size="large" readOnly name="email" value={this.state.email} onChange={(e) => this.onChange(e)} placeholder="E-mail here........" className="profile_email-input" />
                                    </div>
                                </div>
                                <div className="profile_Log-Input-Container">
                                    <div className="profile_email-content">
                                        OLD PASSWORD :
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <div className="profile_email-icon">
                                            <i className="fa fa-lock" style={{ color: "white" }} />
                                        </div>
                                            <Input size="large" type="password" name="password" value={this.state.password} onChange={(e) => this.onChange(e)} placeholder="Old Password here........" className="profile_email-input" />
                                    </div>
                                </div>
                                <div className="profile_Log-Input-Container">
                                    <div className="profile_email-content">
                                        NEW PASSWORD :
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <div className="profile_email-icon">
                                            <i className="fa fa-lock" style={{ color: "white" }} />
                                        </div>
                                            <Input size="large" type="password" name="newpass" value={this.state.newpass} onChange={(e) => this.onChange(e)} placeholder="New Password here........" className="profile_email-input" />
                                    </div>
                                </div>
                                <div>
                                    <div className="profile_email-content">CONFIRM PASSWORD :</div>
                                    <div style={{ display: "flex" }}>
                                        <div className="profile_email-icon">
                                            <i className="fa fa-lock" style={{ color: "white" }} />
                                        </div>
                                        <Input size="large" type="password" name="conpass" onChange={(e) => this.onChange(e)} value={this.state.conpass} placeholder="Re-Type your password..." className="profile_email-input" />
                                    </div>
                                </div>

                            </div>
                            <div className="profile_Login-Button" onClick={() => this.save()}>
                                <div>SAVE</div>
                            </div>
                    </div>
            </div >

        );
    }
}
const mapStateToProps = state => {
    return {

    };
};
export default connect(
    mapStateToProps, { editprofile }
)(index);