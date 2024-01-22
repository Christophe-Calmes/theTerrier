const AbstractManager = require("./AbstractManager");

class MessagesManager extends AbstractManager {
  constructor() {
    super({ table: "messages" });
  }

  insertMessage(message) {
    return this.database.query(
      `INSERT INTO  ${this.table} (sender_id ,  recipient_id ,  message_body) VALUES (?, ?, ?)`,
      [message.sender_id, message.recipient_id, message.message_body]
    );
  }

  privateChat(extratMessage) {
    return this.database.query(
      `SELECT sender_id, recipient_id, message_body, creation_time_date, report, messages.update_date, messages.valid, sender.username AS senderName, recipient.username AS recipientName 
      FROM  ${this.table} 
      INNER JOIN users AS sender ON sender.id = sender_id
      INNER JOIN users AS recipient ON recipient.id = recipient_id
      WHERE (sender_id = ? AND recipient_id = ?) OR (sender_id = ? AND recipient_id = ?) LIMIT ?;`,
      [
        extratMessage.sender_id,
        extratMessage.recepient_id,
        extratMessage.recepient_id,
        extratMessage.sender_id,
        extratMessage.limit,
      ]
    );
  }
}

module.exports = MessagesManager;
