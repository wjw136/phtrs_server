const { userModel } = require('../model/user.js')
const express = require('express')
const jwt = require('jsonwebtoken')
var ObjectId = require('mongodb').ObjectID;

var router = express.Router();

const SECRET = "fdfhfjdfdjfdjerwrereresaassa2dd@ddds"


router.post('/', (req, res) => res.send('Hello World'));

//登录(jwt 无状态的授权)
router.post('/login', async(req, res) => {
    const user = await userModel.findOne({
            username: req.body.username
        }) //find查询返回字符串json   req传输json对象

    console.log(req.body.username)
    if (!user) {
        console.log('bbbb')
        return res.status(422).send({
            message: '用户名不存在',
        })
    } else {
        user_json = eval('(' + user + ')'); // 把JSON字符串解析为javascript对象
        //密码加密
        if (user.password != req.body.password) return res.status(422).send({ message: '密码无效' })
        else {
            const token = jwt.sign({
                id: String(user._id)
            }, SECRET)

            res.send({
                user,
                token,
            })
        }
    }
})

//注册
router.post('/register', async(req, res) => {
        const user = await userModel.create({
            username: req.body.username,
            password: req.body.password
        })
        res.send(user)
    }

)

module.exports = router;