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
	res.render('index', {
		title: 'Field Monitor',
		name: 'YoGang'
	})
})
app.post('/sensorInput', async (req, res) => {
	const senv = new AIS(req.body)
	await senv.save()
	res.status(201).send(senv)
})

app.get('/read', async (req, res) => {
	const tups = await AIS.find({})
	res.status(200).send(tups[(tups.length - 1)])
})

app.get('/readAll', async (req, res) => {
	const tups = await AIS.find({})
	res.status(200).send(tups)
})

app.post('/imageUpload', (req, res) => {
	res.send(req.file.buffer);
})

app.listen(port, function(){
  console.log("Started on PORT", port);
})