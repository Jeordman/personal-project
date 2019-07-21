require("dotenv").config({ path: __dirname + '/../.env' });
//importing controllers 
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const uc =  require('./controllers/userController')

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

const app = express();
app.use(express.json());

app.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false
  })
);

massive(CONNECTION_STRING).then(db => app.set("db", db));



//ENDPOINTS WILL GO HERE
app.post('/api/login', uc.login);
app.get('/api/getUsers', uc.getAll)

app.listen(SERVER_PORT, () =>
  console.log(`This server... it's over ${SERVER_PORT}`)
);
