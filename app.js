const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const Utility = require('./components/utility/service');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(Utility.parseQuery);

const api_v1 = require('./controllers/api');
api_v1.initialize(app);

app.listen(1984);
