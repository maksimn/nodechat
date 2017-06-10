const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT;

const publicPath = path.join(__dirname, '../client');

app.use(express.static(publicPath));
app.use(bodyParser.json());

const users = [{
    id: 0,
    name: 'test',
    password: 'test',
    token: '0'
}];

app.post('/users', (req, res) => {
    const userData = req.body;

    if (users.find(u => u.name === userData.name)) {
        res.status(409).send({ name: userData.name });
    }

    users.push({
        id: users.length,
        name: userData.name,
        password: userData.password,
        token: users.length.toString()
    });

    res.status(201).send({ name: userData.name });
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});