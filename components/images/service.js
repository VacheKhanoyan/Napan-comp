const ImagesDAO = require('./private/dao');

class ImagesService {
  getOneImage (query){
    return new Promise ((resolve, reject) => {
      return ImagesDAO.getOneData(query).then(data =>{
        resolve(data)
      }).catch(err => {
        reject({
          err: 'error'
        })
      })
    })
  }
  getImage(query, limit, offset) {
    return new Promise((resolve, reject) => {
      return ImagesDAO.getData(query, limit, offset).then(image => {
        resolve(image);

      }).catch(err => {
        reject({
          err: 'error'
        })
      })
    })
  }

  setImage(query){
    return new Promise((resolve, reject) => {
      return ImagesDAO.insertData(query).then(data =>{
        resolve(data);
      }).catch(err => {
        reject({
          err:'error'
        })
      })
    })
  }

  removeImage(id) {
    return new Promise((resolve, reject) => {
      ImagesDAO.removeData(id).then(data => {
        resolve(data);
      }).catch(err => {
        err: 'error'
      })
    })
  }
}

module.exports = new ImagesService();
