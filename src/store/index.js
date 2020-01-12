const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/news', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
})

const newsList = mongoose.model(
  'newsList',
  new Schema({
    name: {
      unique: true,
      type: String
    },
    type: {
      unique: true,
      type: String
    },
    data: {
      unique: true,
      type: Array
    }
  })
)

const users = mongoose.model(
  'users',
  new Schema({
    name: {
      unique: true,
      type: String
    },
    historyList: {
      unique: true,
      type: Array
    }
  })
)

module.exports = {
  newsList,
  users
}
