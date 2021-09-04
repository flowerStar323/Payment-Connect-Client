import React, { Component } from 'react';
import Profile from './Profile';
import Header from "../layout/Header";
import "./style.css";
class showuser extends Component {

    render() {
        return (
            <div className="index-root">
                <Header />
                <Profile />
            </div>
        );
    }
}

export default showuser;