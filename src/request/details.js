const request = require('./request')

// 根据对应url爬取详情页面数据
module.exports = async url => {
  try {
    // console.log(url);
    const $ = await request(url)

    const title = $('.main-title')
      .text()
      .trim()
    const dateSource = {}
    dateSource.date = $('.date-source')
      .find('.date')
      .text()
      .trim()
    dateSource.source = $('.date-source')
      .find('a')
      .text()
      .trim()

    // let keywords = ''
    // if ($('#keywords').attr('data-wbkey')) {
    //   keywords = $('#keywords')
    //     .attr('data-wbkey')
    //     .trim()
    // }

    const list = $('.article').find('p')

    let arr = []
    let index = 0

    let isImgFirst = false
    if (
      $(list[0])
        .prev()
        .attr('class') === 'img_wrapper'
    ) {
      index = 1
      isImgFirst = true
    } else {
      isImgFirst = false
    }

    list.each((i, item) => {
      let obj = {}

      if (
        $(item)
          .next()
          .attr('class') === 'img_wrapper'
      ) {
        obj.imgIndex = index++
      } else {
        obj.imgIndex = -1
      }

      if (
        $(item)
          .find('strong')
          .text()
          .trim().length !== 0
      ) {
        obj.strong = true
      } else {
        obj.strong = false
      }

      obj.text = $(item)
        .text()
        .trim()

      arr.push(obj)
    })

    const imgDivList = $('.img_wrapper')

    const images = []

    imgDivList.each((i, item) => {
      let j = i
      let obj = {}

      obj.imgUrl = $(item)
        .find('img')
        .attr('src')
      obj.desc = $(item)
        .find('span')
        .text()
        .trim()

      if (
        $(item)
          .prev()
          .hasClass('img_wrapper')
      ) {
        j = j - 1
        while (!images[j]) {
          j--
        }
        images[j].push(obj)
      } else {
        images.push([obj])
      }
    })

    // console.log(images);

    return { isImgFirst, title, dateSource, content: arr, images }
  } catch (error) {
    console.error(error)
  }
}
