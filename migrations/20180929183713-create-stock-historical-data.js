'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('stockHistoricalData', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            shortName: {
                allowNull: false,
                type: Sequelize.STRING
            },
            date: {
                allowNull: false,
                type: Sequelize.DATE
            },
            priceMax: {
                allowNull: false,
                type: Sequelize.FLOAT
            },
            priceMin: {
                allowNull: false,
                type: Sequelize.FLOAT
            },
            priceOpened: {
                allowNull: false,
                type: Sequelize.FLOAT
            },
            priceClosed: {
                allowNull: false,
                type: Sequelize.FLOAT
            },
            volume: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('stockHistoricalData', 0);
    }
};