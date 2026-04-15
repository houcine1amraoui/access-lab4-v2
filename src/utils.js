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
  const adminEmail = "admin@gmail.com";
  const adminPassword = generateRandomString(6);

  // user 1
  const victim1Username = generateRandomString(6);
  const victim1Email = "victim@gmail.com";
  const victim1Password = generateRandomString(6);

  // user 2
  const victim2Username = generateRandomString(6);
  const victim2Email = "victim2@gmail.com";
  const victim2Password = generateRandomString(6);

  userRepo.addUser({
    username: adminUsername,
    email: adminEmail,
    password: adminPassword,
    role: "admin",
  });

  userRepo.addUser({
    username: victim1Username,
    email: victim1Email,
    password: victim1Password,
    role: "user",
  });

  userRepo.addUser({
    username: victim2Username,
    email: victim2Email,
    password: victim2Password,
    role: "user",
  });
}

module.exports = {
  seedUsers,
};
