const bcrypt = require('bcrypt');

//: Importation jsonwebtoken package token pour utilisateur
const jwt = require('jsonwebtoken');

//: Configuration et utilisation package Dotenv 
//: Conservation des données sensibles en dehors du code source
require('dotenv').config();

//: Importation du schéma dans le dossier "models"
const User = require('../models/User');

//: Enregistrement d'un user génère et crypte un hash via le package bcrypt
exports.signup = (req, res, next) => {
  //: Méthode hash bcrypt avec 10 tours d'encodage du mdp 
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        // On passe l'email qu'on trouve dans le corps de la requête
        email: req.body.email,
        password: hash 
      });

      //: Enregistrement dans la base de données du nouvel utilisateur
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  //: Recherche d'un utilisateur dans la BDD 
  User.findOne({ email: req.body.email })
    .then((user) => {
      //: Si utilisateur introuvable message via code 401 "Utilisateur non trouvé!"
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      //: Methode "compare" de bcrypt vérification de la provenance des hashs d'origine 
      bcrypt.compare(req.body.password, user.password)
        .then((valid) => {
          //: Si requête non-authentifiée renvoi d'un statut 401 avec message personnalisé 
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          //: Si requête authentifiée renvoi d'un statut 200 format JSON
          res.status(200).json({
            userId: user._id,
            //: Token temporaire expiration au bout de 24h 
            token: jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
              expiresIn: '24h',
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};