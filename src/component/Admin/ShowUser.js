import React, { Component } from 'react';
import Users from './Users';
import Header from "../layout/Header";
import "./style.css";
class showuser extends Component {

  render() {
    return (
      <div className="index-root">
        <div style={{ minWidth: "97%", maxWidth: "97%" }}><Header /></div>
        <Users />
      </div>
    );
  }
}

export default showuser;