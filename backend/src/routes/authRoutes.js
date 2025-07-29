const express = require('express');
const { register, login, profile } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleWare');
const {registerValidator, loginValidator} = require('../validators/authValidator');

const router = express.Router();

router.post('/register',registerValidator,register);
router.post('/login',loginValidator,login);
router.get('/profile',authMiddleware, profile);


module.exports = router;