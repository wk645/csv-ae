import CsvParser from '../../../integration/CsvParser';

export class Controller {
    async parse(req, res) {
        return res.status(200).json('Parsed');
    }

    async getFile(req, res) {
        return res.status(200).json('File');
    }
}

export default new Controller();
