const express = require("express");
const bodyParser = require("body-parser");
const Database = require("better-sqlite3");
const path = require("path");
const jwt = require("jsonwebtoken");

// Middleware function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { username: user.username, email: user.email },
    "your_secret_key",
    { expiresIn: "1h" }
  );
};

const app = express();
const port = 3001;

app.use(bodyParser.json());

const dbPath = path.resolve(__dirname, "backend.db");
console.log("SQLite Database Path:", dbPath);

// Connect to SQLite database
const db = new Database("backend.db");

// handle errors
const handleErrors = (res, error) => {
  console.error(error);
  res.status(500).json({ error: "Internal Server Error" });
};

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ error: "Token is required" });
  }
  jwt.verify(token, "your_secret_key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

// create tables if not exist
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS tickets (
        id INTEGER PRIMARY KEY,
        header TEXT NOT NULL,
        content TEXT NOT NULL,
        completed INTEGER DEFAULT 0,
        type TEXT,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
`);

// Example usage of the generateToken middleware
app.post("/api/login", (req, res) => {
  const { username, password } = req.body; // Assuming the request includes username and password

  // Check if the user exists in the database
  const user = db
    .prepare("SELECT * FROM users WHERE username = ? AND password = ?")
    .get(username, password);

  if (user) {
    // User authentication is successful, generate and send the token
    const token = generateToken(user);
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
});

// create a new user
app.post("/api/users", verifyToken, (req, res) => {
  try {
    const { username, email, password } = req.body;

    // insert user into 'users' table
    const result = db
      .prepare("INSERT INTO users(username, email, password) VALUES(?, ?, ?)")
      .run(username, email, password);

    res.json({ id: result.lastInsertRowid, username, email });
  } catch (error) {
    handleErrors(res, error);
  }
});

// create a new ticket
app.post("/api/tickets", verifyToken, (req, res) => {
  try {
    const { header, content, userId, type } = req.body;

    // insert ticket into 'tickets' table
    const result = db
      .prepare(
        "INSERT INTO tickets(header, content, user_id, type) VALUES(?, ?, ?, ?)"
      )
      .run(header, content, userId, type);

    res.json({ id: result.lastInsertRowid, header, content, type, userId });
  } catch (error) {
    handleErrors(res, error);
  }
});

// update a ticket
app.put("/api/tickets/:ticketId", verifyToken, (req, res) => {
  try {
    const { header, content, completed, type } = req.body;
    const ticketId = req.params.ticketId;

    console.log("Updating ticket:", ticketId, header, content, completed, type);

    // update ticket in 'tickets' table
    const result = db
      .prepare(
        "UPDATE tickets SET header = ?, content = ?, completed = ?, type = ? WHERE id = ?"
      )
      .run(header, content, completed, type, ticketId);

    if (result.changes === 0) {
      console.log("Ticket not found:", ticketId);
      res.status(404).json({ error: "Ticket not found" });
    } else {
      console.log("Ticket updated successfully:", ticketId);
      res.json({ message: "Ticket updated successfully" });
    }
  } catch (error) {
    handleErrors(res, error);
  }
});

// create mock users and tickets
app.post("/api/setup", (req, res) => {
  try {
    // mock users
    const users = [
      { username: "user1", email: "user1@example.com", password: "password1" },
      { username: "user2", email: "user2@example.com", password: "password2" },
    ];

    // insert mock users into 'users' table
    const userResults = users.map((user) => {
      const result = db
        .prepare("INSERT INTO users(username, email, password) VALUES(?, ?, ?)")
        .run(user.username, user.email, user.password);
      return { id: result.lastInsertRowid, ...user };
    });

    // mock tickets
    const tickets = [
      {
        header: "Ticket 1",
        content: "Content for Ticket 1",
        userId: userResults[0].id,
        type: "To Do",
      },
      {
        header: "Ticket 2",
        content: "Content for Ticket 2",
        userId: userResults[1].id,
        type: "In Progress",
      },
    ];

    // insert mock tickets into 'tickets' table
    const ticketResults = tickets.map((ticket) => {
      const result = db
        .prepare(
          "INSERT INTO tickets(header, content, user_id, type) VALUES(?, ?, ?, ?)"
        )
        .run(ticket.header, ticket.content, ticket.userId, ticket.type);
      return { id: result.lastInsertRowid, ...ticket };
    });

    res.json({ users: userResults, tickets: ticketResults });
  } catch (error) {
    handleErrors(res, error);
  }
});

// get all users
app.get("/api/users", verifyToken, (req, res) => {
  try {
    // retrieve all users from 'users' table
    const result = db.prepare("SELECT * FROM users").all();

    res.json(result);
  } catch (error) {
    handleErrors(res, error);
  }
});

// get user by id
app.get("/api/users/:id", verifyToken, (req, res) => {
  try {
    const id = req.params.id;

    // retrieve user from 'users' table by id
    const result = db.prepare("SELECT * FROM users WHERE id = ?").get(id);

    if (!result) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(result);
    }
  } catch (error) {
    handleErrors(res, error);
  }
});

// get all tickets
app.get("/api/tickets", verifyToken, (req, res) => {
  try {
    // retrieve all tickets from 'tickets' table
    const result = db.prepare("SELECT * FROM tickets").all();

    res.json(result);
  } catch (error) {
    handleErrors(res, error);
  }
});

// get ticket by id
app.get("/api/tickets/:ticketId", verifyToken, (req, res) => {
  try {
    const ticketId = req.params.ticketId;

    // retrieve ticket from 'tickets' table by id
    const result = db
      .prepare("SELECT * FROM tickets WHERE id = ?")
      .get(ticketId);

    if (!result) {
      res.status(404).json({ error: "Ticket not found" });
    } else {
      res.json(result);
    }
  } catch (error) {
    handleErrors(res, error);
  }
});

// for clearing db
app.post("/api/clear", verifyToken, (req, res) => {
  try {
    // delete all records from 'users' table
    // ХЗ ПОЧЕМУ, НО НЕ ЧИСТИТ ЮЗЕРОВ!!!!!!
    db.prepare("DELETE FROM users").run();

    // delete all records from 'tickets' table
    db.prepare("DELETE FROM tickets").run();

    res.json({ message: "Database cleared successfully" });
  } catch (error) {
    handleErrors(res, error);
  }
});

// handle root endpoint
app.get("/", verifyToken, (req, res) => {
  res.send("Welcome to the API!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = {
  generateToken,
  verifyToken
};