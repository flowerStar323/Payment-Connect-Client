import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Logout } from "../../actions";
import "./style.css";

class Header extends Component {
  constructor() {
    super();

    this.state = {};
  }

  OnLogout = () => {
    localStorage.clear();
    this.props.Logout();
  }

  render() {
    let menu1 = this.props.auth.user.role === "user" ?
      <div className="btn-group">
        <button 
          className="btn-custom dropdown-toggle" 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
        >
          {this.props.auth.user.name}
        </button>
        <ul className="dropdown-menu">
          <Link to="/matchup" className="link">
            <li className="dropdown-item">Week Matchup</li>
          </Link>
          <Link to="/">
            <li className="dropdown-item">Leaderboard</li>
          </Link>
          <Link to="/profile">
            <li className="dropdown-item">My Profile</li>
          </Link>
          <Link to="/donate">
            <li className="dropdown-item">Donate</li>
          </Link>
          {/* <Link to="/history">
            <li className="dropdown-item">Entry History</li>
          </Link> */}
          <Link to="/login">
            <li className="dropdown-item" onClick={this.OnLogout}>Logout</li>
          </Link>
        </ul>
      </div>
      :
      <div className="btn-group">
        <button type="button" className="btn-custom dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          {this.props.auth.user.name}
        </button>
        <ul className="dropdown-menu">
          <Link to="/">
            <li className="dropdown-item">Leaderboard</li>
          </Link>
          <Link to="/teammatch">
            <li className="dropdown-item">Match Schedule</li>
          </Link>
          <Link to="/user">
            <li className="dropdown-item">Manage Users</li>
          </Link>
          <Link to="/login">
            <li className="dropdown-item" onClick={this.OnLogout}>Logout</li>
          </Link>
        </ul>
      </div>

    let menu2 = (
      <Link to="/login"><button className="btn-custom">Login</button></Link>
    );

    return (
      <div className="header-container">
        <Link to="/">
          <img className="logo-img" src="SYCUlogo.png" alt="Logo" />
        </Link>
        
        {this.props.auth.isAuthenticate ? menu1 : menu2}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps, { Logout }
)(Header);