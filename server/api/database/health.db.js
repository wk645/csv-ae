class HealthDatabase {
  constructor() {
    this._data = [];
  }

  healthStatus() {
    return Promise.resolve(this._data);
  }
}

export default new HealthDatabase();
