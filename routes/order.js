const { orderModel } = require('../model/order.js')
const express = require('express')
const jwt = require('jsonwebtoken')
var ObjectId = require('mongodb').ObjectID;

var router = express.Router();

// router.post('/', (req, res) => res.send('Hello World'));


router.post('/create', async(req, res) => {
    // console.log('aaa')
    // console.log(req)
    // console.log(req.body)
    // console.log(orderModel.find().count())

    //数据库异步操作的同步化
    var id_ = await orderModel.find().count();
    console.log(id_)
    const user = await orderModel.create({
        id: id_,
        citizen_name: req.body.citizen_name,
        address: req.body.address,
        size: req.body.size,
        position: req.body.position,
        district: req.body.district,
        priority: req.body.priority,
        time: req.body.time,

        status: req.body.status,
        worker_name: req.body.worker_name,
        device: req.body.device,
        material: req.body.material,
        duration: req.body.duration,
        cost: req.body.cost,
    })
    res.send({ msg: 'OK', data: user });
    // res.send('Hello World')

})

router.post('/citizen_find', async(req, res) => {

    var citizen_name = req.body.name;
    var res_ = await orderModel.find({ citizen_name: citizen_name });
    // console.lof(res_.count())
    res.send({ msg: 'OK', data: res_ })
})


router.post('/worker_find', async(req, res) => {

    var workername = req.body.name;
    var res_ = await orderModel.find({});
    res.send({ msg: "OK", data: res_ })
})

router.post('/recieve', async(req, res) => {

    var id = req.body.id;
    var res_ = await orderModel.update({ id: id }, {
            $set: {
                status: req.body.status,
                worker_name: req.body.worker_name,
                device: req.body.device,
                material: req.body.material,
                duration: req.body.duration,
                cost: req.body.cost
            }
        })
        //用了await 就不用回调函数了=>自动处理回调 
        //async/await 的语法很简洁，但你还是要处理异步函数里的抛出的错误。
        //只能用try catch且不能定位

    res.send({ msg: "OK", data: res_ })
})
module.exports = router;