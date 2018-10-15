import db from '../data-access/health.db';

class HealthService {
    healthCheck() {
        return db.healthStatus();
    }
}

export default new HealthService();
