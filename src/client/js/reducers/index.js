import {combineReducers} from "redux";
import isAuthorized from './isAuthorized';
import validationResult from './validationResult';
import authPageActiveTabIndex from './authPageActiveTabIndex';

const reducers = combineReducers({
    isAuthorized,
    validationResult,
    authPageActiveTabIndex
});

export default reducers;