const router = require('express').Router();

// 5
const Data = require('./db.js')

// 3 
router.post('/', (req,res) => {
    const { title, contents } = req.body

    if( !title || !contents ) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        Data.insert(req.body)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(() => {
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
    }
})

// router.post('/:id/comments', (req, res) => {

// })
// router.get('/', (req, res) => { // 4
    
// })
// router.get('/:id', (req,res) => {

// })
// router.get('/:id/comments', (req,res) => {

// })
// router.delete('/:id', (req,res) => {

// })
// router.put('/:id', (req, res) => {

// })

module.exports = router;