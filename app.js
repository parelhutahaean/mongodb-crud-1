var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send('Alive')
})

app.use('/api', require('./routes/api'))

app.listen(3000)
