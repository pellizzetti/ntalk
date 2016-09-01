exports.notFound = function(req, res, next) {
	res.status(404);
	res.render('error/404');
};

exports.serverError = function(err, req, res, next) {
	res.status(500);
	res.render('error/500', {err: err});
};