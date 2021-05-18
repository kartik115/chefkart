const passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
const UsersDao = require("../app/v1/database/queries/user");
const { validatePassword } = require("../app/helpers/password");

passport.use(
    "users",
    new LocalStrategy(async (username, password, done) => {
        var userDao = new UsersDao();
        let user = await userDao.findByEmail(username);
        if (user.length == 0) {
            return done(null, false, {
                statusCode: 404,
                message: "User not found",
                data: [],
            });
        }
        let isValid = validatePassword(password, user[0]);
        if (isValid) {
            return done(null, user[0]);
        } else {
            return done(null, false, {
                statusCode: 404,
                message: "Password is wrong",
                data: [],
            });
        }
    })
)
