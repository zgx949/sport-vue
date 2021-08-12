// 跨域配置
module.exports = {
    devServer: {                //记住，别写错了devServer//设置本地默认端口  选填
        port: 8080,
        proxy: {                 //设置代理，必须填
            '/api': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
                target: 'http://localhost:8000',     //代理的目标地址
                // target: 'http://42.193.126.125:8000',
                changeOrigin: true,              //是否设置同源，输入是的
                pathRewrite: {                   //路径重写
                    '/api': ''                     //选择忽略拦截器里面的单词
                }
            }
        }
    },
    // 基本路径
    /* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */
    /* baseUrl: process.env.NODE_ENV === 'production' ? './' : '/' */
    // publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
    publicPath: './',
    outputDir: "dist", // 输出文件目录
    lintOnSave: false, // eslint 是否在保存时检查
    assetsDir: 'static', // 配置js、css静态资源二级目录的位置
    indexPath: 'index.html',

}


