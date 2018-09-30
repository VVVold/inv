'use strict';
module.exports = (sequelize, DataTypes) => {
    const stock = sequelize.define('stock', {
        shortName:DataTypes.STRING,
        name: DataTypes.STRING,
        deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {});

    stock.associate = function (models) {
        // stock.hasMany(models.stockHistoricalData, {
        //     foreignKey: 'companyId',
        //     as: 'stockData'
        // });
        // stock.hasOne(models.investingStock, {
        //     foreignKey: 'id',
        //     as: 'investing'
        // })
    };

    return stock;
};