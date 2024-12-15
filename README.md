# Documentation Technique

## Architecture

L'application est divisée en deux parties principales : le **frontend** et le **backend**.

### Frontend :
- **Technologies** : React, JavaScript
- **Structure** :
  - `index.js` : Point d'entrée de l'application React.
  - `components/` : Contient les composants React (Login, Register, Items).
  - `api/` : Contient les appels API pour l'authentification et la gestion des items.

### Backend :
- **Technologies** : Node.js, Express, JWT, Sequelize, MySQL
- **Structure** :
  - `middleware/` : Contient les middlewares (logger.js, authenticate.js).
  - `server.js` : Point d'entrée du serveur Express.
  - `models/` : Contient les modèles Sequelize pour la base de données.

## Choix Techniques

### Frontend :
- **React** : Utilisé pour créer une interface utilisateur dynamique et réactive.
- **State Management** : Utilisation des hooks React (`useState`, `useEffect`) pour gérer l'état local.

### Backend :
- **Express** : Framework minimaliste pour créer des applications web et des API.
- **JWT** : Utilisé pour l'authentification sécurisée des utilisateurs.
- **Sequelize** : ORM pour interagir avec la base de données MySQL.

### Middlewares :
- `logger.js` : Enregistre les requêtes HTTP dans un fichier log.
- `authenticate.js` : Vérifie les tokens JWT pour sécuriser les routes.

## Flux de Données

### Authentification :
- **Login** : L'utilisateur envoie ses identifiants, le backend vérifie et renvoie un token JWT.
- **Register** : L'utilisateur envoie ses informations, le backend crée un nouvel utilisateur.

### Gestion des Items :
- **Get Items** : Le frontend demande les items, le backend renvoie la liste des items.
- **Create Item** : Le frontend envoie un nouvel item, le backend l'ajoute à la base de données.
- **Delete Item** : Le frontend demande la suppression d'un item, le backend le supprime de la base de données.

## Sécurité
- **JWT** : Utilisé pour sécuriser les endpoints en vérifiant les tokens dans les headers des requêtes.
- **Environment Variables** : Utilisation de variables d'environnement pour stocker des informations sensibles comme `SECRET_KEY`.
  
  **Note** : Le fichier `.env` n'est pas partagé volontairement pour des raisons de sécurité afin de ne pas divulguer les informations de la base de données. Toutefois, le fichier `db.js` est présent dans le projet pour recréer la base de données.

## Dépendances

### Frontend :
- `react-dom` : Pour manipuler le DOM avec React.
- `react-scripts` : Scripts et configurations pour créer des applications React.

### Backend :
- `express` : Framework web pour Node.js.
- `jsonwebtoken` : Pour la gestion des tokens JWT.
- `sequelize` : ORM pour interagir avec MySQL.
- `mysql2` : Driver MySQL pour Node.js.
- `dotenv` : Pour gérer les variables d'environnement.
- `nodemon` : Pour recharger automatiquement le serveur lors des modifications en développement.

## Scripts

### Frontend :
- `start` : Démarre l'application React en mode développement.

### Backend :
- `start` : Démarre le serveur Express.
- `dev` : Démarre le serveur Express avec `nodemon` pour le rechargement automatique.

## Vidéo de Démonstration

Une vidéo de démonstration est présente dans le dossier `video de demo` pour visualiser le fonctionnement de l'application.
