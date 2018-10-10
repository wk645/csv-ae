import HealthService from '../../services/health.service';

export class Controller {
  healthCheck(req, res) {
    HealthService.healthCheck().then(response => {
      if (response) {
        res.json(response);
      } else {
        res.status(404).end();
      }
    });
  }
}

export default new Controller();
