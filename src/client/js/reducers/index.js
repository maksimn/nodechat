import {combineReducers} from "redux";
import auth from './auth';
import validationResult from './validationResult';

const reducers = combineReducers({
    auth,
    validationResult
});

export default reducers;