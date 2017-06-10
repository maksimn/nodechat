const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const MockRepository = require('./MockRepository');

const app = express();
const port = process.env.PORT;

const publicPath = path.join(__dirname, '../client');

app.use(express.static(publicPath));
app.use(bodyParser.json());

app.post('/users', (req, res) => {
    const userData = req.body;

    try {
        MockRepository.addUser(userData.name, userData.password);
        res.status(201).send({ name: userData.name });
    } catch (err) {
        const conflict = 409, 
              serverError = 500;

        if (err.code === conflict) {
            return res.status(conflict).send({ name: userData.name });
        }

        res.status(serverError).send({ name: userData.name });
    }
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});