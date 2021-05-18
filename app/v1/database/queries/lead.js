const util = require("util");
const { getErrorCode } = require("../../../helpers/errorCodes");

class LeadsDao {
  constructor(db) {
    this.db = global.db || db;
  }

  async findAll() {
    try {
      return this.db.query("SELECT * FROM leads;");
    } catch (error) {
      console.log(error);
      return Error({ message: "Something went wrong", errCode: 500 });
    }
  }

  async findOne(id) {
    return this.db.query("SELECT * FROM leads WHERE id = ?;", [id]);
  }

  async create(lead) {
    try {
      return await this.db.query(
        "INSERT INTO leads(lead_created_by, name, email, phone, address) VALUES(?,?,?,?,?);",
        [lead.userId, lead.name, lead.email, lead.phone, lead.address]
      );
    } catch (error) {
      console.log("error in create lead", error);
      throw {
        message: error.message || "Something went wrong",
        errCode: getErrorCode(error.errCode) || 500,
      };
    }
  }

  async delete(id) {
    return this.db.query("DELETE FROM leads WHERE id = ?;", [id]);
  }

  async createMany(leads) {
    try {
      await this.db.connect();
      await this.db.connection.beginTransactionPromise();

      leads.forEach(async (lead) => await this.create(lead));

      await this.db.connection.commitPromise();
    } catch (err) {
      await this.db.connection.rollbackPromise;
    }
  }
}

module.exports = LeadsDao;
