const express = require('express');
const config = require('./config/config');
const logger = require('./utils/logger');
const bodyParser = require('body-parser');
const pool = require('./utils/db');
const stockRoutes = require('./routes/stockRoutes');
const tiingoService = require('./services/tiingoService');

const app = express();

app.use(bodyParser.json());
app.use('/stock', stockRoutes);

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
  logger.info(`Server Started on port ${config.port}`);
});
