module.exports = (api, Users, functions, _, Polls, Events) => {

  api.get('/user/:userId', (req, res) => {

    Users.findOne({
      'profile.userID': req.params.userId
    }, (err, user) => {
      if (err) {
        throw (err)
      }
      return res.json(user.profile);
    })
  })

  api.get('/users/all', (req, res) => {
    console.log(req.connection.remoteAddress,"hdhdhd")
    let output = []
    Users.find((err, users) => {
      if (err) {
        throw (err)
      }
      users.forEach(user => {
        output.push(user.profile)
      })

      return res.json(output)
    })
  })

  api.post('/user/follow', (req, res) => {
    let returnObject = {}

    Users.findOneAndUpdate({
      'profile.userID': req.body.currentUser
    }, {
      $push: {
        'profile.following': req.body.followedUser
      }
    }, {
      new: true
    }, (err, user) => {

      if (err) {
        throw err;
      }
      returnObject.follower = user.profile

      Users.findOneAndUpdate({
        'profile.userID': req.body.followedUser
      }, {
        $push: {
          'profile.followers': req.body.currentUser
        }
      }, {
        new: true
      }, (err, final) => {
        if (err) {
          throw err
        }
        returnObject.followed = final.profile

        let eventParticipant = {
          name: returnObject.followed.userName,
          id: returnObject.followed.userID,
          type: 'User'
        }

        Events.create({
          userID: returnObject.follower.userID,
          userName: returnObject.follower.userName,
          eventType: 'followed',
          participant: eventParticipant

        }, (err, event) => {
          console.log(err, event, "error ")
          if (err) {
            throw (err)
          }

          let eventParticipant = {
            name: returnObject.follower.userName,
            id: returnObject.follower.userID,
            type: 'User'
          }

          Events.create({
            userID: returnObject.followed.userID,
            userName: returnObject.followed.userName,
            eventType: 'following',
            participant: eventParticipant

          }, (err, event) => {
            console.log(err, event, "error ")
            if (err) {
              throw (err)
            }

            return res.json(returnObject)
          })

        })

      })
    })
  })

  api.post('/user/unfollow', (req, res) => {
    let returnObject = {}

    Users.findOneAndUpdate({
      'profile.userID': req.body.currentUser
    }, {
      $pull: {
        'profile.following': req.body.followedUser
      }
    }, {
      new: true
    }, (err, user) => {

      if (err) {
        throw err;
      }
      returnObject.unfollower = user.profile

      Users.findOneAndUpdate({
        'profile.userID': req.body.followedUser
      }, {
        $pull: {
          'profile.followers': req.body.currentUser
        }
      }, {
        new: true
      }, (err, final) => {
        if (err) {
          throw err
        }
        returnObject.unfollowed = final.profile

        return res.json(returnObject)
      })

    })
  })
}
