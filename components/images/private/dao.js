const dbconnection = require('./../../core/dbconnection');
const BaseDAO = require('./../../core/base-dao');
const mongoose = require ('mongoose');

require('./model');

let imagesCollection = dbconnection.model('images');

class ImagesDAO extends BaseDAO {
  constructor() {
    super(imagesCollection);
  }
}

module.exports = new ImagesDAO;
