const { responseSender } = require("../helpers/responseSender");
const UsersDao = require("../database/queries/user");
const UserTokensDao = require("../database/queries/userToken");
const passport = require("passport");
const { setPassword, validPassword } = require("../../helpers/password");
const { generateJwt } = require("../../helpers/auth");
const moment = require("moment");


module.exports.login = async (req, res) => {
    try {
        passport.authenticate('users', async function (err, user, info) {
            var token;
            /** if passport throws an error */
            if (err) {
                return responseSender(err, [], res, 404);
            }
            /** if user is found */
            if (user) {
                try {
                    token = generateJwt(user);   
                    const userTokenDao = new UserTokensDao();
                    /** add token into database */
                    let tokenData = {
                        "userId": user.id,
                        "token": token,
                        "expireAt": new Date(moment().add(1, 'day').utc()),
                    }
                    await userTokenDao.create(tokenData);
                    return responseSender('Success', [{ token: token }], res, 200);
                } catch (error) {
                    console.log('The error in login  -->', error);
                    return responseSender(error.message, [], res, 500);
                }
            } else {
                // If user is not found
                return responseSender(info.message, [], res, info.statusCode);
            }
        })(req, res)
    } catch (error) {
        console.log("error is", error);
        return responseSender("Server error", [], res, 500);        
    }
}

module.exports.getUser = async (req, res) => {
    try {
        const usersDao = new UsersDao();
        let resp = await usersDao.findOne(res.locals.userId);
        return responseSender("profile details", resp, res, 200);    
    } catch (error) {
        console.log("error is", error);
        return responseSender("Server error", [], res, 500);
    }
    
}

module.exports.addUser = async (req, res) => {
    try {
        let {name, email, phone, password} = req.body;
        let usr = setPassword(password);
        const usersDao = new UsersDao();
        const resp = await usersDao.create({name, email, phone, "hash": usr.hash, "salt": usr.salt});
        console.log(resp);
        return responseSender("data added", [resp], res, 200);
    } catch (error) {
        console.log("error is", error);
        return responseSender(error.message || "Server Error", [], res, error.errCode || 500);
    }

}