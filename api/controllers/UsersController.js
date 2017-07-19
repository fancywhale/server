/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')
var request = require("request")
var redis = require("redis"),
    client = redis.createClient();

module.exports = {

	/**
	 * @api {post} /users/registerwithphone Registration With Phone
	 * @apiName UserRegistrationWithPhone
	 * @apiGroup Users
	 * @apiDescription Register a new user from client side with a phone number.
	 * @apiParam {String} phone Mobile phone number.
	 * @apiParam {String} firstName Fisrt name of the user.
	 * @apiParam {String} lastName Last name of the user.
	 * @apiParam {String} password Registration password.
	 * @apiParam {Integer} verificationCode SMS verification code received by the user.
	 * @apiParamExample {json} Request Example:
	 * {	 		 	
	 *	"phone": "18551815695",
	 *	"firstName": "吊",
	 *	"lastName": "炸天",
	 *	"password": "123abc",
	 *	"verificationCode": 1234
	 * }
	 * @apiSuccess {Integer} uuid Unique user ID across the service.
	 * @apiSuccess {String} phone Mobile phone number.
	 * @apiSuccess {String} firstName Fisrt name of the user.
	 * @apiSuccess {String} lastName Last name of the user.
	 * @apiSuccess {String} createdAt When the user is created at.
	 * @apiSuccess {String} updatedAt When the user is updated at.
	 * @apiSuccess {String} accessToken Access token of the user.
	 * @apiSuccessExample {json} Response Example:
	 * HTTP/1.1 201 Created
   * {
   *	"phone": "18551815695",
   *	"firstName": "吊",
   *	"lastName": "炸天",
   *	"createdAt": "2017-07-12T07:55:14.941Z",
   *	"updatedAt": "2017-07-12T07:55:14.941Z",
   *	"uuid": 6,
   *	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
   * }
	 */
	
	createWithPhone: function(req, res) {
		client.get(req.body.phone, function(err, reply) {
			if (reply == req.body.verificationCode) {
				Users.create(req.body).exec(function(err, user) {
					if (err) {
						return res.serverError(err)
					}
					var payload = {
						"uuid": user.uuid
					}
					var token = jwt.sign(payload, process.env.TOKEN_KEY, {
						expiresIn: '24h'
					})
					delete user.password
					user["accessToken"] = token
					return res.created(user);
				})
			} else {
				res.badRequest('Wrong Verification Code')
			}
		})
	},

	/**
	 * @api {post} /users/authentication Authentication
	 * @apiName UserAuthenticationWithPhone
	 * @apiGroup Users
	 * @apiDescription Authenticate an existing user from client side with a phone number or email address.
	 * @apiParam {String} phone Mobile phone number.
	 * @apiParam {String} [email] Email address.
	 * @apiParam {String} password Registration password.
	 * @apiParamExample {json} Request Example:
	 * {	 		 	
	 *	"phone": "18551815695",
	 *	"password": "123abc"
	 * }
	 * @apiSuccess {Integer} uuid Unique user ID across the service.
	 * @apiSuccess {String} accessToken Access token of the user.
	 * @apiSuccessExample {json} Response Example:
	 * HTTP/1.1 200 OK
   * {
   *	"uuid": 6,
   *	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
   * }
	 */

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

	/**
	 * @api {post} /verificationsms Get SMS Verification
	 * @apiName GetSMSVerification
	 * @apiGroup Users
	 * @apiDescription Get SMS verification code to target phone number.
	 * @apiParam {String} phone Mobile phone number.
	 * @apiParamExample {json} Request Example:
	 * {	 		 	
	 *	"phone": "18551815695"
	 * }
	 */
	sendVerificationSMS: function(req, res) {
		var code = Math.floor(Math.random()*9000)+1000
		var phone = req.body.phone
		var options = { method: 'GET',
		  url: 'http://sms.tehir.cn/code/sms/api/v1/send',
		  qs: 
		   { srcSeqId: '123',
		     account: process.env.SMS_USER_NAME,
		     password: process.env.SMS_PASS,
		     mobile: phone,
		     code: code.toString(),
		     time: '10分钟' } };

		request(options, function (error, response, body) {
		  if (error || JSON.parse(body).responseCode != "0") res.serverError(error)
		  client.set(phone,  code, function(err, reply) {
		  	res.ok()
		  });
		})
	},

	/**
	 * @api {put} /users/:userID Update User Info
	 * @apiName UpdateUserInfo
	 * @apiGroup Users
	 * @apiDescription Update a users information
	 * @apiHeader {String} Authorization Access token of the user.
	 * @apiParam {String} [nickName] User's nick name.
	 * @apiParam {Integer} [gender] User's gender.
	 * @apiParam {String} [country] User's country.
	 * @apiParam {String} [province] User's province.
	 * @apiParam {String} [city] User's city.
	 * @apiParamExample {json} Request Example:
	 * {	 		 	
	 *	"gender": 0
	 * }
	 */
	update: function (req, res) {
		var userID =  req.param('userID')
		Users.update({'uuid': userID}, req.body).exec(function(err, records) {
			if (err) {return res.serverError(err)}
  		return res.ok(records);
		})
	},

	/**
	 * @api {get} /users/:userID Get User Info
	 * @apiName GetUserInfo
	 * @apiGroup Users
	 * @apiDescription Get user information with access token
	 * @apiHeader {String} Authorization Access token of the user.
	 * @apiSuccess {Integer} uuid Unique user ID across the service.
	 * @apiSuccess {Integer} primaryAddress Primary address of the user for package delivery.
	 * @apiSuccess {String} unionID Union ID from Wechat integration.
	 * @apiSuccess {String} openID Open ID from Wechat integration.
	 * @apiSuccess {String} nickName Nick Name from Wechat integration.
	 * @apiSuccess {String} firstName First Name of the user.
	 * @apiSuccess {String} lastName Last Name of the user.
	 * @apiSuccess {String} phone Phone number of the user.
	 * @apiSuccess {String} email Email address of the user.
	 * @apiSuccess {Integer} gender Gender of the user.
	 * @apiSuccessExample {json} Response Example:
	 * HTTP/1.1 200 OK
	 * {
	 *   "primaryAddress": null,
	 *   "uuid": 7,
	 *   "unionID": null,
	 *   "openID": null,
	 *   "nickName": "吊炸天",
	 *   "firstName": null,
	 *   "lastName": null,
	 *   "gender": null,
	 *   "city": null,
	 *   "province": null,
	 *   "country": null,
	 *   "avatarUrl": null,
	 *   "phone": "18551815695",
	 *   "email": null,
	 *   "password": "$2a$10$Z/gDUH0WTdLGDY3zndabT.buI13rqCd7i4jltVKS.gabSg7sg.GTK",
	 *   "createdAt": "2017-07-19T04:04:36.000Z",
	 *   "updatedAt": "2017-07-19T04:04:36.000Z"
	 * }
	 */
	findOne: function (req, res) {
		var userID = req.param('userID')
		Users.findOne({'uuid': userID}).exec(function(err, record) {
			if (err) {return res.serverError(err)}
			return res.ok(record)
		})
	},

	delete: function (req, res) {
		Users.destroy({'uuid': req.param('userID')}).exec(function(err, record) {
			if (err) {return res.serverError(err)}
			return res.ok()
		})
	},

	oauth2: function (req, res) {
		var code = req.query.code

		var options = {
			method: 'GET',
			url: 'https://api.weixin.qq.com/sns/oauth2/access_token',
			qs: {
				appid: process.env.WECHAT_APP_ID,
				secret: process.env.WECHAT_APP_SECRET,
				code: code,
				grant_type: 'authorization_code'
			}
		};

		request(options, function(error, response, body) {
			if (error) res.serverError(error);
			var accessToken = JSON.parse(body).access_token
			var unionID = JSON.parse(body).unionid
			var openID = JSON.parse(body).openid
			Users.findOne({'unionID': unionID}).exec(function(err, user) {
				if (err) res.serverError(err)
				if (user != undefined){
					var payload = {
						"uuid": user.uuid
					}
					var token = jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: '24h' })
					res.redirect('http://zainaerne.cn/login?token=' + token + '&uuid=' + user.uuid);
				} else {
					var options = { method: 'GET',
				  url: 'https://api.weixin.qq.com/sns/userinfo',
				  qs: 
				   { access_token: accessToken,
				     openid: openID } };

					request(options, function (error, response, body) {
					  if (error) res.serverError(error);
					  var userBody = {
					  	unionID: unionID,
					  	openID: openID,
					  	nickName: JSON.parse(body).nickname,
					  	gender: JSON.parse(body).sex,
					  	country: JSON.parse(body).country,
					  	province: JSON.parse(body).province,
					  	city: JSON.parse(body).city,
					  	avatarUrl: JSON.parse(body).headimgurl
					  }
					  console.log(userBody)
					  Users.create(userBody).exec(function(err, user) {
							if (err) {return res.serverError(err)}
							var payload = {
								"uuid": user.uuid
							}
							var token = jwt.sign(payload, process.env.TOKEN_KEY, {
								expiresIn: '24h'
							})
							delete user.password
							user["accessToken"] = token
							res.redirect('http://zainaerne.cn/login?token=' + token + '&uuid=' + user.uuid)
						})				  
					});					
				}
			})			
		});	
	}
};

