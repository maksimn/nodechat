import {combineReducers} from "redux";
import isAuthorized from './isAuthorized';
import validationErrorData from './validationErrorData';

const reducers = combineReducers({
    isAuthorized,
    validationErrorData
});

export default reducers;