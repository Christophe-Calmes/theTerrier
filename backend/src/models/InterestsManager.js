const AbstractManager = require("./AbstractManager");

class InterestesManager extends AbstractManager {
  constructor() {
    super({ table: "interests" });
  }

  insertInterests(data) {
    return this.database.query(`INSERT INTO ${this.table}(name) VALUES (?)`, [
      data.name,
    ]);
  }

  updateInterests(data) {
    return this.database.query(
      `UPDATE ${this.table} SET name= ?, valid= ? WHERE id = ?`,
      [data.name, data.valid, data.id]
    );
  }
}
module.exports = InterestesManager;
