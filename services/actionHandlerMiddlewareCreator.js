const getActionParams = (req, paramsNames) => {
    return paramsNames.map(paramName => {
        let paramValue = req.body[paramName] !== undefined
            ? req.body[paramName]
            : req.query[paramName];

        return paramValue;
    });
};

const createMiddleware = ({controller, actionName, params = []}) => {
    let action = controller[actionName].bind(controller);
    let middleware = (req, res, next) => {
        req.result = {};

        try {
            req.result.data = action(...getActionParams(req, params));

            next();
        } catch (err) {
            next(err);
        }
    };

    return middleware;
};

module.exports = {
    createMiddleware
};