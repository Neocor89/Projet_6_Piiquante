module.exports = (req, res, next) => {
  //: Pour route POST AJOUT
  if (JSON.parse(req.body.sauce !== undefined)) {
    const sauce = JSON.parse(req.body.sauce);
    let { name, manufacturer, description, mainPepper } = sauce;
    let trimArray = [];

    function deleteSpaces(...string) {
      trimArray = string.map((space) => space.trim());
      //: Suppression des espaces
    }
    deleteSpaces(name, manufacturer, description, mainPepper);

    const checkCharacters = (currentValue) => currentValue.length >= 3;
    if (trimArray.every(checkCharacters)) {
      next();
    } else {
      throw new Error('Tous les champs doivent faire au moins 3 caractères');
    } //: Utilisation de (new Error)
  } else {
    //: Pour route PUT MODIFICATION
    const sauce = req.body;
    //: Sauce existante
    let { name, manufacturer, description, mainPepper } = sauce;
    let trimArray = [];

    function deleteSpaces(...string) {
      trimArray = string.map((space) => space.trim());
    }
    deleteSpaces(name, manufacturer, description, mainPepper);

    const checkCharacters = (currentValue) => currentValue.length >= 3;
    if (trimArray.every(checkCharacters)) {
      next();
    } else {
      throw new Error('Tous les champs doivent faire au moins 3 caractères');
    }
    //: Vérification du nombre de caractères
  }
};

