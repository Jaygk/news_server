const News = require('../../store')
const getDetail = require('../../request/details')

const chinaList = async (ctx, next) => {
  const page = ctx.query.page || 0
  const limit = ctx.query.limit || 20

  try {
    const res = await News.newsList.find({ name: 'china' })
    const data = res[0].data
    const result = data.splice(page * limit, limit)

    ctx.body = {
      data: result
    }
  } catch (error) {
    console.error(error)
  }

  await next()
}

const chinaDetail = async (ctx, next) => {
  try {
    const url = ctx.query.url
    const data = await getDetail(url)
    ctx.body = {
      result: data
    }
  } catch (error) {
    console.error(error)
  }

  await next()
}

module.exports = { chinaList, chinaDetail }
