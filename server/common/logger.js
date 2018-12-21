import winston from 'winston';
import Papertrail from 'winston-papertrail'; // eslint-disable-line no-unused-vars
import config from '../../database/config/config';

class WinstonLogger {
    static init() {
        const logger = winston.createLogger({
            level: config.logger.level,
            format: winston.format.simple(),
            transports: [
                new winston.transports.Console({
                    level: config.logger.level,
                    timestamp: true,
                    inlineMeta: true,
                    colorize: true
                }),
                new winston.transports.Papertrail({
                    level: config.logger.level,
                    host: config.logger.host,
                    port: config.logger.port,
                    inlineMeta: true,
                    timestamp: true
                })
            ]
        });

        return logger;
    }
}

const logger = WinstonLogger.init();

export default logger;
