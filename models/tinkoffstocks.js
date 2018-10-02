'use strict';
module.exports = (sequelize, DataTypes) => {
  const tinkoffStocks = sequelize.define('tinkoffStocks', {
    shortName: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN
  }, {});
  tinkoffStocks.associate = function(models) {
    // associations can be defined here
  };
  return tinkoffStocks;
};