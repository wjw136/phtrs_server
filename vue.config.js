//cli4x后取消配置文件 通过vue.config.js修改默认配置
// module.exports = {
//     devServer: {
//         proxy: {
//             //名字可以自定义，这里我用的是api

//             '/api': {
//                 target: 'http://121.199.41.175:3000/', //设置你调用的接口域名和端口号
//                 changeOrigin: true,
//                 pathRewrite: {
//                     '^/api': ''
//                 }
//             }
//         }
//     }
// };
module.exports = {
    lintOnSave: false
}