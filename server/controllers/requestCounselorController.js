const {
  TWILIO_ACCOUNT_SECRET_ID,
  TWILIO_AUTH_TOKEN,
  PERSONAL_PHONE_NUMBER,
  TWILIO_PHONE_NUMBER
} = process.env;

module.exports = {
  async requestCounselor(req, res) {
    const { user_id, counselor_id } = req.body;
    await req.app.get("db").user_counselor_request(user_id, counselor_id);
    res.status(200).send("Request Sent");
  },

  async checkIfRequested(req, res) {
    const { counselor_id } = req.params;
    const requested = await req.app.get("db").check_if_requested(counselor_id);
    let requestedCheck = requested[0];
    if (!requestedCheck) return res.status(401).send("No Requests");
    res.status(200).send(requested);
  },

  async rejectRequest(req, res) {
    const { user_counselor_id } = req.params;
    const { counselor_id } = req.query;
    console.log("userid, counselorid", user_counselor_id, counselor_id);
    const updatedRequests = await req.app
      .get("db")
      .reject_request(user_counselor_id, counselor_id);
    res.status(200).send(updatedRequests);
  },

  async acceptRequest(req, res) {
    const db = req.app.get("db");
    const { user_counselor_id, counselor_id } = req.body;
    const updatedRequests = await db.accept_request(
      user_counselor_id,
      counselor_id
    );

    const updatedUsers = await db.get_accepted_users(counselor_id);
    console.log("users/req", updatedUsers, updatedRequests);
    res.status(200).send({ updatedRequests, updatedUsers });
  },

  async getAcceptedUsers(req, res) {
    const { counselor_id } = req.params;
    const acceptedUsers = await req.app
      .get("db")
      .get_accepted_users(counselor_id);
    let requestAcceptedCheck = acceptedUsers[0];
    if (!requestAcceptedCheck) return res.status(401).send("No Accepted Users");
    res.status(200).send(acceptedUsers);
  },

  async getAcceptedCounselors(req, res) {
    const { user_id } = req.params;
    const acceptedCounselors = await req.app
      .get("db")
      .get_accepted_counselors(user_id);
    let requestAcceptedCheck = acceptedCounselors[0];
    if (!requestAcceptedCheck)
      return res.status(401).send("No Accepted Counselors");
    res.status(200).send(acceptedCounselors);
  },

  sendText: (req, res) => {
    const { name, message } = req.body;
    const accountSid = TWILIO_ACCOUNT_SECRET_ID;
    const authToken = TWILIO_AUTH_TOKEN; //declaring these as these variables or you could just put them directly as the arguments in the invocation below
    const client = require("twilio")(accountSid, authToken);

    client.messages
      .create({
        body: message + " from: " + name,
        from: TWILIO_PHONE_NUMBER,
        to: PERSONAL_PHONE_NUMBER
      })
      .then(message => {
        console.log(message);
        //Do something with this information
        res.send(message);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  logoutRequestCounselor(req, res) {
    req.session.destroy();
    res.sendStatus(200);
  }
};
