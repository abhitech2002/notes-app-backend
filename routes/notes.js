const express = require('express')
const router = express.Router()

const db = require('../db')

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM notes';
    db.query(sql, (err, result) => {
        if(err) throw err
        res.send(result)
    })
})

router.post('/',(req, res) => {
    const {title, content} = req.body
    const sql = 'INSERT INTO notes (title, content) VALUES (?, ?)';
    db.query(sql, [title, content], (err, result) => {
        if(err) throw err
        res.send('Notes Added')
    })
})

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const {title, content} = req.body;
    const sql = 'UPDATE notes SET title = ?, content = ? WHERE id = ?';
    db.query(sql, [title, content, id], (err, result) => {
        if(err) throw err
        if(result.affectedRows === 0) {
            return res.status(404).send('Notes not found')
        }
        res.send('Notes Updated')
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    const sql = 'SELECT* FROM notes WHERE id = ?'
    db.query(sql, [id], (err, result) => {
        if(err) throw err
        if(result.length === 0) {
            return res.status(404).send('Notes not found')
        }
        res.send(result[0])
    })
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    const sql = 'DELETE FROM notes WHERE id=?'
    db.query(sql, [id], (err, result) => {
        if(err) throw err;
        res.send('Notes deleted')
    })
})

module.exports = router;
