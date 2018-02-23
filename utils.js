const randomID = require('random-id');
const JWT = require('jsonwebtoken');
const secrets = require('./dbconfig/secrets');
const bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync(10);
const multer = require('multer');

const storage = multer.diskStorage({

  destination: function (req, file, callback) {
      callback(null, './src/assets/profileUploads/');
  },
  filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
  }
}).single('file');

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
      return cb(null, true);
  } else {
      cb('Error: Images Only!');
  }
}

const encryptPayload = (payload) => {

  return JWT.sign({
    data: payload,
    exp: Math.floor(Date.now() / 1000) + 360,
    iat: Math.floor(new Date(Date.now()))
  }, secrets.JWT_SECRET)

}

const requestAuthorization = (req, res, next) => {

  let bearerToken;
  let bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {


    bearerToken = bearerHeader.split(' ')[1]
    req.token = bearerToken;

    JWT.verify(bearerToken, secrets.JWT_SECRET, (err, verified) => {

      if (err) {
          return res.sendStatus(403);
      }
      if (verified) {
        return next();
      }
    })
  } else return res.sendStatus(403)
}

const passwordHash = (password) => {

  let salt = bcrypt.genSaltSync(10);
  let encrypted = bcrypt.hashSync(password, salt);
  return encrypted;
}

const passwordDecrypt = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
}

// function isLoggedIn(req, res, next) {

//   // if user is authenticated in the session, carry on 
//   if (req.isAuthenticated())
//     return next();

//   // if they aren't redirect them to the home page
//   res.redirect('/');
// }


module.exports = {
  randomID: randomID,
  hasher: passwordHash,
  decrypter: passwordDecrypt,
  // isLoggedIn: isLoggedIn,
  encryptPayload: encryptPayload,
  requestAuthorization: requestAuthorization,
  imageUpload: upload
}
