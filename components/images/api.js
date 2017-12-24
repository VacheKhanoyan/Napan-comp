const multer = require('multer');
const fs = require('fs');
const sizeof = require('image-size');
const express = require('express');
const ImagesRouter = express.Router();
//const UsersService = require('./../users/service');
const ImagesService = require('./service');
const Utility = require('./../utility/service');
const AppConstants = require('./../settings/constants');
const UserValidator = require('./../utility/validators/user-validator');
const upload = multer({dest: 'resource/'});
const ET = Utility.ErrorTypes;
/*function _auth(permission) {
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
*/
ImagesRouter.get('/', (req,res) => {
  ImagesService.getImage({}, req.query.limit, req.query.offset).then(data => {

    /*let result = data.map(d =>{
    return{
    username: d.username,
    id: d._id,
    name: d.name,
    role: d.role,
    email: d.email,

  }
}) */
return res.send(data);
}).catch(err => {
  throw 'image inform. error'
});
})

ImagesRouter.post('/', upload.single('image'),  (req,res) => {
  //
  // upload.single('avatar')(req,res,function(err) {
  //   if(err) {
  //     return res.send("Error uploading file.");
  //   }
  //   res.send("File is uploaded");
  // });
  //console.log(req.file);
  if(!req.file) {
    return res.send(Utility.generateErrorMessage(ET.EMPTY_PHOTO));
  }
  if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    return res.send(Utility.generateErrorMessage(ET.PHOTO_TYPE_ERROR))
  }
  let dimensions = sizeof('{dest}/{filename}'.replace('{dest}', req.file.destination)
                                             .replace('{filename}', req.file.filename));

  let image = {
    content_type: req.file.mimetype,
    size: req.file.size,
    title: req.file.filename,
    buffer: req.file.buffer,
    width: dimensions.width,
    height: dimensions.height,
  }

  ImagesService.setImage(image).then(data =>{

    return res.send(data);
  })
})
/*
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
*/
ImagesRouter.delete('/:id/', (req, res) => {
  ImagesService.getOneImage(req.params.id).then(data => {
    let filename = data.title
    fs.unlink('./resource/{filename}'.replace('{filename}',filename));
    return next();
  })

  ImagesService.removeImage(req.params.id).then(image => {
    return res.send(image);
  }).catch(err => {
    return res.send(err);
  })
})


module.exports = ImagesRouter;
