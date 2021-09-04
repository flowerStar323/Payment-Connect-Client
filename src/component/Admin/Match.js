import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Menu, Button, Select, notification } from "antd";
import axios from 'axios';
import { ServerURL } from "../../config/port";
import "./style.css";
const { Option } = Select;
class Match extends Component {
  constructor() {
    super();
    this.state = {
      alldata: [],
      teamarray: [],
      setinfor: [],
      weekNum: 1,
      lockflag: false,
      isOverflow: false
    }
  }

  componentWillMount() {
    let setinfor = [];
    this.setTeamname();
    for (let i = 0; i < 16; i++) {
      setinfor.push({ first: 0, sec: 0, flag: 0 });
    }

    this.setState({ setinfor });
    axios.get(`${ServerURL}/get_matchinfor`)
      .then(e => {
        let weekdata = e.data.filter((v, k) => v.weekNum === this.state.weekNum);
        this.setState({ alldata: e.data, setinfor: weekdata[0].matches, lockflag: weekdata[0].isLocked, isOverflow: weekdata[0].isOverflow });
      })
      .catch(err => console.log(err));

  }
  setTeamname = () => {
    axios.get(`${ServerURL}/get_teamnames`)
      .then(e => this.setState({ teamarray: e.data }))
      .catch(err => console.log(err));

  }
  setTeamMatch = (e, i) => {
    var { setinfor } = this.state;
    if (i.key.split("/")[2] == 1)
      setinfor[i.key.split("/")[1]].first = i.value;
    else setinfor[i.key.split("/")[1]].sec = i.value;
    this.setState({ setinfor });
  }
  LockClick = (index, element) => {
    let { setinfor, isOverflow } = this.state;
    setinfor[index].flag = element;
    isOverflow === false && this.setState({ setinfor });
  }
  save = () => {
    const { weekNum, setinfor, lockflag } = this.state;
    if (setinfor.filter((v, k) => v.flag === 0).length > 0) {
      axios.post(`${ServerURL}/save_matchinfor`, { weekNum, matches: setinfor, isLocked: lockflag, isOverflow: false })
        .then(e => {
          if (e.data === "add") {
            notification.success({
              message: "Success",
              description: "Add Successful"
            }); this.componentWillMount();
          }
          else if (e.data === "update") {
            notification.success({
              message: "Success",
              description: "Update Successful"
            }); this.componentWillMount();
          }
        })
        .catch(err => console.log(err));
    } else {
      axios.post(`${ServerURL}/save_matchinfor`, { weekNum, matches: setinfor, isLocked: lockflag, isOverflow: true })
        .then(e => {
          if (e.data === "add") {
            notification.success({
              message: "Success",
              description: "Add Successful"
            }); this.componentWillMount();
          }
          else if (e.data === "update") {
            notification.success({
              message: "Success",
              description: "Update Successful"
            }); this.componentWillMount();
          }
        })
        .catch(err => console.log(err));
    }

  }
  Clear = () => {
    let { setinfor } = this.state;
    let newinfor = [];
    setinfor = setinfor.map((v, k) => {
      newinfor.push({ first: v.first, sec: v.sec, flag: 0, _id: v._id });
    });
    this.setState({ setinfor: newinfor });
  }
  setWeek = e => {
    let { alldata } = this.state;
    let setinfor = alldata.filter((v, k) => v.weekNum === e);
    if (setinfor.length === 0) {
      for (let i = 0; i < 16; i++) {
        setinfor.push({ first: 0, sec: 0, flag: 0 });
      }

      this.setState({ setinfor, weekNum: e, lockflag: false, isOverflow: false });
    } else {
      this.setState({ weekNum: e, setinfor: setinfor[0].matches, lockflag: setinfor[0].isLocked, isOverflow: setinfor[0].isOverflow });
    }
  }
  render() {
    var unlockData = (
      <Row>
        <Col span={12}>
          {
            [...Array(8)].map((vv, kk) =>
              <div className="select-first-team">
                <div className="first-div">
                  <Select
                    style={{ width: "150px", marginRight: "15px" }}
                    onChange={this.setTeamMatch}
                    size="large"
                    value={this.state.setinfor[kk].first === 0 ? undefined : this.state.setinfor[kk].first}
                    className="team-item"
                  >
                    {
                      this.state.teamarray
                        .map((v, k) =>
                          <Option key={v._id + "/" + kk + "/1"} value={v.No}>
                            <img src={v.imageURL} width="30px" height="30px" style={{ marginRight: "5px" }} />
                            {v.Teamname}
                          </Option>)
                    }
                  </Select>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minWidth: "30px", minHeight: "30px", maxHeight: "30px", background: "#C90E07", borderRadius: "50px" }}>
                      <img src="vs.png" />

                    </div>
                  </div>
                  <Select
                    style={{ width: "150px", marginLeft: "15px" }}
                    onChange={this.setTeamMatch}
                    size="large"
                    value={this.state.setinfor[kk].sec === 0 ? undefined : this.state.setinfor[kk].sec}
                    className="team-item"
                  >
                    {this.state.teamarray
                      .map((v, k) =>
                        <Option key={v._id + "/" + kk + "/2"} value={v.No}>
                          <img src={v.imageURL} width="30px" height="30px" style={{ marginRight: "5px" }} />
                          {v.Teamname}
                        </Option>)
                    }
                  </Select>
                </div>
              </div>
            )
          }
        </Col>
        <Col span={12}>
          {
            [...Array(8)].map((vv, kk) =>
              <div className="select-first-team">
                <div className="first-div">
                  <Select
                    style={{ width: "150px", marginRight: "15px" }}
                    onChange={this.setTeamMatch}
                    size="large"
                    value={this.state.setinfor[(kk + 8)].first === 0 ? undefined : this.state.setinfor[(kk + 8)].first}
                  >
                    {this.state.teamarray
                      .map((v, k) =>
                        <Option key={v._id + "/" + (kk + 8) + "/1"} value={v.No}>
                          <img src={v.imageURL} width="30px" height="30px" style={{ marginRight: "5px" }} />
                          {v.Teamname}
                        </Option>)
                    }
                  </Select>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minWidth: "30px", minHeight: "30px", maxHeight: "30px", background: "#C90E07", borderRadius: "50px" }}>
                      <img src="vs.png" />

                    </div>
                  </div>
                  <Select
                    style={{ width: "150px", marginLeft: "15px" }}
                    onChange={this.setTeamMatch}
                    size="large"
                    value={this.state.setinfor[(kk + 8)].sec === 0 ? undefined : this.state.setinfor[(kk + 8)].sec}
                  >
                    {this.state.teamarray
                      .map((v, k) =>
                        <Option key={v._id + "/" + (kk + 8) + "/2"} value={v.No}>
                          <img src={v.imageURL} width="30px" height="30px" style={{ marginRight: "5px" }} />
                          {v.Teamname}
                        </Option>)
                    }
                  </Select>
                </div>
              </div>
            )
          }
        </Col>
      </Row>);
    var lockData = (
      <Row>
        <Col span={12}>
          {
            [...Array(8)].map((vv, kk) =>
              <div className="select-first-team">
                <div className="first-div">
                  <div
                    style={{ cursor: "pointer", width: "150px", marginRight: "15px", borderRadius: "34px", background: this.state.setinfor[kk].flag === 1 ? "#22B14C" : "white" }}
                    onClick={() => this.LockClick(kk, 1)}
                  >
                    {this.state.teamarray
                      .map((v, k) => {
                        if (this.state.setinfor[kk].first === v.No) {
                          return <div className="lockdata-root-div">
                            <div>
                              <img src={v.imageURL} width="30px" height="30px" style={{ marginRight: "5px" }} />
                            </div>
                            <div>
                              {v.Teamname}
                            </div>


                          </div>
                        }
                      }
                      )}
                  </div>
                  <div style={{ marginRight: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minWidth: "30px", minHeight: "30px", maxHeight: "30px", background: "#C90E07", borderRadius: "50px" }}>
                      <img src="vs.png" />
                    </div>
                  </div>
                  <div
                    style={{ cursor: "pointer", width: "150px", marginRight: "15px", borderRadius: "34px", background: this.state.setinfor[kk].flag === 2 ? "#22B14C" : "white" }}
                    onClick={() => this.LockClick(kk, 2)}
                  >
                    {this.state.teamarray
                      .map((v, k) => {
                        if (this.state.setinfor[kk].sec === v.No) {
                          return <div className="lockdata-root-div">
                            <div>
                              <img src={v.imageURL} width="30px" height="30px" style={{ marginRight: "5px" }} />
                            </div>
                            <div>
                              {v.Teamname}
                            </div>
                          </div>
                        }
                      }
                      )}
                  </div>
                </div>
              </div>
            )
          }
        </Col>
        <Col span={12}>
          {
            [...Array(8)].map((vv, kk) =>
              <div className="select-first-team">
                <div className="first-div">
                  <div
                    style={{ cursor: "pointer", width: "150px", marginRight: "15px", borderRadius: "34px", background: this.state.setinfor[(kk + 8)].flag === 1 ? "#22B14C" : "white" }}
                    onClick={() => this.LockClick((kk + 8), 1)}
                  >
                    {this.state.teamarray
                      .map((v, k) => {
                        if (this.state.setinfor[(kk + 8)].first === v.No) {
                          return <div className="lockdata-root-div">
                            <div>
                              <img src={v.imageURL} width="30px" height="30px" style={{ marginRight: "5px" }} />
                            </div>
                            <div>
                              {v.Teamname}
                            </div>
                          </div>
                        }
                      }
                      )}
                  </div>
                  <div style={{ marginRight: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minWidth: "30px", minHeight: "30px", maxHeight: "30px", background: "#C90E07", borderRadius: "50px" }}>
                      <img src="vs.png" />

                    </div>
                  </div>
                  <div
                    style={{ cursor: "pointer", width: "150px", marginRight: "15px", borderRadius: "34px", background: this.state.setinfor[(kk + 8)].flag === 2 ? "#22B14C" : "white" }}
                    onClick={() => this.LockClick((kk + 8), 2)}
                  >
                    {this.state.teamarray
                      .map((v, k) => {
                        if (this.state.setinfor[(kk + 8)].sec === v.No) {
                          return <div className="lockdata-root-div">
                            <div>
                              <img src={v.imageURL} width="30px" height="30px" style={{ marginRight: "5px" }} />
                            </div>
                            <div>
                              {v.Teamname}
                            </div>
                          </div>
                        }
                      }
                      )}
                  </div>
                </div>
              </div>
            )
          }
        </Col>
      </Row>
    );
    return (
      <div style={{ height: "90vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Card style={{ minWidth: "95%", minHeight: "95%", maxWidth: "95%", maxHeight: "95%", borderRadius: "20px" }}
          title={
            <div className="match-card-title">
              <div className="text-choose">Choose Weeks:</div>
              <Select style={{ width: "120px", fontSize: "15px", textAlign: "center" }} size="large" value={this.state.weekNum} onChange={(e) => this.setWeek(e)}>
                {
                  [...Array(18)].map((v, k) => <Option key={k + 1} value={k + 1}>week {k + 1}</Option>)
                }

              </Select>
            </div>
          }
          extra={<div>
            {this.state.lockflag === true ?
              <Button.Group>
                <Button
                  // type="primary"
                  size="large"
                  style={{ borderRadius: "20px 0 0 20px", background: this.state.isOverflow ? "grey" : "#C90E07", color: "white" }}
                  disabled={this.state.isOverflow === true && true}
                  onClick={() => this.Clear()}
                >
                  <i className="fa fa-broom" style={{ marginRight: "5px" }} />
                  Clear
                </Button>
                <Button
                  // type="primary"
                  style={{ background: this.state.isOverflow ? "grey" : "#C90E07", color: "white" }}
                  size="large"
                  onClick={() => this.setState({ lockflag: !this.state.lockflag })}
                  disabled={this.state.isOverflow === true && true}
                >
                  <i className="fa fa-unlock" style={{ marginRight: "5px" }} />
                  Unlock
                </Button>
                <Button
                  // type="primary"
                  size="large"
                  style={{ borderRadius: "0 20px 20px 0", background: this.state.isOverflow ? "grey" : "#C90E07", color: "white" }}
                  disabled={this.state.isOverflow === true && true}
                  onClick={() => this.save()}
                >
                  <i className="fa fa-save" style={{ marginRight: "5px" }} />
                  Save
                </Button>
              </Button.Group> :
              <Button.Group>
                <Button
                  // type="primary"

                  size="large"
                  style={{ borderRadius: "20px 0 0 20px", background: "#C90E07", color: "white" }}
                  onClick={() => this.setState({ lockflag: !this.state.lockflag })}
                  disabled={this.state.isOverflow === true && true}
                >
                  <i className="fa fa-lock" style={{ marginRight: "5px" }} />
                  Lock
                </Button>
                <Button
                  // type="primary"
                  size="large"
                  style={{ borderRadius: "0 20px 20px 0", background: "#C90E07", color: "white" }}
                  disabled={this.state.isOverflow === true && true}
                  onClick={() => this.save()}
                >
                  <i className="fa fa-save" style={{ marginRight: "5px" }} />
                  Save
                </Button>
              </Button.Group>
            }
          </div>}>
          <div style={{ textAlign: "center", overflowY: "scroll", height: "65vh" }}>
            {this.state.lockflag == true ? lockData : unlockData}
          </div>

        </Card>
      </div>
    );
  }
}

export default Match;