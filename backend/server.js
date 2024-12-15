require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes } = require('sequelize');

// Initialisation d'Express
const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Configuration Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

// Modèles Sequelize
const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
});

const Item = sequelize.define('Item', {
    name: { type: DataTypes.STRING, allowNull: false },
});

User.hasMany(Item);
Item.belongsTo(User);

// Synchronisation de la base de données
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connexion à la base de données réussie');
        await sequelize.sync({ alter: true });
    } catch (error) {
        console.error('Impossible de se connecter à la base de données:', error);
    }
})();

// Routes
// Authentification
app.post('/auth/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({ username, password: hashedPassword });
        res.status(201).json({ message: 'Utilisateur créé avec succès', user });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de l’inscription', details: error });
    }
});

app.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Items CRUD
app.get('/items', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Non autorisé' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const items = await Item.findAll({ where: { UserId: decoded.id } });
        res.json(items);
    } catch (error) {
        res.status(401).json({ error: 'Jeton invalide' });
    }
});

app.post('/items', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Non autorisé' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { name } = req.body;
        const item = await Item.create({ name, UserId: decoded.id });
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création de l’item', details: error });
    }
});

app.delete('/items/:id', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Non autorisé' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = req.params;
        const item = await Item.findOne({ where: { id, UserId: decoded.id } });
        if (!item) return res.status(404).json({ error: 'Item non trouvé' });

        await item.destroy();
        res.json({ message: 'Item supprimé avec succès' });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la suppression de l’item', details: error });
    }
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
