const mongoose = require('mongoose');
const config = require('config')


const configdb = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}
module.exports = function () {
    const db = config.get('db')
    mongoose
        .connect(db, configdb)
        .then(() => console.log(`Connected to ${db}....`))
}