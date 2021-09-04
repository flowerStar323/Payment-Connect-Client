import { LOGINSUCCESS, LOGOUT, TEAMNAME, ENTRYDATA, EACHENTRYDATA, GETLEADERBOARD, EACHCLEAR } from "../type";
import { ServerURL } from 'src/config/port';
import { notification } from "antd";
import axios from "axios";
const jwt = require("jsonwebtoken");
// login information
let userid = "";
export const Logsuccess = (email, password, history) => dispatch => {

    return axios.post(`${ServerURL}/login`, { email, password }).then(e => {
        if (e) {
            localStorage.setItem("token", e.data.token);
            if (jwt.decode(localStorage.getItem("token")).role === "user")
                history.push("/");
            else history.push("/teammatch");
            dispatch({ type: LOGINSUCCESS, payload: jwt.decode(localStorage.getItem("token")) });
        }
    }).catch(err => notification.warning({ message: "Warning!", description: err.response.data }))
};

export const Logout = () => dispatch => {
    return dispatch({ type: LOGOUT, payload: false });
};

//match information
export const setTeamID = (weekNum, userID, entryname, id) => dispatch => {
    return axios.post(`${ServerURL}/action`, { weekNum, userID, entryname, id }).then(v => {
        if (v.data == "add") {
            notification.success({
                message: "Success",
                description: "Add Successful"
            });
            dispatch(eachentrydata(userID, entryname));
        } else {
            notification.success({
                message: "Success",
                description: "Update Successful"
            });
            dispatch(eachentrydata(userID, entryname));
        }
    }).catch(err => console.log(err))
}
export const getTeamNames = () => dispatch => {
    return axios.get(`${ServerURL}/get_teamnames`)
        .then(e => dispatch({
            type: TEAMNAME,
            payload: e.data
        }))
        .catch(err => console.log(err));
}
export const getuseraction = (id) => dispatch => {
    userid = id;
    return axios.post(`${ServerURL}/getuseraction`, { userid: id })
        .then(v => dispatch({
            type: ENTRYDATA,
            payload: v.data
        }))
        .catch(er => console.log(er));
}
export const eachentrydata = (userid, name) => dispatch => {
    return axios.post(`${ServerURL}/getuseraction`, { userid }).then(e => {
        let data = e.data.filter((v) => v.entryname === name);
        return dispatch({
            type: EACHENTRYDATA,
            payload: data
        })
    }).catch(err => console.log(err))
}
export const eachentrydataclear = () => dispatch => {
    return dispatch({
        type: EACHCLEAR,
        payload: []
    })
}
export const getleaderboard = () => dispatch => {
    return axios.get(`${ServerURL}/getleaderboard`).then(e => {
        dispatch({
            type: GETLEADERBOARD,
            payload: e.data
        })
    }).catch(err => console.log(err))
}
export const editprofile = (name, email, password) => dispatch => {
    return axios.post(`${ServerURL}/editprofile`, { name, email, password }).then(e => {
        if (e) {
            notification.success({
                message: "SUCCESS!",
                description: "Edit SUCCESSFUL"
            })
            dispatch({ type: LOGINSUCCESS, payload: e.data });
        }
    }).catch(err => console.log(err))
}