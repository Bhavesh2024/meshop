const express = require('express');
const router = express.Router();
const {handleLogin,checkLogin, logoutUser} = require('../controllers/admin')

router.post('/login',handleLogin)
router.post('/auth',checkLogin);
router.post('/logout',logoutUser)

module.exports = router;