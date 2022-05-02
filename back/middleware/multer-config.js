const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};
//: Objet de gestion des extention type mime du ficher

const storage = multer.diskStorage({
  //: enregistrement sur le disque dur des images
  destination: (req, file, callback) => {
    callback(null, 'images');
    //: Enregistrement dans le dossier images
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    //: Précision du nom d'origine suppression des espaces = split et remplacement des espaces par des underscores
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
    //: callback avec en parametre null = pas d'erreur ajout d'un Timestamp pour rendre le fichier unique plus ajout du . et son extension
  },
});

module.exports = multer({ storage: storage }).single('image');
//: Exportation du module créé, avec l'objet storage, avec méthode single pour préciser un fichier unique et de type image