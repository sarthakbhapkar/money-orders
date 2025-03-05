const express = require('express');
const cors = require('cors');
const server = express();

const transactions = require('./backend/routes/transactions');
const users = require('./backend/routes/users');
const admin = require('./backend/routes/admin');
server.use(cors());
server.use(express.json());

// Routes
server.use('/transactions', transactions);
server.use('/users', users);
server.use('/',admin);

// Start the server
server.listen(5000, () => {
    console.log(`Server running on port 5000`);
});
