import Analytics from 'analytics-node';

class SegmentAnalyticsHelper {
    constructor() {
        this.analytics = new Analytics(process.env.SEGMENT_KEY);
    }

    track(event, eventProperties, userId = null) {
        if (this.analytics) {
            this.analytics.track({ userId: userId || 'anonymous', event, properties: eventProperties });
        }
    }

    trackCustomEvent(event) {
        if (this.analytics) {
            this.analytics.track(event);
        }
    }
}

module.exports = new SegmentAnalyticsHelper();
