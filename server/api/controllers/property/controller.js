import propertyService from '../../services/property.service';
import analyticsHelper from '../../../common/middleware/analyticsHelper';
import WinstonLogger from '../../../common/logger';

export class Controller {
    list(req, res) {
        propertyService.getAllProperties()
            .then(response => {
                if (response) {
                    WinstonLogger.info(response);
                    res.json(response);
                }
            })
            .catch(error => { res.status(400).send(error); });
    }

    getById(req, res) {
        propertyService.getPropertyById(req.params.id)
            .then(response => {
                if (response) {
                    WinstonLogger.info(response);
                    res.json(response);
                } else {
                    res.json([]);
                }
            })
            .catch(error => { res.status(400).send(error); });
    }

    add(req, res) {
        propertyService.addProperty(req.body.name, req.body.city, req.body.address, req.body.email, req.body.phone)
            .then(response => {
                if (response) {
                    analyticsHelper.trackCustomEvent({ userId: 'anonymousId', event: 'Property Added', properties: req.body });

                    WinstonLogger.info(response);
                    res.json(response);
                }
            })
            .catch(error => { res.status(400).send(error); });
    }

    update(req, res) {
        propertyService.updateProperty(req.params.id, req.body.name, req.body.city, req.body.address, req.body.email, req.body.phone)
            .then(response => {
                if (response) {
                    analyticsHelper.track('Property Updated', { details: req.body });

                    WinstonLogger.info(response);
                    res.json(response);
                }
            })
            .catch(error => { res.status(400).send(error); });
    }

    delete(req, res) {
        propertyService.deleteProperty(req.params.id)
            .then(response => {
                if (response) {
                    analyticsHelper.track('Property Deleted', { PropertyId: `${req.params.id}` });

                    WinstonLogger.info(response);
                    res.json(response);
                }
            })
            .catch(error => { res.status(400).send(error); });
    }
}

export default new Controller();
