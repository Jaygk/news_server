const Router = require('koa-router')
const router = new Router()
const News = require('../store')
const detail = require('../request/details')

router.get('/api/sina', async ctx => {
  try {
    const res = await News.find({ name: 'sinaNews' })

    ctx.body = {
      data: res,
    }
  } catch (error) {
    console.error(error)
  }
})

router.get('/api/weibo', async ctx => {
  try {
    const res = await News.find({ name: 'weibo' })

    ctx.body = {
      data: res,
    }
  } catch (error) {
    console.error(error)
  }
})

router.get('/', async ctx => {
  ctx.body = {
    data: 'ok'
  }
})

router.get('/api/sina/detail', async ctx => {
  try {
    const url = ctx.query.url
    const data = await detail.getSinaDetail(url)
    ctx.body = {
      result: data
    }
  } catch(error) {
    console.error(error);
  }
})

module.exports = router
