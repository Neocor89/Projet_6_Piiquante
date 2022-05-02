module.exports = (req, res, next) => {
  //: Middleware emailRegexp
  const validEmail = (email) => {
    let emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    //: Ajout d'une RegExp pour la vérification du mail du User
    let isRegexTrue = emailRegexp.test(email);
    //: Ajout validation RegExp dans variable
    isRegexTrue ? next() : res.status(400).json({ message: 'email non valide' });
    //: Message d'erreur en cas de mail invalide
  };
  validEmail(req.body.email);
};