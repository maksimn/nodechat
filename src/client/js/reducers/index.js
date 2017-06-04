import {combineReducers} from "redux";
import isAuthorized from './isAuthorized';

const reducers = combineReducers({
    isAuthorized
});

export default reducers;