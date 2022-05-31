const dotenv = require('dotenv');
dotenv.config();

const app = require('./app.cjs');

const port = process.env.PORT || '3000';

const server = app.listen(port, () => { console.log("Listening to port " + port) });

