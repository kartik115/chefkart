const crypto = require('crypto');

module.exports.setPassword = (password) => {
    let usr = {};
    usr.salt = crypto.randomBytes(16).toString('hex');
    usr.hash = crypto
        .pbkdf2Sync(password, usr.salt, 1000, 64, 'sha512')
        .toString('hex');
    return usr;
}

module.exports.validatePassword = (password, usr) => {
    console.log(usr.hash, usr.salt);
    if (!usr.hash || !usr.salt) return false;
    var hash = crypto.pbkdf2Sync(password, usr.salt, 1000, 64, 'sha512').toString('hex');
    return usr.hash === hash;
}