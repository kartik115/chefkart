const conf = require("../config/" + process.env.NODE_ENV + ".js");
const Db = require("./mysql");
const express = require("./express");

module.exports.init = async (app) => {
    await express.init(app);
    const db = new Db(conf.mysql);
    db.connect();
    global.db = db;
}