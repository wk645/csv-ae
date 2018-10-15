import propertyService from '../../services/property.service';

export class Controller {
    list(req, res) {
        propertyService.getAllProperties()
            .then(response => {
                if (response) {
                    res.json(response);
                }
            })
            .catch(error => { res.status(400).send(error); });
    }

    getById(req, res) {
        propertyService.getPropertyById(req.params.id)
            .then(response => {
                if (response) {
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
                    res.json(response);
                }
            })
            .catch(error => { res.status(400).send(error); });
    }

    update(req, res) {
        propertyService.updateProperty(req.params.id, req.body.name, req.body.city, req.body.address, req.body.email, req.body.phone)
            .then(response => {
                if (response) {
                    res.json(response);
                }
            })
            .catch(error => { res.status(400).send(error); });
    }

    delete(req, res) {
        propertyService.deleteProperty(req.params.id)
            .then(response => {
                if (response) {
                    res.json(response);
                }
            })
            .catch(error => { res.status(400).send(error); });
    }
}

export default new Controller();
