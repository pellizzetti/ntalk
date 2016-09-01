module.exports = function(app) {
	var Schema = require('mongoose').Schema;
	var db     = require('../libs/connection')();

	var contactSchema = new Schema({
		name: String,
		email: String
	});

	var userSchema = new Schema({
		name: {type: String, required: true},
		email: {type: String, required: true, index: {unique: true}},
		contacts: [contactSchema]
	});

	userSchema.paths.name.validate(function (value, respond) {
	    if (value == '' || !value) {
	    	return respond(true);
	    }
	    return respond(false);
	}, 'name empty'); 

	userSchema.paths.email.validate(function (value, respond) {
	    if (value == '' || !value) {
	    	return respond(true);
	    }
	    return respond(false);
	}, 'email empty');

	return db.model('users', userSchema);
};