const AbstractManager = require("./AbstractManager");

class ItemManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  insert(item) {
    console.info(item);
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
      `update ${this.table} set title = ? where id = ?`,
      [item.title, item.id]
    );
  }
}
module.exports = ItemManager;
