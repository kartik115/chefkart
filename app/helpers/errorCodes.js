var sqlErrorCodes = {
    "HY000": 500,
    "21S01": 500
}

module.exports.getErrorCode = (code) => {
    return sqlErrorCodes[code] || 500;
}