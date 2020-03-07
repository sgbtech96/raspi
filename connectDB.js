const mongoose = require('mongoose');
require('./model')
mongoose.connect('mongodb://127.0.0.1:27017/apurv', {
	useNewUrlParser: true,
	useCreateIndex: true
})
console.log('Connected to db')
