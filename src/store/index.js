const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/news', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
})

const newsItem = new Schema({
  name: {
    unique: true,
    type: String,
  },
  type: {
    unique: true,
    type: String,
  },
  data: {
    unique: true,
    type: Array,
  },
})

module.exports = mongoose.model('news', newsItem)
