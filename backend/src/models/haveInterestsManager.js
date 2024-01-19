const AbstractManager = require("./AbstractManager");

class HaveInterestsManager extends AbstractManager {
  constructor() {
    super({ table: "have_interests" });
  }

  insertNewInterest(data) {
    return this.database.query(
      `INSERT INTO ${this.table}(user_id, interest_id) VALUES (?, ?)`,
      [data.user_id, data.interest_id]
    );
  }

  deleteHaveInterest(data) {
    return this.database.query(`DELETE FROM ${this.table} WHERE user_id = ?  AND interest_id = ?`,
      [data.user_id, data.interest_id]
    );
  }
}
module.exports = HaveInterestsManager;
