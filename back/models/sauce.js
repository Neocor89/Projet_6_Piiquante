const mongoose = require('mongoose');

// Création d'un schema mangoose pour que les données de la base MongoDB ne puissent pas différer de
// celui précisé dans le schema Model des sauces. L'id est généré automatiquement par MongoDB
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

// On exporte ce schéma de données
module.exports = mongoose.model('Sauce', sauceSchema);