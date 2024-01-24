const AbstractManager = require("./AbstractManager");

class HaveInterestsManager extends AbstractManager {
  constructor() {
    super({ table: "have_interests" });
  }

  selectInterest(id) {
    return this.database.query(
      `SELECT id, name AS interest
      FROM ${this.table} 
      INNER JOIN interests ON have_interests.interest_id = interests.id
      WHERE user_id = ?;`,
      id
    );
  }

  insertNewInterest(data) {
    return this.database.query(
      `INSERT INTO ${this.table}(user_id, interest_id) VALUES (?, ?)`,
      [data.user_id, data.interest_id]
    );
  }

  deleteHaveInterest(data) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE user_id = ?  AND interest_id = ?`,
      [data.user_id, data.interest_id]
    );
  }
}
module.exports = HaveInterestsManager;
