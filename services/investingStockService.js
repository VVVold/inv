const investingStock = require('../models').investingStock;
const getDateFromString = require('./dateParser').getDateFromString;

const createInvestingStock = (req, res) => {

    return investingStock
        .create({
            shortName: req.body.shortName,
            investingId: req.body.investingId,
            urlId: req.body.urlId,
            reportDate: getDateFromString(req.body.reportDate)
        })
        .then(stock => res.status(201).send(stock))
        .catch(error => res.status(400).send(error));
};

const createInvestingStocks = (req, res) => {
    const investingStocks = req.body.stocks;

    investingStocks.forEach(entity => {
        return investingStock
            .create({
                shortName: entity.shortName,
                investingStockId: entity.investingId,
                urlId: entity.urlId,
                reportDate: getDateFromString(entity.reportDate)
            })
            .then(() => res.status(201).send(true))
            .catch(error => res.status(400).send(error));
    })
};

module.exports = {
    createInvestingStock,
    createInvestingStocks
};