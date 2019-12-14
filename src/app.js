const Koa = require('koa');
const router = require('./router');
const cors = require('koa2-cors');

const app = new Koa();

app.use(router.routes());
app.use(router.allowedMethods());

app.use(cors());

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  await next();
});

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
  );
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
});

const request = require('./request');

request();

app.listen(3000, () => {
  console.log('server is running at port 3000');
});
