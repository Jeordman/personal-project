const bcrypt = require("bcrypt");
const saltRounds = 15;

module.exports = {
  async getAll(req, res) {
    const counselors = await req.app.get("db").get_all_counselors();
    return res.status(200).send(counselors);
  },

  async loginCounselor(req, res) {
    const { username, password } = req.body;
    const db = req.app.get("db");
    const [existingCounselor] = await db.get_counselor_username(username);
    if (!existingCounselor) return res.status(401).send("Counselor Not Found");
    const result = await bcrypt.compare(password, existingCounselor.password);
    if (result) {
      req.session.user = {
        username: existingCounselor.username,
        first_name: existingCounselor.first_name,
        last_name: existingCounselor.last_name,
        photo: existingCounselor.photo,
        id: existingCounselor.counselor_id,
        counselor: true,
        loggedIn: true,
        info: existingCounselor.info
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
      last_name,
      photo,
      id: counselor.counselor_id,
      loggedIn: true,
      counselor: true
    };
    res.send(req.session.user);
  },

  async editCounselor(req, res) {
    let { counselor_id } = req.params;
    let { new_first_name, new_last_name, new_photo, new_info } = req.body;
    const db = req.app.get("db");
    let counselorInfo = await db.edit_counselor_info([
      +counselor_id,
      new_first_name,
      new_last_name,
      new_photo,
      new_info
    ]);
    res.send(counselorInfo);
  },

  logoutCounselor(req, res) {
    req.session.destroy();
    res.sendStatus(200);
  }
};
