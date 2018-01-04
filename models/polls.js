

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
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    status:{
        type: String,
        default: 'started',
        enum: ['started', 'finished']
    },
    voted:{
        type: String
        
    }
})

module.exports = mongoose.model('Poll', pollSchema);