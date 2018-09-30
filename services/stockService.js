const stock = require('../models').stock;

const createStock = (req, res) => {

    return stock
        .findOrCreate({
            where: {
                shortName: req.body.shortName
            },
            defaults: {
                name: req.body.name,
                deleted: req.body.deleted
            }
        })
        .then(stock => res.status(201).send(stock))
        .catch(error => res.status(400).send(error));
};

const createStocks = (req, res) => {

    return req.body.forEach(entity => {
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
             .then(res.status(201).send(true))
             .catch(error => res.status(400).send(error));
    })
};

module.exports = {
    createStock,
    createStocks
};