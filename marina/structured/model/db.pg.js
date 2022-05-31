'use strict';
const { Client } = require('pg');

const client = new Client({
    user: process.env.PG_USER,
    host: 'localhost',
    database: 'tennis_club',
    password: process.env.PG_PASSWORD,
    port: 5432,
});

client.connect((err) => {
    if (err)
        throw err;
});

module.exports = client