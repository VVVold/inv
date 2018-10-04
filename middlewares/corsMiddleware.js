module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    res.header('Access-Control-Allow-Origin', 'ru.investing.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
};