module.exports = (api, Users, functions, _, Poller, Twitter, bluebird, secret) => {

  // api.get('/.well-known/acme-challenge/:content', function(req, res) {
  //   res.send('G0m0aOK6VeoApGWvPMd0zqyTS3YH_R79bstWeBOAdBk.vgQWpBvt7tntFOSHsFS4bSrBlVwb22QpdSBlTDjlAmg')
  // })

  api.post('/auth/signup', (req, res) => {
   

    hash = functions.hasher(req.body.password)

    var userObject = {

      profile: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        userID: functions.randomID()
      },
      password: hash

    }

    return res.json(userObject)
    // console.log("users")

    // Users.findOne({
    //   'profile.email': userObject.profile.email
    // }, (err, user) => {
    //   console.log("we enter here oh")
    //   if (_.isNull(user)) {
    //     console.log("no user oh")
    //     token = functions.encryptPayload(userObject.profile)

    //     console.log(token, "token")
    //     console.log(Users,"users")
    //     Users.create(userObject, (err, user) => {
    //       if (err) {
    //         console.log('There was a problem creating Users');
    //       }
    //       Poller.create(userObject.profile, (err, response) => {
    //         if (err) {
    //           console.log('There was a problem creating Poll account')
    //         }
    //         console.log("successing")
    //         return res.status(200).json({
    //           message: "You Have Successfully Signed Up",
    //           type: true,
    //           token: token,
    //           customStatus: 1
    //         })
    //       })
    //     })
    //   } else return res.json({
    //     message: "User already exists",
    //     type: false,
    //     customStatus: 0
    //   })

    // })
  })

  api.post('/auth/login', (req, res) => {

    Users.findOne({
      'profile.email': req.body.email
    }, (err, user) => {


      if (!_.isNull(user) && functions.decrypter(req.body.password, user.password)) {
        user.token = functions.encryptPayload(user.profile)

        res.status(200).json({
          user: user.profile,
          token: user.token,
          message: "Welcome back to The Polling App",
          customStatus: 1
        })
      } else
        return res.json({
          message: "That user doesnt exist",
          customStatus: 0
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
