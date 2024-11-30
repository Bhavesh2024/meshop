const express = require('express');
const router = express.Router();
const {addUser,validateData, authUser} = require('../controllers/login')

router.post('/auth',addUser);
router.post('/login',authUser);


module.exports = router