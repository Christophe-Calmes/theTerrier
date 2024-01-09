const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  insert(item) {
    return this.database.query(
      `INSERT INTO ${this.table} (email,  username,  city,  birthday_date,  gender,  password,  role_id, valid ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        item.email,
        item.username,
        item.city,
        item.birthday_date,
        item.gender,
        item.password,
        item.role_id,
        item.valid,
      ]
    );
  }

  update(item) {
    return this.database.query(
      `UPDATE ${this.table} SET title = ? WHERE id = ?`,
      [item.title, item.id]
    );
  }
}
module.exports = UsersManager;
