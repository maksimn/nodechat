const express = require('express'); 
const path = require('path');

const app = express();
const port = process.env.PORT;

const publicPath = path.join(__dirname, '../client');

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});