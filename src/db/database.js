const low = require("lowdb");
const Memory = require("lowdb/adapters/Memory");

const adapter = new Memory();
const db = low(adapter);

// Set default structure
db.defaults({ users: [] }).write();

function initDB() {
  // nothing needed (sync DB)
}

module.exports = {
  db,
  initDB,
};
