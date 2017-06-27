const mockRepository = require('./mockRepository');
const repository = mockRepository;

const NEW_CHAT_MESSAGE = 'NEW_CHAT_MESSAGE';

module.exports = io => {
    io.on('connection', socket => {
        socket.on(NEW_CHAT_MESSAGE, message => {

            repository.addChatMessage(message).then(newMessage => {
                io.emit(NEW_CHAT_MESSAGE, newMessage);
            }).catch(() => {
            });
        });
    });
};

