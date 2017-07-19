/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {
	// users
  'POST /users/registerwithphone': 'UsersController.createWithPhone',
  'POST /users/authenticate': 'UsersController.authenticate',
  'PUT /users/:userID': 'UsersController.update',
  'GET /users/:userID': 'UsersController.findOne',
  'DELETE /users/:userID': 'UsersController.delete',

  // addresses
  'POST /users/:unionID/addresses': 'AddressesController.create',
  'GET /users/:unionID/addresses': 'AddressesController.find',
  'GET /users/:unionID/addresses/:addressID': 'AddressesController.findOne',
  'PUT /users/:unionID/addresses/:addressID': 'AddressesController.update',
  'DELETE /users/:unionID/addresses/:addressID': 'AddressesController.delete',
  'PUT /users/:unionID/addresses/:addressID/primary': 'AddressesController.setPrimary',
  'GET /users/:unionID/primaryaddress': 'AddressesController.getPrimary',

  // feature types
  'POST /featuretypes': 'FeatureTypesController.create',
  'GET /featuretypes': 'FeatureTypesController.find',
  'GET /featuretypes/:featuretypeID': 'FeatureTypesController.findOne',
  'DELETE /featuretypes/:featuretypeID': 'FeatureTypesController.delete',

  // items types
  'POST /itemtypes': 'ItemTypesController.create',
  'PUT /itemtypes/:itemtypeID/featuretypes/:featuretypeID': 'ItemTypesController.addFeatureType',
  'DELETE /itemtypes/:itemtypeID/featuretypes/:featuretypeID': 'ItemTypesController.removeFeatureType',
  'GET /itemtypes': 'ItemTypesController.find',
  'GET /itemtypes/:itemtypeID': 'ItemTypesController.findOne',
  'DELETE /itemtypes/:itemtypeID': 'ItemTypesController.delete',

  // found items
  'POST /users/:unionID/founditems': 'FoundItemsController.create',
  'GET /users/:unionID/founditems': 'FoundItemsController.find',
  'PUT /users/:unionID/founditems/:foundItemID': 'FoundItemsController.update',
  'GET /users/:unionID/founditems/:foundItemID': 'FoundItemsController.findOne',
  'POST /users/:unionID/founditems/search': 'FoundItemsController.search',

  // lost items
  'POST /users/:unionID/lostitems': 'LostItemsController.create',
  'GET /users/:unionID/lostitems': 'LostItemsController.find',
  'GET /users/:unionID/lostitems/:lostitemID': 'LostItemsController.findOne',
  'PUT /users/:unionID/lostitems/:lostItemID': 'LostItemsController.update',

  // wx oauth
  'GET /oauth2/wx': 'UsersController.oauth2',

  // verification
  'POST /verificationsms': 'UsersController.sendVerificationSMS',
  'POST /verificationemail': 'UsersController.sendVerificationEmail'   
};
