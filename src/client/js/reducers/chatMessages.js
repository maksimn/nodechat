import {handleActions} from 'redux-actions';

import {
    GET_CHAT_MESSAGES_START,
    GET_CHAT_MESSAGES_SUCCESS,
    GET_CHAT_MESSAGES_ERROR,
    POST_CHAT_MESSAGE_SUCCESS
} from '../actions/constants';

const initState = [];

const chatMessages = handleActions({
    [GET_CHAT_MESSAGES_START]: () => (initState),
    [GET_CHAT_MESSAGES_SUCCESS]: (state, action) => (action.payload),
    [GET_CHAT_MESSAGES_ERROR]: (state) => (state),
    [POST_CHAT_MESSAGE_SUCCESS]: (state, action) => ([...state, action.payload])
}, initState);

export default chatMessages;