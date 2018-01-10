module.exports = (api, Users, functions, _, Poller) => {
  api.post('/auth/signup', (req, res) => {


    hash = functions.hasher(req.body.password)

    var userObject = {
      profile: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        userID: functions.randomID()
      },
      password: hash

    }


    Users.findOne({
      email: userObject.profile.email
    }, (err, user) => {

      if (_.isNull(user)) {

        Users.create(userObject, (err, response) => {
          if (err) {
            console.log('There was a problem creating Users')
          }
          Poller.create(userObject.profile, (err, response) => {
            if (err) {
              console.log('There was a problem creating Poll acccount')
            }
            return res.status(200).json({
              message: "User Created Successfully",
              type: true
            })
          })
        })
      } else return res.json({
        message: "User already exists",
        type: false
      })

    })
  })

  api.post('/auth/login', (req, res) =>{
    Users.findOne({
        email: req.body.email
    }, (err, response)=>{
        if(!_.isNull(response) && functions.decrypter(req.body.password, response.password)){
            res.status(200).json(response)
        }
        else 
        return res.json({
            message: "That User doesnt exist"
        })

    })
  })
}
