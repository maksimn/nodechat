// import mockRepository from '../db/mockRepository';
// const repository = mockRepository;
import MongoRepository from '../db/MongoRepository';
const repository = new MongoRepository();

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