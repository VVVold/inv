const stock = require('../models').stock;

const create = stocks => {
    validateStocksBeforeSaving(stocks);

    return stocks.forEach(entity => {
         stock
             .findOrCreate({
                 where: {
                     shortName: entity.shortName
                 },
                 defaults: {
                     name: entity.name,
                     deleted: entity.deleted
                 }
            })
             //.then(() => res.status(201).send(true))
             //.catch(error => res.status(400).send(error));
    })
};

const get = async ()=>{
    const dbStocks = await stock.findAll();

    return dbStocks.map(e=>({
        shortName: e.shortName,
        name: e.name,
        deleted: e.deleted
    }));
};

const validateStocksBeforeSaving = stocks => {
    const stock = stocks.find(e => !e.shortName || !e.name || !e.deleted);

    if (stock){
        throw new Error('Для акции не заполнены все поля: ' + JSON.stringify(stock))
    }
};

module.exports = {
    create,
    get
};