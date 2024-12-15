const express = require('express');
const { pool } = require('../config/db');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

// CRUD pour les items
router.post('/', authenticate, async (req, res) => {
    const { name, description } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Le nom est requis.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO items (name, description, owner_id) VALUES ($1, $2, $3) RETURNING *',
            [name, description, req.user.id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});

router.get('/', authenticate, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM items WHERE owner_id = $1', [req.user.id]);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});

router.delete('/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM items WHERE id = $1 AND owner_id = $2 RETURNING *', [id, req.user.id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Item introuvable.' });
        }
        res.status(200).json({ message: 'Item supprimé avec succès.' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});

module.exports = router;