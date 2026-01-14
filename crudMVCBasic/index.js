const mongoose = require('mongoose');
const express = require('express');
const { connection } = require('./src/config/db');
const courseRouter = require('./src/routes/coursesroute');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// // Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});