const crypto = require('crypto');
const express = require('express');
const UsersRouter = express.Router();
const UsersService = require('./service');
const Utility = require('./../utility/service');
const AppConstants = require('./../settings/constants');
const UserValidator = require('./../utility/validators/user-validator');
function _auth(permission) {
  return function(req,res,next){
    if(permission == 'optional'){
      return next();
    }
    else if(permission  == 'user'){
      if(!req.query.key) {
        return res.send('permision denied');
      }
      UsersService.getOneUser({key:req.query.key}).then(user => {
        if(!user) {
          return res.send('permission error');
        }
        req.user = user;
        return next();
      }).catch(err =>{
        return res.send(err)
      })
    }
    else if (permission == 'admin') {
      if(!req.query.key) {
        return res.send('permission denied');
      }
      UsersService.getOneUser({key: req.query.key}).then(user => {
        if(!user) {
          return res.send('permission error');
        }
        req.user = user;
        return next();
      }).catch(err =>{
        return res.send(err);
      })
    }
  }
}

UsersRouter.get('/', _auth('user'), (req,res) => {
  UsersService.getUser({}, req.query.limit, req.query.offset).then(data => {

    let result = data.map(d =>{
      return{
        username: d.username,
        id: d._id,
        name: d.name,
        role: d.role,
        email: d.email,

      }
    })
    return res.send(result);
  }).catch(err => {
    throw 'user inform. error'
  });
})

UsersRouter.post('/', (req,res) => {

  let username = req.body.username ;
  let password = req.body.password ;
  let email = req.body.email;
  let name = req.body.name;
  let role = req.body.role || null;


  let uv_response = UserValidator.validateUsername(username);
  if(uv_response != Utility.ErrorTypes.SUCCESS) {
    return res.send(Utility.generateErrorMessage(uv_response));
  }
  if (password.length <AppConstants.PASSWORD_MIN_LENGTH
    || password.length > AppConstants.PASSWORD_MAX_LENGTH) {
      return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.INVALID_PASSWORD_RANGE));
    }
    password = crypto.createHash('sha1').update(password + 'bootcamp').digest('hex');
    if (name){
      if(name.length < AppConstants.NAME_MIN_LENGTH
        || name.length > AppConstants.NAME_MAX_LENGTH){
          return res.send('name range error');
        }
      }
      /*if (age){
      if(age < AppConstants.AGE_MIN_LENGTH
      || age > AppConstants.AGE_MAX_LENGTH){
      return res.send('age range error');
    }
  }
  */
  let email_res = UserValidator.validateEmail(email);
  if (email_res != Utility.ErrorTypes.SUCCESS) {
    return res.send(Utility.generateErrorMessage(email_res));
  }
  let user = {
    username: username,
    name: name,
    password: password,
    email: email,
    role: role
  };
  console.log(user);
  UsersService.setUser(user).then(data =>{
    return res.send(data);
  })
})

UsersRouter.put('/:id/', _auth('user'), (req, res) => {
  //  console.log('user ==', req.user);
  if (req.user.role != 'admin') {
    if (req.params.id != req.user._id) {
      return res.send('error in put request');
    }
  }

  let id = req.params.id;
  let username = req.body.username || undefined;
  let name = req.body.name || undefined;
  let role = req.body.role || undefined;
  let email = req.body.email || undefined;

  let update_user = {};

  if (username) {
    update_user['username'] = username;
  }
  if (name) {
    update_user['name'] = name;
  }
  if (role) {
    update_user['role'] = role;
  }
  if (email) {
    update_user['email'] = email;
  }
  console.log('update_user == ', update_user);

  UsersService.updateUser(id, update_user).then(user => {
    return res.send(user);
  }).catch(err => {
    console.log('error == ', err);
    return res.send(err);
  })
})

UsersRouter.delete('/:id/', _auth('admin'), (req, res) => {
  UsersService.removeUser(req.params.id).then(user => {
    return res.send(user);
  }).catch(err => {
    return res.send(err);
  })
})

module.exports = UsersRouter;
