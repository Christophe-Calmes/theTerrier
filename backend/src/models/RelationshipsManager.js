const AbstractManager = require("./AbstractManager");

class RelationshipManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insertFriend(relation) {
    return this.database.query(
      `INSERT INTO ${this.table}(friend_id, me_id) VALUES (?, ?)`,
      [relation.friend_id, relation.me_id]
    );
  }

  insertBlocked(relation) {
    return this.database.query(
      `INSERT INTO ${this.table}(friend_id, me_id, blocked) VALUES (?, ?, 1)`,
      [relation.friend_id, relation.me_id]
    );
  }

  insertReport(relation) {
    return this.database.query(
      `INSERT INTO ${this.table}(friend_id, me_id, report) VALUES (?, ?, 1)`,
      [relation.friend_id, relation.me_id]
    );
  }

  udpateStatus(relation) {
    return this.database.query(
      `UPDATE ${this.table} SET status= ? WHERE friend_id = ? AND me_id = ?`,
      [relation.friend_id, relation.me_id, relation.status]
    );
  }

  deleteRelation(relation) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE friend_id = ? AND me_id = ?`,
      [relation.friend_id, relation.me_id, relation.status]
    );
  }
}
module.exports = RelationshipManager;
