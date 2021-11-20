const mongoose = require('mongoose');
const url = "mongodb+srv://william:136750@cluster0.vsilr.mongodb.net/phtrs?retryWrites=true&w=majority";
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
})
mongoose.connection.on("connected", () => {
    console.log('success connected!!!!')
})
mongoose.connection.on("error", (error) => {
    console.log('fail connected!!!!')
})

//schema 对应存在的集合的schema
const mySchema = mongoose.Schema({
    username: String,
    password: String
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