import { GETLEADERBOARD } from '../type';

const initState = {
    borderdata: [],
};

export default (state = initState, { type, payload }) => {
    switch (type) {
        case GETLEADERBOARD:
            return {
                ...state,
                borderdata: payload
            }
        default:
            return state;
    }
};