require('./config/appConfig');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const mockRepository = require('./mockRepository');

const repository = mockRepository;

const app = express();
const port = process.env.PORT;

const server = require('http').createServer(app);

const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('NEW_CHAT_MESSAGE', message => {
        // Если пришло новое сообщение чата, нужно
        // 1. Добавить его в БД
        // 2. В случае успешного добавления разослать всем клиентам
        repository.addChatMessage(message).then(newMessage => {
            io.emit('NEW_CHAT_MESSAGE', newMessage);
        }).catch(() => {
            socket.emit('NEW_CHAT_MESSAGE_ERROR');
        });
    });
    // socket.on('disconnect', function(){});    
});
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

const publicPath = path.join(__dirname, '../client');

app.use(express.static(publicPath));
app.use(bodyParser.json());

// app.listen(port, () => {
//     console.log(`Started up at port ${port}`);
// });

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
        const {id, name} = result;

        res.header('x-auth', result.token)
           .send({id, name});
    }).catch(() => {
        const unauthorized = 409;

        res.status(unauthorized).send();
    });
});

app.get('/users/auth', (req, res) => {
    const token = req.get('x-auth');

    repository.findUserByToken(token).then(result => {
        res.send(result);
    }).catch(() => {
        res.status(404).send();
    });
});

app.post('/users/logout', (req, res) => {
    const {token} = req.body;

    repository.logoutUser(token).then(() => {
        res.send();
    }).catch(() => {
        res.status(400).send();
    });
});

app.get('/chatMessages', (req, res) => {
    repository.chatMessages().then(messages => {
        res.send(messages);
    }).catch(() => {
        res.status(400).send();
    });
});