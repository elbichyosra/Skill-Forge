const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'training_content_medias', 
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'mp4'] // Formats de fichiers autorisés
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
