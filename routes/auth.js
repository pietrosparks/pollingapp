module.exports = (api, Users, functions, _, Poller, Twitter, bluebird, secret) => {

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
      'profile.email': userObject.profile.email
    }, (err, user) => {

      if (_.isNull(user)) {

        token = functions.encryptPayload(userObject.profile)


        Users.create(userObject, (err, user) => {
          if (err) {
            console.log('There was a problem creating Users');
          }
          Poller.create(userObject.profile, (err, response) => {
            if (err) {
              console.log('There was a problem creating Poll acccount')
            }
            return res.status(200).json({
              message: "User Created Successfully",
              type: true,
              token: token
            })
          })
        })
      } else return res.json({
        message: "User already exists",
        type: false
      })

    })
  })

  api.post('/auth/login', (req, res) => {

    Users.findOne({
      'profile.email': req.body.email
    }, (err, user) => {
      console.log(user)
      user.token = functions.encryptPayload(user.profile)

      if (!_.isNull(user) && functions.decrypter(req.body.password, user.password)) {

        res.status(200).json({
          user: user.profile,
          token: user.token,
          message: "Welcome back to The Polling App"
        })
      } else
        return res.json({
          message: "That User doesnt exist"

        })

    })
  })

  var _requestSecret;


  let twitter = new Twitter({
    consumerKey: secret.twitter.consumerKey,
    consumerSecret: secret.twitter.consumerSecret,
    callback: secret.twitter.callbackUrl
  });

  api.get('/auth/login/twitter/request-token', (req, res) => {

    twitter.getRequestToken((err, requestToken, requestSecret) => {
      console.log(err, requestToken, requestSecret)
      if (err) {

        res.status(500).json(err)
      } else {

        _requestSecret = requestSecret;
        res.send('https://api.twitter.com/oauth/authenticate?oauth_token=' + requestToken)
      }
    })

  })

  api.get('/auth/login/twitter/access-token', (req, res) => {
    console.log(req.query, "lalls")
    const requestToken = req.query.oauth_token;
    const verifier = req.query.oauth_verifier;
    const params = {
      'include_email': true
    };

    twitter.getAccessToken(requestToken, _requestSecret, verifier, (err, accessToken, accessSecret) => {
      if (err) {
        console.log(err)
      }
      twitter.verifyCredentials(accessToken, accessSecret, params, (err, user) => {
        if (err) {
          console.log(err)
        } else res.json(user);
        console.log(user, "lol")

      })

    })

  })


  //Protected route 
  // api.post('/auth/secret', functions.requestAuthorization, (req, res)=>{
  //   res.json({
  //     message: "This is a super secret route "
  //   })
  // })



}
