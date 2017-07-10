/**
 * FeatureTypes.js
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
  	"name": {
  		"type": "string",
  		"unique": true
  	},  	
  	"valueType": {
  		"type": "string",
  		"enum": ['number', 'enumNum', 'enumStr', "string", "rgb"]
  	},
  	"enumValues": {
  		"type": "array"
  	},
  	"itemTypes": {
  		"collection": "itemtypes",
  		"via": "featureTypes"
  	},
  	"features": {
  		"collection": "features",
  		"via": "featureType"
  	}
  }
};

