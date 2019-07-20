/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Joi = require('joi');
module.exports = {
  

  /**
   * `UserController.signup()`
   */
  signup: async function (req, res) {
    try{
      const schema = Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
      });
      const {email, password} =await Joi.validate(req.allParams(),schema);
      let encryptedPassword = await UtilServices.hashPassword(password);
      
      let user = await User.create({email,password:encryptedPassword});
      return res.ok('Signup successfully');
    }
    catch(err){
      if(err.name == 'ValidationError'){
        return res.badRequest(err);
      }
      return res.serverError(err);
    }
  },

  /**
   * `UserController.login()`
   */
  login: async function (req, res) {
    try{
      const schema = Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
      });
      const {email, password} =await Joi.validate(req.allParams(),schema);
      let user = await User.findOne({email});
      if(!user){
        return res.notFound({err: 'User does not exist'});
      }
      let matchedPassword = await UtilServices.comparePassword(password, user.password);
      if(!matchedPassword){
        return res.badRequest({err: 'Unauthorized user'});
      }
      const token = JWTService.issuer({user: user.id}, '1 day');
      return res.ok({status: 'Login Successful', token: token});
    }
    catch(err){
      if(err.name == 'ValidationError'){
        return res.badRequest(err);
      }
      return res.serverError(err);
    }
  }

};

