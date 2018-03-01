

var mongoose = require('mongoose');
var eventSchema = mongoose.Schema({
    userID: {
        type: String,  
        required: true 
    }, 
    userName: {
        type: String,
        required: true 
    }, 
    eventType:{
        type: String,
        enum: ['created', 'voted', 'shared', 'commented', 'followed', 'following']
    },
    date:{
        type: Date, 
        default: Date.now(), 
    }, 
    participant: {
        type: Object
    }
})

module.exports = mongoose.model('events', eventSchema)