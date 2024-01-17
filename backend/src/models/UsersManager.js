const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  findByEmail(email) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE email = ?`, [
      email,
    ]);
  }

  insert(user) {
    return this.database.query(
      `INSERT INTO ${this.table} (email,  username,  city,  birthday_date,  gender,  password,  role_id, valid ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.email,
        user.username,
        user.city,
        user.birthday_date,
        user.gender,
        user.password,
        user.role_id,
        user.valid,
      ]
    );
  }

  update(user) {
    return this.database.query(
      `UPDATE ${this.table} SET title = ? WHERE id = ?`,
      [user.title, user.id]
    );
  }
}
module.exports = UsersManager;
