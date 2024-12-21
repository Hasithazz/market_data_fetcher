const express = require('express');
const config = require('./config');

const app = express();

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`)
})