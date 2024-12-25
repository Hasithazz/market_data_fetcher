const logger = require('../utils/logger');

exports.connection = (socket) => {
  console.log('A user connected');
  logger.info('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
    logger.info('User disconnected');
  });

  socket.on('connect_error', (err) => {
    console.error('Connection error:', err);
    logger.error('Connection error:', err);
  });

  // Add more socket event handlers here
};
