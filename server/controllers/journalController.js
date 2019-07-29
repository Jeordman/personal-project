module.exports = {

    async getUserJournal(req, res) {
        const { user_id } = req.params
        // console.log(user_id)
        let response = await req.app.get('db').get_user_graph(+user_id)
        res.send(response)
      },
      
      logoutJournal(req, res){
        req.session.destroy();
        res.sendStatus(200)
      }
    

}

