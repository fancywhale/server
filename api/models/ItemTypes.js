/**
 * ItemTypes.js
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
  	"featureTypes": {
  		"collection": "featuretypes",
  		"via": "itemTypes",
  		"dominant": true
  	},
    "foundItems": {
      "collection": "founditems",
      "via": "itemType"
    },
    "lostItems": {
      "collection": "lostitems",
      "via": "itemType"
    }
  }
};

