'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('spbStocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shortName: {
        type: Sequelize.STRING
      },
        name: {
            type: Sequelize.STRING
        },
        exchangeId: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        status: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        tinkoffAvailable: {
            allowNull: false,
            type: Sequelize.BOOLEAN
        },
        finamAvailable: {
            allowNull: false,
            type: Sequelize.BOOLEAN
        },
      deleted: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('spbStocks', 0);
  }
};