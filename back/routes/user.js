const express = require('express');
//: Importation express

const router = express.Router();
//: Création du routeur avec Express

const userCtrl = require('../controllers/user');
//: Différentes routes liée aux User

const checkEmail = require('../middleware/check-email');
//: Différentes routes liée aux mail

// const checkPassword = require('../middleware/check-password');
//: Différentes routes liée aux password

router.post('/signup', checkEmail, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;