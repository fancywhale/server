/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function (req, res) {
		Users.create(req.body).exec(function(err, records) {
			if (err) {return res.serverError(err)}
  		return res.created(records);
		})
	},

	update: function (req, res) {
		var unionID =  req.param('unionID')
		Users.update({'unionID': unionID}, req.body).exec(function(err, records) {
			if (err) {return res.serverError(err)}
  		return res.ok(records);
		})
	},

	findOne: function (req, res) {
		var unionID = req.param('unionID')
		Users.findOne({'unionID': unionID}).exec(function(err, record) {
			if (err) {return res.serverError(err)}
			return res.ok(record)
		})
	}
};

