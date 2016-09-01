var single_connection;
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var env_url  = {
    	'test': 'mongodb://' + process.env.MONGO_URL + ':' + process.env.MONGO_PORT + '/' + process.env.DB_NAME_TEST,
    	'development': 'mongodb://' + process.env.MONGO_URL + ':' + process.env.MONGO_PORT + '/' + process.env.DB_NAME,
    };

module.exports = function() {  
  var url = env_url[process.env.NODE_ENV];
  
  if (!single_connection) {
    single_connection = mongoose.connect(url);
  }

  return single_connection;
};