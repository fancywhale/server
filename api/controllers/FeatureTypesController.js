/**
 * FeatureTypesController
 *
 * @description :: Server-side logic for managing featuretypes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res) {
		FeatureTypes.create(req.body).exec(function(err, featureType) {
			if (err) {return res.serverError(err)}
  		return res.created(featureType);
		})
	},

	find: function(req, res) {
		FeatureTypes.find().exec(function(err, featureTypes) {
			if (err) {return res.serverError(err)}
  		return res.ok(featureTypes);
		})
	},

	findOne: function(req, res) {
		FeatureTypes.findOne({uuid: req.param('featuretypeID')}).exec(function(err, featureType) {
			if (err) {return res.serverError(err)}
  		return res.ok(featureType);
		})
	},

	delete: function(req, res) {
		FeatureTypes.destroy({uuid: req.param('featuretypeID')}).exec(function(err) {
			if (err) {return res.serverError(err)}
  		return res.ok();
		})
	}	
};

