/**
 * ItemTypesController
 *
 * @description :: Server-side logic for managing itemtypes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res) {
		var itemTypeBody = {
			name: req.body.name
		}
		var featureTypes = req.body.featureTypes
		ItemTypes.create(itemTypeBody).exec(function(err, itemType) {
			if (err) {return res.serverError(err)}
  		itemType.featureTypes.add(featureTypes)
  		itemType.save(function(err) {
  			if (err) {return res.serverError(err)}
  			res.created(itemType)
  		})
		})
	},

	findOne: function(req, res) {
		ItemTypes.findOne({uuid: req.param('itemtypeID')}).populate('featureTypes').exec(function(err, itemType) {
			if (err) {return res.serverError(err)}
			res.ok(itemType)
		})
	},

	find: function(req, res) {
		ItemTypes.find().exec(function(err, itemTypes) {
			if (err) {return res.serverError(err)}
			res.ok(itemTypes)
		})
	},

	delete: function(req, res) {
		ItemTypes.destroy({uuid: req.param('itemtypeID')}).populate('featureTypes').exec(function(err) {
			if (err) {return res.serverError(err)}
			res.ok()
		})
	},

	addFeatureType: function(req, res) {
		var featuretypeID = parseInt(req.param('featuretypeID'))
		ItemTypes.findOne({uuid: req.param('itemtypeID')}).populate('featureTypes').exec(function(err, itemType) {
			if (err) {return res.serverError(err)}
			itemType.featureTypes.add(featuretypeID)
			itemType.save(function(err) {
				if (err) {return res.serverError(err)}
				res.ok()
			})
		})
	},

	removeFeatureType: function(req, res) {
		var featuretypeID = parseInt(req.param('featuretypeID'))
		ItemTypes.findOne({uuid: req.param('itemtypeID')}).populate('featureTypes').exec(function(err, itemType) {
			if (err) {return res.serverError(err)}
			itemType.featureTypes.remove(featuretypeID)
			itemType.save(function(err) {
				if (err) {return res.serverError(err)}
				res.ok()
			})
		})
	}
};

