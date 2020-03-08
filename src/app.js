const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const hbs = require('hbs');
const app = express()
const port = process.env.PORT || 3000
require('./connectDB')
const AIS = require('../models/ais')
app.use(express.json())

const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));

app.get('', (req, res) => {
	res.render('index')
})
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
	res.send(tups[(tups.length - 1)])
})

app.listen(port, function(){
  console.log("Started on PORT", port);
})