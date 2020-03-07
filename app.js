const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 3000
require('./connectDB')
const AIS = require('./model')
app.use(express.json())

app.post('/sensorInput', (req, res) => {
	const senv = new AIS(req.body)
	console.log(req.body)
	senv.save().then(() => {
		res.status(200).send(senv)
	}).catch((e) => {
		console.log('Error', e)
	})
})

app.get('/read', async (req, res) => {
	const tups = await AIS.find({})
	res.send(tups)
})

app.listen(port, function(){
  console.log("Started on PORT", port);
})