const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const app = express();
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

require('dotenv').config();

const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cors());

// Explicit Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);

// Dynamic Routes
readdirSync('./routes').map((route) => {
    if (route !== 'users.js' && route !== 'auth.js') {
        app.use('/api/v1', require('./routes/' + route));
    }
});

const server = () => {
    db();
    app.listen(PORT, () => {
        console.log('listening to port:', PORT);
    });
};

server();
