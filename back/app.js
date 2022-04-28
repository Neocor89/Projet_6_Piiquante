const express = require('express'); // Importation d'express
const mongoose = require('mongoose'); // On importe mongoose pour pouvoir utiliser la base de données
//const bodyParser = require('body-parser');
const path = require('path'); // Donne accès au système de fichier

const sauceRoutes = require('./routes/sauce'); // On importe la route dédiée aux sauces
const userRoutes = require('./routes/user'); // On importe la route dédiée aux sauces

// utilisation du module 'dotenv' qui permet de masquer les informations de connexion à la base de données à l'aide de variables d'environnement
require('dotenv').config();

// Connexion à la base de données MongoDB sécurisé avec le fichier .env pour cacher le mot de passe
mongoose
  .connect(process.env.SECRET_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express(); // Création d'une application express en utilisant le framework express

// Création de middleware Header pour contourner les erreurs en débloquant certains systèmes de sécurité CORS
app.use((req, res, next) => {
  // on indique que les ressources peuvent être partagées depuis tous les orgines
  res.setHeader('Access-Control-Allow-Origin', '*');
  // on indique les entêtes qui seront utilisées après la pré-vérification cross-origin afin de donner l'autorisation
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  // on indique les méthodes autorisées pour les requêtes HTTP
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use(express.json()); // Transforme les données de la requête POST en un objet JSON

// Ce Midleware permet de charger les fichiers qui sont dans le repertoire images et de gérer les ressources d'images de façon statique
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes); // Gestion des routes dédiées aus sauces
app.use('/api/auth', userRoutes); // Gestion des routes dédiées aux utilisateurs

// On exporte l'application express pour la déclarer dans server.js
module.exports = app;