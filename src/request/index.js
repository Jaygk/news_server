const getRecommendList = require('./recommend')
const getChinaList = require('./China')
const getWorldList = require('./world')
const getTechList = require('./tech')
const getEntList = require('./ent')
const getSportsList = require('./sports')

module.exports = () => {
  getRecommendList()
  getChinaList()
  getWorldList()
  getTechList()
  getEntList()
  getSportsList()
}
