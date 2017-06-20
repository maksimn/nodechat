require('./config/appConfig');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const mockRepository = require('./mockRepository');

const repository = mockRepository;

const app = express();
const port = process.env.PORT;

const publicPath = path.join(__dirname, '../client');

app.use(express.static(publicPath));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

app.post('/users', (req, res) => {
    const {name, password} = req.body;

    repository.addUser(name, password).then(() => {
        const created = 201;
        
        res.status(created)
           .send({name});
    }).catch(e => {
        const conflict = 409, serverError = 500;

        if (e.code === conflict) {
            return res.status(conflict).send({ name });
        }

        res.status(serverError).send({ name });
    });
});

app.post('/users/login', (req, res) => {
    const {name, password} = req.body;

    repository.loginUser(name, password).then(result => {
        res.header('x-auth', result.token).send();
    }).catch(() => {
        const unauthorized = 409;

        res.status(unauthorized).send({});
    });
});

app.get('/users/auth', (req, res) => {
    const token = req.get('x-auth');
    console.log('token', token);

    repository.findUserByToken(token).then(result => {
        res.send(result);
    }).catch(() => {
        res.status(404).send();
    });
});