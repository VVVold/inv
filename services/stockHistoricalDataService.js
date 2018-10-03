const stockData = require('../models').stockHistoricalData;
const getDateFromString = require('./dateParser').getDateFromString;

const create = stocks => {
    validateStocksBeforeSaving(stocks);

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
            //.then(() => res.status(201).send(true))
            //.catch(error => res.status(400).send(error));
    })
};

const get = async ()=>{
    const dbStocks = await stockData.findAll();

    return dbStocks.map(e=>({
        shortName: e.shortName,
        date: new Date(e.date),
        priceMax: e.priceMax,
        priceMin: e.priceMin,
        priceOpened: e.priceOpened,
        priceClosed: e.priceClosed,
        volume: e.volume
    }));
};

const validateStocksBeforeSaving = stocks =>{
    const stock = stocks.find(e => !e.shortName || !e.date || !e.priceMax || !e.priceMin || !e.priceOpened || !e.priceClosed || !e.volume);

    if (stock){
        throw new Error('Для акции не заполнены все поля: ' + JSON.stringify(stock))
    }
};

const getAllCompanyShortNames = async () => {
    const stock = await stockData.aggregate('shortName', 'DISTINCT', {plain: false});

    return stock.map(e => ({
        shortName: e.DISTINCT
    }));
};

module.exports = {
    create,
    get,
    getAllCompanyShortNames
};