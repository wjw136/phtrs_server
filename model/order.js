const { List } = require('echarts');
const { mongoose } = require('./connector')


const mySchema = mongoose.Schema({
    id: Number,
    citizen_name: String,
    address: String,
    size: String,
    position: String,
    district: String,
    priority: String,
    time: String,

    status: String,
    worker_name: String,
    device: Array,
    material: Array,
    duration: Number,
    cost: Number
});

var orderModel = mongoose.model("order", mySchema)


module.exports = { orderModel }