import {combineReducers} from "redux";
import auth from './auth';
import chatMessages from './chatMessages';
import user from './user';
import validationResult from './validationResult';

const reducers = combineReducers({
    auth,
    chatMessages,
    user,
    validationResult
});

export default reducers;