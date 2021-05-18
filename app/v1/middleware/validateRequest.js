const { responseSender } = require('../helpers/responseSender');
const UserTokensDao = require("../database/queries/userToken");
const { validateJwt } = require('../../helpers/auth');

module.exports.validate = async (req, res, next) => {
    try {
        let authKey = req.headers.authorization;
        let isValid = await validateJwt(authKey);
        // console.log("isvalid.......", isValid, new Date(isValid.data.exp *1000), new Date());
        if (new Date(isValid.data.exp * 1000).getTime() < new Date().getTime()) {
            return responseSender("Token expired", [], res, 401);
        }
        const userTokenDao = new UserTokensDao();
        let resp = await userTokenDao.findSessionToken(isValid.data.id, authKey);
        if (resp.length > 0) {
            res.locals.userId = isValid.data.id;
            return next();
        } else {
            return responseSender("Unauthoized", [], res, 403);
        }    
    } catch (error) {
        return responseSender("Token expired", [], res, 401);        
    }
    
}