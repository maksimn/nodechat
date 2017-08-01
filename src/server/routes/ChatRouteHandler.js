import mockRepository from '../mockRepository';

const repository = mockRepository;

export default class ChatRouteHandler {
    getMessages() {
        return (req, res) => {
            repository.chatMessages().then(messages => {
                res.send(messages);
            }).catch(() => {
                res.status(400).send();
            });
        };
    }
}