import {handleActions} from 'redux-actions';

import {
    GET_CHAT_MESSAGES_START,
    GET_CHAT_MESSAGES_SUCCESS,
    GET_CHAT_MESSAGES_ERROR
} from '../actions/constants';

const initState = [];

const chatMessages = handleActions({
    [GET_CHAT_MESSAGES_START]: () => (initState),
    [GET_CHAT_MESSAGES_SUCCESS]: (state, action) => (action.payload),
    [GET_CHAT_MESSAGES_ERROR]: (state) => (state)
}, initState);

export default chatMessages;