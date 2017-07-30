require('./config/appConfig');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT;
const server = require('http').createServer(app);

app.use(express.static('./output'));
app.use(bodyParser.json());

const appRouter = require('./routes');
app.use(appRouter);

const sockets = require('./sockets');
sockets(server);

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

module.exports = app;