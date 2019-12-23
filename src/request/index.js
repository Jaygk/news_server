const getRecommendList = require('./recommend')
const getChinaList = require('./China')
const getWorldList = require('./world')
const getTechList = require('./tech')
const getEntList = require('./ent')

module.exports = () => {
  getRecommendList()
  getChinaList()
  getWorldList()
  getTechList()
  getEntList()
}
