

var mongoose = require('mongoose');
var pollSchema = mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    description:{
        type: String, 
        required: true
    },
    options:{
        type: Array ,
        required: true
    },
    creatorID:{
        type: String,
        required: true
    },
    creatorUserName: {
        type: String, 
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    status:{
        type: String,
        default: '0',
        enum: ['0', '1']
    },
    votedUsers:{
        type:Array
        
    }, 
    maxCount: {
        type: String, 
    }, 
    pollID:{
        type: String,
        required: true 
    },
    result:{
        type:Array
    }
    
})

module.exports = mongoose.model('Poll', pollSchema);