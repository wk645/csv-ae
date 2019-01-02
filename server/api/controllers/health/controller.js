import HealthService from '../../services/health.service';
import WinstonLogger from '../../../common/logger';

export class Controller {
    healthCheck(req, res) {
        HealthService.healthCheck().then(response => {
            if (response) {
                WinstonLogger.info(JSON.stringify(response));
                res.json(response);
            } else {
                res.status(404).end();
            }
        });
    }
}

export default new Controller();
