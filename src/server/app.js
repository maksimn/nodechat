import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';

import './config/appConfig';
import appRouter from './routes';
import sockets from './sockets';
import MongoRepository from './db/MongoRepository';

const repository = new MongoRepository();
const app = express();
const port = process.env.PORT;
const server = http.createServer(app);

app.use(express.static('./output'));
app.use(bodyParser.json());

app.use(appRouter);
sockets(server);

repository.init().then(() => {
    server.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}).catch(e => {
    console.log('Unable to initialize chat data repository.\n', e.message);
});

export default app;