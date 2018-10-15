class HealthStatusDb {
    constructor() {
        this._data = [{ Status: 'Ok' }];
    }

    healthStatus() {
        return Promise.resolve(this._data);
    }
}

export default new HealthStatusDb();
