const UsersDAO = require('./private/dao');

class UsersService {
  getOneUser (query){
    return new Promise ((resolve, reject) => {
      return UsersDAO.getOneData(query).then(data =>{
        resolve(data)
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

setUser(query){
  return new Promise((resolve, reject) => {
    return UsersDAO.insertData(query).then(data =>{
      resolve(data);
    }).catch(err => {
      reject({
        err:'error'
      })
    })
  })
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
