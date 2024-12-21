const express = require('express');
const config = require('./config/config');
const logger = require('./utils/logger');

const app = express();

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
    logger.info(`Server Started on port ${config.port}`);
})