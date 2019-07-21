const bcrypt = require("bcrypt");
const saltRounds = 15;

module.exports = {
  async login(req, res) {
    let { username, password } = req.body;
    let [existingUser] = await req.app.get("db").get_user_username(username);
    if (!existingUser) return res.status(401).alert("USER NOT FOUND");
    let result = await bcrypt.compare(password, existingUser.password);
    if (result) {
      req.session.user = {
        username: existingUser.username,
        id: existingUser.id,
        loggedIn: true
      };
      res.send(req.session.user);
    } else res.status(401).alert("Username or password incorrect");
  },

  async getAll(req, res) {
    // const users = await req.app.get('db').get_all()
    const db = req.app.get("db");
    console.log("the database", db.getAll);
    let [existingUser] = await db.get_all();
    console.log(users);
    return res.status(200).send(users);
  }

  //more functions
};
