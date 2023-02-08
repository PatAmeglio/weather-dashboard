var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=orlando&appid=18610a725e2190ffc5e7027c25ec7a3b&units=imperial";
var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=orlando&appid=18610a725e2190ffc5e7027c25ec7a3b&units=imperial";

var currentDate = document.getElementById('date');
var temperature = document.getElementById('temperature');
var weatherIcon = document.querySelector('.card-img-top');
var humidity = document.getElementById('humidity');
var windSpeed = document.getElementById('wind-speed');


//Function to call current weather
function getAPI(request){
    fetch(weatherURL).then(function(response) {
        console.log(response.status);
        return response.json();
    })
    .then(function (data) {
        console.log(data.dt[0]);
        console.log(data.main.temp);
        console.log(data.weather[0].main);
        console.log(data.main.humidity);
        console.log(data.wind.speed);

        currentDate.textContent = JSON.stringify('Date: ' + data.dt);
        temperature.textContent = JSON.stringify('Temperature: ' + data.main.temp + '°F')
        humidity.textContent = JSON.stringify('Humidity: ' + data.main.humidity + '%')
        windSpeed.textContent = JSON.stringify('Wind Speed: ' + data.wind.speed + ' mph')

        if (data.weather[0].main === "Clear"){            
            weatherIcon.src = "https://openweathermap.org/img/wn/01d@2x.png"
            
          }
          if (data.weather[0].main === "Clouds"){            
            weatherIcon.src = "https://openweathermap.org/img/wn/02d@2x.png"
            
          }
          if (data.weather[0].main === "Rain"){            
            weatherIcon.src = "https://openweathermap.org/img/wn/10d@2x.png"
            
          }
          if (data.weather[0].main === "Thunderstorm"){            
            weatherIcon.src = "https://openweathermap.org/img/wn/11d@2x.png"
            
          }
          if (data.weather[0].main === "Snow"){            
            weatherIcon.src = "https://openweathermap.org/img/wn/13d@2x.png"
            
          }
          if (data.weather[0].main === "Mist"){            
            weatherIcon.src = "https://openweathermap.org/img/wn/50d@2x.png"
            
          }
    
      });

      
}


getAPI(weatherURL);