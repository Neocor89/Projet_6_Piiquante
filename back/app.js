const express = require('express');
//: Importation d'express

const mongoose = require('mongoose');
//: Importation mongoose (Utilisation de la base de données)

const bodyParser = require('body-parser');

const path = require('path');
//: Accès au système de fichier

const sauceRoutes = require('./routes/sauce');
//: On importe la route dédiée aux sauces

const userRoutes = require('./routes/user');
//: On importe la route dédiée aux User

require('dotenv').config();
//: Importation de .env Sécurisation des données

//: Info de connection de "mangoDB"
mongoose.connect('mongodb+srv://'+ process.env.DB_USER +':'+ process.env.DB_PASSWORD +'@cluster0.dhmxq.mongodb.net/'+ process.env.DB_NAME +'?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
//: Vérifiication de la connection à "mangoDB"
.then(() => console.log('Connexion à mongodb réussie !'))
//: Vérifiication d'une erreur de connection à "mangoDB"
.catch(() => console.log('Echec de la Connexion à mongodb !'));

const app = express(); 

//: Middleware gestion des erreurs de certains systèmes de sécurité CORS
app.use((req, res, next) => {
  //: Partage et access depuis toutes les orgines
  res.setHeader('Access-Control-Allow-Origin', '*');
  //: Headers autorisés pour pré-vérification cross-origin 
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  //: Type de requêtes HTTP autorisées 
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

//: Analyse et transformation des datas des requêtes en objet JSON
app.use(express.json());

//: Midleware de prise en charge des fichiers dans dossier images de façon statique
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
//: Gestion des routes sauces
app.use('/api/auth', userRoutes);
//: Gestion routes utilisateurs

//: On exporte express dans server.js
module.exports = app;