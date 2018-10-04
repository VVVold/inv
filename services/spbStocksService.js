const spbStocks = require('../models').spbStocks;
const {exchange, stockStatus} = require('./consts');

const create = async (stocks)=>{

    const saveStocksPromises = stocks.map(entity => {
        return spbStocks
            .findOrCreate({
                where: {
                    shortName: entity.shortName,
                },
                defaults: {
                    name: entity.name,
                    exchangeId: exchange.NOT_DEFINED,
                    status: stockStatus.active,
                    tinkoffAvailable: true,
                    finamAvailable: true,
                }
            });
    });

    await Promise.all(saveStocksPromises);
};

const get = async (filterOptions)=>{
    if (filterOptions === undefined)
        filterOptions = {};

    if (!filterOptions.hasOwnProperty('deleted')){
        filterOptions.deleted = null;
    }

    if (!filterOptions.hasOwnProperty('status')){
        filterOptions.status = stockStatus.active;
    }

    const dbStocks = await spbStocks.findAll({where : filterOptions});

    return dbStocks.map(e=>({
        id: e.id,
        shortName: e.shortName,
        name: e.name,
        exchangeId: e.exchangeId,
        status: e.status,
        tinkoffAvailable: e.tinkoffAvailable,
        finamAvailable: e.finamAvailable,
    }));
};

const updateFieldsById = async (id, properties)=>{
    spbStocks.update(
        properties,
        { where: { id: id } }
    );
};

module.exports = {
    create,
    get,
    updateFieldsById
};


