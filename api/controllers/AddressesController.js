/**
 * AddressesController
 *
 * @description :: Server-side logic for managing addresses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	create: function(req, res) {
		Addresses.create(req.body).exec(function(err, address) {
			if (err) {return res.serverError(err)}
			Users.findOne({unionID: req.param('unionID')}).populate('addresses').exec(function(err, user) {
				user.addresses.add(address.uuid)
				user.save(function(err) {
					if (err) { return res.serverError(err)}
					res.created(address)
				})
			})
		})
	},

	find: function (req, res) {
		Users.findOne({unionID: req.param('unionID')}).populate('addresses').exec(function(err, user) {
			if (err) { return res.serverError(err)}
			res.ok(user.addresses)
		})
	},

	findOne: function(req, res) {
		Addresses.findOne({uuid: req.param('addressID')}).exec(function(err, address) {
			if (err) { return res.serverError(err)}
			res.ok(address)
		})
	},
	update: function(req, res) {
		Addresses.update({uuid: req.param('addressID')}, req.body).exec(function(err, address) {
			if (err) { return res.serverError(err)}
			res.ok(address)
		})
	},
	delete: function(req, res) {
		Addresses.destroy({uuid: req.param('addressID')}).exec(function(err) {
			if (err) { return res.serverError(err)}
			res.ok()
		})
	},
	setPrimary: function(req, res) {
		Users.findOne({unionID: req.param('unionID')}).populate('primaryAddress').exec(function(err, user) {
			user.primaryAddress = req.param('addressID')
			user.save(function(err) {
				if (err) { return res.serverError(err)}
				res.ok()
			})
		}) 
	},
	getPrimary: function(req, res) {
		Users.findOne({unionID: req.param('unionID')}).populate('primaryAddress').exec(function(err, user) {
			if (err) {return res.serverError(err)}
			res.ok(user.primaryAddress)
		})
	}
};

