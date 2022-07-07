const { Router } = require('express');

const { authSignIn, authSignup, authMe } = require('../controllers/auth.controller')

const router = Router();

const verifyToken = require('../controllers/verifyToken')




router.post('/signin', authSignIn);
router.post('/signup', authSignup);
router.get('/me', verifyToken,  authMe);


module.exports = router;