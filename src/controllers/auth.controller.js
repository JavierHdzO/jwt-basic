const jwt = require('jsonwebtoken')

const modelUser = require('../models/user');
const SECRET = require('../config');
const authController = {};

authController.authSignIn = async(req, res, next) => {

    const { email, password }  = req.body;

    const user = await modelUser.findOne( {email} );
    
    if ( !user ) return res.status(404).send("Invalid User")

    const validatePassword = await user.validatePassword( password )
    
    if ( !validatePassword ) return res.status(404).json({auth: false, token: null})
    
    const token = jwt.sign( {id: user._id}, SECRET, {
        expiresIn: 60 * 60
    } )

    res.json( {auth: true, token})
}

authController.authSignup = async(req, res, next) => {
    const { username, email, password } = req.body;
    
    const user = new modelUser ({
        username,
        email,
        password
    })

    user.password =  await user.encryptPassword( user.password );
    await user.save();

    
    const token = jwt.sign({id:user._id}, SECRET, {
        expiresIn: 60 * 60 * 24 // En segundos
    });


    res.json( {auth: true, token});

}

authController.authMe = async (req, res, next) => {

    
    const user  = await modelUser.findById(req.userTokenId, {  password: 0 })

    if (!user)  return res.status(404).send('Not user found')

    res.json(
        user
    )


}


module.exports = authController;