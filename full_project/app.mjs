import express, {application} from 'express';

const app = express();
const router = express.Router(); 

app.use(express.static('public'));

app.use(router);

let port = process.env.PORT || '3000';

const server = app.listen(port, () => { console.log("Περιμένω αίτημα στο port" + port)});