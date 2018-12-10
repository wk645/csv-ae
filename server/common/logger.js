import winston from 'winston';
import Papertrail from 'winston-papertrail';
import './env';

class WinstonLogger {
    static init() {
        const logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            transports: [
                new winston.transports.Console(),
                new winston.transports.Papertrail({
                    host: 'logs7.papertrailapp.com',
                    port: 41376,
                    level: 'debug'
                })
            ]
        });

        return logger;
    }
}

module.exports = WinstonLogger;
