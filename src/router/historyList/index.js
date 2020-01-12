const News = require('../../store')

const appendList = async (ctx, next) => {
  try {
    const obj = {}
    obj.url = ctx.request.body.url
    obj.title = ctx.request.body.title
    obj.detailUrl = ctx.request.body.detailUrl

    const list = await News.historyList.findOne({ name: '浏览记录' })
    list.data.unshift(obj)

    await News.historyList.updateOne({ name: '浏览记录' }, { data: list.data })

    ctx.body = {
      message: 'ok'
    }
  } catch (error) {
    console.error(error)
  }

  await next()
}

const getList = async (ctx, next) => {
  try {
    const list = await News.historyList.findOne({ name: '浏览记录' })

    ctx.body = list.data
  } catch (error) {
    console.error(error)
  }

  await next()
}

module.exports = { appendList, getList }
