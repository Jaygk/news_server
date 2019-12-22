const request = require('superagent')
const cheerio = require('cheerio')
// const baseUrl = 'https://news.sina.com.cn'

module.exports = async url => {
  // url = baseUrl + url
  try {
    const res = await request.get(url).set('Content-Type', 'application/json')
    return cheerio.load(res.text)
  } catch (error) {
    console.error(error)
  }
}
