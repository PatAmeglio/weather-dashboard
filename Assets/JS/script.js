var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=18610a725e2190ffc5e7027c25ec7a3b&units=imperial";
var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=18610a725e2190ffc5e7027c25ec7a3b&units=imperial";

var today = dayjs();
var cityName;
var iconURL;
var searchHistory = [];
var userInput = document.querySelector('.form-control');
var buttonClick = $('#button-addon2');


    //Function for the button
    buttonClick.on('click', function(){
      var cityName = userInput.value;
      weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=18610a725e2190ffc5e7027c25ec7a3b&units=imperial";
      forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=18610a725e2190ffc5e7027c25ec7a3b&units=imperial";
      
      fetch(weatherURL)
        .then(response => response.json())
        .then(data => {
          if (data.cod !== 200) {
            window.alert("That city was not found. Please try again");
            return;
          }
    
          getAPI();
          userInput.value ="";
        });
    });
    

//Function to call API
function getAPI(request){
    fetch(weatherURL).then(function(response) {
        console.log(response.status);
        return response.json();
    })
    .then(function (data) {
        console.log(data.main.temp);
        console.log(data.weather[0].main);
        console.log(data.main.humidity);
        console.log(data.wind.speed);

        cityName = data.name;
        iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        var weatherContainer = document.querySelector('.weather-container');
        weatherContainer.innerHTML= "";
        
        var weatherCard = document.createElement('div');
              weatherCard.classList.add('card');
              weatherCard.innerHTML = `
              <div class="card-body">
              <h5 class="card-title">${cityName} ${dayjs(today).format('MMM D, YY')}</h5>
                <img src="${iconURL}" alt="Weather Icon" style="float: left; width: 50px; height: 50px; margin-right: 10px;">
                <p class="card-text">Temperature: ${data.main.temp}°F</p>
                <p class="card-text">Humidity: ${data.main.humidity}%</p>
                <p class="card-text">Wind Speed: ${data.wind.speed} mph</p>
              </div>
            `;

                weatherContainer.appendChild(weatherCard);
    

            if (data.weather[0].main === "Clear"){            
            iconURL = "https://openweathermap.org/img/wn/01d@2x.png"
            
            }
            if (data.weather[0].main === "Clouds"){            
            iconURL = "https://openweathermap.org/img/wn/02d@2x.png"
            
            }
            if (data.weather[0].main === "Rain"){            
            iconURL = "https://openweathermap.org/img/wn/10d@2x.png"
            
            }
            if (data.weather[0].main === "Thunderstorm"){            
            iconURL = "https://openweathermap.org/img/wn/11d@2x.png"
            
            }
            if (data.weather[0].main === "Snow"){            
            iconURL = "https://openweathermap.org/img/wn/13d@2x.png"
            
            }  
            if (data.weather[0].main === "Mist"){            
            iconURL = "https://openweathermap.org/img/wn/50d@2x.png"
            
            }
            if (data.weather[0].main === "Smoke"){            
            iconURL = "https://openweathermap.org/img/wn/50d@2x.png"
            
            }
      });

      
      fetch(forecastURL).then(function(response) {
        return response.json();
        })
        .then(function(data) {
            console.log(data.list[0].dt_txt);
            console.log(data.list[0].main.temp);
            console.log(data.list[0].main.humidity);
            console.log(data.list[0].wind.speed);
            
            var forecastContainer = document.querySelector('.forecast-container');
            forecastContainer.innerHTML = "";

            for (var i = 7; i < data.list.length && i < 42; i += 7) {
              var forecastCard = document.createElement('div');
              forecastCard.classList.add('card');
              forecastCard.innerHTML = `
                <div class="card-body">
                  <img src="${iconURL}" alt="Weather Icon" style="float: left; width: 50px; height: 50px; margin-right: 10px;">
                  <h5 class="card-title">${dayjs(data.list[i].dt_txt).format('MMM D, YY')}</h5>
                  <p class="card-text">Temperature: ${data.list[i].main.temp}°F</p>
                  <p class="card-text">Humidity: ${data.list[i].main.humidity}%</p>
                  <p class="card-text">Wind Speed: ${data.list[i].wind.speed} mph</p>
                </div>
              `;

                forecastContainer.appendChild(forecastCard);
            }
        });


      
    }

    