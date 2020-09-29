const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a0b8922bec0dfcecbf66b081d5339aa9&query=' + latitude + ',' +longitude
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', error)
        } else if (body.success == false) {
            callback('Unable to find location. Try another search', body.error)
        } else {
            callback(undefined, 'Current temperature is ' + body.current.temperature + '. Today, sky is ' + body.current.weather_descriptions[0] + '. Wind speed today is ' + body.current.wind_speed)
        }
    })

}


module.exports = forecast
// forecast(-34.0544, 118.2439, (error, data) => {
//     console.log('Data', data)
//     console.log('Error', error)
// })