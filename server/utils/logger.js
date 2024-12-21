const {createLogger, format, transports} = require('winston');
const {combine, timestamp, printf, colorize} = format;

const customFormat = printf(({level, message, timestamp}) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        colorize(),
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        customFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({filename: '../logs/app.log'})
    ]
});

module.exports = logger;
