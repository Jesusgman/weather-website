request = require('request');

const geocode = (addr, cb) =>{    
    const token = "pk.eyJ1IjoieW9ubHVsIiwiYSI6ImNrcDM3YXFzOTAxZm4ybm93dmZqd2oyajEifQ.5P1FGnukzI0ICXoISOdm3g";
//Geocoding
    request({
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(addr)}.json?limit=1&access_token=${token}`,
        json: true
    },(err, {body,statusCode}={})=>{
        if(err){cb('Unable to connect to geocoder services!')}
        else if (statusCode!==200){
            cb('One or more parameters are incorrect!')
        } else{
            const featureSet = body.features[0];
            if(!featureSet){
                cb(`Couldn't find specified location ${addr}`);
            } else{
                cb(undefined, {
                    latitude: featureSet.center[1],
                    longitude: featureSet.center[0],
                    location: featureSet.place_name
                })
            }
        }
    });
}

module.exports = geocode;