const weatherForm = document.querySelector('#weather-form');


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = document.getElementById('location').value;
    fetch(`/weather?address=${location}`).then((res)=>{
        res.json().then((data)=>{
            const message = document.getElementById('weather_report');
            const iconEle = document.getElementById('weather-icon');
            message.style.visibility =  'visible';
            if(data.error){
                message.textContent = data.error;
            }
            else{
                if(data.timeOfDay === 'Day'){
                    if(data.iconCode === 1000 || data.iconCode === 1100 || data.iconCode === 1101){
                        icon = data.iconCode+'-a.svg'
                    }
                    else{
                        icon = data.iconCode+'.svg'
                    }
                }
                else{
                    if(data.iconCode === 1000 || data.iconCode === 1100 || data.iconCode === 1101){
                        icon = data.iconCode+'-b.svg'
                    }
                    else{
                        icon = data.iconCode+'.svg'
                    }
                }
                iconEle.style.visibility = 'visible';
                console.log(icon);
                iconEle.src = `/weather_icons/${icon}`
                message.textContent = data.forecastData;
            }
        }) 
    })
})

