const config = require('../config/config');
const pg = require('pg');
const logger = require('./logger');
const Pool = pg.Pool;

const pool = new Pool({
  user: config.dbuser,
  host: config.dbHost,
  database: config.dbName,
  password: config.dbPassword,
  port: config.dbPort,
});

async function checkConnection() {
  let client;
  try {
    client = await pool.connect();
    console.log('Database connection successful!');
    logger.info('Database connection successful!');
  } catch (err) {
    console.error('Database connection error:', err);
    logger.error('Database connection error:', err);
  } finally {
    if (client) {
      client.release();
    }
  }
}
checkConnection();

module.exports = pool;
