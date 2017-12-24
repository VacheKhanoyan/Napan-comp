const crypto = require('crypto');
const express = require('express');

const UsersRouter = express.Router();
const _auth = require('./../authorization/auth');
const UsersService = require('./service');
const Utility = require('./../utility/service');
const AppConstants = require('./../settings/constants');
const UserValidator = require('./../utility/validators/user-validator');



UsersRouter.get('/', _auth('user'), (req,res) => {
  UsersService.getUser({}, req.query.limit, req.query.offset).then(data => {
    let user = data.map(d =>{
      return{
        username: d.username,
        id: d._id,
        name: d.name,
        role: d.role,
        email: d.email,
      }
    })
    //console.log(result);
    return res.send(user);
  }).catch(err => {
    throw 'user inform. error'
  });
})

UsersRouter.post('/', (req,res) => {

    let user = {
    username: req.body.username,
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    role: req.body.role
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
    // TODO: prefer . instead of []
    update_user.username = username;
  }
  if (name) {
    update_user.name = name;
  }
  if (role) {
    update_user.role = role;
  }
  if (email) {
    update_user.email = email;
  }
  console.log('update_user == ', update_user);

  let options = {
    requester: req.user,
    //limit: req.query.limit,
    //offset: req.query.offset
  };

  UsersService.updateUser(id, update_user, options).then(user => {
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
