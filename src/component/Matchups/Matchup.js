import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Row, Col, Card, Select, notification } from "antd";
import { ServerURL } from "../../config/port";
import { getTeamNames, setTeamID, getuseraction, eachentrydata, eachentrydataclear } from "../../actions"

const jwt = require("jsonwebtoken");
const { Option } = Select;

class index extends Component {
    constructor() {
        super();
        this.state = {
            eachentrydata: [],
            token: {},
            entrydata: [],
            teamarray: [],
            userID: "",
            setinfor: [],
            entryname: "",
            selectTeamNo: 0
        }
    }

    componentWillMount() {

        var tokeninfor = jwt.decode(localStorage.getItem("token"));

        let setinfor = [];
        for (let i = 0; i < 16; i++) {
            setinfor.push({ first: 0, sec: 0, flag: 0 });
        }
        this.setState({ setinfor });
        this.props.getTeamNames();

        if (this.state.entryname === "") this.props.eachentrydataclear();
        axios.get(`${ServerURL}/get_matchinfor`)
            .then(e => {
                var newarr = e.data.filter((v, k) => v.isOverflow).sort((a, b) => a - b);
                if (newarr.length === 0) {
                    this.setState({ weekNum: 1 }, this.getnowmatch(1, tokeninfor.id));
                } else {
                    var index = newarr.length - 1;
                    this.setState({ weekNum: newarr[index].weekNum + 1 }, this.getnowmatch((newarr[index].weekNum + 1), tokeninfor.id));
                }

            })
            .catch(err => console.log(err));

        this.setState({ userID: tokeninfor.id, token: tokeninfor });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.teamname) {
            this.setState({ teamarray: nextProps.teamname })
        }
        if (nextProps.entrydata) {
            this.setState({ entrydata: nextProps.entrydata });
        }
        if (nextProps.eachentry) {
            this.setState({ eachentrydata: nextProps.eachentry });
        }
    }

    getnowmatch = (weeknum, userid) => {
        axios.post(`${ServerURL}/getnowmatch`, { weeknum })
            .then(v => this.setState({ setinfor: v.data.matches }))
            .catch(err => console.log(err));
        this.props.getuseraction(userid);
    }
    setSelectTeamID = (id) => {
        const { userID, entryname, weekNum, token } = this.state;
        axios.post(`${ServerURL}/confirmaction`, { weekNum, entryname, userID }).then(e => {
            if (e.data === "true") {
                if (token.countANDpay.length == 0)
                    notification.warning({
                        message: "Warning!",
                        description: "please Buy EntryName"
                    });
                else {
                    if (entryname == "") {
                        notification.warning({
                            message: "Warning!",
                            description: "Choose EntryName"
                        });
                    } else {
                        this.props.setTeamID(weekNum, userID, entryname, id);
                    }
                }
            } else notification.warning({ message: "Warning!", description: "You can't choose" });

        }).catch(err => console.log(err))

    }
    Onselect = e => {
        const { userID } = this.state;
        this.props.eachentrydata(userID, e);
        this.setState({ entryname: e });
    }
    render() {
        const { token } = this.state;
        let entries;
        if (token.countANDpay.length != 0) {
            var count = 0;
            token.countANDpay.map((v, k) => {
                count += v.count;
            });
            entries = [...Array(count)].map((v1, k1) =>
                <Option key={k1} value={token.name + (k1 + 1)}>{token.name + (k1 + 1)}</Option>
            );
        }
        return (
            <div style={{ height: "90vh", width: "100vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <Card style={{
                    minWidth: "95%", minHeight: "95%", maxWidth: "95%", maxHeight: "95%", borderRadius: "20px"
                }}
                >
                    <div className="top-bar" style={{ display: "flex", alignItems: "center  "}}>
                        <div className="top-bar-menu" style={{ width: "33%" }}>
                            <div className="match-card-title">
                                <div className="text-choose">Entry : </div>
                                <Select style={{ width: "150px", fontSize: "15px", textAlign: "center" }} size="large" onChange={(e) => this.Onselect(e)}>
                                    {entries}

                                </Select>
                            </div>
                        </div>
                        <div className="top-bar-title" style={{ width: "33%", textAlign: "center" }}>
                            <div style={{
                                fontWeight: "bold",
                                color: "#666666", fontSize: "40px"
                            }}>WEEK {this.state.weekNum}
                            </div>
                        </div>

                    </div>
                    <div className="matchup-team-match">

                        {
                            this.state.setinfor.filter(v => v.first === 0).length === 16 ? <div style={{ height: "50vh", paddingTop: "25vh", fontWeight: "bold" }}><h1>No match</h1></div> : <Row>
                                <Col span={12}>
                                    {
                                        [...Array(8)].map((vv, kk) =>
                                            <div className="select-first-team">
                                                <div className="first-div">
                                                    <div
                                                        style={{ cursor: "pointer", width: "200px", marginRight: "15px" }}

                                                    >
                                                        {this.state.teamarray
                                                            .map((v, k) => {
                                                                if (this.state.setinfor[kk].first === v.No) {
                                                                    if (this.state.eachentrydata.length === 0) {
                                                                        return <div className="lockdata-root-div" onClick={() => this.setSelectTeamID(v.No)}>
                                                                            <div>
                                                                                <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                            </div>
                                                                            <div>
                                                                                {v.Teamname}
                                                                            </div>


                                                                        </div>
                                                                    }
                                                                    else {
                                                                        var data = this.state.eachentrydata.filter((va, ka) => va.selectTeamNo === v.No);
                                                                        if (data.length === 0) {
                                                                            return <div className="lockdata-root-div" onClick={() => this.setSelectTeamID(v.No)}>
                                                                                <div>
                                                                                    <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                </div>
                                                                                <div>
                                                                                    {v.Teamname}
                                                                                </div>
                                                                            </div>
                                                                        } else {
                                                                            if (data[0].isOut === 0) {
                                                                                return <div className="lockdata-root-div" style={{ background: "#e2e2e2" }}>
                                                                                    <div>
                                                                                        <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                    </div>
                                                                                    <div>
                                                                                        {v.Teamname}
                                                                                    </div>


                                                                                </div>
                                                                            } else if (data[0].isOut === 1) {
                                                                                return <div className="lockdata-root-div" style={{ background: "lightgreen" }}>
                                                                                    <div>
                                                                                        <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                    </div>
                                                                                    <div>
                                                                                        {v.Teamname}
                                                                                    </div>


                                                                                </div>
                                                                            } else if (data[0].isOut === 2) {
                                                                                return <div className="lockdata-root-div" style={{ background: "#ff9999" }}>
                                                                                    <div>
                                                                                        <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                    </div>
                                                                                    <div>
                                                                                        {v.Teamname}
                                                                                    </div>


                                                                                </div>
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            )}
                                                    </div>
                                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minWidth: "30px", minHeight: "30px", maxHeight: "30px", background: "#C90E07", borderRadius: "50px" }}>
                                                            <img src="vs.png" />

                                                        </div>
                                                    </div>
                                                    <div
                                                        style={{ cursor: "pointer", width: "200px", marginLeft: "15px" }}
                                                    >
                                                        {this.state.teamarray
                                                            .map((v, k) => {
                                                                if (this.state.setinfor[kk].sec === v.No) {
                                                                    if (this.state.eachentrydata.length === 0) {
                                                                        return <div className="lockdata-root-div" onClick={() => this.setSelectTeamID(v.No)}>
                                                                            <div>
                                                                                <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                            </div>
                                                                            <div>
                                                                                {v.Teamname}
                                                                            </div>


                                                                        </div>
                                                                    }
                                                                    else {
                                                                        var data = this.state.eachentrydata.filter((va, ka) => va.selectTeamNo === v.No);
                                                                        if (data.length === 0) {
                                                                            return <div className="lockdata-root-div" onClick={() => this.setSelectTeamID(v.No)}>
                                                                                <div>
                                                                                    <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                </div>
                                                                                <div>
                                                                                    {v.Teamname}
                                                                                </div>
                                                                            </div>
                                                                        } else {
                                                                            if (data[0].isOut === 0) {
                                                                                return <div className="lockdata-root-div" style={{ background: "#e2e2e2" }}>
                                                                                    <div>
                                                                                        <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                    </div>
                                                                                    <div>
                                                                                        {v.Teamname}
                                                                                    </div>


                                                                                </div>
                                                                            } else if (data[0].isOut === 1) {
                                                                                return <div className="lockdata-root-div" style={{ background: "lightgreen" }}>
                                                                                    <div>
                                                                                        <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                    </div>
                                                                                    <div>
                                                                                        {v.Teamname}
                                                                                    </div>


                                                                                </div>
                                                                            } else if (data[0].isOut === 2) {
                                                                                return <div className="lockdata-root-div" style={{ background: "#ff9999" }}>
                                                                                    <div>
                                                                                        <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                    </div>
                                                                                    <div>
                                                                                        {v.Teamname}
                                                                                    </div>


                                                                                </div>
                                                                            }
                                                                        }
                                                                    }
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
                                                        style={{ cursor: "pointer", width: "200px", marginRight: "15px" }}
                                                    // onClick={() => this.LockClick(kk, 1)}
                                                    >
                                                        {this.state.teamarray
                                                            .map((v, k) => {
                                                                if (this.state.setinfor[(kk + 8)].first === v.No) {
                                                                    if (this.state.eachentrydata.length === 0) {
                                                                        return <div className="lockdata-root-div" onClick={() => this.setSelectTeamID(v.No)}>
                                                                            <div>
                                                                                <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                            </div>
                                                                            <div>
                                                                                {v.Teamname}
                                                                            </div>


                                                                        </div>
                                                                    }
                                                                    else {
                                                                        var data = this.state.eachentrydata.filter((va, ka) => va.selectTeamNo === v.No);
                                                                        if (data.length === 0) {
                                                                            return <div className="lockdata-root-div" onClick={() => this.setSelectTeamID(v.No)}>
                                                                                <div>
                                                                                    <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                </div>
                                                                                <div>
                                                                                    {v.Teamname}
                                                                                </div>
                                                                            </div>
                                                                        } else {
                                                                            if (data[0].isOut === 0) {
                                                                                return <div className="lockdata-root-div" style={{ background: "#e2e2e2" }}>
                                                                                    <div>
                                                                                        <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                    </div>
                                                                                    <div>
                                                                                        {v.Teamname}
                                                                                    </div>


                                                                                </div>
                                                                            } else if (data[0].isOut === 1) {
                                                                                return <div className="lockdata-root-div" style={{ background: "lightgreen" }}>
                                                                                    <div>
                                                                                        <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                    </div>
                                                                                    <div>
                                                                                        {v.Teamname}
                                                                                    </div>


                                                                                </div>
                                                                            } else if (data[0].isOut === 2) {
                                                                                return <div className="lockdata-root-div" style={{ background: "#ff9999" }}>
                                                                                    <div>
                                                                                        <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                    </div>
                                                                                    <div>
                                                                                        {v.Teamname}
                                                                                    </div>


                                                                                </div>
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            )}
                                                    </div>
                                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minWidth: "30px", minHeight: "30px", maxHeight: "30px", background: "#C90E07", borderRadius: "50px" }}>
                                                            <img src="vs.png" />

                                                        </div>
                                                    </div>
                                                    <div
                                                        style={{ cursor: "pointer", width: "220px", marginLeft: "15px" }}
                                                    // onClick={() => this.LockClick(kk, 2)}
                                                    >
                                                        {this.state.teamarray
                                                            .map((v, k) => {
                                                                if (this.state.setinfor[(kk + 8)].sec === v.No) {
                                                                    if (this.state.eachentrydata.length === 0) {
                                                                        return <div className="lockdata-root-div" onClick={() => this.setSelectTeamID(v.No)}>
                                                                            <div>
                                                                                <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                            </div>
                                                                            <div>
                                                                                {v.Teamname}
                                                                            </div>


                                                                        </div>
                                                                    }
                                                                    else {
                                                                        var data = this.state.eachentrydata.filter((va, ka) => va.selectTeamNo === v.No);
                                                                        if (data.length === 0) {
                                                                            return <div className="lockdata-root-div" onClick={() => this.setSelectTeamID(v.No)}>
                                                                                <div>
                                                                                    <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                </div>
                                                                                <div>
                                                                                    {v.Teamname}
                                                                                </div>
                                                                            </div>
                                                                        } else {
                                                                            if (data[0].isOut === 0) {
                                                                                return <div className="lockdata-root-div" style={{ background: "#e2e2e2" }}>
                                                                                    <div>
                                                                                        <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                    </div>
                                                                                    <div>
                                                                                        {v.Teamname}
                                                                                    </div>


                                                                                </div>
                                                                            } else if (data[0].isOut === 1) {
                                                                                return <div className="lockdata-root-div" style={{ background: "lightgreen" }}>
                                                                                    <div>
                                                                                        <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                    </div>
                                                                                    <div>
                                                                                        {v.Teamname}
                                                                                    </div>


                                                                                </div>
                                                                            } else if (data[0].isOut === 2) {
                                                                                return <div className="lockdata-root-div" style={{ background: "#ff9999" }}>
                                                                                    <div>
                                                                                        <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                    </div>
                                                                                    <div>
                                                                                        {v.Teamname}
                                                                                    </div>


                                                                                </div>
                                                                            }
                                                                        }
                                                                    }
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
                        }
                    </div>
                </Card >
            </div >
        );
    }
}
const mapStateToProps = state => {
    return {
        teamname: state.usermatch.teamname,
        matchinfor: state.usermatch.match,
        entrydata: state.usermatch.entrydata,
        eachentry: state.usermatch.eachentrydata
    };
};
export default connect(
    mapStateToProps, { getTeamNames, setTeamID, getuseraction, eachentrydata, eachentrydataclear }
)(index);
