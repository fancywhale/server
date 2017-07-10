/**
 * Addresses.js
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
  	"user": {
  		"model": "users"
  	},
  	"province": {
  		"type": "string"
  	},
  	"city": {
  		"type": "string"
  	},
  	"district": {
  		"type": "string"
  	},
  	"addressDetail": {
  		"type": "string"
  	},
  	"receiver": {
  		"type": "string",
  		"required": true
  	},
  	"receiverPhoneNumber": {
  		"type": "string",
  		"required": true
  	}
  }
};

