const express = require('express');

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: __dirname + '/../client'
    });
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});