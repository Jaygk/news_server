const request = require('../request')
const News = require('../../store')

// 爬取推荐新闻列表（标题+url）
module.exports = async () => {
  try {
    const $ = await request('https://news.sina.com.cn')

    const list = $('#syncad_1').find('a')

    let arr = []
    list.each((i, item) => {
      let obj = {}

      obj.type = 'recommend'
      obj.title = $(item)
        .text()
        .trim()
      obj.url = $(item)
        .attr('href')
        .trim()
      arr.push(obj)
    })

    const news = new News.newsList({
      name: 'recommend',
      type: '推荐',
      data: arr
    })

    const temp = await News.newsList.find({ name: 'recommend' })
    if (temp.length !== 0) {
      await News.newsList.updateOne({ name: 'recommend' }, { data: arr })
    } else {
      await news.save()
    }
  } catch (error) {
    console.error(error)
  }
}
