/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')

module.exports = {
	/**
	 * @apiDefine WechatParam
	 * @apiParam {String} [unionID] union ID from Wechat
	 * @apiParam {String} [openID] open ID from Wechat
	 * @apiParam {String} [nickName] nick name from Wechat
	 * @apiParam {Integer} [gender] gender: [0, 1] from Wechat
	 * @apiParam {String} [city] city from Wechat
	 * @apiParam {String} [province] province from Wechat
	 * @apiParam {String} [country] country from Wechat
	 * @apiParam {String} [avatarUrl] avatar url from Wechat
	 */

	/**
	 * @api {post} /users/register Register a user.
	 * @apiName UserRegistration
	 * @apiGroup Users
	 * @apiDescription Register a new user from client side with a phone number or an email. No wechat integration is involved.
	 * @apiParam {String} phone Mobile phone number.(One of phone and email is required)
	 * @apiParam {String} [email] Email address.	 
	 * @apiParam {String} nickName Nick name.
	 * @apiParam {String} password Registration password.
	 * @apiParamExample {json} Request Example:
	 * {	 		 	
	 *	"phone": "12312341234",
	 *	"nickName": "吊炸天"
	 *	"password": "123abc"
	 * }
	 * @apiSuccess {Integer} uuid Unique user ID across the service.
	 * @apiSuccess {String} phone Mobile phone number.
	 * @apiSuccess {String} [email] Email address.
	 * @apiSuccess {String} createdAt When the user is created at.
	 * @apiSuccess {String} accessToken Access token of the user.
	 * @apiSuccessExample {json} Response Example:
	 * HTTP/1.1 201 Created
   * {
   * 	"phone": "12312341234",
   * 	"nickName": "吊炸天",
   * 	"createdAt": "2017-07-12T07:55:14.941Z",
   * 	"updatedAt": "2017-07-12T07:55:14.941Z",
   * 	"uuid": 6,
   * 	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjo2LCJpYXQiOjE0OTk4NDYxMTQsImV4cCI6MTQ5OTkzMjUxNH0.nTDdbppGaM9YETOBSa98qKYlMyLcaFoPLS1b8_UXSSk"
   * }
	 */
	
	create: function (req, res) {
		Users.create(req.body).exec(function(err, user) {
			if (err) {return res.serverError(err)}
			var payload = {
				"uuid": user.uuid
			}
			var token = jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: '24h' })
			delete user.password
			user["accessToken"] = token
  		return res.created(user);
		})
	},

	authenticate: function (req, res) {
		var body =  JSON.parse(JSON.stringify(req.body))
		delete body.password
		Users.findOne(body).exec(function(err, user) {
			bcrypt.compare(req.body.password, user.password, function(err, result) {
				if (result == true) {
					var payload = {
						"uuid": user.uuid
					}
					var token = jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: '24h' })
					delete user.password
					user["accessToken"] = token
		  		return res.ok(user);
				} else {
					res.forbidden('Wrong Password!')
				}
			})
		}) 
	},

	update: function (req, res) {
		var userID =  req.param('userID')
		Users.update({'uuid': userID}, req.body).exec(function(err, records) {
			if (err) {return res.serverError(err)}
  		return res.ok(records);
		})
	},

	findOne: function (req, res) {
		var userID = req.param('userID')
		Users.findOne({'uuid': userID}).exec(function(err, record) {
			if (err) {return res.serverError(err)}
			return res.ok(record)
		})
	}
};

