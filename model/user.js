const { mongoose } = require('./connector')

//schema 对应存在的集合的schema
const mySchema = mongoose.Schema({
    username: String,
    password: String,
    user_type: String
});

var userModel = mongoose.model("userinfo", mySchema, 'userinfo')


// userModel.find({ username: '111' }).exec((error, data) => {
//     if (error) {
//         // console.log('bbbbb')
//         console.log(error);
//     } else {
//         // console.log('aaaaaa')
//         console.log(data)
//             //关闭数据库=>结束进程
//         mongoose.connection.close()
//     }
// })

// userModel.findOne({
//     username: '1111'
// })

// console.log('aaaaa')

module.exports = { userModel }