import db from '../../database/health/health.db';

class HealthService {
    healthCheck() {
        return db.healthStatus();
    }
}

export default new HealthService();
