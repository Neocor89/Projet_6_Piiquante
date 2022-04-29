const mongoose = require('mongoose');

// On importe le package pour s'assurer que l'email sois utilisé qu'une seul fois
// Ce package s'assurera que deux utilisateurs ne peuvent pas partager la même adresse e-mail.
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

// On exporte ce schéma sous forme de modèle. On appelle 'User' et on lui passe le schéma de données
module.exports = mongoose.model('User', userSchema);