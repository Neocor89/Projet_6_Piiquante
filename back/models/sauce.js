const mongoose = require('mongoose');
//: Inportation de mongoose

//: Gestion de :id par MongoDB
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true }, 
  name: { type: String, required: true }, 
  manufacturer: { type: String, required: true }, 
  description: { type: String, required: true }, 
  mainPepper: { type: String, required: true }, 
  imageUrl: { type: String, required: true }, 
  heat: { type: Number, required: true }, 
  likes: { type: Number, required: true }, 
  dislikes: { type: Number, required: true }, 
  usersLiked: { type: [String], required: true }, 
  usersDisliked: { type: [String], required: true },
});

//: Schema mangoose base de données MongoDB schema Model des sauces.
 
/*
* Schéma contenant { 
:  UserId du createur,  
:  Nom de la sauce, 
:  Créateur de la sauce, 
:  description de la sauce, 
:  Ingredients qui pimentent la sauce, 
:  Image de la sauce, 
:  Degrés de piquant de la sauce, 
:  Nombre de Like reçu, 
:  Nombre de Dislike reçu, 
:  Utilsateur qui Like la sauce, 
:  Utilisateur qui Dislike la sauce
* }
*/

module.exports = mongoose.model('Sauce', sauceSchema);
//: Exportation du schéma de données