import db from '../database/health.db';

class HealthService {
  healthCheck() {
    return db.healthStatus();
  }
}

export default new HealthService();
