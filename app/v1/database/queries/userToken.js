const util = require("util");
const { getErrorCode } = require("../../../helpers/errorCodes");

class UserTokensDao {
  constructor(db) {
    this.db = global.db || db;
  }

  async findAll() {
    return this.db.query("SELECT id, userId, token, expire_at FROM user_tokens;");
  }

  async findSessionToken(userId, token) {
    return this.db.query("SELECT id, userId, token, expire_at FROM user_tokens WHERE userId = ? and token = ?;", [userId, token]);
  }

  async create(tokenData) {
    try {
      return await this.db.query(
        "INSERT INTO user_tokens(userId, token, expire_at) VALUES(?,?,?);",
        [tokenData.userId, tokenData.token, tokenData.expireAt]
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
    return this.db.query("DELETE FROM user_tokens WHERE id = ?;", [id]);
  }

  async createMany(user_tokens) {
    try {
      await this.db.connect();
      await this.db.connection.beginTransactionPromise();

      user_tokens.forEach(async (token) => await this.create(token));

      await this.db.connection.commitPromise();
    } catch (err) {
      await this.db.connection.rollbackPromise;
    }
  }
}

module.exports = UserTokensDao;
