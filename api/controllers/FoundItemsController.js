/**
 * FoundItemsController
 *
 * @description :: Server-side logic for managing founditems
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res) {
		var foundItemBody = {
			"title": req.body.title,
			"description": req.body.description,
			"bountyRequest": req.body.bountyRequest,
			"foundTime": req.body.foundTime,
			"finder": req.param('unionID'),
			"itemType": req.body.itemType
		}
		FoundItems.create(foundItemBody).exec(function(err, foundItem) {
			if (err) {return res.serverError(err)}
			foundItem.foundLocation.add(req.body.foundLocation)
			req.body.presetFeatures.forEach(function(presetFeature) {
				foundItem.presetFeatures.add(presetFeature)
			})
			req.body.additionalFeatures.forEach(function(additionalFeature) {
				foundItem.additionalFeatures.add(additionalFeature)
			})
			foundItem.save(function(err) {
				if (err) {return res.serverError(err)}
				Users.findOne({unionID: req.param('unionID')}).exec(function(err, user) {
					if (err) {return res.serverError(err)}
					user.foundItems.add(foundItem.uuid)
					ItemTypes.findOne({uuid: req.body.itemType}).exec(function(err, itemType) {
						if (err) {return res.serverError(err)}
						itemType.foundItems.add(foundItem.uuid)
						res.created(foundItem)
					})
				})				
			})
		})
	},

	findOne: function(req, res) {
		FoundItems.findOne({uuid: req.param('foundItemID')})
		.populate('finder')
		.populate('itemType')
		.populate('foundLocation')
		.populate('presetFeatures')
		.populate('additionalFeatures')
		.exec(function(err, foundItem) {
			if (err) {return res.serverError(err)}
			res.ok(foundItem)		
		})
	},

	find: function(req, res) {
		Users.findOne({unionID: req.param('unionID')})
		.populate('foundItems')
		.exec(function(err, user) {
			if (err) {return res.serverError(err)}
			res.ok(user.foundItems)
		})
	}
};

