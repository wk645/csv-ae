class HealthStatusDb {
    constructor() {
        this._data = [{ Healthy: true }];
    }

    healthStatus() {
        return Promise.resolve(this._data);
    }
}

export default new HealthStatusDb();
