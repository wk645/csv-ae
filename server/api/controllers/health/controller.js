import HealthService from '../../services/health.service';
import WinstonLogger from '../../../common/logger';

export class Controller {
    healthCheck(req, res) {
        HealthService.healthCheck().then(response => {
            if (response) {
                const stringifiedResponse = JSON.stringify(response);
                WinstonLogger.info(JSON.parse(stringifiedResponse)[0]);
                res.json(response);
            } else {
                res.status(404).end();
            }
        });
    }
}

export default new Controller();
