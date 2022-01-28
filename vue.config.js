module.exports = {
    css: {
        extract: false
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = '寶可夢配方卡片生成器 Pokemon Build Maker'
                return args
            })
    },
    publicPath: process.env.NODE_ENV === 'production' ?
        '/pokemon-build-maker/' : '/'
}