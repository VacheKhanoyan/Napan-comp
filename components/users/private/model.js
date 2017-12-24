const mongoose = require ('mongoose');
const keygen = require('keygenerator');
const Schema = mongoose.Schema;

const AppSettings = require('./../../settings/service');
const UsersSettings = AppSettings.users;

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
    minlength: 5,
    maxlength: 30,
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
    enum: UsersSettings.role_enum_values,
    default: UsersSettings.roles.USER
  }
});

module.exports = mongoose.model('users', UsersSchema);
