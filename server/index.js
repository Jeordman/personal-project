require("dotenv").config({ path: __dirname + "/../.env" });
//importing controllers
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const uc = require("./controllers/userController");
const cc = require("./controllers/counselorController");

//middleware
const initSession = require("./middleware/initSession");
const authCheck = require("./middleware/authCheck");

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

app.unsubscribe(initSession);

//test endpoint ---may not keep
app.get("/api/getUsers", uc.getAll);
app.get("/api/getCounselors", cc.getAll);

//ENDPOINTS WILL GO HERE
app.post("/api/login", uc.login);
app.post("/api/signup", uc.signup);
app.get("/api/user", authCheck, uc.getUser);
app.put('/api/editUser/:user_id', uc.editUser)
app.delete("/api/logout", uc.logout);

app.post('/api/completeSurvey', uc.completeSurvey)
app.get('/api/getUserGraph/:user_id', uc.getUserGraph)

app.post('/api/addToJournal', uc.addToJournal)

app.post("/api/loginCounselor", cc.loginCounselor);
app.post('/api/signupCounselor', cc.signupCounselor)
app.put('/api/editCounselor/:counselor_id', cc.editCounselor)
app.delete('/api/logoutCounselor', cc.logoutCounselor);

app.listen(SERVER_PORT, () =>
  console.log(`This server... it's over ${SERVER_PORT}`)
);
