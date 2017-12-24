const UsersDAO = require('./private/dao');
const UsersResponse = require('./private/response');
const UserValidator = require('./../utility/validators/user-validator');
const Utility = require('./../utility/service');
const AppConstants = require('./../settings/constants');
const crypto = require('crypto');

class UsersService {
  getOneUser (query, options) {
    return new Promise ((resolve, reject) => {
      options = options || {};
      return UsersDAO.getOneData(query).then(data => {
        resolve(UsersResponse.generateResponse(data, options.requester));
      }).catch(err => {
        reject({
          err: 'error'
        })
      })
    })
  }
  getUser(query, limit, offset) {

      return new Promise((resolve, reject) => {
        return UsersDAO.getData(query, limit, offset).then(data => {
          resolve(data);
        }).catch(err => {
          reject({
            err: 'error'
          })
        })
      })
    }

setUser(user){
  let uv_response = UserValidator.validateUsername(user.username);
  if(uv_response != Utility.ErrorTypes.SUCCESS) {
    console.log(Utility.generateErrorMessage(uv_response));
    return Utility.generateErrorMessage(uv_response);
  }
  if (user.password.length < AppConstants.PASSWORD_MIN_LENGTH
    || user.password.length > AppConstants.PASSWORD_MAX_LENGTH) {
      return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.INVALID_PASSWORD_RANGE));
    }
    user.password = crypto.createHash('sha1').update(user.password + 'bootcamp').digest('hex');
    if (user.name){
      if(user.name.length < AppConstants.NAME_MIN_LENGTH
        || user.name.length > AppConstants.NAME_MAX_LENGTH){
          console.log(Utility.generateErrorMessage(Utility.ErrorTypes.INVALID_NAME_RANGE));
        return Utility.generateErrorMessage(Utility.ErrorTypes.INVALID_NAME_RANGE);
        }
      }
      /*if (age){
      if(age < AppConstants.AGE_MIN_LENGTH
      || age > AppConstants.AGE_MAX_LENGTH){
      return res.send('age range error');
    }
  }
  */
  let email_res = UserValidator.validateEmail(user.email);
  if (email_res != Utility.ErrorTypes.SUCCESS) {
    console.log(Utility.generateErrorMessage(email_res));
    return Utility.generateErrorMessage(email_res);
  }
  return new Promise((resolve, reject) => {
    return UsersDAO.insertData(user).then(data =>{
      resolve(data);
    }).catch(err => {
      reject({
        err:'error'
      });
    });
  });
}

updateUser(id, query) {
  return new Promise((resolve, reject) => {
    UsersDAO.updateData(id, query).then(data => {
      resolve(data);
    }).catch (err => {
      reject({
        err: 'error'
      })
    })
  })
}

removeUser(id) {
  return new Promise((resolve, reject) => {
    UsersDAO.removeData(id).then(data => {
      resolve(data);
    }).catch(err => {
      err: 'error'
    })
  })
}
}

module.exports = new UsersService();
