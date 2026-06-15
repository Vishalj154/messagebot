const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed");
        console.log(err);
        return;
    }

    console.log("MySQL Connected");
});

// Test Route
app.get("/", (req, res) => {
    res.send("Chattrix Backend Running");
});

// Register User Route
app.post("/api/users/register", (req, res) => {

    const { uid, username, email, phone } = req.body;

    const sql =
        `INSERT INTO users
        (firebase_uid, username, email, phone)
        VALUES (?, ?, ?, ?)`;

    db.query(
        sql,
        [uid, username, email, phone],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            res.status(201).json({
                message: "User Registered"
            });
        }
    );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});