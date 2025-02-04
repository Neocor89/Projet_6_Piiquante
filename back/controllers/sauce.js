const Sauce = require('../models/sauce');

const fs = require('fs');
const sauce = require('../models/sauce');
//:  Utilisation du module "fs" de Node (file system) pour la gestion des fichiers et téléchargements

//+ Création sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  //: Stockage des données pour le front-end via form-data et transformation en objet js

  delete sauceObject._id;
  //: Suppression de l'id généré par le front-end.
  //:: Création automatiquement par la BDD MongoDB 

  const sauce = new Sauce({
    ...sauceObject,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],

    //: Construction de l'URL complète du fichier enregistré.
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
  });

  //+ Methode save pour Sauvegarde la sauce dans la BDD
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
    .catch((error) => res.status(400).json({ error }));
};

//+ Modification de la sauce
exports.modifySauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.userId) {
        res.status(403).json({
          message: 'Action non autorisée',
        });
        return;
      }
      const sauceObject = req.file
        ? {
            //: On modifie les données
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${
              req.file.filename
            }`,
          }
        : { ...req.body };
      Sauce.updateOne(
        { _id: req.params.id },
        { ...sauceObject, _id: req.params.id }
      ) //: On met à jour les données
        .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ message: 'Sauce Introuvable' }));
};


//+ Suppression de la sauce
exports.deleteSauce = (req, res, next) => {
  //: Récupération puis suppression de l'objet dans la base de données

  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.userId) {
        res.status(403).json({
          message: 'Action non autorisée',
        });
        return;
      }
      const filename = sauce.imageUrl.split('/images/')[1];
      //: Extraction nom fichier via methode split
      fs.unlink(`images/${filename}`, () => {
        //: Methode unlink (Node) pour suppression du fichier
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
          .catch((error) => res.status(400).json({ error }));
      }); //: Suppression dans la BDD
    })
    .catch((error) => res.status(500).json({ error }));
};

//+ Récupération d'une sauce via son id dans la BDD de MongoDB
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then((sauce) => res.status(200).json(sauce))
  .catch((error) => res.status(404).json({ error }));
  //: Methode findOne avec objet de comparaison en paramètre (id:sauce = paramètre de requête)
};

//+ Récupération de toutes les sauces dans la BDD de MongoDB
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
  .then((sauces) => res.status(200).json(sauces))
  .catch((error) => res.status(400).json({ error }));
  //: Méthode find pour récupérer la liste complète des sauces trouvées dans la BDD
};

//+ Like et Dislike des sauces
exports.likeDislikeSauce = (req, res, next) => {
  let like = req.body.like;
  //: Récupération du Like dans le body

  let userId = req.body.userId;
  //: Récupération du userID

  let sauceId = req.params.id;
  //: Récupération de l'id de la sauce

  Sauce.findOne({ _id: sauceId }).then((sauce) => {
    //: Utilisation switch pour vérification des differents cas de figure entre like et dislike
    switch (like) {
      case 1:
        if (sauce.usersLiked.includes(req.userId)) {
          res.status(400).json({ message: 'Action non autorisée' });
          return;
        }
        
        Sauce.updateOne(
          { _id: sauceId },
          //: Opérateur MongoDB qui renvoie un tableau de toutes les valeurs
          { $push: { usersLiked: userId }, $inc: { likes: +1 } }
          //: SI le user like on push l'utilisateur et on incrémente de 1
        )
          .then(() => res.status(200).json({ message: `J'aime` }))
          .catch((error) => res.status(400).json({ error }));
        break;

      case 0:
        if (sauce.usersLiked.includes(req.userId)) {
          Sauce.updateOne(
            { _id: sauceId },
            //: Opérateur MongoDB qui supprime de toutes les valeurs d'un tableau
            { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
            //: SI le user like on push l'utilisateur et on décrémente de -1
          )
            .then(() => res.status(200).json({ message: `Neutre` }))
            .catch((error) => res.status(400).json({ error }));
        }
        if (sauce.usersDisliked.includes(req.userId)) {
          Sauce.updateOne(
            { _id: sauceId },
            //: Opérateur MongoDB qui supprime de toutes les valeurs d'un tableau
            { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } }
            //: SI le user dislike on push l'utilisateur et on décrémente de -1
          )
            .then(() => res.status(200).json({ message: `Neutre` }))
            .catch((error) => res.status(400).json({ error }));
        }
        break;

      case -1:
        if (sauce.usersDisliked.includes(req.userId)) {
          res.status(400).json({ message: 'Action non autorisée' });
          return;
        }
        Sauce.updateOne(
          { _id: sauceId },
          //: Operateur qui renvoie un tableau de toutes les valeurs
          { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } }
        )
          .then(() => {
            res.status(200).json({ message: `Je n'aime pas` });
          })
          .catch((error) => res.status(400).json({ error }));
        break;

      default:
        console.log(error);
    }
  });
};