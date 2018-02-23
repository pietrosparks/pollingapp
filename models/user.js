var mongoose = require('mongoose');
var userSchema = mongoose.Schema({

  profile: {

    email: {
      type: String,
      required: true
    }, 
    userName:{
      type: String, 
      required: true
    },
     firstName: {
      type: String,
      required: true
    },
     lastName: {
      type: String,
      required: true
    },
    userID: {
        type: String,
        required: true,
    },
    avatar:{
      type:String,
      contentType: String,
      data:Buffer,
      default:'/src/assets/avataaars.png'
    }, 
    followers:{
      type: Array,
      default: []
    }, 
    following: {
      type: Array, 
      default: []
    },
    createdPolls:{
      type: Array,
      default: []
    }, 
    answeredPolls: {
      type: Array, 
      default: []
    }, 
    level:{
      type: String, 
      default: '1'
    }

  },
  password: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Users', userSchema);
