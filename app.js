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

//setup backend routes
app.use('/api/v1', require('./routes/api/v1/foodtruck'))

//setup frontend routes
app.use('/',require('./routes/static'))