import {combineReducers} from "redux";
import auth from './auth';
import user from './user';
import validationResult from './validationResult';

const reducers = combineReducers({
    auth,
    user,
    validationResult
});

export default reducers;