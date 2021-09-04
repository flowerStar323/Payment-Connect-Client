import { Card, Input, Table } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
const jwt = require("jsonwebtoken");

class EntryHistory extends Component {
    constructor() {
        super();
        this.state = {
            cardnumber: "",
            name: "",
            amount: "",
            cvv: ""
        }
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {

        return (

            <div className="history_root">
                <div className="user-header-text">
                    ENTRY HISTORY
                </div>
                <Card style={{
                    width: "80vw", minWidth: "50%", minHeight: "90%", maxWidth: "90%", maxHeight: "90%", borderRadius: "20px"
                }}
                >
                    <div className="history_RightDiv">
                        <div className="history_Right-Container">
                            <div className="history_Log-Input">

                            </div>
                        </div>
                    </div>
                </Card >
            </div >

        );
    }
}
const mapStateToProps = state => {
    return {

    };
};
export default connect(
    mapStateToProps
)(EntryHistory);