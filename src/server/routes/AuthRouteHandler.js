import mockRepository from '../mockRepository';

const repository = mockRepository;

class AuthRouteHandler {
    registerUser(req, res) {
        const { name, password } = req.body;

        repository.addUser(name, password).then(user => {
            res.status(201).send(user);
        }).catch(e => {
            res.status(400).send(e);
        });
    }

    login(req, res) {
        const { name, password } = req.body;

        repository.loginUser(name, password).then(result => {
            res.header('x-auth', result.token)
                .send(result.user);
        }).catch(() => {
            const unauthorized = 401;

            res.status(unauthorized).send();
        });
    }

    checkIfAuthorized(req, res) {
        const token = req.get('x-auth');

        repository.findUserByToken(token).then(result => {
            res.send(result);
        }).catch(() => {
            res.status(404).send();
        });
    }

    logout(req, res) {
        const { token } = req.body;

        repository.logoutUser(token).then(() => {
            res.send();
        }).catch(() => {
            res.status(400).send();
        });
    }
}

export default new AuthRouteHandler();