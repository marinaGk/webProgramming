const pg = require('pg');
const dotenv = require('dotenv');
dotenv.config();

async function connect() { 

    try { 
        const client = await pool.connect(); 
        return client;
    }
    catch(e) { 
        console.error(`Failed to connect ${e}`);
    }

}

async function getTimeslots (callback) { 
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

function createUser(userName, passWord) { 
    //console.log(userName);
    //console.log(passWord);
}

module.exports = {createUser};