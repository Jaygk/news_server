const login = async (ctx, next) => {
  try {
    // console.log(ctx.request.body)
    ctx.body = {
      message: 'ok'
    }
  } catch (error) {
    console.error(error)
  }

  await next()
}

module.exports = { login }
