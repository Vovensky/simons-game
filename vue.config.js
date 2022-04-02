const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/simons-play-game/'
    : '/'
})
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/simons-play-game/'
    : '/'
}
module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  }
}