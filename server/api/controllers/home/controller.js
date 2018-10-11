export class Controller {
    getWelcomeMessage(req, res) {
        res.set('Content-Type', 'text/html');
        res.send(new Buffer('<h2> Welcome - (boilerplate_back_end_web) </h2>'));
    }
}

export default new Controller();
