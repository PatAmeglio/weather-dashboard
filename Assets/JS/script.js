var weatherURL = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=18610a725e2190ffc5e7027c25ec7a3b";

fetch(weatherURL).then(function (response) {
    console.log(response.status);
})