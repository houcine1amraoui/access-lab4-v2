import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
//
import { fileURLToPath } from "url";
import path from "path";
import { seedUsers } from "./utils.js";
import {
  deleteUserByUsername,
  loadUsers,
  updateUserEmail,
  updateUserRoleId,
} from "./db.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cookieParser());

// Middleware for session handling
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to `true` if using HTTPS
  }),
);

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pages"));

seedUsers();

app.use("/css", express.static(path.resolve(__dirname, "pages", "css")));
app.use("/js", express.static(path.resolve(__dirname, "pages", "js")));
// app.use("/robots.txt", express.static(path.resolve(__dirname, "robots.txt")));

// Render dynamic HTML with the first user
app.get("/", (req, res) => {
  const users = loadUsers();
  res.render("index", { users: users });
});

app.get("/login", function (req, res) {
  res.sendFile(path.resolve(__dirname, "pages", "login.html"));
});

app.get("/account", isAuthenticated, function (req, res) {
  const users = loadUsers();
  const user = users.find((u) => u.username === req.session.user.username);
  res.render("account", { user: user });
});

app.get("/admin", isAuthenticated, isAdmin, function (req, res) {
  const flag = "01c409b361fc";
  const users = loadUsers();
  const nonAdminUsers = users.filter((user) => user.role !== "admin");
  res.render("admin", { users: nonAdminUsers, flag: flag });
});

app.get("/user-role", isAuthenticated, function (req, res) {
  const users = loadUsers();
  const user = users.find((u) => u.username === req.session.user.username);
  res.json({ roleId: user.roleId });
});

app.post("/delete/:username", function (req, res) {
  const { username } = req.params;
  deleteUserByUsername(username);
  return res.send("user deleted");
});

app.post("/update-email", isAuthenticated, function (req, res) {
  const { newEmail, roleId } = req.body;
  const username = req.session.user.username;
  updateUserEmail(username, newEmail);
  if (roleId) {
    updateUserRoleId(username, roleId);
  }
  //
  const users = loadUsers();
  const user = users.find((u) => u.username === username);
  // return res.json({
  //   username: username,
  //   email: newEmail,
  //   apiKey: "gjkjgfgf",
  //   roleId: user.roleId,
  // });
  return res.redirect("/account");
});

// auth middleware
function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
}

// authorization middleware
function isAdmin(req, res, next) {
  const username = req.session.user.username;
  const users = loadUsers();
  const user = users.find((u) => u.username === username);
  if (user.roleId !== 2) {
    return res.redirect("/login");
  }
  next();
}

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();
  const user = users.find((user) => {
    return user.username === username;
  });

  // check username
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // check password
  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // create session
  req.session.user = { username };
  const isAdmin = user.role == "admin" ? true : false;
  res.cookie("isAdmin", isAdmin, {});
  // redirect to /account
  return res.json({ redirect: "/account" });
});

// Logout route
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out successfully" });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Lab running on http://localhost:${PORT}`);
});
