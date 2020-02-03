/* eslint-disable no-restricted-syntax */
import csv from 'csv-parser';
import fs from 'fs';

export class Controller {
    async parse(req, res) {
        const { path } = req.file;
        const results = [];
        const customSpendings = [];
        let customObject = {};
        let AdditionalInformation;

        await fs.createReadStream(path)
            .pipe(csv())
            .on('data', data => results.push(data))
            .on('end', () => {
                for (const item of results) {
                    const {
                        Date,
                        Description,
                        Amount,
                        Category,
                        'Additional Information': additionalInformation
                    } = item;

                    if (additionalInformation.indexOf(':') !== -1) {
                        // eslint-disable-next-line prefer-destructuring
                        AdditionalInformation = additionalInformation.split(': ')[1];
                    }

                    customObject = Object.assign(customObject, {
                        Date,
                        Description,
                        Amount: `$${Amount}`,
                        AdditionalInformation,
                        Category
                    });

                    customSpendings.push(customObject);
                    customObject = {};
                }

                fs.unlinkSync(req.file.path);

                return res.status(200).json(customSpendings);
            });
    }

    async getFile(req, res) {
        return res.status(200).json('File');
    }
}

export default new Controller();
