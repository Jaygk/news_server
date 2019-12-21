// const request = require('../request')

// module.exports = async url => {
//   try {
//     // console.log(url);
//     const $ = await request(url)

//     const title = $('.main-title')
//       .text()
//       .trim()
//     const dateSource = {}
//     dateSource.date = $('.date-source')
//       .find('.date')
//       .text()
//       .trim()
//     dateSource.source = $('.date-source')
//       .find('a')
//       .text()
//       .trim()

//     const list = $('#article').find('p')

//     let arr = []
//     let index = 0

//     list.each((i, item) => {
//       let obj = {}

//       if (
//         $(item)
//           .next()
//           .attr('class') === 'img_wrapper'
//       ) {
//         obj.imgIndex = index++
//       } else {
//         obj.imgIndex = -1
//       }

//       if ($(item).find('strong').text().trim().length !== 0) {
//         obj.strong = true
//       } else {
//         obj.strong = false
//       }

//       obj.text = $(item)
//         .text()
//         .trim()

//       arr.push(obj)
//     })

//     const imgDivList = $('.img_wrapper')

//     const images = []

//     imgDivList.each((i, item) => {
//       let j = i
//       let obj = {}

//       obj.imgUrl = $(item)
//         .find('img')
//         .attr('src')
//       obj.desc = $(item)
//         .find('span')
//         .text()
//         .trim()

//       while (
//         $(imgDivList[j--])
//           .prev()
//           .hasClass('img_wrapper')
//       ) {
//         if (images[j]) {
//           images[j].push(obj)
//         }
//       }

//       if (
//         !$(item)
//           .prev()
//           .hasClass('img_wrapper')
//       ) {
//         images.push([obj])
//       }
//     })

//     // console.log(images);

//     return { title, dateSource, content: arr, images }
//   } catch (error) {
//     console.error(error)
//   }
// }
