var mongoose = require('mongoose');
var userSchema = mongoose.Schema({

  profile: {

    email: {
      type: String,
      required: true
    }, 
    userID: {
        type: String,
        required: true,
    }

  },
  password: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Users', userSchema);
