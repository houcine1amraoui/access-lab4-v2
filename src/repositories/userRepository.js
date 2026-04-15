const { db } = require("../db/database");

function getAllUsers() {
  return db.get("users").value();
}

function findUser(username) {
  return db.get("users").find({ username }).value();
}

function addUser(user) {
  db.get("users").push(user).write();
}

function clearUsers() {
  db.set("users", []).write();
}

async function deleteUserByUsername(username) {
  const users = await getAllUsers();
  const userIndex = users.findIndex((user) => user.username === username);
  if (userIndex === -1) {
    throw new Error("User not found");
  }
  users.splice(userIndex, 1);
  db.set("users", users).write();
}

module.exports = {
  getAllUsers,
  findUser,
  addUser,
  clearUsers,
  deleteUserByUsername,
};
