const request = require('../request')
const News = require('../../store')

module.exports = async () => {
  try {
    const $ = await request('https://news.sina.com.cn/')

    const list = $('.ct_t_01').find('a')

    let arr = []
    list.each((i, item) => {
      let obj = {}
      obj.title = item.children[0].data
      obj.url = item.attribs.href
      arr.push(obj)
    })

    const news = new News({
      name: 'sinaNews',
      type: '新浪新闻',
      data: arr,
    })

    const temp = await News.find({ name: 'sinaNews' })
    if (temp) {
      await News.updateOne({ name: 'sinaNews' }, { data: arr })
    } else {
      await news.save()
    }
  } catch (error) {
    console.error(error)
  }
}
