/* eslint-disable no-restricted-syntax */
import csv from 'csv-parser';
import fs from 'fs';

export class Controller {
    async parse(req, res) {
        const { path } = req.file;
        const results = [];
        const customSpendings = [];
        let customObject = {};

        let total = 0;

        await fs.createReadStream(path)
            .pipe(csv())
            .on('data', data => results.push(data))
            .on('end', () => {
                for (const item of results) {
                    const {
                        Reference,
                        Date,
                        Description,
                        Amount,
                        Category,
                        'Additional Information': additionalInformation
                    } = item;

                    total += Number(Amount);

                    customObject = Object.assign(customObject, {
                        Reference,
                        Date,
                        Description,
                        Amount: `$${Amount}`,
                        AdditionalInformation: additionalInformation.split('Foreign Spend Amount:')[1] || additionalInformation,
                        Category
                    });

                    customSpendings.push(customObject);
                    customObject = {};
                }

                fs.unlinkSync(req.file.path);

                const reversedSpendings = customSpendings.reverse();

                return res.status(200).json({
                    dateRange: `${reversedSpendings[0].Date} - ${reversedSpendings[reversedSpendings.length - 1].Date}`,
                    total: Math.floor(total),
                    spendings: reversedSpendings
                });
            });
    }

    async getFile(req, res) {
        return res.status(200).json('File');
    }
}

export default new Controller();
