const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const mockRepository = require('./mockRepository');

const app = express();
const port = process.env.PORT;

const publicPath = path.join(__dirname, '../client');

app.use(express.static(publicPath));
app.use(bodyParser.json());

app.post('/users', (req, res) => {
    const {name, password} = req.body;

    mockRepository.addUser(name, password).then(result => {
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

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});