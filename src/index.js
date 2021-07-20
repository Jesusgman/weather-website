const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');
const app = express();

//Views engine and directory config
app.set('view engine','hbs')
app.set('views',(viewsPath))
hbs.registerPartials(partialsPath)

//Static content config
app.use(express.static(publicPath))
//When using static the root of the page is always the html file in static
/* app.get('/', (req, res)=>{
    res.send('Hey there General Kenoby');
}); */

app.get('/',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name: 'Jesus G.'
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message: 'Hey  yo b',
        name: 'Jesus G.',
        title: 'Help'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name: 'Jesus G.',
        title: 'About'
    });
});

app.get('/weather',(req,res)=>{
    let address = req.query.address;
    if(!address){
        return res.send({
            error: 'Please provide an address'
        })    
    }
    geocode(`${address}`,(error, {latitude, longitude, location} = {})=>{
        if (error){
            return res.send({ error });
        }
        forecast(latitude,longitude,(error,{temp, tempAprnt, wCode}={})=>{
            if(error){
                return res.send({ error });
            }
            //Remember about shorthand sintax
            res.send({
                forecastData: `It's currently ${temp} degrees out on ${location}. It feels like ${tempAprnt}, expect a ${wCode} weather`,
                weather: wCode,
                location,
                temperaure: temp,
                ApparentTemp: tempAprnt
            })
        });

    });
/*     res.send({
        weather: 'Sunny',
        location: 'Guadalajara',
        address: address
    }); */
});

app.get('/products',(req,res)=>{
    if(!req.query.search){
        // instead of using if / else you can use return preferably for express
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
});

app.get('/help/*',(req, res)=>{
    res.render('error',{
        title: 'The Help article you\'re looking for doesn\'t exists!',
        error_message: 'Help article not found',
        name: 'Jesus G.'
    },(err, html)=>{
        res.status(404).send(html);
    })
});

//For error pages and such
app.get('*', (req,res) => {
    res.render('error',{
        title: 'Oops the content you\'re looking for doesn\'t exists!',
        error_message: 'Page not found',
        name: 'Jesus G.'
    }, (err,html)=>{
        res.status(404).send(html);
    });
})

app.listen({
    port: 3000
}, ()=>{
    console.log('Server is up')
});