/**
 * Features.js
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
  	"foundItemPreset": {
  		"model": "founditems"
  	},
    "foundItemAdditional": {
      "model": "founditems"
    },
  	"featureType": {
  		"model": "featuretypes"
  	},
  	"valueNum": {
  		"type": "float"
  	},
  	"valueStr": {
  		"type": "string"
  	} 
  }
};

