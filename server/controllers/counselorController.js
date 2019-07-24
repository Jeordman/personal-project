const bcrypt = require("bcrypt");
const saltRounds = 15;

module.exports = {
  async getAll(req, res) {
    const counselors = await req.app.get("db").get_all_counselors();
    return res.status(200).send(counselors);
  },

  async loginCounselor(req, res) {
    const { username, password } = req.body;
    console.log(req.body)
    const db = req.app.get("db")
    const [existingCounselor] = await db.get_counselor_username(username);
    // console.log(existingCounselor)
    if (!existingCounselor) return res.status(401).send("Counselor Not Found");
    const result = await bcrypt.compare(password, existingCounselor.password);
    if (result) {
      req.session.user = {
        username: existingCounselor.username,
        first_name: existingCounselor.first_name,
        photo: existingCounselor.photo,
        id: existingCounselor.id,
        counselor: true,
        loggedIn: true
      };
      res.send(req.session.user);
    } else res.status(401).send("User or Password incorrect");
  },

  async signupCounselor(req, res) {
    const { username, password, first_name, last_name, photo } = req.body;
    const [existingCounselor] = await req.app
      .get("db")
      .get_user_username(username);
    if (existingCounselor) return res.status(400).send("USERNAME TAKEN");
    let salt = await bcrypt.genSalt(saltRounds);
    let hash = await bcrypt.hash(password, salt);
    let [counselor] = await req.app
      .get("db")
      .create_counselor([username, hash, first_name, last_name, photo]);
    req.session.user = {
      username: counselor.username,
      first_name,
      photo,
      id: counselor.id,
      loggedIn: true,
      counselor: true
    };
    res.send(req.session.user);
  }
};
