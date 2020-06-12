const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const User = mongoose.Schema({
  email : {type:String, require:true},
  username: {type:String, require:true},
  password:{type:String, require:true},
  creation_dt:{type:Date, require:true}
});

User.statics.hashPassword = function hashPassword(password){
  return bcrypt.hashSync(password,10);
}

User.methods.isValid = function(hashedpassword){
  return  bcrypt.compareSync(hashedpassword, this.password);
}
module.exports = mongoose.model('User', User);
