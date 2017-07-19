var jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
	var userID = req.param('userID')
	var accessToken = req.headers.authorization
	jwt.verify(accessToken, process.env.TOKEN_KEY, function(err, decoded) {
		if (err) 
			return res.forbidden('You are not permitted to perform this action.')
		if (decoded.uuid == userID)
			return next()
	  else 
	  	return res.forbidden('You are not permitted to perform this action.');	
	})	
};