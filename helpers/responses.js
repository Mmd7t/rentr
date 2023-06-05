function success(res, message, data = {}) {
    return res.status(200).json({ status_code: 200, message, data });
}

function created(res, message, data = {}) {
    return res.status(201).json({ status_code: 201, message, data });
}

function badRequest(res, message) {
    return res.status(400).json({ status_code: 400, message });
}

function notFound(res, message) {
    return res.status(404).json({ status_code: 404, message });
}

function internalServerError(res) {
    return res.status(500).json({ status_code: 500, message: "Internal Server Error" });
}

const responses = {
    created,
    badRequest,
    notFound,
    success,
    internalServerError,
};

export default responses;