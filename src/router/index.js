const Router = require('koa-router')
const router = new Router()
const recommend = require('./recommend')
const china = require('./china')
const world = require('./world')
const tech = require('./tech')
const ent = require('./ent')
const sports = require('./sports')
const login = require('./login')

// 获取推荐列表
router.get('/api/recommend', recommend.recommendList)

// 获取推荐新闻详情
router.get('/api/recommend/detail', recommend.recommendDetail)

// 获取国内新闻列表
router.get('/api/china', china.chinaList)

// 获取国内新闻详情
router.get('/api/china/detail', china.chinaDetail)

// 获取国际新闻列表
router.get('/api/world', world.worldList)

// 获取国际新闻详情
router.get('/api/world/detail', world.worldDetail)

// 获取科技新闻列表
router.get('/api/tech', tech.techList)

// 获取科技新闻详情
router.get('/api/tech/detail', tech.techDetail)

// 获取娱乐新闻列表
router.get('/api/ent', ent.entList)

// 获取娱乐新闻详情
router.get('/api/ent/detail', ent.entDetail)

// 获取体育新闻列表
router.get('/api/sports', sports.sportsList)

// 获取体育新闻详情
router.get('/api/sports/detail', sports.sportsDetail)

router.post('/api/login', login.login)

module.exports = router
