const News = require('../../store')
const request = require('../request')

// 爬取科技新闻列表（标题+url)并保存到数据库
module.exports = async () => {
  try {
    const $ = await request('https://tech.sina.com.cn')
    // console.log($.html());
    const list = $('.seo_data_list').find('li')
    // console.log(list.length)

    let arr = []
    list.each((i, item) => {
      let obj = {}

      obj.type = 'tech'
      obj.title = $(item)
        .find('a')
        .text()
        .trim()
      obj.url = $(item)
        .find('a')
        .attr('href')
        .trim()

      const ele = arr.find(res => res.title == obj.title)

      if (!ele) {
        if (obj.url.split('.sina')[0] == 'https://tech') {
          arr.push(obj)
        }
      }
    })

    // console.log(arr);

    const news = new News.newsList({
      name: 'tech',
      type: '科技',
      data: arr
    })

    const temp = await News.newsList.find({ name: 'tech' })
    if (temp.length !== 0) {
      await News.newsList.updateOne({ name: 'tech' }, { data: arr })
    } else {
      await news.save()
    }
  } catch (error) {
    console.error(error)
  }
}
