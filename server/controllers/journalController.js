module.exports = {
  async getUserJournal(req, res) {
    const { user_id } = req.params;
    // console.log(user_id)
    let response = await req.app.get("db").get_user_journal(+user_id);
    res.send(response);
  },

  async editUserJournal(req, res) {
    const { entry_id } = req.params;
    let { user_id, new_note } = req.body;
    const db = req.app.get("db");
    let journalEntries = await db.edit_user_journal([
      +entry_id,
      user_id,
      new_note
    ]);
    res.send(journalEntries);
  },

  logoutJournal(req, res) {
    req.session.destroy();
    res.sendStatus(200);
  }
};
