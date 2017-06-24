import axios from 'axios';
import {createAction} from 'redux-actions';
import {
    GET_CHAT_MESSAGES_START, 
    GET_CHAT_MESSAGES_SUCCESS, 
    GET_CHAT_MESSAGES_ERROR
} from './constants';

const getChatMessagesStart = createAction(GET_CHAT_MESSAGES_START);
const getChatMessagesSuccess = createAction(GET_CHAT_MESSAGES_SUCCESS);
const getChatMessagesError = createAction(GET_CHAT_MESSAGES_ERROR);

export const getChatMessages = () => {
    return dispatch => {
         dispatch(getChatMessagesStart());

         axios.get('/chatMessages').then(response => {
             dispatch(getChatMessagesSuccess(response.data));
         }).catch(err => {
             dispatch(getChatMessagesError(err));
         });
    };
};