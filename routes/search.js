module.exports = (api, Users, functions, _, Polls, Events) => {
  api.post('/search/all', (req, res) => {

    Users.findOne({
      'profile.userName': req.body.search
    }, (err, users) => {
      if (err) {
        throw (err)
      }
      
      return res.json(users.profile)
    })


  })
}
