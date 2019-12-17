const Router = require('koa-router')
const router = new Router()
const News = require('../store')

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

module.exports = router
