require("dotenv").config({ path: __dirname + "/../.env" });
//importing controllers
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const uc = require("./controllers/userController");
const cc = require("./controllers/counselorController");
const jc = require("./controllers/journalController");
const rcc = require("./controllers/requestCounselorController");

const path = require("path");

//socket ----------------------
const socket = require("socket.io");

const oc = require("./controllers/outsideController"); //unused
const unirest = require("unirest"); //unused

//middleware
const initSession = require("./middleware/initSession");
const authCheck = require("./middleware/authCheck");

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

const app = express();

const io = socket(
  app.listen(SERVER_PORT, () =>
    console.log(`This server... it's over ${SERVER_PORT}`)
  )
);

app.use(express.json());

app.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false
  })
);

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("Database initialized");
});

app.unsubscribe(initSession);

//test endpoint ---may not keep
app.get("/api/getUsers", uc.getAll);
app.get("/api/getCounselors", cc.getAll);

//ENDPOINTS WILL GO HERE
app.post("/api/login", uc.login);
app.post("/api/signup", uc.signup);
app.get("/api/user", authCheck, uc.getUser);
app.put("/api/editUser/:user_id", uc.editUser);
app.delete("/api/logout", uc.logout);

//graph
app.post("/api/completeSurvey", uc.completeSurvey);
app.get("/api/getUserGraph/:user_id", uc.getUserGraph);

//journal
app.post("/api/addToJournal", uc.addToJournal);
app.get("/api/getUserJournal/:user_id", jc.getUserJournal);
app.put("/api/editUserJournal/:entry_id", jc.editUserJournal);
app.delete("/api/logoutJournal", jc.logoutJournal);

//counselor
app.post("/api/loginCounselor", cc.loginCounselor);
app.post("/api/signupCounselor", cc.signupCounselor);
app.put("/api/editCounselor/:counselor_id", cc.editCounselor);
app.delete("/api/logoutCounselor", cc.logoutCounselor);

//outside api

//Request Counselor
app.post("/api/requestCounselor", rcc.requestCounselor); //add request
app.get("/api/checkIfRequested/:counselor_id", rcc.checkIfRequested); //check for notifications
app.delete("/api/rejectRequest/:user_counselor_id", rcc.rejectRequest); //counselor reject user
app.put("/api/acceptRequest", rcc.acceptRequest); //counselor accept user
app.get("/api/getAcceptedUsers/:counselor_id", rcc.getAcceptedUsers);
app.get("/api/getAcceptedCounselors/:user_id", rcc.getAcceptedCounselors);
app.delete("/api/logoutRequestCounselor", rcc.logoutRequestCounselor);

//twilio
app.post("/api/sendText", rcc.sendText);

//socket ----------------------
app.get("/api/getMatchingUserCounselor/:user_id", rcc.getMatchingUserCounselor);

app.use(express.static(__dirname + "/../build")); //send full build
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

io.on("connection", socket => {
  console.log("CONNECTED TO SOCKET");
  //allow joining a chat
  socket.on("enter room", async data => {
    let { room } = data;
    const db = app.get("db");
    console.log("You just joined ", room);
    const [existingRoom] = await db.look_for_room(room);
    console.log("exist", existingRoom);
    if (!existingRoom) {
      return (room = await db.create_room(room));
    } else {
      room.id = existingRoom.id;
    }
    let messages = await db.get_messages(room);
    console.log("messages", messages);
    socket.join(room);
    io.to(room).emit("room entered", messages);
    console.log("room entered");
  });

  //send messages
  socket.on("send message", async data => {
    const { room, message, sender, is_counselor } = data;
    console.log(room, message, sender, is_counselor);
    const db = app.get("db");
    await db.send_message(room, message, sender, is_counselor);
    let messages = await db.get_messages(room);
    console.log("messages", messages);
    io.to(data.room).emit("message sent", messages);
  });

  //disconnected
  socket.on("disconnect", () => {
    console.log("Disconnected from room");
  });
});
//socket ----------------------
