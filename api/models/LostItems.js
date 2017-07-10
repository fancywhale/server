/**
 * LostItems.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	"autoPK": false,
  attributes: {
  	"uuid": {
  		"type": "integer",
  		"primaryKey": true,
  		"unique": true,
  		"autoIncrement": true
  	},
  	"loser": {
  		"user": "users"
  	},
  	"title": {
  		"type": "string"
  	},
  	"itemType": {
  		"model": "itemtypes"
  	},
  	"status": {
  		"type": "string",
  		"enum": ["open", "closed", "progressing"]
  	},
  	"lostTimeFrom": {
  		"type": "datetime"
  	},
  	"lostTimeEnd": {
  		"type": "datetime"
  	},
  	"lostLocation": {
  		"model": "locations"
  	},
  	"presetFeatures": {
  		"collection": "features",
  		"via": "lostItem"
  	},
  	"additionalFeatures": {
  		"collection": "features",
  		"via": "lostItem"
  	}
  }
};

