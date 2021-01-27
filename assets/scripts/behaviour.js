$( document ).ready(function() {
  let searchInput = $('#search-input');
  let searchBtn = $('#search-btn')
  let searchArr = [];
  let searchList = $('#search-list');
  let cityname = "denver";
  let APIKEY = 'c18d5d2e20b21d5580498fa1824aba22';
  // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + `&appid=${APIKEY}&units=imperial`;
  // api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
  // http://api.openweathermap.org/data/2.5/forecast?q=denver&appid=c18d5d2e20b21d5580498fa1824aba22
  let weeklyForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + `&appid=${APIKEY}&units=imperial`;
  // alias luxon object for improved readability
  let DateTime = luxon.DateTime;
  let dt = DateTime.local();
  // Top row dedicated solely to today's weather
  let todaysDate = `${dt.month}/${dt.day}/${dt.year}`
  // 5-Day Forecast Dates:
  let forecastD1 = `${dt.month}/${dt.day + 1}/${dt.year}`
  let forecastD2 = `${dt.month}/${dt.day + 2}/${dt.year}`
  let forecastD3 = `${dt.month}/${dt.day + 3}/${dt.year}`
  let forecastD4 = `${dt.month}/${dt.day + 4}/${dt.year}`
  let forecastD5 = `${dt.month}/${dt.day + 5}/${dt.year}`
// Function completely covers dates; will need updating based on localStorage items.
  function headingDates() {
    // today's weather
    $('#current-date').text(todaysDate)
    // 5-Day Forecast Dates:
    $('#forecast-d1').text(forecastD1)
    $('#forecast-d2').text(forecastD2)
    $('#forecast-d3').text(forecastD3)
    $('#forecast-d4').text(forecastD4)
    $('#forecast-d5').text(forecastD5)
  }
  headingDates();

  // Make submit button take value, add it to an array, clear screen, and make a button, then add to storage
  searchBtn.on('click', function(event) {
    event.preventDefault();

    // Does not work
    // getCityBtn();
    // function getCityBtn() {
    //   var searchArrParsed = JSON.parse(localStorage.getItem("cities"));
    //   for (let i = 0; i < searchArrParsed.length; i++) {
    //     let citySearch = $(`<button>${searchArrParsed[0]}</button>`).addClass('btn btn-outline-secondary bg-white w-100');
    //     searchList.prepend(citySearch);
    //     searchArrParsed = [];
    //   }
    // }

    let savedSearch = searchInput.val();

    function storeCityBtn() {
      localStorage.setItem("cities", JSON.stringify(searchArr));
    }
    
    function createCityBtn() {
      searchArr.unshift(savedSearch);
      searchInput.val('');
      // console.log(searchArr);
      let citySearch = $(`<button>${searchArr[0]}</button>`).addClass('btn btn-outline-secondary bg-white w-100');
      searchList.prepend(citySearch);
      storeCityBtn();
    }

    if (savedSearch.length !== 0) {
      createCityBtn();
    }
  })


  // This call writes the cityname, current-weather(temp, humidity), & sends a 2nd AJAX Call for UVIndex all for the top card 
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // console.log(response);
      $('#city').text(response.name);
      function todaysWeather() {
          $('#current-temp').text(response.main.temp);
          $('#current-humidity').text(response.main.humidity);
          $('#current-wind-speed').text(response.wind.speed);
    }
    todaysWeather();
          let lat = response.coord.lat;
          let lon = response.coord.lon;
            // Current and forecast weather data 
            //  https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
          let oneCallAPI = "https://api.openweathermap.org/data/2.5/onecall?" + `lat=${lat}&` + `lon=${lon}&` + `appid=${APIKEY}&units=imperial`;
              $.ajax({
                url: oneCallAPI,
                method: "GET"
              }).then(function(uvIndex) {
                $('#current-uvi').text(uvIndex.current.uvi);
                // change UVI background by scale
                function uvIndexScale() {
                  let uvScale = $('.uv-scale');
                  let currentUV = parseFloat($('#current-uvi').text()) // float
                  if (currentUV < 3) {
                    uvScale.addClass("uv-low");
                  } else if (currentUV >= 3 && currentUV < 6) {
                    uvScale.addClass("uv-moderate");
                  } else if (currentUV >= 6 && currentUV < 8) {
                    uvScale.addClass("uv-high");
                  } else if (currentUV >= 8 && currentUV < 11) {
                    uvScale.addClass("uv-very-high");
                  } else if (currentUV >= 11) {
                    uvScale.addClass("uv-extreme");
                  };
                }; 
                uvIndexScale();
    // $('.btn-city').on('click', function() {
    //     console.log($(this));
    // });
  });
    });
    
  // This SECOND Call grabs the weather-icon based on weather description, 5-day forecast temp, and humidityh, 
    $.ajax({
      url: weeklyForecast,
      method: "GET"
    }).then(function(response) {
      // weatherDescArr is a collection of the returned object's 5-day 12pm forecast weather main "descriptions"
      // WEATHER CONDITION CODES: https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
      /* Each "description" 
        Main: clouds - 03d
        Main: clear - 01d
        Main: snow - 13d
        Main: Rain - 10d
        Main: Drizzle - 09d
        Main: Thunderstorm - 11d
        Main: Mist/Smoke/Haze/Dust/Fog/Sand/Dust/Ash/Squall/Tornado - 50d
      */
      function setWeatherIcons() {
        let dayIconsURL = "http://openweathermap.org/img/wn/";
        let weatherDescArr = [
        response.list[3].weather[0].main,
        response.list[11].weather[0].main,
        response.list[19].weather[0].main,
        response.list[27].weather[0].main,
        response.list[35].weather[0].main
        ];
        let day = 1;
        for (let i = 0; i < weatherDescArr.length; i++) {
          if (weatherDescArr[i] === "Clouds") {
            $(`#img-d${day}`).attr('src', dayIconsURL + '03d@2x.png');
          } else if (weatherDescArr[i] === "Clear") {
            $(`#img-d${day}`).attr('src', dayIconsURL + '01d@2x.png');
          } else if (weatherDescArr[i] === "Snow") {
            $(`#img-d${day}`).attr('src', dayIconsURL + '13d@2x.png');
          } else if (weatherDescArr[i] === "Rain") {
            $(`#img-d${day}`).attr('src', dayIconsURL + '10d@2x.png');
          } else if (weatherDescArr[i] === "Drizzle") {
            $(`#img-d${day}`).attr('src', dayIconsURL + '09d@2x.png');
          } else if (weatherDescArr[i] === "Thunderstorm") {
            $(`#img-d${day}`).attr('src', dayIconsURL + '11d@2x.png');
          } else {
            $(`#img-d${day}`).attr('src', dayIconsURL + '50d@2x.png');
          }
          day++;
        }
      }
      setWeatherIcons();

      // 5 day forecast, Temp: & Humidity:
      function fiveDayForecast() {
        // Current day + 1 12:00:00
        $('#temp-d1').text(response.list[3].main.temp);
        $('#humidity-d1').text(response.list[3].main.humidity);
        // Current day + 2 12:00:00
        $('#temp-d2').text(response.list[11].main.temp);
        $('#humidity-d2').text(response.list[11].main.humidity);
        // Current day + 3 12:00:00
        $('#temp-d3').text(response.list[19].main.temp);
        $('#humidity-d3').text(response.list[19].main.humidity);
        // Current day + 4 12:00:00
        $('#temp-d4').text(response.list[27].main.temp);
        $('#humidity-d4').text(response.list[27].main.humidity);
        // Current day + 5 12:00:00
        $('#temp-d5').text(response.list[35].main.temp);
        $('#humidity-d5').text(response.list[35].main.humidity);
      }
      fiveDayForecast();
    });
});



// WHEN U OPEN WEATHER DASHBOARD IT POPULATES THE LAST SEARCHED CITY
// I want to type a query that receives input from the input search and queries based on that q="city"
// every time the search button is clicked, it acts as a to-do list and adds the city to the buttons field
// every time the button field is updated, it should set these to local storage, probably from an array
// each time the page is refreshed, it should display this list of buttons
// each button, when clicked, should call an ajax request for the weather for a query using its var q="city"
// it is not required, but a delete icon would be nice
// I want to be able to log individual pieces of data such as response.temperature
// Then I want to create an HTML empty template where the text content is populated from the API data values
// I also want the screen to be mostly blank save for the input field div for search
// on click of each city, the template repopulates so maybe a call function


/*

*/



