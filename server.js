const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/admin', (req, res) => {
    res.send('Hello admin!')
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})