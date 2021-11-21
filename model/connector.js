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


module.exports = { mongoose }