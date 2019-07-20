/**
 * ApplicationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  

  /**
   * `ApplicationController.create()`
   */
  create: async function (req, res) {
    try{
      const {name, email, jobId} = req.allParams();
      if(!name && !email && !jobId){
        return res.badRequest('Input parameter missing');
      }
      const candidate = await Candidate.create({name,email}).fetch();
      const app = await Application.create({candidate: candidate.id, job: jobId}).fetch();
      return res.ok(app);
    }
    catch(err){
      return res.serverError(err);
    }
  },

  /**
   * `ApplicationController.find()`
   */
  find: async function (req, res) {
    try{
      const apps = await Application.find()
      .populate('job')
      .populate('candidate');
      return res.ok(apps);
    }
    catch(err){
      return res.serverError(err);
    }
  }

};

