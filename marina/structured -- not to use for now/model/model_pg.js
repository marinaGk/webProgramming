const pg = require('pg');
const dotevn = require('dotenv');

dotevn.config();

export let availableHours;

const pool = new pg.Pool({
    user: 'marty',
    host: 'localhost',
    database: 'tennis_club',
    password: 'madagascar1234',
    port: 5432,
    });

async function connect() { 

    try { 
        const client = await pool.connect(); 
        return client;
    }
    catch(e) { 
        console.error(`Failed to connect ${e}`);
    }

}

export async function getTimeslots (callback) { 
    const sql = `SELECT * FROM "TIMESLOT"`;
    try { 
        const client = await connect(); 
        const res = await client.query(sql); 
        await client.release(); 
        callback(null, res.rows); 
        console.log(rows);
        availableHours = rows;
    }
    catch (err) { 
        callback(err, null);
    }
}
