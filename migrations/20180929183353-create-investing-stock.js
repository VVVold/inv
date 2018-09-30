'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('investingStockService', {
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
            investingStockId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            urlId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            reportDate: {
                allowNull: false,
                type: Sequelize.DATE
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            // companyId: {
            //     type: Sequelize.INTEGER,
            //     onDelete: 'CASCADE',
            //     references: {
            //         model: 'stockService',
            //         key: 'id',
            //         as: 'companyId'
            //     }
            // }
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('investingStockService', 0);
    }
};