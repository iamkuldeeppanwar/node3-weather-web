const request = require('postman-request')
const forecast = (latitude, longitude, callback) => {
        
        const url = 'http://api.weatherstack.com/current?access_key=149a28aefdbba5b74881efe98779eb44&query=' + latitude + ',' + longitude + '&unit=m'
        request({url, json:true}, (error, { body }) => {
                if(error){
                        callback('Unable to connect to weather services',undefined)
                }else if (body.error) {
                        callback('Unable to find location',undefined)
                }else{
                        callback(undefined, body.current.weather_descriptions[0] + '. it is currently ' + body.current.temperature + ' it feels like ' + body.current.feelslike + ' degrees out.')
                }
        })
}
module.exports = forecast