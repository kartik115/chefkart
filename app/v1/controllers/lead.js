const { responseSender } = require("../helpers/responseSender");
const LeadsDao = require("../database/queries/lead");

module.exports.getLead = async (req, res) => {
    const leadsDao = new LeadsDao();
    let resp = await leadsDao.findAll();
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