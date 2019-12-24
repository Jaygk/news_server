const request = require('./request')
const puppeteer = require('puppeteer')
const cheerio = require('cheerio')

// 根据对应url爬取详情页面数据
module.exports = async url => {
  try {
    // console.log(url);
    const $ = await request(url)

    // 获取文章标题
    const title = $('.main-title')
      .text()
      .trim()

    // 文章来源及发布时间
    const dateSource = {}
    dateSource.date = $('.date-source')
      .find('.date')
      .text()
      .trim()
    dateSource.source = $('.date-source')
      .find('a')
      .text()
      .trim()

    let quotation = $('.quotation')
      .text()
      .trim()

    // 图片列表
    let index = 0 // 段落对应的图片下标（初始值为0）
    const imgDivList = $('.img_wrapper')

    let isImgFirst = false
    // console.log($(imgDivList[0]).prev()[0])

    const images = [] // 图片数组

    if (imgDivList.length != 0) {
      // 判断文章是否以图片开头
      if (
        !$(imgDivList[0]).prev()[0] ||
        ($(imgDivList[0]).prev()[0] && $(imgDivList[0]).prev()[0].name != 'p')
      ) {
        // 如果是以图片开头，则让图片下标从1开始
        index = 1
        isImgFirst = true
      } else {
        isImgFirst = false
      }

      imgDivList.each((i, item) => {
        let j = i
        let obj = {}

        obj.imgUrl = $(item) // 图片链接
          .find('img')
          .attr('src')
          .trim()

        obj.desc = $(item) // 图片描述
          .find('span')
          .text()
          .trim()

        // 判断是否为连续图片
        if (
          $(item)
            .prev()
            .hasClass('img_wrapper')
        ) {
          // 添加到上一个不是连续图片的图片数组中
          j = j - 1
          while (!images[j]) {
            j--
          }
          images[j].push(obj)
        } else {
          images.push([obj])
        }
      })
    }

    // 正文内容
    const list = $('.article').find('p')

    let arr = [] // 存储需要返回给客户端的数据

    list.each((i, item) => {
      let obj = {} // 存储每个段落项相关内容及标识

      // 判断当前段落前面是否有视频
      if (
        $(item)
          .prev()
          .prev()
          .attr('id') &&
        $(item)
          .prev()
          .prev()
          .attr('id')
          .includes('videoList')
      ) {
        obj.hasVideo = true
      } else {
        obj.hasVideo = false
      }

      // 判断当前段落中存储的是否为图片
      if ($(item).find('img') != false) {
        obj.imgUrl = $(item)
          .find('img')
          .attr('src')
          .trim()
      } else {
        obj.imgUrl = ''
      }

      // 判断段落下方是否为图片
      if (
        $(item)
          .next()
          .attr('class') === 'img_wrapper'
      ) {
        obj.imgIndex = index++ // 保存对应的图片下标
      } else {
        obj.imgIndex = -1
      }

      // 判断段落是否为二级标题
      if (
        $(item)
          .find('strong')
          .text()
          .trim().length !== 0 ||
        ($(item).attr('cms-style') &&
          $(item)
            .attr('cms-style')
            .includes('strong-Bold'))
      ) {
        obj.strong = true
      } else {
        obj.strong = false
      }

      // 判断段落是否需要居中
      if (
        $(item).attr('cms-style') &&
        $(item)
          .attr('cms-style')
          .includes('align-Center')
      ) {
        obj.center = true
      } else {
        obj.center = false
      }

      // 段落内容
      obj.text = $(item)
        .text()
        .trim()

      arr.push(obj)
    })

    // 判断页面中是否含有视频
    let video = {}
    if ($('#videoList0') != false) {
      // 使用puppeteer操作浏览器点击标签获取视频链接
      const browser = await puppeteer.launch()
      const page = await browser.newPage()

      await page.goto(url)

      const frame = await page.mainFrame()
      const clickA = await frame.$('.play-video-area > a')
      await clickA.click()
      await page.waitFor(1000)
      const bodyHandle = await frame.$('html')
      const html = await frame.evaluate(body => body.innerHTML, bodyHandle)
      await bodyHandle.dispose() //销毁
      // console.log(html)
      const $ = cheerio.load(html)

      // 视频链接
      video.src = $('.play-video-area')
        .find('video')
        .attr('src')
        .trim()

      // 视频描述
      video.desc = $('.video-info')
        .text()
        .trim()

      // 关闭浏览器
      browser.close()
    }

    return {
      isImgFirst,
      title,
      dateSource,
      quotation,
      content: arr,
      images,
      video
    }
  } catch (error) {
    console.error(error)
  }
}
