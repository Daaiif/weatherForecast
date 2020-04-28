const rp = require('request-promise')

module.exports = async function(city = '') {
    if (!city) {
        throw new Error('Ведите имя города')
    }

    const KEY = '35cf8dabb77ffd20ff21f541467e84a8'
    const uri = 'https://api.openweathermap.org/data/2.5/weather'

    const options = {
        uri,
        qs: {
            appid: KEY,
            q: city,
            units: 'imperial'
        },
        json: true
    }

    try {
        const data = await rp(options)
        const celsius = (data.main.temp - 32) * 5/9
        return {
            weather: `${data.name}: ${celsius.toFixed(0)}`,
            error: null
        }
    } catch (error) {
        return {
            weather: null,
            error: error.error.message
        }
    }

   
}