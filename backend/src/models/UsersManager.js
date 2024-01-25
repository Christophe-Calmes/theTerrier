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

  findUser(id) {
    return this.database.query(
      `SELECT users.id, email, username, city, birthday_date, gender, about_me, creation_date,  liked, valid, profil_picture, roles.name AS role, roles.level
    FROM ${this.table}
    INNER JOIN roles ON users.role_id = roles.id
    WHERE users.id = ?`,
      [id]
    );
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
      `UPDATE ${this.table} SET email=?,  username=?,  city=?,  birthday_date=?,  gender=?,  password=?,  role_id=?, valid=? WHERE id=?`,
      [
        user.email,
        user.username,
        user.city,
        user.birthday_date,
        user.gender,
        user.password,
        user.role_id,
        user.valid,
        user.id,
      ]
    );
  }

  updateByUser(user) {
    return this.database.query(
      `UPDATE ${this.table} SET email=?,  username=?,  city=?,  gender=? WHERE id=?`,
      [user.email, user.username, user.city, user.gender, user.id]
    );
  }
}
module.exports = UsersManager;
