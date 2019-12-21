const News = require('../../store')
const request = require('../request')

// 爬取国内新闻列表（标题+url)并保存到数据库
module.exports = async () => {
  try {
    const $ = await request('/china')
    // console.log($.html());
    const list = $('.switch-box').next('div').find('ul > li')
    // console.log(list.length);

    let arr = []
    list.each((i, item) => {
      let obj = {}

      obj.title = $(item).find('a').text().trim()
      obj.url = $(item).find('a').attr('href').split('.cn')[1]

      arr.push(obj)
    })

    // console.log(arr);

    const news = new News({
      name: 'china',
      type: '国内',
      data: arr,
    })

    const temp = await News.find({ name: 'china' })
    if (temp.length !== 0) {
      await News.updateOne({ name: 'china' }, { data: arr })
    } else {
      await news.save()
    }
  } catch (error) {
    console.error(error)
  }
}