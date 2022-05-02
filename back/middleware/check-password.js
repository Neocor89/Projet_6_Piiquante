const passwordSchema = require('../models/password');

module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    res.status(400).json({
      message:
        'Le MDP doit comporter au moins 10 caractères, une Maj, une min et un chiffre.',
    });
  } else {
    next();
  }
};
//: Middleware Password 
//:: Vérification du mot de passe et respect des contraintes schéma 