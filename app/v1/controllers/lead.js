const { responseSender } = require("../helpers/responseSender");
const LeadsDao = require("../database/queries/lead");

const moment = require('moment');


module.exports.getLead = async (req, res) => {
    try {
        let resp = [];
        let userId = res.locals.userId;
        const leadsDao = new LeadsDao();
        /** if start date and enddate is given */
        if (req.query.startDate && req.query.endDate) {
            startDate = moment(req.query.startDate).startOf('day').toISOString().replace('Z', ' ').replace('T', ' ').replace('.000', '');
            endDate = moment(req.query.endDate).endOf('day').toISOString().replace('Z', ' ').replace('T', ' ').replace('.999', '');
            console.log(startDate, endDate);
            resp = await leadsDao.findUserLeadByTimeInterval(userId, startDate, endDate);
        } else {
            resp = await leadsDao.findLeadsByUserId(userId);
        }    
        return responseSender("list fetch", resp, res, 200);     
    } catch (error) {
        console.log("error is", error);
        return responseSender(error.message || "Server Error", [], res, error.errCode || 500);
    }
    
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