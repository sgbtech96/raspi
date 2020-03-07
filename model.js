const mongoose = require('mongoose')

const AIS = mongoose.model('AIS', {
	humidity: {
		type: String,
		required: true
	}, 
	temperature: {
		type: String,
		required: true
	},
	light: {
		type: String,
		required: true
	}
})

module.exports = AIS