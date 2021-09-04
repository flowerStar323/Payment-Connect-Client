import { TEAMNAME, MATCHINFOR, ENTRYDATA, EACHENTRYDATA, EACHCLEAR } from '../type';

const initState = {
    teamname: [],
    match: [],
    entrydata: [],
    eachentrydata: []
};

export default (state = initState, { type, payload }) => {
    switch (type) {
        case TEAMNAME:
            return {
                ...state,
                teamname: payload
            }
        case MATCHINFOR:
            return {
                ...state,
                match: payload
            }
        case ENTRYDATA:
            return {
                ...state,
                entrydata: payload
            }
        case EACHENTRYDATA:
            return {
                ...state,
                eachentrydata: payload
            }
        case EACHCLEAR:
            console.log("clear");
            return {
                ...state,
                eachentrydata: payload
            }
        default:
            return state;
    }
};