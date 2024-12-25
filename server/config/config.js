require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  dbuser: process.env.DB_USER || 'postgres',
  dbHost: process.env.DB_HOST || 'localhost',
  dbName: process.env.DB_NAME || 'sanadb',
  dbPassword: process.env.DB_PASSWORD||'password',
  dbPort: process.env.DB_PORT,
  tiingo_token: process.env.API_KEY,
};
