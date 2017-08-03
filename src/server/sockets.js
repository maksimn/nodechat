import socketIO from 'socket.io';
import MongoRepository from './db/MongoRepository';
const repository = new MongoRepository();

const NEW_CHAT_MESSAGE = 'NEW_CHAT_MESSAGE';

const sockets = server => {
    const io = socketIO(server);
    
    io.on('connection', socket => {
        socket.on(NEW_CHAT_MESSAGE, message => {

            repository.addChatMessage(message).then(newMessage => {
                io.emit(NEW_CHAT_MESSAGE, newMessage);
            }).catch(() => {
            });
        });
    });
};

export default sockets;