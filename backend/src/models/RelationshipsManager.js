const AbstractManager = require("./AbstractManager");

class RelationshipManager extends AbstractManager {
  constructor() {
    super({ table: "relationships" });
  }

  findByIdUser(id) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE me_id = ?`, [
      id,
    ]);
  }

  insertFriend(relation) {
    return this.database.query(
      `INSERT INTO ${this.table}(friend_id, me_id) VALUES (?, ?)`,
      [relation.friend_id, relation.me_id]
    );
  }

  insertBlocked(relation) {
    return this.database.query(
      `INSERT INTO ${this.table}(friend_id, me_id, blocked, status) VALUES (?, ?, 1, 0)`,
      [relation.friend_id, relation.me_id]
    );
  }

  insertReport(relation) {
    return this.database.query(
      `INSERT INTO ${this.table}(friend_id, me_id, report, status) VALUES (?, ?, 1, 0)`,
      [relation.friend_id, relation.me_id]
    );
  }

  deleteRelation(relation) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE friend_id = ? AND me_id = ? AND status = 1`,
      [relation.friend_id, relation.id_me]
    );
  }

  deleteBlocked(relation) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE friend_id = ? AND me_id = ? AND blocked = 1`,
      [relation.friend_id, relation.me_id]
    );
  }

  deleteReport(relation) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE friend_id = ? AND me_id = ? AND report = 1`,
      [relation.friend_id, relation.me_id]
    );
  }
}
module.exports = RelationshipManager;
