const path = require('path')
const { response } = require('express')
const express = require('express')
const hbs = require('hbs')
const { Http2ServerRequest } = require('http2')
const geocode = require('./utils/geocode')
const forecast = require('./utils/weather_forecast')
const request = require('request')


const app = express()
const port = process.env.PORT || 3000

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
        name: 'Ozan Pala'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        body: "Here are some words about me.",
        name: "Andrew Mead"
    })
})
app.get('/help', (req, res) => {
    res.render('help', {

        title: "Help Me",
        body: "Please contact the number.",
        name: 'Ekin Dayanc'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error:'You must provide a location'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
           return res.send({error})
        }
    
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
             })
        })

    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
        error:'You must provide a search term.'
       }) 
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: "Error 404",
        name: 'Ozan Pala',
        errorMessage: 'Could not found the article'
    })
})

app.get('*',(req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Ozan Pala',
        errorMessage: 'Could not found the page/'
    })
})


app.listen(port, () => {
    console.log('Server us up on port ' + port)
})