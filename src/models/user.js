const { model, Schema } = require('mongoose');
const bcrypt = require('bcryptjs')

const userShacema = new Schema({
    username: String,
    email: String,
    password: String
})


userShacema.methods.encryptPassword = async( password ) => {
    const salt = await bcrypt.genSalt( 10 );
    return bcrypt.hash( password, salt )
};

userShacema.methods.validatePassword =  function ( password ) {
    return  bcrypt.compare(password, this.password);
};

module.exports = model('User', userShacema);