
const resolve = (req, res, next) => {
    if (!req.result) {
        return next(new Error('Action not found'));
    }

    Promise
        .resolve(req.result.data)
        .then(result => {
            req.result.data = result;

            next();
        })
        .catch(error => next(error));
};

const handle = (req, res, next) => {
    let data = req.result.data;

    res.json(data == undefined ? null : data);

    next();
};

module.exports = {
    resolve,
    handle
};