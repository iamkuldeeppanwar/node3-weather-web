const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
        res.render('index', {
                title: "Weather App",
                name: "Kuldeep Panwar"
        })
})

app.get('/about', (req, res) => {
        res.render('about', {
                title: 'About Me :)',
                name: 'Kuldeep panwar'
        })
})

app.get('/help', (req, res) => {
        res.render('help', {
                message: 'This is some helpful text!',
                title: 'Help',
                name: 'Kuldeep Panwar'
        })
})

app.get('/weather', (req,res) => {
        if(!req.query.address){
                return res.send({
                        error:"You must provide an address!"
                })
        }

        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
                if(error){
                        return res.send({ error: error })
                }

                forecast(latitude, longitude, (error, forecastData) => {
                        if(error){
                                return res.send({ error: error })
                        }
                        const object = JSON.stringify(forecastData)
                        res.send({
                                forecast:object,
                                location,
                                address:req.query.address
                        })
                })
        })
})

app.get('/products', (req,res) => {
        if (!req.query.search) {
                return res.send({
                        error: 'You must provide a search term!'
                })
        }

        console.log(req.query.search)
        res.send({
                products: []
        })
})

app.get('*', (req,res) => {
        res.render('404', {
                title: '404',
                name: 'Kuldeep panwar',
                errorMessage: 'Page not found!'
        })
})

app.listen(3000, () => {
        console.log('server is up on port 3000')
})