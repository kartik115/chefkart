const util = require("util");
const { getErrorCode } = require("../../../helpers/errorCodes");

class UsersDao {
  constructor(db) {
    this.db = global.db || db;
  }

  async findAll() {
    return this.db.query("SELECT id, name, phone, email FROM users;");
  }

  async findOne(id) {
    return this.db.query("SELECT id, name, phone, email FROM users WHERE id = ?;", [id]);
  }

  async findByEmail(email) {
    return this.db.query("SELECT id, name, phone, email, hash, salt FROM users WHERE email = ?;", [email]);
  }

  async create(user) {
    try {
      return await this.db.query(
        "INSERT INTO users(name, email, phone, hash, salt) VALUES(?,?,?,?,?);",
        [user.name, user.email, user.phone, user.hash, user.salt]
      );
    } catch (error) {
      console.log("error in create lead", error);
      throw {
        "message": error.message || "Something went wrong",
        "errCode": getErrorCode(error.errCode) || 500,
      };
    }
  }

  async delete(id) {
    return this.db.query("DELETE FROM users WHERE id = ?;", [id]);
  }

  async createMany(users) {
    try {
      await this.db.connect();
      await this.db.connection.beginTransactionPromise();

      users.forEach(async (user) => await this.create(user));

      await this.db.connection.commitPromise();
    } catch (err) {
      await this.db.connection.rollbackPromise;
    }
  }
}

module.exports = UsersDao;
