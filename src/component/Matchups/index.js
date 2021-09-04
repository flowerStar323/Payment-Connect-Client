import React, { Component } from 'react';
import Match from './Matchup';
import Header from "../layout/Header";
import "./style.css";
class index extends Component {

    render() {
        return (
            <div className="index-root">
                <div style={{ minWidth: "97%", maxWidth: "97%" }}><Header /></div>
                <Match />
            </div>
        );
    }
}

export default index;