const request = require('superagent')
const News = require('../../store')

// 爬取国际新闻列表（标题+url）
module.exports = async () => {
  try {
    const res = await request
      .get(
        'https://interface.sina.cn/news/get_news_by_channel_new_v2018.d.html?cat_1=51923&show_num=200'
      )
      .set('Content-Type', 'application/json')

    const list = JSON.parse(res.text).result.data

    const arr = []
    list.forEach(item => {
      // console.log(item);
      const obj = {}
      obj.title = item.title
      obj.url = item.url

      arr.push(obj)
    })

    const news = new News({
      name: 'world',
      type: '国际',
      data: arr
    })

    const temp = await News.find({ name: 'world' })
    if (temp.length !== 0) {
      await News.updateOne({ name: 'world' }, { data: arr })
    } else {
      await news.save()
    }
  } catch (error) {
    console.error(error)
  }
}
