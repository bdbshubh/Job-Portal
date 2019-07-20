module.exports = async function(req, res, next){
    if(!req.headers || !req.headers.authorization){
        return res.badRequest({err: 'Authorization header required'});
    }
    const tokenParam = req.headers.authorization;
    const decodedToken = JWTService.verify(tokenParam);
    // console.log(decodedToken);
    const user = await User.findOne({id:decodedToken.user});

    if(!user){
        return next({err:'Invalid credential provided'});
    }
    req.user = user.id;
    next();
};