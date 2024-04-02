const Keycloak = require('keycloak-connect');
const MongoStore = require('connect-mongo');

// Configuration de la session avec connect-mongo
const sessionStore = MongoStore.create({
  mongoUrl: process.env.mongo_uri,
  collectionName: 'sessions',
});

const keycloak = new Keycloak({
  store: sessionStore,
});

module.exports = {
  keycloak,
  sessionStore,
};
