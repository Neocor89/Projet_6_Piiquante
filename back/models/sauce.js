const mongoose = require('mongoose');
//: Inportation de mongoose

//: Schema mangoose base de données MongoDB schema Model des sauces. 
//: Gestion de :id par MongoDB
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true }, // UserId du createur
  name: { type: String, required: true }, // Nom de la sauce
  manufacturer: { type: String, required: true }, // Créateur de la sauce
  description: { type: String, required: true }, // description de la sauce
  mainPepper: { type: String, required: true }, // Ingredients qui pimentent la sauce
  imageUrl: { type: String, required: true }, // Adresse de l'image de presentation de la sauce
  heat: { type: Number, required: true }, // Degrés de piquant de la sauce
  likes: { type: Number, required: true }, // Nombre de Like reçu
  dislikes: { type: Number, required: true }, // Nombre de Dislike reçu
  usersLiked: { type: [String], required: true }, // L'utilsateur qui Like la sauce
  usersDisliked: { type: [String], required: true }, // l'utilisateur qui Dislike la sauce
});

//: Exportation du schéma de données
module.exports = mongoose.model('Sauce', sauceSchema);