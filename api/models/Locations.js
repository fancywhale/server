/**
 * Locations.js
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
  	"lostItem": {
  		"model": "lostitems"
  	},
  	"foundItem": {
  		"model": "founditems"
  	},
  	"title": {
  		"type": "string"
  	},
  	"address": {
  		"type": "string"
  	},
    "province": {
      "type": "string"
    },
    "city": {
      "type": "string"
    },
  	"longitude": {
  		"type": "float"
  	},
  	"latitude": {
  		"type": "float"
  	}
  }
};

