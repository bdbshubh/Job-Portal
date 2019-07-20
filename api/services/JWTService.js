const jwt = require('jsonwebtoken');
const SECRET = '12323422';

module.exports = {
    issuer(payload, expiresIn){
        return jwt.sign(payload, SECRET, {expiresIn});
    },

    verify(token){
        return jwt.verify(token, SECRET);
    }
}