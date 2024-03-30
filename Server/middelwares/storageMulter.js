const multer = require('multer');
// Configuration de Multer pour le stockage des fichiers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') 
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname) // Nom de fichier unique
    }
  });
  
  // Définition du filtre pour les types de fichiers autorisés
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'video/mp4' ||
        file.mimetype === 'application/pdf') {
      cb(null, true); // Accepter le fichier
    } else {
      cb(new Error('Type de fichier non pris en charge'), false); // Rejeter le fichier
    }
  };
  
  const upload = multer({ 
    storage: storage, 
    fileFilter: fileFilter // Appliquer le filtre au téléversement
  });
  
  module.exports = upload;