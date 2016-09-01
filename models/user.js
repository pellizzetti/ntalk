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

	return db.model('users', userSchema);
};