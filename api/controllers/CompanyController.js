/**
 * CompanyController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    async create(req,res){
        try{
            let param = req.body;
            if(!param.name){
                return res.send({err: 'Name is the required field'});
            }
            console.log(`Name: ${param.name}, City: ${param.city}, Address: ${param.address}`);
            let results = await Company.create({
                name: param.name,
                city: param.city,
                address: param.address
            });
            return res.send('Company created successfully');
        }
        catch(err){
            return res.send(err);
        }
    },

    async find(req,res){
        try{
            let results = await Company.find().populate('jobs');
            console.log(results);
            return res.send(results);
        }
        catch(err){
            return res.send(err);
        }
    },

    async findOne(req,res){
        try{
            let results = await Company.findOne({name:req.params.name});
            console.log(results);
            return res.send(results);
        }
        catch(err){
            return res.send(err);
        }
    },

    async update(req,res){
        try{
            let params = req.body;
            console.log(`All the params are below: ${params.name}`);
            let attributes = {name: params.name, city: params.city, address: params.address};
            for(var key in attributes){
                if(attributes[key] == undefined)
                delete attributes[key];
            }
            console.log(attributes);
            let results = await Company.update({name:req.params.name},attributes)
            return res.send('Updated Successfully');
        }
        catch(err){
            return res.send({errCode:'Not Found', errMessage: err});
        }
    },

    async delete(req, res){
        try{
            let finding = await Company.findOne({name:req.params.name});
            if(finding){
                let results =  await Company.destroy({name: req.params.name});
                return res.send('Deleted Successfully');
            }
            else{
                return res.send('Record not found !!');
            }
        }
        catch(err){
            return res.send({errStatus: 'Not found', errMessage: err});
        }
    }
};

