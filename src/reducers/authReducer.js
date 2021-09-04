import { LOGINSUCCESS, LOGOUT } from '../type';

const initState = {
    isAuthenticate: false,
    user: {}
};

export default (state = initState, { type, payload }) => {
    switch (type) {
        case LOGINSUCCESS:
            return {
                ...state,
                isAuthenticate: true,
                user: payload
            }
        case LOGOUT:
            return {
                ...state,
                isAuthenticate: payload,
                user: {}
            }
        default:
            return state;
    }
};