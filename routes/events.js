module.exports = (api, Users, functions, _ , Polls, Events) => {

    api.get('/events/user/:userId', (req , res)=>{
        Events.find({
            userID: req.params.userId
        }, (err, events)=>{
            if(err){
                throw(err)
            }
            res.json(events)
        })
    })
}