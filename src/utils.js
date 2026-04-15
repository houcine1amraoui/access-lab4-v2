const userRepo = require("./repositories/userRepository.js");

function generateRandomString(length) {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function seedUsers() {
  userRepo.clearUsers();

  // admin
  const adminUsername = generateRandomString(6);
  const adminPassword = generateRandomString(6);

  // user 1
  const victim1Username = generateRandomString(6);
  const victim1Password = generateRandomString(6);

  // user 2
  const victim2Username = generateRandomString(6);
  const victim2Password = generateRandomString(6);

  userRepo.addUser({
    username: adminUsername,
    email: "admin@gmail.com",
    password: adminPassword,
    role: "admin",
    roleId: 2,
  });

  userRepo.addUser({
    username: victim1Username,
    email: `${victim1Username}@gmail.com`,
    password: victim1Password,
    role: "user",
    roleId: 1,
  });

  userRepo.addUser({
    username: victim2Username,
    email: `${victim2Username}@gmail.com`,
    password: victim2Password,
    role: "user",
    roleId: 1,
  });
}

module.exports = {
  seedUsers,
};
