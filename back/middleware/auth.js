const jwt = require('jsonwebtoken');
//: Importation jwt
require('dotenv').config();
//: Importation dotenv


//: Sécurisation des routes
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    //: Récupération du token dans le header de la requête autorisation avec la methode split

    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    //: Vérification de la corresponce des token endécodés

    const userId = decodedToken.userId;
    //: Vérification des Correspondance du userId de la requête et du userId encodé
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      req.userId = userId;
      next();
    }
    //: En cas d'erreur message d'erreur envoyé (utilisation new Error())
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!'),
    });
  }
};