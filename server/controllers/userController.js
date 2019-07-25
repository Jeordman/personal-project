const bcrypt = require("bcrypt");
const saltRounds = 15;

module.exports = {
  async login(req, res) {
    const { username, password } = req.body;
    const [existingUser] = await req.app.get("db").get_user_username(username);
    // console.log(existingUser)
    if (!existingUser) return res.status(401).send("USER NOT FOUND");
    const result = await bcrypt.compare(password, existingUser.password);
    if (result) {
      req.session.user = {
        username: existingUser.username,
        first_name: existingUser.first_name, 
        photo: existingUser.photo,
        id: existingUser.id,
        loggedIn: true
      };
      res.send(req.session.user);
    } else res.status(401).send("Username or password incorrect");
  },

  async signup(req, res) {
    const { username, password, first_name, last_name, photo } = req.body;
    const [existingUser] = await req.app.get('db').get_user_username(username)
    if (existingUser) return res.status(400).send('USERNAME TAKEN')
    let salt = await bcrypt.genSalt(saltRounds)
    let hash = await bcrypt.hash(password, salt)
    let [user] = await req.app.get('db').create_user([username, hash, first_name, last_name, photo])
    req.session.user = { username: user.username, first_name, photo, id: user.id, loggedIn: true}
    res.send(req.session.user)
  },

  getUser(req, res) {
    console.log(req.session)
    res.send(req.session.user)
  },

  logout(req, res){
    req.session.destroy();
    res.sendStatus(200)
  },

  async getAll(req, res) {
    // const users = await req.app.get('db').get_all()
    const db = req.app.get("db");
    let existingUser = await db.get_all();
    return res.status(200).send(existingUser);
  }

  //more functions
};
