const express = require('express');
//: Lancement routeur Express
const router = express.Router();

//: Redistributions des routes & importe le controller
const sauceCtrl = require('../controllers/sauce');

//: Importation middleware auth (sécurisation des routes)
const auth = require('../middleware/auth');

//: Importation middleware multer (gestion des images)
const multer = require('../middleware/multer-config');

const checkSauce = require('../middleware/check-sauce');


//+ Constructions des différentes routes CRUD de l'application

router.post('/', auth, multer, checkSauce, sauceCtrl.createSauce);
//: Route de création d'une sauce

router.put('/:id', auth, multer, sauceCtrl.modifySauce);
//: Route de modification d'une sauce

router.delete('/:id', auth, sauceCtrl.deleteSauce);
//: Route de modification d'une sauce

router.get('/:id', auth, sauceCtrl.getOneSauce);
//: Route de récupération d'une sauce

router.get('/', auth, sauceCtrl.getAllSauces);
//: Route de récupération des sauces

router.post('/:id/like', auth, sauceCtrl.likeDislikeSauce);
//: Route de gestion des avis des sauces

module.exports = router;