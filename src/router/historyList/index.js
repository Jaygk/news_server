const News = require('../../store')

const appendList = async (ctx, next) => {
  try {
    const name = ctx.request.body.userInfo.nickName

    const obj = {}
    obj.url = ctx.request.body.url
    obj.title = ctx.request.body.title
    obj.detailUrl = ctx.request.body.detailUrl

    const user = await News.users.findOne({ name })
    user.historyList.unshift(obj)

    await News.users.updateOne({ name }, { historyList: user.historyList })

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
    const name = ctx.request.body.userInfo.nickName
    const user = await News.users.findOne({ name })

    ctx.body = user.historyList
  } catch (error) {
    console.error(error)
  }

  await next()
}

module.exports = { appendList, getList }
