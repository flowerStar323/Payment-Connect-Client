import React, { Component } from 'react';
import Match from './Match';
import Header from "../layout/Header";
class index extends Component {
  constructor() {
    super();
    this.state = {
    }
  }
  render() {
    return (
      <div className="index-root">
        <div style={{ minWidth: "96%", maxWidth: "96%" }}><Header /></div>
        <Match />
      </div>
    );
  }
}

export default index;