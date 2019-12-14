const getSinaList = require('./sina');
const getWeiboList = require('./weibo');

module.exports = () => {
  getSinaList();
  getWeiboList();
};
