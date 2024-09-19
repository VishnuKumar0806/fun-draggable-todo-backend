const express = require('express');
const cors = require('cors');
const mysql = require("mysql");
const app = express();
app.use(express.json());
const port = 8080;

app.use(cors());

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todoapplication-realtime'
})

dbConnection.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to the MySQL database.");
});

app.post('/getUserRules', (req, res) => {
    const { id } = req.body;
    const sqlQuery = "SELECT * FROM `rules-table` WHERE UserId = ?";
    dbConnection.query(sqlQuery, [id], (error, results) => {
        if (error) {
            console.log(error);
            console.log('something went wrong in daabase');
            console.log('fetching id is', id);
            return res.status(404).json({ error: 'Database connection faild' })
        } else {
            return res.status(200).json({ results })
        }
    })
})

app.post('/testing', (req, res) => {
    res.send(req.body)
})

app.listen(port, () => {
    console.log('app is runnin on port 8080');
})
