const spbStocks = require('../models').spbStocks;

const create = async (stocks)=>{

    const saveStocksPromises = stocks.map(entity => {
        return spbStocks
            .findOrCreate({
                where: {
                    shortName: entity.shortName,
                },
                defaults: {
                    deleted: entity.deleted,
                    name: entity.name,
                }
            });
    });

    await Promise.all(saveStocksPromises);
};

module.exports = {
    create
};


