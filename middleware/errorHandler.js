const responses = require("../helpers/responses.js");
function errorHandler(err, req, res, next) {
    console.log(err);
    responses.internalServerError(res);
}

module.exports = errorHandler;