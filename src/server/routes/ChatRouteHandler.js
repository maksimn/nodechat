import mockRepository from '../mockRepository';

const repository = mockRepository;

class ChatRouteHandler {
    newMessage(req, res) {
        repository.chatMessages().then(messages => {
            res.send(messages);
        }).catch(() => {
            res.status(400).send();
        });
    }
}

export default new ChatRouteHandler();