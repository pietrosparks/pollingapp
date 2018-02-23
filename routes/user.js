module.exports = (api, Users, functions, _ , Polls, Events) =>{

    api.get('/user/:userId', (req, res)=>{

        Users.findOne({
            'profile.userID': req.params.userId
        }, (err, user)=>{
            if(err){
                throw(err)
            }
            return res.json(user.profile);
        })
    })
}