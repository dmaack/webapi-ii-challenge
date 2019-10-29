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

router.post('/:id/comments', (req, res) => {
    const { text } = req.body;

    if(!text) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    } else {
        Data.insertComment(req.body)
        .then(id => {
            if(id) {
                res.status(201).json(id)
            } else {
                req.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(() => {
            res.status(500).json({ error: "There was an error while saving the comment to the database" })
        })
    }

})

router.get('/', (req, res) => { // 4
    Data.find()
    .then(post => {
        res.status(201).json(post)
    })
    .catch(() => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

router.get('/:id', (req,res) => {
    const postId = req.params.id;

    Data.findById(postId)
    .then(post => {
        if(post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(() => {
        res.status(500).json({ error: "The post information could not be retrieved." })
    })

})

router.get('/:id/comments', (req,res) => {
    const commentId = req.params.id

    Data.findCommentById(commentId)
    .then(text => {
        if(text) {
            res.status(200).json(text)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(() => {
        res.status(500).json({ error: "The comments information could not be retrieved." })
    })
})
// router.delete('/:id', (req,res) => {

// })
// router.put('/:id', (req, res) => {

// })

module.exports = router;