/**
 * FoundItems.js
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
  	"finder": {
  		"model": "users",
      "dominant": true
  	},
  	"title": {
  		"type": "string"
  	},
    "description": {
      "type": "string"
    },
    "bountyRequest": {
      "type": "float"
    },
  	"itemType": {
  		"model": "itemtypes"
  	},
  	"status": {
  		"type": "integer",
      "defaultsTo": 0
  	},
  	"foundTime": {
  		"type": "datetime"
  	},
  	"foundLocation": {
  		"collection": "locations",
      "via": "foundItem"
  	},
  	"presetFeatures": {
  		"collection": "features",
  		"via": "foundItemPreset"
  	},
  	"additionalFeatures": {
  		"collection": "features",
  		"via": "foundItemAdditional"
  	}
  }
};

