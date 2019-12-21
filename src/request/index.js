const getRecommendList = require('./recommend')
const getWeiboList = require('./China')

module.exports = () => {
  getRecommendList()
  getWeiboList()
}
