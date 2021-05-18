const { responseSender } = require("../helpers/responseSender");
const LeadsDao = require("../database/queries/lead");

const moment = require('moment');

module.exports.getLead = async (req, res) => {
    let resp = [];
    let userId = res.locals.userId;
    const leadsDao = new LeadsDao();
    if (req.query.startDate && req.query.endDate) {
        startDate = moment(req.query.startDate).add(5.5, 'hour').startOf('day').toISOString();
        endDate = moment(req.query.endDate).add(5.5, 'hour').endOf('day').toISOString();
        console.log(startDate, endDate);
        resp = await leadsDao.findUserLeadByTimeInterval(userId,)
    } else {
        resp = await leadsDao.findLeadsByUserId(userId);
    }
    
    return responseSender("list fetch", resp, res, 200);
}

module.exports.addLead = async (req, res) => {
    try {
        const leadsDao = new LeadsDao();
        const resp = await leadsDao.create(req.body);
        console.log(resp);
        return responseSender("data added", [resp], res, 200);
    } catch (error) {
        console.log("error is", error);
        return responseSender(error.message || "Server Error", [], res, error.errCode || 500);
    }
}