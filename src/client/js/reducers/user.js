import {handleAction} from 'redux-actions';
import {SET_USER} from '../actions/constants';

const initState = {
    id: null, 
    name: null
};

const user = handleAction(SET_USER, (state, action) => (action.payload), initState);

export default user;