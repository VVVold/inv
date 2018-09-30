const getDateFromString = stringDate => {
    const year  = stringDate.substring(6, 10);
    const month = stringDate.substring(3, 5) - 1;
    const day   = stringDate.substring(0, 2);

    return new Date(year, month, day);
};

module.exports = {
    getDateFromString
};