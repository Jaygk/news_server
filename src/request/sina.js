const request = require('superagent');
const cheerio = require('cheerio');
const News = require('../store');

module.exports = async () => {
  const res = await request.get('https://news.sina.com.cn/').set('Content-Type', 'application/json');
  const $ = cheerio.load(res.text);

  const list = $('.ct_t_01').find('a');

  let arr = [];
  list.each((i, item) => {
    let obj = {};
    obj.title = item.children[0].data;
    obj.url = item.attribs.href;
    arr.push(obj);
  });

  const news = new News({
    name: 'sinaNews',
    type: '新浪新闻',
    data: arr,
  });

  await news.save();
};
