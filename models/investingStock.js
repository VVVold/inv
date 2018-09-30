'use strict';
module.exports = (sequelize, DataTypes) => {
    const investingStock = sequelize.define('investingStock', {
        shortName: DataTypes.STRING,
        investingStockId: DataTypes.INTEGER,
        urlId: DataTypes.STRING,
        reportDate: DataTypes.DATE
    }, {});

    investingStock.associate = function (models) {
        // investingStock.belongsTo(models.stock, {
        //     foreignKey: 'companyId',
        //     onDelete: 'CASCADE'
        // });
    };

    return investingStock;
};