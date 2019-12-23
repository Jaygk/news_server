const Router = require('koa-router')
const router = new Router()
const News = require('../store')
const getDetail = require('../request/details')

// 获取推荐列表
router.get('/api/recommend', async ctx => {
  const page = ctx.query.page || 0
  const limit = ctx.query.limit || 30

  try {
    const res = await News.find({ name: 'recommend' })
    const data = res[0].data
    const result = data.splice(page * limit, limit)

    ctx.body = {
      data: result
    }
  } catch (error) {
    console.error(error)
  }
})

// 获取国内新闻列表
router.get('/api/china', async ctx => {
  const page = ctx.query.page || 0
  const limit = ctx.query.limit || 20

  try {
    const res = await News.find({ name: 'china' })
    const data = res[0].data
    const result = data.splice(page * limit, limit)

    ctx.body = {
      data: result
    }
  } catch (error) {
    console.error(error)
  }
})

// 获取推荐新闻详情
router.get('/api/recommend/detail', async ctx => {
  try {
    const url = ctx.query.url
    const data = await getDetail(url)
    ctx.body = {
      result: data
    }
  } catch (error) {
    console.error(error)
  }
})

// 获取国内新闻详情
router.get('/api/china/detail', async ctx => {
  try {
    const url = ctx.query.url
    const data = await getDetail(url)
    ctx.body = {
      result: data
    }
  } catch (error) {
    console.error(error)
  }
})

// 获取国际新闻列表
router.get('/api/world', async ctx => {
  const page = ctx.query.page || 0
  const limit = ctx.query.limit || 20

  try {
    const res = await News.find({ name: 'world' })
    const data = res[0].data
    const result = data.splice(page * limit, limit)

    ctx.body = {
      data: result
    }
  } catch (error) {
    console.error(error)
  }
})

// 获取国际新闻详情
router.get('/api/world/detail', async ctx => {
  try {
    const url = ctx.query.url
    const data = await getDetail(url)
    ctx.body = {
      result: data
    }
  } catch (error) {
    console.error(error)
  }
})

// 获取科技新闻列表
router.get('/api/tech', async ctx => {
  const page = ctx.query.page || 0
  const limit = ctx.query.limit || 20

  try {
    const res = await News.find({ name: 'tech' })
    const data = res[0].data
    const result = data.splice(page * limit, limit)

    ctx.body = {
      data: result
    }
  } catch (error) {
    console.error(error)
  }
})

// 获取科技新闻详情
router.get('/api/tech/detail', async ctx => {
  try {
    const url = ctx.query.url
    const data = await getDetail(url)
    ctx.body = {
      result: data
    }
  } catch (error) {
    console.error(error)
  }
})

// 获取娱乐新闻列表
router.get('/api/ent', async ctx => {
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
})

// 获取娱乐新闻详情
router.get('/api/ent/detail', async ctx => {
  try {
    const url = ctx.query.url
    const data = await getDetail(url)
    ctx.body = {
      result: data
    }
  } catch (error) {
    console.error(error)
  }
})

// 获取体育新闻列表
router.get('/api/sports', async ctx => {
  const page = ctx.query.page || 0
  const limit = ctx.query.limit || 20

  try {
    const res = await News.find({ name: 'sports' })
    const data = res[0].data
    const result = data.splice(page * limit, limit)

    ctx.body = {
      data: result
    }
  } catch (error) {
    console.error(error)
  }
})

// 获取体育新闻详情
router.get('/api/sports/detail', async ctx => {
  try {
    const url = ctx.query.url
    const data = await getDetail(url)
    ctx.body = {
      result: data
    }
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
