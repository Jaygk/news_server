const News = require('../../store')
const appId = 'wx338ba3ec22f4bdcc'
const appSecret = '43b9332725ec95986592100430059213'
const axios = require('axios')
const jwt = require('jsonwebtoken')
const jwtSecret = 'lwjwtsecret'

const generateToken = user => {
  return jwt.sign(user, jwtSecret, {
    expiresIn: 7200
  })
}

const login = async (ctx, next) => {
  try {
    const body = ctx.request.body
    const name = body.userInfo.nickName

    const queryString = `appid=${appId}&secret=${appSecret}&js_code=${body.code}&grant_type=authorization_code`
    const wxAPI = `https://api.weixin.qq.com/sns/jscode2session?${queryString}`

    const res = await axios.get(wxAPI)

    const openId = res.data.openid

    const temp = await News.users.find({ openId })
    if (temp.length !== 0) {
      ctx.body = {
        token: generateToken({ openId })
      }
    } else {
      const user = new News.users({
        name,
        openId,
        historyList: []
      })

      await user.save()
      ctx.body = {
        token: generateToken({ openId })
      }
    }
  } catch (error) {
    console.error(error)
  }

  await next()
}

const checkLogin = async (ctx, next) => {
  try {
    const name = ctx.request.body.userInfo.nickName

    const user = await News.users.findOne({ name })
    const openId = user.openId

    if (openId.length > 0   ) {
      ctx.body = {
        errCode: false
      }
    } else {
      ctx.body = {
        errCode: true
      }
    }
  } catch (error) {
    console.error(error)
  }

  await next()
}

module.exports = { login, checkLogin }
