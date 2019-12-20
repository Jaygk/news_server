const News = require('../../store')
const request = require('../request')

module.exports = async () => {
  try {
    const $ = await request('https://s.weibo.com/top/summary?Refer=top_hot&topnav=1&wvr=6')

    const list = $('.td-02').find('a')

    let arr = []
    list.each((i, item) => {
      let obj = {}
      obj.title = item.children[0].data
      obj.url = 'https://s.weibo.com' + item.attribs.href
      arr.push(obj)
    })

    // console.log(arr);

    const news = new News({
      name: 'weibo',
      type: '微博热搜',
      data: arr,
    })

    const temp = await News.find({ name: 'weibo' })
    if (temp.length !== 0) {
      await News.updateOne({ name: 'weibo' }, { data: arr })
    } else {
      await news.save()
    }
  } catch (error) {
    console.error(error)
  }
}
