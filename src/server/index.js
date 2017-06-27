require('./config/appConfig');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const routes = require('./routes');
const sockets = require('./sockets');

const app = express();
const port = process.env.PORT;
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const publicPath = path.join(__dirname, '../client');

app.use(express.static(publicPath));
app.use(bodyParser.json());

routes(app);
sockets(io);

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});