const UsersApi = require('./../components/users/api');
const ImagesApi = require('./../components/images/api');

class ApiV1 {
  initialize(app){
    app.use('/api/users', UsersApi);
    app.use('/api/images', ImagesApi);
    app.get('/', (req, res)=>{
      res.send('it works');
    })
  }
}

module.exports = new ApiV1();
