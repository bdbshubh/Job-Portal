/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
    // Company APIs
    'POST /company': 'CompanyController.create',
    'GET /company': 'CompanyController.find',
    'GET /company/:name' : 'CompanyController.findOne',
    'PATCH /company/:name' : 'CompanyController.update',
    'DELETE /company/:name' : 'CompanyController.delete',

    // JOB APIs
    'POST /job': 'JobController.create',
    'GET /job' : 'JobController.find',

    // Applications APIs 
    'POST /application' : 'ApplicationController.create',
    'GET /application' : 'ApplicationController.find',

    // Users APIs
    'POST /user/signup' : 'UserController.signup',
    'POST /user/login' : 'UserController.login'



};
