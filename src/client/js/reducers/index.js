import {combineReducers} from "redux";
import isAuthorized from './isAuthorized';
import validationErrorData from './validationErrorData';
import authPageActiveTabIndex from './authPageActiveTabIndex';

const reducers = combineReducers({
    isAuthorized,
    validationErrorData,
    authPageActiveTabIndex
});

export default reducers;