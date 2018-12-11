import HealthService from '../../services/health.service';
import logger from '../../../common/logger';

const WinstonLogger = logger.init();

export class Controller {
    healthCheck(req, res) {
        HealthService.healthCheck().then(response => {
            if (response) {
                WinstonLogger.info(response);
                res.json(response);
            } else {
                res.status(404).end();
            }
        });
    }
}

export default new Controller();
