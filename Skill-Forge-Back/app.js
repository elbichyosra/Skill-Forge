const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const trainingContentRoutes = require('./routes/TrainingContent');
const mediaMaterialRoutes=require('./routes/MediaMaterials')
const session = require('express-session');
const commentRoutes=require('./routes/Comments')
const questionRoutes=require('./routes/Question')
const quizRoutes=require('./routes/Quiz')
const resultRoutes=require('./routes/Results')
const messageRoutes=require('./routes/message')
const { keycloak, sessionStore } = require('./config/keycloak');
const notificationRoutes=require('./routes/Notification')
// Connexion à la base de données
mongoose.connect(process.env.mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB connected"))
  .catch((err) => console.error("Erreur de connexion à la base de données:", err));

const port = process.env.PORT || 3001; 

// Middleware pour parser le JSON des requêtes
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore // Utilise MongoDB comme magasin de sessions
}));

// Middleware Keycloak
app.use(keycloak.middleware())

// Middleware CORS pour autoriser les requêtes depuis tous les origines
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

// Middleware pour protéger les routes avec Keycloak
app.use('/trainingContent', trainingContentRoutes);
app.use('/mediaMaterial', mediaMaterialRoutes);
app.use('/comment', commentRoutes);
app.use('/notification', notificationRoutes);
app.use('/quiz', quizRoutes);
app.use('/question', questionRoutes);
app.use('/results', resultRoutes);
app.use('/contact', messageRoutes);
// Gestion des erreurs 404 (route non trouvée)
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
