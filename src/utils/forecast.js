const weatherCode = require('./utils');
const request = require('request');

const API_KEY = 'wmdq6856SlWX1Mfve1051ABI3iA5vyc6';
const fields = [
    "precipitationIntensity",
    "precipitationType",
    "windSpeed",
    "windGust",
    "windDirection",
    "temperature",
    "temperatureApparent",
    "cloudCover",
    "cloudBase",
    "cloudCeiling",
    "weatherCode",
  ];

const timezone = "Mexico/General";
const steps = "current";
const baseUrl = "https://api.tomorrow.io/v4/timelines";
const forecast = (latitude, longitude, cb) => {
    const coordinates = latitude + ',' + longitude;
    request({
        url: `${baseUrl}?apikey=${API_KEY}&location=${coordinates}&fields=${fields}&timesteps=${steps}&timezone=${timezone}`,
        json: true
    },(err,res)=>{
        if(err){
            cb("Unable to connect to weather service!")
        } else if (res.statusCode!==200){
            console.log(res.statusCode)
            cb(res.body.message);
        }
        else{
            const {temperature, temperatureApparent, weatherCode:wCode} = res.body.data.timelines[0].intervals[0].values;
            cb(undefined,{
                temp: temperature,
                tempAprnt: temperatureApparent,
                wCode: weatherCode[wCode]
            })
        }
    })
    
}

module.exports = forecast;