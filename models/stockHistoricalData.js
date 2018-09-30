'use strict';
module.exports = (sequelize, DataTypes) => {
    const stockHistoricalData = sequelize.define('stockHistoricalData', {
        shortName: DataTypes.STRING,
        date: DataTypes.DATE,
        priceMax: DataTypes.FLOAT,
        priceMin: DataTypes.FLOAT,
        priceOpened: DataTypes.FLOAT,
        priceClosed: DataTypes.FLOAT,
        volume: DataTypes.INTEGER
    }, {});

    stockHistoricalData.associate = function (models) {
        // stockHistoricalData.belongsTo(models.stock, {
        //     foreignKey: 'companyId',
        //     onDelete: 'CASCADE'
        // })
    };

    return stockHistoricalData;
};