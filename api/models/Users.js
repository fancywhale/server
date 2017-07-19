/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt')

module.exports = {
    "autoPK": false,

    attributes: {
        "uuid": {
            "type": "integer",
            "primaryKey": true,
            "unique": true,
            "autoIncrement": true
        },
        "unionID": {
            "type": "string",
            "unique": true
        },
        "openID": {
            "type": "string"
        },
        "nickName": {
            "type": "string"
        },
        "firstName": {
            "type": "string"
        },
        "lastName": {
            "type": "string"
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
            "unique": true
        },
        "email": {
            "type": "string",
            "unique": true
        },
        "password": {
            "type": "string",
            "required": true,
            "minLength": 6
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
        }
    },
    beforeCreate: function (values, cb) {
        bcrypt.hash(values.password, 10, function(err, hash) {
            if (err) return cb(err);
            values.password = hash;
            cb();
        });
    }
};

