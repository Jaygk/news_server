const News = require('../../store')
const getDetail = require('../../request/details')

const entList = async (ctx, next) => {
  const page = ctx.query.page || 0
  const limit = ctx.query.limit || 20

  try {
    const res = await News.find({ name: 'ent' })
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

const entDetail = async (ctx, next) => {
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

module.exports = { entList, entDetail }
