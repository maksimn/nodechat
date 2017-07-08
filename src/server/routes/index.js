const express = require('express');
const mockRepository = require('../mockRepository');

const repository = mockRepository;
const router = express.Router();

router.post('/users', (req, res) => {
    const { name, password } = req.body;

    repository.addUser(name, password).then(() => {
        const created = 201;

        res.status(created)
            .send({ name });
    }).catch(e => {
        const conflict = 409, serverError = 500;

        if (e.code === conflict) {
            return res.status(conflict).send({ name });
        }

        res.status(serverError).send({ name });
    });
});

router.post('/users/login', (req, res) => {
    const { name, password } = req.body;

    repository.loginUser(name, password).then(result => {
        const { id, name } = result;

        res.header('x-auth', result.token)
            .send({ id, name });
    }).catch(() => {
        const unauthorized = 409;

        res.status(unauthorized).send();
    });
});

router.get('/users/auth', (req, res) => {
    const token = req.get('x-auth');

    repository.findUserByToken(token).then(result => {
        res.send(result);
    }).catch(() => {
        res.status(404).send();
    });
});

router.post('/users/logout', (req, res) => {
    const { token } = req.body;

    repository.logoutUser(token).then(() => {
        res.send();
    }).catch(() => {
        res.status(400).send();
    });
});

router.get('/api/v1/chatMessages', (req, res) => {
    repository.chatMessages().then(messages => {
        res.send(messages);
    }).catch(() => {
        res.status(400).send();
    });
});

module.exports = router;