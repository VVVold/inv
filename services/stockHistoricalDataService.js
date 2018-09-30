const stockData = require('../models').stockHistoricalData;
const getDateFromString = require('./dateParser').getDateFromString;

const createStocksData = (req, res) => {
    const stocks = req.body.stocks;

    stocks.forEach(entity => {
        return stockData
            .findOrCreate({
                where: {
                    shortName: entity.shortName,
                    date: getDateFromString(entity.date)
                },
                defaults: {
                    priceMax: entity.priceMax,
                    priceMin: entity.priceMin,
                    priceOpened: entity.priceOpened,
                    priceClosed: entity.priceClosed,
                    volume: entity.volume
                }
            })
            .then(() => res.status(201).send(true))
            .catch(error => res.status(400).send(error));
    })
};

module.exports = {
    createStocksData
};