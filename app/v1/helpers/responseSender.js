module.exports.responseSender = (message, data, res, statusCode) => {
    if (!Array.isArray(data)) {
        message = "server error...not correct format";
        statusCode = 500;
        data = [];
    }
    let result = {
        "message": message || "success",
        "data": data,
        statusCode
    };
    return res.status(statusCode).json(result);
}