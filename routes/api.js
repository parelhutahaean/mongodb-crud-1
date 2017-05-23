var router = require('express').Router()
var bookController = require('../controllers/book')

router.get('/', (req, res) => {
  res.send("Alive from router")
})

router.get('/books', bookController.getAll)

router.get('/books/:id', bookController.getById)

router.post('/books', bookController.insert)

router.put('/books/:id', bookController.update)

router.delete('/books/:id', bookController.delete)

module.exports = router
