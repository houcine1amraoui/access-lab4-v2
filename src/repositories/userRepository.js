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

async function updateUserEmail(username, newEmail) {
  const users = await getAllUsers();
  const userIndex = users.findIndex((user) => user.username === username);
  if (userIndex === -1) {
    throw new Error("User not found");
  }
  users[userIndex].email = newEmail;
  db.set("users", users).write();
}

async function updateUserRoleId(username, roleId) {
  const users = await getAllUsers();
  const userIndex = users.findIndex((user) => user.username === username);
  if (userIndex === -1) {
    throw new Error("User not found");
  }
  users[userIndex].roleId = roleId;
  if (roleId === 2) {
    users[userIndex].role = "admin";
  } else if (roleId === 1) {
    users[userIndex].role = "user";
  } else {
    users[userIndex].role = "user";
  }
  db.set("users", users).write();
}

module.exports = {
  getAllUsers,
  findUser,
  addUser,
  clearUsers,
  deleteUserByUsername,
  updateUserEmail,
  updateUserRoleId,
};
