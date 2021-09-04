import { combineReducers } from 'redux';

import AuthReducer from './authReducer';
import Match from './matchReducer';
import Board from "./boardReducer";

export default combineReducers({
    auth: AuthReducer,
    usermatch: Match,
    board: Board
});