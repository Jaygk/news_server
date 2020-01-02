const News = require('../../store')
const request = require('../request')

// 爬取体育新闻列表（标题+url)并保存到数据库
module.exports = async () => {
  try {
    const $ = await request('http://sports.sina.com.cn')
    // console.log($.html());
    const list = $('div[style="display:none!important;"]').find('li')
    // console.log(list.length)

    let arr = []
    list.each((i, item) => {
      let obj = {}

      obj.type = 'sports'
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
        if (obj.url.split('.sina')[0] == 'https://sports') {
          arr.push(obj)
        }
      }
    })

    const news = new News({
      name: 'sports',
      type: '体育',
      data: arr
    })

    const temp = await News.find({ name: 'sports' })
    if (temp.length !== 0) {
      await News.updateOne({ name: 'sports' }, { data: arr })
    } else {
      await news.save()
    }
  } catch (error) {
    console.error(error)
  }
}
