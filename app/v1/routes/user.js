module.exports.init = (app) => {
    const {validate} = require('./../middleware/validateRequest');
    const routerV1 = app.get('routerV1');
    const userCtrl = require("../controllers/user");

    routerV1.route("/login")
        .post(userCtrl.login)

    routerV1.route("/user")
        .post(userCtrl.addUser)
        .get(validate, userCtrl.getUser)
}