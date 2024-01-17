const AbstractManager = require("./AbstractManager");

class RolesManager extends AbstractManager {
  constructor() {
    super({ table: "roles" });
  }

  insertRoles(role) {
    return this.database.query(
      `INSERT INTO ${this.table}(name, level) VALUES (?, ?)`,
      [role.name, role.level]
    );
  }

  updateRoleLevel(role) {
    return this.database.query(
      `UPDATE ${this.table} SET name = ?, level= ? WHERE id= ?`,
      [role.name, role.level, role.id]
    );
  }
}
module.exports = RolesManager;
