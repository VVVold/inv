const stock = require('../models').stock;

const createStock = (req, res) => {

    return stock
        .create({
            shortName: req.body.shortName,
            name: req.body.name,
            deleted: req.body.deleted
        })
        .then(stock => res.status(201).send(stock))
        .catch(error => res.status(400).send(error));
};

const createStocks = (req, res) => {
    const stocks = req.body;

    return stocks.forEach(entity => {
         stock
            .create({
                shortName: entity.shortName,
                name: entity.name,
                deleted: entity.deleted
            })
             .then(() => res.status(201).send(true))
             .catch(error => res.status(400).send(error));
    })
};

module.exports = {
    createStock,
    createStocks
};