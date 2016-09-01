var single_connection;
var mongoose = require('mongoose');
var env_url  = {
    	'test': 'mongodb://' + process.env.MONGO_URL + ':' + process.env.MONGO_PORT + '/' + process.env.DB_NAME_TEST,
    	'development': 'mongodb://' + process.env.MONGO_URL + ':' + process.env.MONGO_PORT + '/' + process.env.DB_NAME,
    };

module.exports = function() {
  mongoose.Promise = global.Promise;
  var url = env_url[process.env.NODE_ENV];
  
  if (!single_connection) {
    single_connection = mongoose.connect(url);

    single_connection.connection.on('error', console.error.bind(console, 'Mongoose => Connection Error: '));
  	single_connection.connection.once('open', function(){
  	  console.log('Mongoose => Connection Established!');
  	});
  }

  return single_connection;
};