const express = require('express');
const db = require('../db/db');
const router = express.Router();

router.get('/todos', (req, res) => {
    db.all('SELECT * FROM todos', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ todos: rows });
    });
});

router.post('/todos', (req, res) => {
    const { title, description } = req.body;
    db.run('INSERT INTO todos (title, description) VALUES (?, ?)', [title, description], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, title, description, done: 0 });
    });
});

router.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, done } = req.body;
    db.run('UPDATE todos SET title = ?, description = ?, done = ? WHERE id = ?', [title, description, done, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id, title, description, done });
    });
});

router.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM todos WHERE id = ?', id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Deleted successfully' });
    });
});

module.exports = router;
