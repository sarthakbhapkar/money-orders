const { Pool } = require('pg');

const pool = new Pool({
    user: 'user',
    host: 'postgres',
    database: 'money_orders',
    password: 'pass',
    port: 5432
});

module.exports = pool;

