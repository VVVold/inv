const getActionParams = (req, paramsNames) => {
    return paramsNames.map(paramName => {
        return req.body[paramName] !== undefined
            ? req.body[paramName]
            : req.query[paramName];
    });
};

const createMiddleware = ({controller, actionName, params = []}) => {
    let action = controller[actionName].bind(controller);

    return (req, res, next) => {
        req.result = {};

        try {
            req.result.data = action(...getActionParams(req, params));

            next();
        } catch (err) {
            next(err);
        }
    };
};

module.exports = {
    createMiddleware
};