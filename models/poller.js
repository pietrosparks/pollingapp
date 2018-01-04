var mongoose = require("mongoose");
var pollerSchema = mongoose.Schema({
    email:{
        type: String,
        required: true
    }, 
    userID: {
        type: String, 
        required: true
    }, 
    polls:{
        type: Array, 
        default: []
    }
})

module.exports = mongoose.model("Poller", pollerSchema);