import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getleaderboard } from "../../actions";
import Header from "../layout/Header";
import Table from '../table';
import "./style.css";

class Leaderboard extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      alldata: []
    }
  }

  componentDidMount() {
    this.props.getleaderboard();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.alldata) {
      var all = nextProps.alldata;
      var filteredname = Array.from(all.reduce((a, o) => a.set(`${o.entryname}`, o), new Map()).values());
      let data = filteredname.map((v1, k1) => {
        console.log(v1)
        var obj = { entryName: v1.entryname, week: v1.weekNo, userId: v1.userID, flag: 0 };
        all.forEach((v2, k2) => {
          if (v2.entryname === v1.entryname) {
            obj[`week${v2.weekNo}`] = v2.teamname[0].Teamname.substr(0, 3).toUpperCase();
            obj[`flag${v2.weekNo}`] = v2.isOut;
          }
        });
        return obj;
      })

      data.forEach((item) => {
        item['continueCnt'] = Object.keys(item).filter((key) => key.substr(0, 4) === 'flag' && item[key] === 1).length
      })

      data.sort((a, b) => {
        if (a.continueCnt > b.continueCnt) return -1;
        if (a.continueCnt < b.continueCnt) return 1;

        if (a.entryName > b.entryName) return 1;
        if (a.entryName < b.entryName) return -1;
      });

      if (nextProps.auth.isAuthenticate) {
        const dataMine = data.filter((item) => item.userId === nextProps.auth.user.id)
        const dataOthers = data.filter((item) => item.userId !== nextProps.auth.user.id)
        data = dataMine.concat(dataOthers)
      }

      console.log(data)
      this.setState({ data })
    }
  }

  render() {
    return (
      <div className="index-root">
        <Header />
        {/* <div style={{ minWidth: "90%", minHeight: "10%", maxWidth: "90%", maxHeight: "10%", zIndex: 1 }}>
        </div> */}
        <div className="leaderboard-container">
          <div className="leaderboard-header">LEADERBOARD</div>
          <Table
            prognosisData={this.state.data}
          />
        </div>
        <div className="bottom">
          <span>Copyright © 2021 StuffYouCanUse</span>
          <div>
            <button className="buttom-btn">Terms &amp; Conditions</button>
            <button className="buttom-btn">License Agreement</button>
            <button className="buttom-btn">Privacy Policy</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    alldata: state.board.borderdata,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps, 
  { 
    getleaderboard 
  }
)(Leaderboard);