console.log(process.env.NODE_ENV)
let devServer = {}
if (process.env.NODE_ENV === 'development') {
  devServer = {
    port: 4000,
    open: true,
    hot: true,
  };
}

module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule.use('vue-svg-loader').loader('vue-svg-loader');
    config.module
      .rule('txt')
      .test(/\.txt$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end();
  },
  devServer: devServer,
}
