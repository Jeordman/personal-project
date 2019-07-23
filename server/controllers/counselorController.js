const bcrypt = require("bcrypt");
const saltRounds = 15;

module.exports = {
    async getAll(req, res) {
        const counselors = await req.app.get('db').get_all_counselors()
        return res.status(200).send(counselors)
    }
};
