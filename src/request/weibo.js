const request = require('superagent');
const cheerio = require('cheerio');
const News = require('../store');

module.exports = async () => {
  const res = await request
    .get('https://s.weibo.com/top/summary?Refer=top_hot&topnav=1&wvr=6')
    .set('Content-Type', 'application/json');
  const $ = cheerio.load(res.text);

  const list = $('.td-02').find('a');

  let arr = [];
  list.each((i, item) => {
    let obj = {};
    obj.title = item.children[0].data;
    obj.url = 'https://s.weibo.com' + item.attribs.href;
    arr.push(obj);
  });

  // console.log(arr);

  const news = new News({
    name: 'weibo',
    type: '微博热搜',
    data: arr,
  });

  await news.save();
};
