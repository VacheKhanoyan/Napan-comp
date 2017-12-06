class BaseDAO {
  constructor(collection) {
    this.collection = collection;
  }
  getOneData(query){
    if(!this.collection) {
      throw 'contract violation'
    }
    return this.collection.findOne(query);
  }
  getData(query, limit, offset) {
    if(!this.collection) {
      throw 'contract violation'
    }
    return this.collection.find(query)
                          //.populate('username')
                          .skip(offset)
                          .limit(limit)
                          .exec();
  }
  insertData(query) {
    if(!this.collection) {
      throw 'contract violation'
    }
    query = query || {};
    return this.collection.create(query);
  }
  updateData(id, query) {
    if(!this.collection) {
      throw 'contract violation'
    }
    if(!query) return;
    return this.collection.update({_id: id},{$set: query});
  }
  removeData(id) {
    if(!this.collection) {
      throw 'contract violation'
    }
    return this.collection.remove({_id: id})
  }
}

module.exports = BaseDAO;
