//start express
const express = require('express')
const app = express()
const port = 3000
const url='http://localhost:3000/'
const message = `Server is running on port ${port}. Visit ${url} in your browser.`
app.listen(port, () => console.log(message))

//setup middleware
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes/static'))