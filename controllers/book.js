var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost/mongodb_crud"
var ObjectId = require('mongodb').ObjectId

var methods = {}

methods.getAll = (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) res.send(err)
    var bookCollection = db.collection("books")
    bookCollection.find({})
    .toArray((err, books) => {
      if (err) res.send(err)
      res.send(books)
    })
  })
}

methods.getById = (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) res.send(err)
    var bookCollection = db.collection("books")
    bookCollection.findOne({
      _id: ObjectId(req.params.id)
    })
    .then(book => {
      res.send(book)
    })
    .catch(err => {
      res.send(err)
    })
  })
}

methods.insert = (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) res.send(err)
    var bookCollection = db.collection("books")
    bookCollection.insertOne(req.body)
    .then(book => {
      res.send(book)
    })
    .catch(err => {
      res.send(err)
    })
  })
}

methods.update = (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) res.send(err)
    var bookCollection = db.collection("books")
    bookCollection.findOne({
      _id: ObjectId(req.params.id)
    })
    .then((book) => {
      bookCollection.updateOne({
        _id: ObjectId(req.params.id)
      },{
        $set: {
          isbn : req.body.isbn || book.isbn,
          title : req.body.title || book.title,
          author : req.body.author || book.author,
          category : req.body.category || book.category,
          stock : req.body.stock || book.stock
        }
      })
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        res.send(err)
      })
    })
    .catch(err => {
      res.send(err)
    })
  })
}

methods.delete = (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) res.send(err)
    var bookCollection = db.collection("books")
    bookCollection.removeOne({
      _id: ObjectId(req.params.id)
    })
    .then(book => {
      res.send(book)
    })
    .catch(err => {
      res.send(err)
    })
  })
}

module.exports = methods
