const spbExchangeValidator = require('./spbExchangeValidator');
const investingStocksValidationService = require('./investingStocksValidationService');

const runAllValidations = async()=>{
    await investingStocksValidationService.validate();
    await spbExchangeValidator.validateSpbExchangeId();
};

module.exports = {
    runAllValidations,
};