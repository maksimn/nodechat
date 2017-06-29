import socketIOClient from 'socket.io-client';

import { NEW_CHAT_MESSAGE } from './actions/constants';
import { newChatMessageAction } from './actions/chat';
import store from './store';

const socket = socketIOClient(window.location.origin);

const createChatMessage = (username, text) => ({username, text});

socket.on(NEW_CHAT_MESSAGE, newMessage => {
    store.dispatch(newChatMessageAction(newMessage));
});

export const emitNewChatMessage = (username, text) => {
    socket.emit(NEW_CHAT_MESSAGE, createChatMessage(username, text));
};