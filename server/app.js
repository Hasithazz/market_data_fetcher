const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const config = require('./config/config');
const logger = require('./utils/logger');
const bodyParser = require('body-parser');
const pool = require('./utils/db');
const stockRoutes = require('./routes/stockRoutes');
const newsFeedRoutes = require('./routes/newsFeedRoutes');
const websocket = require('./sockets/websocket');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());
app.use('/stock', stockRoutes);
app.use('/newsFeed', newsFeedRoutes);

io.on('connection', websocket.connection);

server.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
  logger.info(`Server Started on port ${config.port}`);
});
