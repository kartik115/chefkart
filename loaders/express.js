const conf = require("../config/" + process.env.NODE_ENV + ".js");
// const logger = require("morgan");
const bodyParser = require('body-parser');
const express = require("express");
const passport = require("passport");

module.exports.init = (app) => {
    require("./config");
    const routerV1 = express.Router();
    const routerV2 = express.Router();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(require("morgan")('dev'))
    app.use(passport.initialize());

    app.use("/chefkart/api/v1", routerV1);
    app.use("/chefkart/api/v2", routerV2);

    app.set("routerV1", routerV1);
    app.set("routerV2", routerV2);
    return app;
}
