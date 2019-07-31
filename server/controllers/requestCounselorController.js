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
    const { user_counselor_id, counselor_id } = req.body;
    const updatedRequests = await req.app
      .get("db")
      .reject_request(user_counselor_id, counselor_id);
    res.status(200).send(updatedRequests);
  },

  async acceptRequest(req, res) {
    const { user_counselor_id, counselor_id } = req.body;
    const updatedRequests = await req.app
      .get("db")
      .accept_request(user_counselor_id, counselor_id);
    res.status(200).send(updatedRequests);
  },

  async getAcceptedUsers(req, res) {
    const { counselor_id } = req.body;
    const acceptedUsers = await req.app
      .get("db")
      .get_accepted_users(counselor_id);
    let requestAcceptedCheck = acceptedUsers[0];
    if (!requestAcceptedCheck) return res.status(401).send("No Accepted Users");
    res.status(200).send(acceptedUsers);
  },

  async getAcceptedCounselors(req, res) {
    const { user_id } = req.body;
    const acceptedCounselors = await req.app
      .get("db")
      .get_accepted_counselors(user_id);
    let requestAcceptedCheck = acceptedCounselors[0];
    if (!requestAcceptedCheck)
      return res.status(401).send("No Accepted Counselors");
    res.status(200).send(acceptedCounselors);
  },

  logoutRequestCounselor(req, res) {
    req.session.destroy();
    res.sendStatus(200);
  }
};
