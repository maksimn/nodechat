import axios from 'axios';
import {createAction} from 'redux-actions';

import {GET_CHAT_MESSAGES_START, 
    GET_CHAT_MESSAGES_SUCCESS, 
    GET_CHAT_MESSAGES_ERROR,
    POST_CHAT_MESSAGE_START, 
    POST_CHAT_MESSAGE_SUCCESS, 
    POST_CHAT_MESSAGE_ERROR} from './constants';

const getChatMessagesStart = createAction(GET_CHAT_MESSAGES_START);
const getChatMessagesSuccess = createAction(GET_CHAT_MESSAGES_SUCCESS);
const getChatMessagesError = createAction(GET_CHAT_MESSAGES_ERROR);

const postChatMessageStart = createAction(POST_CHAT_MESSAGE_START);
const postChatMessageSuccess = createAction(POST_CHAT_MESSAGE_SUCCESS);
const postChatMessageError = createAction(POST_CHAT_MESSAGE_ERROR);

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

export const postChatMessage = message => {
    return dispatch => {
         dispatch(postChatMessageStart(message));

         axios.post('/chatMessages', message).then(response => {
             dispatch(postChatMessageSuccess(response.data));
         }).catch(err => {
             dispatch(postChatMessageError(err));
         });
    };    
};