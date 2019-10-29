const express = require('express');

// 1
const dbRouter = require('./data/db-router.js');
const server = express()

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`
        <h1>Dominique's Blog</h1>
        <p>Welcome</p>
    `)
})

// 2
server.use('/api/posts', dbRouter)

const port = 8010;
server.listen(port, () => console.log(`\n Listening on port ${port}`))