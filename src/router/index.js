const Router = require('koa-router');
const router = new Router();
const News = require('../store');

router.get('/api/sina', async ctx => {
  const res = await News.find({ name: 'sinaNews' });

  ctx.body = {
    data: res,
  };
});

router.get('/api/weibo', async ctx => {
  const res = await News.find({ name: 'weibo' });

  ctx.body = {
    data: res,
  };
});

module.exports = router;
