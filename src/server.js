const app = require("./app.js");
const { initDB } = require("./db/database.js");
const { seedUsers } = require("./utils.js");

async function startServer() {
  await initDB();
  await seedUsers();

  process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT:", err);
  });
  const PORT = 3000;
  try {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

startServer();
