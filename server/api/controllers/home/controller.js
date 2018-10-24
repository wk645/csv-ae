export class Controller {
    getWelcomeMessage(req, res) {
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from('<h2> Welcome - NodeJs / Express Api Example - (boilerplate_back_end_web) </h2>'));
    }
}

export default new Controller();
