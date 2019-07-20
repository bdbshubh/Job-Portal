const bcrypt = require('bcrypt');
const SALT_ROUND = 10;
module.exports = {
    hashPassword: async function(password){
        return await bcrypt.hash(password, SALT_ROUND)
    },

    comparePassword: async function(password, hash){
        return await bcrypt.compare(password,hash);
    }
}