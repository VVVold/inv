'use strict';
module.exports = (sequelize, DataTypes) => {
  const spbStocks = sequelize.define('spbStocks', {
      shortName: DataTypes.STRING,
      name: DataTypes.STRING,
      exchangeId: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      tinkoffAvailable: DataTypes.BOOLEAN,
      finamAvailable: DataTypes.BOOLEAN,
      deleted: DataTypes.BOOLEAN,
  }, {});
  spbStocks.associate = function(models) {
    // associations can be defined here
  };
  return spbStocks;
};