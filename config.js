require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    databaseURL: process.env.DATABASE_URL || 'localhost',
    databasePassword: process.env.DATABASE_PASSWORD,
}