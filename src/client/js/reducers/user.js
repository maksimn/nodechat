import {handleActions} from 'redux-actions';
import {SET_USER, LOGOUT_SUCCESS} from '../actions/constants';

const initState = {
    id: null, 
    name: null
};

const user = handleActions({
    [SET_USER]: (state, action) => (action.payload),
    [LOGOUT_SUCCESS]: () => (initState)
}, initState);

export default user;