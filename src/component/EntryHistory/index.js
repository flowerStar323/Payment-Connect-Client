import React, { Component } from 'react';
import EntryHistory from './EntryHistory';
import Header from "../layout/Header";
import "./style.css";
class index extends Component {

    render() {
        return (
            <div className="index-root">
                <div style={{ minWidth: "95%", maxWidth: "95%" }}><Header /></div>
                <EntryHistory />
            </div>
        );
    }
}

export default index;