/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	"autoPK": false,

  attributes: {
  	"unionID": {
  		"type": "string",
  		"unique": true,
  		"primaryKey": true,
  		"required": true
  	},
  	"openID": {
  		"type": "string",
  		"required": true
  	},
  	"nickName": {
  		"type": "string",
  		"required": true
  	},
  	"gender": {
  		"type": "integer"
  	},
  	"city": {
  		"type": "string"
  	},
  	"province": {
  		"type": "string"
  	},
  	"country": {
  		"type": "string"
  	},
  	"avatarUrl": {
  		"type": "string"
  	},  	
  	"phone": {
  		"type": "string",
  		"required": true
  	},
  	"addresses": {
  		"collection": "addresses",
  		"via": "user"
  	},
  	"primaryAddress": {
  		"model": "addresses",
  		"unique": true
  	},
  	"lostItems": {
  		"collection": "lostitems",
  		"via": "loser"
  	},
  	"foundItems": {
  		"collection": "founditems",
  		"via": "finder"
  	},
  	"accessToken": {
  		"type": "string"
  	}
  }
};

