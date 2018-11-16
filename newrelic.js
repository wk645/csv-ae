exports.config = {
    app_name: process.env.APP_ID,
    license_key: process.env.NEW_RELIC_KEY,
    agent_enabled: process.env.NEW_RELIC_ENABLED,
    logging: {
        // Do not use debug or trace logging unless New Relic Support asks you to use them.
        // These levels of logging can generate excessive overhead. For most situations, use info.
        level: process.env.NODE_ENV === 'development' ? 'info' : 'info'
    }
};
