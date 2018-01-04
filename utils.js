
const randomID = require('random-id');
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);

var passwordHash = (password)=>{

    let salt = bcrypt.genSaltSync(10);
    let encrypted = bcrypt.hashSync(password, salt);
    return encrypted;
}

var passwordDecrypt = (password, hashedPassword) =>{
    return bcrypt.compareSync(password, hashedPassword);
}


module.exports = {
    randomID: randomID,
    hasher: passwordHash,
    decrypter : passwordDecrypt

}