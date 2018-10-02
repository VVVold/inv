'use strict';
module.exports = (sequelize, DataTypes) => {
    const investingStock = sequelize.define('investingStock', {
        shortName: DataTypes.STRING,
        name: DataTypes.STRING,
        urlId: DataTypes.STRING,
        exchangeId: DataTypes.INTEGER,
    }, {});

    investingStock.associate = function (models) {

    };

    return investingStock;
};