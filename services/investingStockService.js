const investingStock = require('../models').investingStock;

const create = stocks => {
    validateStocksBeforeSaving(stocks);

    stocks.forEach(entity => {
        return investingStock
            .findOrCreate({
                where: {
                    shortName: entity.shortName
                },
                defaults: {
                    investingStockId: entity.investingStockId,
                    urlId: entity.urlId,
                }
            })
            //.then(() => res.status(201).send(true))
            //.catch(error => res.status(400).send(error));
    })
};

const get = async ()=>{
    const dbStocks = await investingStock.findAll();

    return dbStocks.map(e=>({
        shortName: e.shortName,
        urlId: e.urlId
    }));
};

const validateStocksBeforeSaving = stocks => {
    const stock = stocks.find(e => !e.shortName || !e.investingStockId || !e.urlId);

    if (stock){
        throw new Error('Для акции не заполнены все поля: ' + JSON.stringify(stock))
    }
};

module.exports = {
    create,
    get,
};