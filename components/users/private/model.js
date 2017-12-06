const mongoose = require ('mongoose');
const keygen = require('keygenerator');
const Schema = mongoose.Schema;

function generateAPIKey(){
  return (keygen._({ length: 2 }) + '-' + keygen._({ length: 6 })
        + '-' + keygen.number()
        + '-' + keygen._({ length: 6 })
        + '-' + keygen._({ length: 8 })).replace(/&/g, '');
}

let UsersSchema = Schema ({
  key: {
    type: String,
    index: {unique: true},
    default: generateAPIKey
  },
username: {
  type: String,
  index: {unique: true},
},
name: {
  type: String
},
password: {
  type: String,
},
email: {
  type: String,
  index: {unique: true},
  lowercase: true,
},
role: {
  type: String,
  enum: ['optional','user','admin'],
  default: 'user'
}
});

module.exports = mongoose.model('users', UsersSchema);
