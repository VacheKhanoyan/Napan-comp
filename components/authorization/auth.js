const UsersService = require('./../users/service');

module.exports = function _auth(permission) {
  return function(req,res,next) {
    if(permission == 'optional') {
      return next();
    }
    else if(permission  == 'user') {
      if(!req.query.key) {
        return res.send('permision denied'); // use error codes
        // ResponseErrors.PERMISSION_DENIED
        // 'response' component
      }
      UsersService.getOneUser({key: req.query.key}).then(user => {
        if(!user) {
          return res.send('permission error');
        }
        req.user = user;
        return next();
      }).catch(err =>{
        return res.send(err)
      });
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
