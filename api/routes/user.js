const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const userController = require('../controllers/user');


router.post('/login', userController.user_login);

router.post('/signup', userController.user_signup);

router.delete('/:id', checkAuth, userController.user_delete);

module.exports = router;