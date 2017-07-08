import axios from 'axios';
import {createAction} from 'redux-actions';
import {
    GET_CHAT_MESSAGES_START, 
    GET_CHAT_MESSAGES_SUCCESS, 
    GET_CHAT_MESSAGES_ERROR,
    NEW_CHAT_MESSAGE
} from './constants';

const getChatMessagesStart = createAction(GET_CHAT_MESSAGES_START);
const getChatMessagesSuccess = createAction(GET_CHAT_MESSAGES_SUCCESS);
const getChatMessagesError = createAction(GET_CHAT_MESSAGES_ERROR);

export const getChatMessages = () => {
    return dispatch => {
         dispatch(getChatMessagesStart());

         axios.get('/api/v1/chatMessages').then(response => {
             dispatch(getChatMessagesSuccess(response.data));
         }).catch(err => {
             dispatch(getChatMessagesError(err));
         });
    };
};

export const newChatMessageAction = createAction(NEW_CHAT_MESSAGE);