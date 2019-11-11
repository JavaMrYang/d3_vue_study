module.exports={
  publicPath: process.env.NODE_ENV === 'dev'
    ? '/production-sub-path/'
    : '/'
}
