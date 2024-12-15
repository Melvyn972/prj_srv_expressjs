const express = require('express');
const bcrypt = require('bcrypt');
const { pool } = require('../config/db');
const { generateToken } = require('../utils/jwt');
const router = express.Router();

// Inscription
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Nom d\'utilisateur et mot de passe requis.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
        res.status(201).json({ message: 'Utilisateur créé avec succès.' });
    } catch (err) {
        if (err.code === '23505') {
            return res.status(400).json({ message: 'Nom d\'utilisateur déjà pris.' });
        }
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});

// Connexion
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Nom d\'utilisateur et mot de passe requis.' });
    }

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Identifiants incorrects.' });
        }

        const token = generateToken(user.id, user.username);
        res.status(200).json({ message: 'Connexion réussie.', token });
    } catch (err) {
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});

module.exports = router;
