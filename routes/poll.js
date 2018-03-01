module.exports = (api, Users, functions, _, Polls, Events) => {

  api.post('/poll/new', (req, res) => {

    let pollDetails = req.body
    pollDetails.pollID = functions.randomID(10);

    var newArray = pollDetails.options.map(option => {
      option.id = functions.randomID(7);
      return option
    })

    pollDetails.options = newArray
    Polls.create(pollDetails, (err, data) => {
      if (err) {
        throw (err)
      }
      Users.findOneAndUpdate({
        'profile.userID': pollDetails.creatorID
      }, {
        $push: {
          'profile.createdPolls': data
        }
      }, {
        new: true
      }, (err, user) => {

        let eventParticipant = {
          name: pollDetails.name,
          id: pollDetails.pollID,
          type: 'Poll'
        }

        Events.create({
          userID: user.profile.userID,
          userName: user.profile.userName,
          eventType: 'created',
          participant: eventParticipant

        }, (err, event) => {
          console.log(err, event, "error ")
          if (err) {
            throw (err)
          }
          return res.status(200).json({
            message: 'You successfully created a poll'
          })
        })
      })
    })

  })

  api.get('/poll/:pollId', (req, res) => {

    Polls.findOne({
      pollID: req.params.pollId
    }, (err, poll) => {
      if (err) {
        throw (err)
      }
      res.json(poll);
    })
  })

  api.put('/poll/:pollId', (req, res) => {


    Polls.findOneAndUpdate({
      pollID: req.params.pollId,
      'options.id': req.body.count.id
    }, {
      $set: {
        'options.$.count': req.body.count.count,

      },
      $push: {
        votedUsers: req.body.voter
      }
    }, {
      new: true
    }, (err, poll) => {

      Users.findOneAndUpdate({
        'profile.userID': req.body.voter
      }, {
        $push: {
          'profile.answeredPolls': poll.pollID
        }
      }, (err, user) => {

        Polls.findOne({
          pollID: req.params.pollId,
        }, (err, poll) => {

          var votesArray = poll.options;
          var updatedVotesArray = votesArray.map(option => {
            option.result = (Number(option.count) / Number(poll.votedUsers.length)) * 100
            return option;
          })
         

          Polls.update({
            pollID: req.params.pollId
          }, {
            $set: {
              options: updatedVotesArray
            },

          }, {
            new: true
          }, (err, poll) => {
            if (err) {
              throw (err)
            }
            res.json({
              message: "Vote has been cast successfully"
            })
          })
        })

      })

    })




  })
}
