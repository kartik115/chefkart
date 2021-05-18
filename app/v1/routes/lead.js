module.exports.init = (app) => {
    const {validate} = require('../middleware/validateRequest');
    const routerV1 = app.get('routerV1');
    const leadCtrl = require("../controllers/lead");

    routerV1.route("/lead")
        .post(validate, leadCtrl.addLead)
        .get(validate, leadCtrl.getLead)
}