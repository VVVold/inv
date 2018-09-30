const getDateFromString = stringDate => {
    return new Date(stringDate.substring(6, 10), stringDate.substring(3, 5) - 1, stringDate.substring(0, 2));
};

module.exports = {
    getDateFromString
};