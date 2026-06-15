const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Chattrix Backend Running");
});

app.post("/api/users/register", (req, res) => {
    console.log(req.body);

    res.json({
        success: true,
        message: "Data received"
    });
});

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

app.listen(5000, () => {
    console.log("Server running on port 5000");
});