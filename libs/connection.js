var single_connection;
var mongoose = require('mongoose');
//var Promise  = require("bluebird");
var env_url  = {
    	"test": "mongodb://localhost/ntalk_test",
    	"development": "mongodb://localhost/ntalk"
    };

module.exports = function() {  
  var url = env_url[process.env.NODE_ENV];

  //mongoose.Promise = require('bluebird');
  mongoose.Promise = global.Promise;
  if (!single_connection) {
    single_connection = mongoose.connect(url);
  }

  return single_connection;
};