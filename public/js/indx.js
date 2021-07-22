const weatherForm = document.querySelector('#weather-form');


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = document.getElementById('location').value;
    fetch(`/weather?address=${location}`).then((res)=>{
        res.json().then((data)=>{
            const message = document.getElementById('weather_report');
            message.style.visibility =  'visible';
            if(data.error){
                message.textContent = data.error;
            }
            else{
                message.textContent = data.forecastData;
            }
        }) 
    })
})

