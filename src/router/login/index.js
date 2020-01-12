const News = require('../../store')

const login = async (ctx, next) => {
  try {
    const list = new News.historyList({
      name: '浏览记录',
      data: []
    })

    const temp = await News.historyList.find({ name: '浏览记录' })
    if (temp.length !== 0) {
      await News.historyList.updateOne({ name: '浏览记录' }, { data: [] })
    } else {
      await list.save()
    }

    ctx.body = {
      message: 'ok'
    }
  } catch (error) {
    console.error(error)
  }

  await next()
}

module.exports = { login }
